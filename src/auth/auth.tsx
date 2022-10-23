import React, {useEffect, useState} from 'react';
import Login from './login/Login'
import Register from './registration/Registration';
import { useDispatch, useSelector } from 'react-redux';
import { AppState, Post, User } from '../store/types';

import { getPosts, loadDummyUsers, loadPosts } from '../store/actions';
import axios, { AxiosResponse } from 'axios';

const Auth = () => {
    const loadDummies = useSelector((state: AppState) => state.loadDummies)
    //const isPostLoaded = useSelector((state: AppState) => state.isPostLoaded)
    const dispatch = useDispatch();

    // Load Dummy Users
    useEffect(() => {
        // if (!loadDummies){
            axios.get("https://jsonplaceholder.typicode.com/users").then(res => {
                dispatch(loadDummyUsers(res['data']))

                axios.get("https://jsonplaceholder.typicode.com/posts").then(res => {
                    dispatch(loadPosts(res)); 
                })
            })
    }, [])


    return (
        <div>
            <Login />
        </div>
    )
}

export default Auth