import React, {useEffect, useState} from 'react';
import Login from './login/Login'
import Register from './registration/Registration';
import { useDispatch, useSelector } from 'react-redux';
import { AppState, Post, User } from '../store/types';

import { getPosts, loadDummyUsers, loadPosts } from '../store/actions';
import axios from 'axios';

const Auth = () => {
    const loadDummies = useSelector((state: AppState) => state.loadDummies)
    //const isPostLoaded = useSelector((state: AppState) => state.isPostLoaded)
    const dispatch = useDispatch();

    const getRandomTime = (): number => {
        return new Date(new Date('2020/1/1').getTime() + Math.random() * (Date.now() - new Date('2020/1/1').getTime())).getTime()
    }

    // Load Dummy Users
    useEffect(() => {
        if (!loadDummies){
            axios.get("https://jsonplaceholder.typicode.com/users").then(res => {
                dispatch(loadDummyUsers(res['data']))

                axios.get("https://jsonplaceholder.typicode.com/posts").then(res => {
                    let posts: Post[] = []

                    res.data.forEach((item:any, idx:any) => {
                        let post: Post = {
                            userId: item['userId'],
                            id: item['id'],
                            title: item['title'],
                            body: item['body'],
                            img: "https://source.unsplash.com/random/640x360?sig=" + idx,
                            timestamp: getRandomTime()
                        } 

                        posts.push(post);
                        
                    });
            
                    dispatch(loadPosts(posts)); 
                })
            })

        
        }
        
       
    }, [])


    return (
        <div>
            <Login />
        </div>
    )
}

export default Auth