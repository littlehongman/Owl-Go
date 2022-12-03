import React, {useEffect, useState} from 'react';
import Login from './login/Login'
import Register from './registration/Registration';
import { useDispatch, useSelector } from 'react-redux';
import { AppState, Post, User } from '../store/types';

import axios, { AxiosError, AxiosResponse } from 'axios';
import { axiosInstance } from '../App';
import { BASE_URL } from '../util/secrets';

const Auth = () => {
    //const isPostLoaded = useSelector((state: AppState) => state.isPostLoaded)
    const dispatch = useDispatch();

    const test = async() => {
        await axiosInstance.get(`${BASE_URL}/`).then((res) => {
            console.log(res);

        }).catch((err: AxiosError) => {
            
        }); 
    }

    // Load Dummy Users
    useEffect(() => {
        // if (!loadDummies){
        test();
    }, [])


    return (
        <div>
            <Login />
        </div>
    )
}

export default Auth