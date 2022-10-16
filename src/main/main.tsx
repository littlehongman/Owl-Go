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

const Main = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //const isPostLoaded = useSelector((state: AppState) => state.isPostLoaded)
    const user = useSelector((state: AppState) => {
        if(state.loginState.isLogin) {
            return state.users[state.loginState.userId]
        }
        return null;
    });
    const posts = useSelector((state: AppState) => state.posts)
    const userData = useSelector((state: AppState) => state.users.map((user) => user.username))

    const [userPosts, setUserPosts] = useState<Post[]>([...user?.posts?? []])
    const [randomPosts, setRandomPosts] = useState<Post[]>([...posts].sort(() => 0.5 - Math.random()).slice(0, 10).sort((a, b) => b.timestamp - a.timestamp))
    const [keyword, setKeyword] = useState<string>("")

    // Responsive
    const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 864px)'})
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 864px)' })

        // Load Dummy Users
    useEffect(() => {
        // console.log(user?.posts.length);
        // console.log(user?.posts)
        if (user === null){
            navigate("../")
        }    
    }, [])

    return (
        <>
        {isDesktopOrLaptop &&
            <div className="grid grid-cols-8 gap-6 mx-4">
                <div className="col-span-2">
                    <Personal username={user?.username} userAvatar={user?.avatar}/>
                    {/* /<Friends/> */}
                </div>
                <div className="col-span-4">
                    {/* <ShareBox/> */}
                    <SearchBar setKeyword={setKeyword}/>
                    <ShareBox userId={user?.id} userPosts={userPosts} setUserPosts={setUserPosts} />
                    {(user?.posts.length !== 0) && <Posts userId={user?.id} userData={userData} userPosts={userPosts} keyword={keyword}/>}
                    {(user?.posts.length === 0) && <Posts userId={user?.id} userData={userData} userPosts={randomPosts} keyword={keyword}/>}
                </div>
                <div className="col-span-2">
                    <Friends userFriends={user?.friends}/>
                </div>
                
                {/* <Friends/>
                <Personal/> */}
            </div>
        }

        {isTabletOrMobile &&
            <div>
                <Personal username={user?.username} userAvatar={user?.avatar}/>
                <Friends userFriends={user?.friends}/>
                <SearchBar setKeyword={setKeyword}/>
                <ShareBox userId={user?.id} userPosts={userPosts} setUserPosts={setUserPosts} />
                {(user?.posts.length !== 0) && <Posts userId={user?.id} userData={userData} userPosts={userPosts} keyword={keyword}/>}
                {(user?.posts.length === 0) && <Posts userId={user?.id} userData={userData} userPosts={randomPosts} keyword={keyword}/>}
            </div>
        }
        </>
    )
    
}

export default Main