import React, {useEffect, useState} from 'react';
import Login from './login/Login'
import Register from './registration/Registration';
import { useDispatch, useSelector } from 'react-redux';
import { AppState, Post, User } from '../store/types';

import axios, { AxiosResponse } from 'axios';

const Auth = () => {
    //const isPostLoaded = useSelector((state: AppState) => state.isPostLoaded)
    const dispatch = useDispatch();

    // Load Dummy Users
    useEffect(() => {
        // if (!loadDummies){
          
    }, [])


    return (
        <div>
            <Login />
        </div>
    )
}

export default Auth