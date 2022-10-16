import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFilePicker } from 'use-file-picker'
import { AppState, Post, User } from '../../store/types'


interface UserProps {
    userId?: number;
    userData?: string[]
    userPosts?: Post[];
    keyword: string
}

const Posts = ({userId, userData, userPosts, keyword}: UserProps) => {
    //const [posts, setPosts] = useState<Post[]>([...userPosts?? []]) 
    // const username = useSelector((state: AppState) => state.loginState.user?.username)
    // const userAvatar = useSelector((state: AppState) => state.loginState.user?.avatar)

    // const postLength = useSelector((state: AppState) => state.posts.length)

    const getDisplayTime = (timestamp: number): string => {
        let datetime = new Date(timestamp).toString().split(' ');
        let date = datetime.slice(1, 4);
        let time = datetime.slice(4,5)[0].split(':').slice(0, 2);
        
        return date.join(" ") + " at " + time.join(":")
    }

    const [openFileSelector, { filesContent, loading }] = useFilePicker({
        accept: ['.png', '.jpg'],
    });

    const filter = (content: string): boolean => { 
        if(content.toLowerCase().includes(keyword.toLowerCase().trim()))
            return true;
        
        return false
    }


    return (//bg-white shadow-lg rounded-lg mx-4 mt-10 md:mx-auto my-6 max-w-md md:max-w-2xlZ
         <div>
            {/* <div className='mt-6'>
                <form>   
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
                    <div className="relative">
                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                        <input type="text" onChange={(e) => setKeyword(e.target.value)} id="default-search" className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search User, Post..." required/>
                        <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                    </div>
                </form>
            </div> */}
            {/* <div className="container mx-auto rounded-xl shadow border m-4 bg-white">
                
                <label htmlFor="chat" className="sr-only">Your message</label>
                <div className="flex items-center py-2 px-3 bg-gray-50 rounded-lg dark:bg-gray-700">
                    <button type="button" onClick={() => openFileSelector()}  className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                        <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"></path></svg>
                        <span className="sr-only">Upload image</span>
                    </button>

                    <textarea id="chat" rows={1} ref={inputRef} className="block mx-4  w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="What you have in mind..."></textarea>
                    
                    <button type="submit" onClick={() => handleClick()} className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
                        <svg aria-hidden="true" className="w-6 h-6 rotate-90" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
                        <span className="sr-only">Send message</span>
                    </button>
                </div>
            </div> */}
            <div className="grid h-screen place-items-center">
                {userPosts?.map((post, i) => (
                    ((filter(userData? userData[post.userId - 1]:"")) || filter(post.body)) &&
                    <div className="items-center justify-center mb-4" key={i}>
                        <div className="px-5 py-4 bg-white dark:bg-gray-800 shadow rounded-lg max-w-lg">
                            <div className="flex mb-4">
                                <img className="w-12 h-12 rounded-full" src={"https://api.lorem.space/image/face?w=150&h=150&hash=" + post.userId}/>
                                <div className="ml-2 mt-0.5">
                                    <span className="block font-medium text-base leading-snug text-black dark:text-gray-100">{userData? userData[post.userId - 1]:""}</span>
                                    <span className="block text-sm text-gray-500 dark:text-gray-400 font-light leading-snug">{getDisplayTime(post.timestamp)}</span>
                                </div>
                            </div>
                            <p className="text-gray-800 dark:text-gray-100 leading-snug md:leading-normal">{post.body}</p>
                            <img className="mt-2 mb-4" src={post.img}/>
                            <hr className="mb-1"/>
                            
                                {/* <div className="flex ">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                    </svg>
                                    <span className="ml-1 text-gray-500 dark:text-gray-400  font-light">8</span>
                                </div>  
                                <div className="ml-1 text-gray-500 dark:text-gray-400 font-light">33 comments</div> */}
                                {/* <div className="flex items-center justify-center"> */}
                            <div className=" w-full inline-flex shadow-md hover:shadow-lg focus:shadow-lg" role="group">
                                
                                
                                <button type="submit" className="group relative flex w-full justify-center w-full rounded-l  px-6 py-2.5 bg-gray-600 text-white font-medium text-xs leading-tight uppercase hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                                        </svg>
                                    </span>
                                    Comment
                                </button>
                                
                                {/* <button type="button" className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out">Middle</button> */}
                            
                                <button type="submit" className="group relative flex w-full justify-center w-full rounded-r  px-6 py-2.5 bg-gray-600 text-white font-medium text-xs leading-tight uppercase hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                        </svg>
                                    </span>
                                    Modify
                                </button>
                            </div>                        
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}





export default Posts