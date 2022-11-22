import axios, { AxiosError } from 'axios'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
// import { useDispatch, useSelector } from 'react-redux'
import { useFilePicker } from 'use-file-picker'
import { AppState, Post, User } from '../../store/types'
import { Button, IconButton, ButtonGroup } from '@chakra-ui/react'
import { MdBuild , MdCall } from "react-icons/md"
import { BiMessageAltDetail } from "react-icons/bi"
import { HiDotsHorizontal } from "react-icons/hi"
import styled, { keyframes } from "styled-components";
import { slideInDown } from 'react-animations';

import { ListItem, List } from '@chakra-ui/react'
import { avatar } from '@material-tailwind/react'
import { EllipsisHorizontalIcon, ChevronDownIcon, PencilSquareIcon } from '@heroicons/react/24/solid'
import { BASE_URL } from '../../util/secrets'
import toast from 'react-hot-toast'
 
const slideAnimation = keyframes`${slideInDown}`;
 
const SlideDiv = styled.div`
  animation: 1s ${slideAnimation};
`;


// const bounceAnimation = keyframes`${bounce}`;

// const BouncyDiv = styled.div`
//   animation: 1s ${bounceAnimation};
// `;


interface UserProps {
    username?: string;
    mainFeeds?: Post[];
    keyword: string
}

const Posts = ({username, mainFeeds, keyword}: UserProps) => {
 
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

    const [showComment, setShowComment] = useState<boolean[]>(new Array(10).fill(true));
    const [showEditPost, setShowEditPost] = useState<boolean[]>(new Array(10).fill(false));
    const [newText, setNewText] = useState<string>("")
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

    const updatePost = async(idx: number, pid: number) => {

        await axios.put(`${BASE_URL}/articles/${pid}`,{
            text: newText
        }).then((res) => { // NOTE: THIS IS MUTATION HERE!!!!
            const newCurrFeeds = [...currentFeeds!];
            newCurrFeeds[idx].text = newText;
            
            console.log(mainFeeds);
            //setCurrentFeeds(newCurrFeeds);

        }).catch((err: AxiosError) => {
            if (err.response!.status === 401) {
                return;
            }
        });

        showEditPostHandler(idx);
        toast.success("Post Updated", {duration: 1000});
    }


    const comments: any[] = [
        {name: "Jacky", body: "Great news to hear"},
        {name: "Beck", body: "That's brilliant"},
        {name: "Peter", body: "Avengers Assemble"}
    ];


    useEffect(() => {
        setCurrentFeeds(mainFeeds!);
    }, [mainFeeds])
   


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
                             
                                <hr/>
                                <List spacing={3} className="mt-4">
                                    {post.comments.map((comment, i) => (
                                        <ListItem key={i}>
                                        <div className="flex space-x-1">
                                                <div className="flex-shrink-0">
                                                    <img className="w-8 h-8 rounded-full" src={comment.author.avatar} alt="Neil image"/>
                                                </div>
                                                <div className="bg-gray-100 p-2 w-full rounded-lg ">
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-bold text-gray-900 truncate dark:text-white">
                                                            {comment.author.username}
                                                        </p>
                                                    </div>
                                                    <div className="flex-1 min-w-0 mt-2">
                                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                            {comment.text}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </ListItem>
                                    ))}
                                    
                                    {/* <ListItem>Consectetur adipiscing elit</ListItem>
                                    <ListItem>Integer molestie lorem at massa</ListItem>
                                    <ListItem>Facilisis in pretium nisl aliquet</ListItem> */}
                                </List>
                            </div>
                        </div>
                        
                        {/* <SlideDiv hidden={showComment}> */}
                            {/* <Button hidden={showComment} leftIcon={<BiMessageAltDetail />} colorScheme='facebook' variant='outline'>Comment</Button> */}
                                
                        {/* </SlideDiv> */}
                    </div>
                ))}
            </div>
        </div>
    )
}





export default Posts