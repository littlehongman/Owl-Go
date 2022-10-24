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
    const posts = useSelector((state: AppState) => state.posts)
    const [userPosts, setUserPosts] = useState<Post[]>([...user?.posts?? []])
    // const [randomPosts, setRandomPosts] = useState<Post[]>([...posts].sort(() => 0.5 - Math.random()).slice(0, 10).sort((a, b) => b.timestamp - a.timestamp))
    const [friendPosts, setFriendPosts] = useState<Post[]>([...posts].filter((post) => userFriends.includes(post.userId)).sort((a, b) => b.timestamp - a.timestamp))
    
    const displayPosts = useSelector((state: AppState) => state.displayPosts)

    // Search Bar
    const [keyword, setKeyword] = useState<string>("")

    // Responsive
    const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 864px)'})
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 864px)' })

    useEffect(() => {
        // console.log(user?.posts.length);
        // console.log(user?.posts)
        if (user === null){
            navigate("../")
        }    
    }, [])

    useEffect(() => {
        //console.log(userFriends);
        dispatch(updatePosts(userFriends, ""))
        //setFriendPosts([...posts].filter((post) => userFriends.includes(post.userId)).sort((a, b) => b.timestamp - a.timestamp))
    }, [userFriends])

    useEffect(() => {
        //console.log(userFriends);
        dispatch(updatePosts(userFriends, keyword))
        //setFriendPosts([...posts].filter((post) => userFriends.includes(post.userId)).sort((a, b) => b.timestamp - a.timestamp))
    }, [keyword])


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
                    <ShareBox userId={user?.id} userPosts={userPosts} setUserPosts={setUserPosts} />
                    {(displayPosts.length >= 0) && <Posts userId={user?.id} userData={userData} userPosts={displayPosts} keyword={keyword}/>}
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
                {/* <SearchBar setKeyword={setKeyword}/> */}
                <ShareBox userId={user?.id} userPosts={userPosts} setUserPosts={setUserPosts} />
                {(user?.posts.length !== 0) && <Posts userId={user?.id} userData={userData} userPosts={userPosts} keyword={keyword}/>}
                {/* {(user?.posts.length === 0) && <Posts userId={user?.id} userData={userData} userPosts={randomPosts} keyword={keyword}/>} */}
            </div>
        }
        </>
    )
    
}

export default Main