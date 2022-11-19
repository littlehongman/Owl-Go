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
import { relogin } from '../store/actions'
import { BASE_URL } from '../util/secrets'
import SearchBar from './components/SearchBar'
import ShareBox from './components/ShareBox'

const Main = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    //const isPostLoaded = useSelector((state: AppState) => state.isPostLoaded)
    const username = useSelector((state: AppState) => state.username)
    
    // const userData = useSelector((state: AppState) => state.users.map((user) => user.username))

    // Friends
    // const [userFriends, setUserFriends] = useState<number[]>([...user?.friends?? []])
    const [friendData, setFriendData] = useState<Friend[]>([]);

    // Posts
    const displayPosts: any = [];
    const [mainPosts, setMainPosts] = useState<Post[]>(displayPosts)
    const [newPost, setNewPost] = useState<string>("")

    // Search Bar
    const [keyword, setKeyword] = useState<string>("")

    // Responsive
    const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 864px)'})
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 864px)' })


    const getPosts = async() => {
        axios.get(`${BASE_URL}/articles`).then((res) => {
            console.log(res.data);
            setMainPosts(res.data.articles);
            //console.log(mainPosts);

        }).catch((err: AxiosError) => {
            if (err.response!.status === 401) {
                toast.error("Session Expired", {duration: 1000});
                dispatch(relogin());
                navigate("/");
            }
        });
    } 


    useEffect(() => {
        getPosts();
    }, [friendData])

    // useEffect(() => {
    //     setMainPosts(displayPosts);
    // }, [displayPosts])
    
   
    // useEffect(() => {
    //     dispatch(updatePosts(userFriends, keyword));
        
    // }, [keyword, userFriends, newPost])


    return (
        <>
        {isDesktopOrLaptop &&
            <div className="grid grid-cols-8 gap-6 mx-4">
                <div className="col-span-2">
                    <Personal username={username!} />
                    {/* /<Friends/> */}
                </div>
                <div className="col-span-4">
                   
                    <SearchBar setKeyword={setKeyword}/>
                   
                    <ShareBox/>
                   
                    {(mainPosts.length > 0) && <Posts username={username!} mainFeeds={mainPosts} keyword={keyword}/>}
                 
                </div>
                <div className="col-span-2">
                    <Friends username={username!} friendData={friendData!} setFriendData={setFriendData!}/>
                </div>
                
                {/* <Friends/>
                <Personal/> */}
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