import React, { useEffect, useState } from 'react'
import Friends from './components/Friends'
import Posts from './components/Posts'
import Personal from './components/Personal'
import ShareBox from './components/ShareBox'
import SearchBar from './components/SearchBar'

import { useDispatch, useSelector } from 'react-redux'
import { AppState, Post} from '../store/types'
import { useMediaQuery } from 'react-responsive'
import { useNavigate } from 'react-router-dom'
import { updatePosts } from '../store/actions'

const Main = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    //const isPostLoaded = useSelector((state: AppState) => state.isPostLoaded)
    const user = useSelector((state: AppState) => {
        if(state.loginState.isLogin) {
            return state.users[state.loginState.userId]
        }
        return null;
    });
    
    const userData = useSelector((state: AppState) => state.users.map((user) => user.username))

    // Friends
    const [userFriends, setUserFriends] = useState<number[]>([...user?.friends?? []])

    // Posts
    const displayPosts = useSelector((state: AppState) => state.displayPosts);
    const [mainPosts, setMainPosts] = useState<Post[]>(displayPosts)
    const [newPost, setNewPost] = useState<string>("")

    // Search Bar
    const [keyword, setKeyword] = useState<string>("")

    // Responsive
    const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 864px)'})
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 864px)' })

    useEffect(() => {
        if (user === null){
            navigate("../")
        } 
        // dispatch(updatePosts(userFriends, keyword)); // Load for first time
    }, [])

    useEffect(() => {
        setMainPosts(displayPosts);
    }, [displayPosts])
    
   
    useEffect(() => {
        dispatch(updatePosts(userFriends, keyword));
        
    }, [keyword, userFriends, newPost])


    return (
        <>
        {isDesktopOrLaptop &&
            <div className="grid grid-cols-8 gap-6 mx-4">
                <div className="col-span-2">
                    <Personal username={user?.username} userAvatar={user?.avatar} userHeadline={user?.headline?? ""}/>
                    {/* /<Friends/> */}
                </div>
                <div className="col-span-4">
                    {/* <ShareBox/> */}
                    <SearchBar setKeyword={setKeyword}/>
                    {/* <ShareBox userId={user?.id} userPosts={mainPosts} setUserPosts={setMainPosts} /> */}
                    <ShareBox userId={user?.id} setNewPost={setNewPost} />
                    {/* {(mainPosts.length == 0) && <Posts userId={user?.id} userData={userData} userPosts={displayPosts} keyword={keyword}/>} */}
                    {<Posts userId={user?.id} userData={userData} userPosts={displayPosts} keyword={keyword}/>}
                    {/* {(user?.posts.length !== 0) && <Posts userId={user?.id} userData={userData} userPosts={userPosts} keyword={keyword}/>} */}
                    {/* {(user?.posts.length === 0) && <Posts userId={user?.id} userData={userData} userPosts={randomPosts} keyword={keyword}/>} */}
                </div>
                <div className="col-span-2">
                    <Friends username={user?.username} userFriends={userFriends} setUserFriends={setUserFriends}/>
                </div>
                
                {/* <Friends/>
                <Personal/> */}
            </div>
        }

        {isTabletOrMobile &&
            <div>
                <Personal username={user?.username} userAvatar={user?.avatar} userHeadline={user?.headline?? ""}/>
                <Friends username={user?.username} userFriends={userFriends} setUserFriends={setUserFriends}/>
               
                {/* <ShareBox userId={user?.id} userPosts={mainPosts} setUserPosts={setMainPosts} /> */}
                {/* <ShareBox userId={user?.id} userPosts={mainPosts}/> */}
                {(mainPosts.length > 0) && <Posts userId={user?.id} userData={userData} userPosts={mainPosts} keyword={keyword}/>}
               
            </div>
        }
        </>
    )
    
}

export default Main