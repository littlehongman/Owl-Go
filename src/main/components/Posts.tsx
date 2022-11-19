import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
import { useFilePicker } from 'use-file-picker'
import { AppState, Post, User } from '../../store/types'
import { Button } from '@chakra-ui/react'
import { MdBuild , MdCall } from "react-icons/md"
import { BiMessageAltDetail } from "react-icons/bi"
import styled, { keyframes } from "styled-components";
import { slideInDown } from 'react-animations';

import { ListItem, List } from '@chakra-ui/react'
 
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

    const [showComment, setShowComment] = useState<boolean[]>(new Array(mainFeeds?.length).fill(true));

    const showCommentHandler = (idx: number) => {
        const boolArr = [...showComment];
        boolArr[idx] = !boolArr[idx];

        setShowComment(boolArr);
    }

    const comments: any[] = [
        {name: "Jacky", body: "Great news to hear"},
        {name: "Beck", body: "That's brilliant"},
        {name: "Peter", body: "Avengers Assemble"}
    ];


    return (//bg-white shadow-lg rounded-lg mx-4 mt-10 md:mx-auto my-6 max-w-md md:max-w-2xlZ
         <div>
            <div className="place-items-center items-center justify-center">
                {mainFeeds?.map((post, i) => (
                    ((filter(post.author.username)) || filter(post.text)) &&
                    <div className="items-center justify-center mx-auto mb-4 min-w-full" key={i}>
                        <div className="pt-2 pb-4 px-4 items-center justify-center bg-white dark:bg-gray-900 shadow rounded-lg max-w-lg min-w-full border">
                            <div className="flex mt-4 mb-4">
                                <img className="w-12 h-12 rounded-full" src={post.author.avatar}/>
                                <div className="ml-2 mt-0.5">
                                    <span className="block font-medium text-base leading-snug text-black dark:text-gray-100">{post.author.username}</span>
                                    <span className="block text-sm text-gray-500 dark:text-gray-400 font-light leading-snug">{getDisplayTime(post.timestamp)}</span>
                                </div>
                            </div>
                            <p className="text-gray-800 dark:text-gray-100 leading-snug md:leading-normal">{post.text}</p>
                            <img className="mt-2 mb-4" src={post.img}/>
                            <hr className="mb-1"/>
        
                            {/* Comment Section  */}
                            <div className="grid grid-cols-2 gap-4 mx-2 mt-2">
                                <Button onClick={() => showCommentHandler(i) } leftIcon={<BiMessageAltDetail />} colorScheme='facebook' variant='outline'>Comment</Button>
                                <Button leftIcon={<MdBuild />} colorScheme='facebook' variant='outline'>Modify</Button>
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