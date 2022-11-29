import React, { useEffect, useState } from 'react'
import Friends from './components/Friends'
import Posts from './components/Posts'
import Personal from './components/Personal'

// import ShareBox from './components/ShareBox'
// import SearchBar from './components/SearchBar'

import { useDispatch, useSelector } from 'react-redux'
import { AppState, Friend, Post} from '../store/types'
import { useMediaQuery } from 'react-responsive'
import { useNavigate } from 'react-router-dom'
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { login, relogin } from '../store/actions'
import { BASE_URL } from '../util/secrets'
import SearchBar from './components/SearchBar'
import ShareBox from './components/ShareBox'
import { Button, Grid, Pagination, PaginationProps } from 'semantic-ui-react'
import queryString from "query-string"

const Main = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    //const isPostLoaded = useSelector((state: AppState) => state.isPostLoaded)
    const username = useSelector((state: AppState) => state.username)
    const [userAvatar, setUserAvatar] = useState<string>();
    
    // const userData = useSelector((state: AppState) => state.users.map((user) => user.username))

    // Friends
    // const [userFriends, setUserFriends] = useState<number[]>([...user?.friends?? []])
    const [friendData, setFriendData] = useState<Friend[]>([]);

    // Posts
    const [loading, setLoading] = useState<boolean>(false);
    const [mainPosts, setMainPosts] = useState<Post[]>([])
    const [newPost, setNewPost] = useState<string>("")

    // Search Bar
    const [keyword, setKeyword] = useState<string>("")

    // Pagination
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [postPerPage, setPostPerPage] = useState<number>(10);

    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = mainPosts.slice(indexOfFirstPost, indexOfLastPost);

    // Responsive
    const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 864px)'})
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 864px)' })

    const paginate = (data: PaginationProps) => {
        console.log(mainPosts);
        const page: any = data.activePage;
        setCurrentPage(page);
    }


    const getData = async() => {
        if (!username){ // probably third-party login
            const queryParams = queryString.parse(window.location.search);

            //console.log(queryParams);
            
        
            if(queryParams.username){
                const username: string = queryParams.username as string

                dispatch(login(username));
                //console.log(username);
            }
            else{
                dispatch(relogin());
                navigate("/");
            }
        }


        await axios.get(`${BASE_URL}/articles`).then((res) => {
            setLoading(true);
            setMainPosts(res.data.articles);
            setLoading(false);

        }).catch((err: AxiosError) => {
            if (err.response!.status === 401) {
                toast.error("Session Expired", {duration: 1000});
                dispatch(relogin());
                navigate("/");
            }
        });

        await axios.get(`${BASE_URL}/avatar`).then((res) => {
            setLoading(true);
            setUserAvatar(res.data.avatar);
            setLoading(false);

        }).catch((err: AxiosError) => {
            if (err.response!.status === 401) {
                dispatch(relogin());
                navigate("/");
                //console.clear();
            }
        });
    } 



    useEffect(() => {
        getData();
        // console.log("res");
    }, [username, friendData])

 
    return (
        <>
        {isDesktopOrLaptop &&
            <div>
                <div className="grid grid-cols-8 gap-6 mx-4">
                    <div className="col-span-2">
                        <Personal username={username!} />
                        {/* /<Friends/> */}
                    </div>
                    <div className="col-span-4">
                    
                        <SearchBar setKeyword={setKeyword}/>
                    
                        <ShareBox username={username!} setMainPosts={setMainPosts} />
                    
                        {(mainPosts.length > 0) && <Posts username={username!} userAvatar={userAvatar} mainFeeds={currentPosts} keyword={keyword}/>}

                        <Grid>
                            <Grid.Column textAlign="center">
                                <Pagination defaultActivePage={1} totalPages={Math.ceil(mainPosts.length / postPerPage)} onPageChange={(e, data) => paginate(data)} />
                            </Grid.Column>
                        </Grid>
                        {/* <Pagination  defaultActivePage={5} totalPages={10} /> */}
                        
                    </div>
                    <div className="col-span-2">
                        <Friends username={username!} friendData={friendData!} setFriendData={setFriendData!}/>
                    </div>
                    
                    {/* <Friends/>
                    <Personal/> */}
                </div>
                
            </div>
            
        }

        {/* {isTabletOrMobile &&
            <div>
                <Personal username={user?.username} userAvatar={user?.avatar} userHeadline={user?.headline?? ""}/>
                <Friends username={user?.username} userFriends={userFriends} setUserFriends={setUserFriends}/>
               
             
                {(mainPosts.length > 0) && <Posts userId={user?.id} userData={userData} userPosts={mainPosts} keyword={keyword}/>}
               
            </div>
        } */}
        </>
    )
    
}

export default Main