import axios, { AxiosError } from 'axios'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { AppState, Post, User } from '../../store/types'
import { Button, IconButton, ButtonGroup } from '@chakra-ui/react'
import { HiPencil } from "react-icons/hi"
import { BiMessageAltDetail } from "react-icons/bi"


import { ListItem, List } from '@chakra-ui/react'
import { EllipsisHorizontalIcon, ChevronDownIcon, PencilSquareIcon } from '@heroicons/react/24/solid'
import { BASE_URL } from '../../util/secrets'
import toast from 'react-hot-toast'
import { axiosInstance } from '../../App'



interface UserProps {
    username?: string;
    userAvatar?: string
    mainFeeds?: Post[];
    keyword: string
}

const Posts = ({username, userAvatar, mainFeeds, keyword}: UserProps) => {
 
    const getDisplayTime = (timestamp: string): string => {
        let datetime = new Date(timestamp).toString().split(' ');
        let date = datetime.slice(1, 4);
        let time = datetime.slice(4,5)[0].split(':').slice(0, 2);
        
        return date.join(" ") + " at " + time.join(":")
    }


    const filter = (content: string): boolean => { 
        if(content.toLowerCase().includes(keyword.toLowerCase().trim()))
            return true;
        
        return false
    }

    const createBoolArray = (): boolean[][] => {
        if (mainFeeds){
            let boolArr = new Array(mainFeeds.length);

            for (let i = 0; i < mainFeeds.length; i++){
                boolArr[i] = new Array(mainFeeds![i].comments.length).fill(false);
            }

            //console.log(boolArr);
            return boolArr;
        }

        return []
        
    }

    const [showComment, setShowComment] = useState<boolean[]>(new Array(10).fill(true));
    const [showEditPost, setShowEditPost] = useState<boolean[]>(new Array(10).fill(false));
    const [showCommentEdit, setShowCommentEdit] = useState<boolean[][]>(createBoolArray());


    const [newText, setNewText] = useState<string>("");
    const [newComment, setNewComment] = useState<string>("");
    const [editComment, setEditComment] = useState<string>("");
    const [currentFeeds, setCurrentFeeds] = useState<Post[]>(mainFeeds!);

    const showCommentHandler = (idx: number) => {
        const boolArr = [...showComment];
        boolArr[idx] = !boolArr[idx];

        setShowComment(boolArr);
    }

    const showEditPostHandler = (idx: number) => {
        const boolArr = [...showEditPost];
        boolArr[idx] = !boolArr[idx];

        setShowEditPost(boolArr);
    }

    const showCommentEditHandler = (postIdx: number, commentIdx: number) => {
        const boolArr = [...showCommentEdit];

        boolArr[postIdx][commentIdx] = !boolArr[postIdx][commentIdx];

        setShowCommentEdit(boolArr);
        setEditComment("");
    }

    const updatePost = async(idx: number, pid: number) => {

        await axiosInstance.put(`${BASE_URL}/articles/${pid}`,{
            text: newText
        }).then((res) => { // NOTE: THIS IS MUTATION HERE!!!!
            const newCurrFeeds = [...currentFeeds!];
            newCurrFeeds[idx].text = newText;
            
            console.log(mainFeeds);
            setCurrentFeeds(newCurrFeeds); 
            
            showEditPostHandler(idx);
            toast.success("Post Updated", {duration: 1000});

        }).catch((err: AxiosError) => {
            if (err.response!.status === 401) {
                return;
            }
        });
       
    }

    const createComment = async(idx: number, pid: number) => {
        if (newComment.trim() === ""){
            toast.error("Content Required", {duration: 1000});
            return;
        }

        await axiosInstance.put(`${BASE_URL}/articles/${pid}`,{
            text: newComment,
            commentId: "-1",
            avatar: userAvatar
        }).then((res) => { // NOTE: THIS IS MUTATION HERE!!!!
            // const newCurrFeeds = [...currentFeeds!];
            const comment: any = {
                cid: currentFeeds[idx].comments.length,
                author: {
                    username: username,
                    avatar: userAvatar
                },
                text: newComment,
                timestamp: Date.now()
            }

            currentFeeds[idx].comments = [...currentFeeds[idx].comments, comment];
          
            toast.success("New Comment", {duration: 1000});

            showCommentHandler(idx);
            

        }).catch((err: AxiosError) => {
            if (err.response!.status === 401) {
                return;
            }
        });


    }

    const updateComment = async(postIdx: number, pid: number, cid: number) => {
        if (editComment.trim() === ""){
            toast.error("Content Required", {duration: 1000});
        }

        await axiosInstance.put(`${BASE_URL}/articles/${pid}`,{
            text: editComment,
            commentId: cid,
            avatar: userAvatar
        }).then((res) => { // NOTE: THIS IS MUTATION HERE!!!!
            // const newCurrFeeds = [...currentFeeds!];
           
            currentFeeds[postIdx] = res.data.article;
            toast.success("Update Comment", {duration: 1000});

            showCommentHandler(postIdx);
            showCommentEditHandler(postIdx, cid);

        }).catch((err: AxiosError) => {
            if (err.response!.status === 401) {
                return;
            }
        });
    }


    useEffect(() => {
        setCurrentFeeds(mainFeeds!);
        //setShowCommentEdit(createBoolArray());
        //console.log(mainFeeds);
    }, [mainFeeds])

    if(showCommentEdit.length === 0){
        return <div>Loading...</div>
    }
   


    return (//bg-white shadow-lg rounded-lg mx-4 mt-10 md:mx-auto my-6 max-w-md md:max-w-2xlZ
         <div>
            <div className="place-items-center items-center justify-center">
                {currentFeeds?.map((post, i) => (
                    ((filter(post.author.username)) || filter(post.text)) &&
                    <div className="items-center justify-center mx-auto mb-4 min-w-full" key={i}>
                        <div className="pt-2 pb-4 px-4 items-center justify-center bg-white dark:bg-gray-900 shadow rounded-lg max-w-lg min-w-full border">
                            <div className="flex mt-4 mb-4">

                                <div className="flex flex-1 w-100">
                                    <img className="w-12 h-12 rounded-full" src={post.author.avatar}/>
                                    <div className="ml-2 mt-0.5">
                                        <span className="block font-medium text-base leading-snug text-black dark:text-gray-100">{post.author.username}</span>
                                        <span className="block text-sm text-gray-500 dark:text-gray-400 font-light leading-snug">{getDisplayTime(post.timestamp)}</span>
                                    </div>
                                </div>
                                <div className="">
                                    {/* <IconButton className="" aria-label='Tools' fontSize='20px' icon={<HiDotsHorizontal />}>                           
                                    </IconButton> */}
                                    { (post.author.username == username) &&
                                    <Menu as="div" className="relative ml-3">
                                        <div className="flex">
                                            <h6 className="pt-1 pr-2 font-bold text-white">{username}</h6>
                                            <Menu.Button className="inline-flex w-full justify-center rounded-md bg-slate-300 bg-opacity-30 pr-4 px-1 text-xs font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                            {/* <span className="sr-only">Open user menu</span> */}
                                                {/* <HiDotsHorizontal  />   */}
                                                {/* <IconButton className="" aria-label='Tools' fontSize='20px' icon={<HiDotsHorizontal />}>                           
                                                </IconButton> */}
                                                {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                                </svg> */}
                                                <EllipsisHorizontalIcon
                                                    className="ml-2 -mr-1 h-10 w-8 text-slate-700 hover:text-slate-400"
                                                    aria-hidden="true"
                                                />

                                            </Menu.Button>
                                        </div>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                <Menu.Item key={i}>
                                                {({ active }) => (
                                                    <button
                                                        onClick = {() => showEditPostHandler(i)}
                                                        className={`${
                                                            active ? 'bg-slate-300 text-black' : 'text-gray-900'
                                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                    >
                                                    {active ? (
                                                        <PencilSquareIcon
                                                        className="mr-2 h-5 w-5"
                                                        aria-hidden="true"
                                                        />
                                                    ) : (
                                                        <PencilSquareIcon
                                                        className="mr-2 h-5 w-5"
                                                        aria-hidden="true"
                                                        />
                                                    )}
                                                    Edit
                                                    </button>
                                                )}
                                                </Menu.Item>                                               
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                    }
                                </div>
                                
                            </div>

                            {showEditPost[i] &&
                                <div className=''>
                                    <textarea id="chat" defaultValue={post.text} rows={2} onChange={(e) => setNewText(e.target.value)} className="flex block mx-auto text-base p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=""></textarea>
                                    <ButtonGroup variant='outline' spacing='6' className="my-2 float-right">
                                        <Button colorScheme='blue' onClick={() => updatePost(i, post.pid)}>Save</Button>
                                        <Button onClick={() => showEditPostHandler(i)}>Cancel</Button>
                                    </ButtonGroup>
                                    {(post.img === "") &&
                                        <div className="mb-12">
                                        </div>  
                                    }
                                </div>

                                
                            }
                            {!showEditPost[i] &&
                                <p className="text-gray-800 text-lg dark:text-gray-100 leading-snug md:leading-normal mx-2">{post.text}</p>
                            }
                            
                            <img className="mt-2 mb-4" src={post.img}/>
                            
                            
                            <hr className="mb-1"/>
        
                            {/* Comment Section  */}
                            <div className="grid grid-cols-3 gap-4 mx-2 mt-2">
                                <div></div>
                                <div></div>
                                <Button onClick={() => showCommentHandler(i) } leftIcon={<BiMessageAltDetail />} colorScheme='facebook' variant='outline'>Comment</Button>
                                {/* <Button leftIcon={<MdBuild />} colorScheme='facebook' variant='outline'>Modify</Button> */}
                            </div>
                            <div hidden={showComment[i]} className="mt-4">
                                {/* <hr/> */}
                                <div className='flex'>
                                    <img className="w-12 h-12 rounded-full mr-2 mt-2" src={userAvatar}/>
                                    <input 
                                        id="chat" 
                                        placeholder="New comment..." 
                                        type="text"
                                        // rows={1} 
                                        onChange={(e) => setNewComment(e.target.value)} 
                                        className="flex block mx-auto text-base mt-2 p-2.5 w-full text-sm text-gray-900 bg-white rounded-xl border border-gray-300 focus:ring-teal-300 focus:border-teal-200 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-sky-300">
                                    </input>
                                    <Button className="ml-4 mt-4 rounded-lg" type="submit" onClick={() => createComment(i, post.pid)} colorScheme='teal' size='sm'>
                                        Add
                                    </Button>
                                </div>
                                <List spacing={3} className="mt-4">
                                    {post.comments.map((comment, c_i) => (
                                        <ListItem key={c_i}>
                                        <div className="flex space-x-1">
                                                <div className="flex-shrink-0">
                                                    <img className="w-8 h-8 rounded-full" src={comment.author.avatar} alt="Neil image"/>
                                                </div>
                                                <div className="bg-gray-100 p-2 w-full rounded-lg flex">
                                                    <div className="flex-1">
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm font-bold text-gray-900 truncate dark:text-white">
                                                                {comment.author.username}
                                                            </p>
                                                        </div>
                                                        <div className="flex-1 min-w-0 mt-2">
                                                            { !showCommentEdit[i][c_i] &&
                                                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                                    {comment.text}
                                                                </p>

                                                            }                                        
                                                            { showCommentEdit[i][c_i] &&
                                                                <div className='flex'>
                                                                    <input 
                                                                        id="chat" 
                                                                        placeholder="New comment..." 
                                                                        type="text"
                                                                        // rows={1} 
                                                                        defaultValue={comment.text}
                                                                        onChange={(e) => setEditComment(e.target.value)} 
                                                                        className="flex block mx-auto text-base mt-2 p-2.5 w-full text-sm text-gray-900 bg-white rounded-xl border border-gray-300 focus:ring-teal-300 focus:border-teal-200 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-sky-300">
                                                                    </input>  
                                                                    <ButtonGroup variant='outline' spacing='2' className="mt-4 ml-4 float-right">
                                                                        <Button colorScheme='blue' className="" size='sm' onClick={() => updateComment(i, post.pid, comment.cid)}>Save</Button> 
                                                                        <Button colorScheme='black' className="" size='sm' onClick={() => showCommentEditHandler(i, c_i)}>Cancel</Button> 
                                                                    </ButtonGroup>
                                                                    
                                                                </div> 
                                                            }
                                                        </div>
                                                    </div>
                                                    { (comment.author.username === username) &&
                                                        <IconButton
                                                            variant='ghost'
                                                            colorScheme='teal'
                                                            className='flex-2'
                                                            aria-label='Send email'
                                                            icon={<HiPencil />}
                                                            onClick={() => showCommentEditHandler(i, c_i)}
                                                        />
                                                    }
                                                </div>
                                               
                                            </div>
                                        </ListItem>
                                    ))}
                                                     
                                </List>
                            </div>
                        </div>
                        
                    </div>
                ))}
            </div>
        </div>
    )
}





export default Posts