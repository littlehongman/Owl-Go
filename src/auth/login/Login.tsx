import axios, { AxiosError, AxiosResponse } from 'axios';
import React, {useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../store/actions';
import { AppState, LoginPayload} from '../../store/types';
import { BASE_URL } from '../../util/secrets';

import { Button } from '@chakra-ui/react';
import { GrGoogle } from "react-icons/gr"
// import Form from '../components/Form'

// interface LoginProps{
//     stateChanger: React.Dispatch<React.SetStateAction<boolean>>
// }


const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //const loginState = useSelector((state: AppState) => state.loginState);
    const username = useSelector((state: AppState) => state.username);

    const { register, handleSubmit, watch, getValues, formState: { errors } } = useForm <LoginPayload>()

    const onSubmit = (data: LoginPayload) => {
        axios.post(`${BASE_URL}/login`, {
            username: getValues('username'),
            password: getValues('password')
        }).then((res) => {
            dispatch(login(res.data!.username));

        }).catch((err: AxiosError) => {
            if (err.response!.status === 404) {
                toast.error("Username not existed");
            } 
            else if (err.response!.status === 403) {
                toast.error("Wrong password");
            }
        });
    };

    const loginGoogle = () => {
        // window.location.href=`${BASE_URL}/google/login`;
        window.open(`${BASE_URL}/auth/google?state=login`, "_self");
    }

    useEffect(() => {
        if (username !== null){
            navigate("/main");
        }
            
    }, [username])

    return (
        <div className="container w-9/12 mx-auto rounded-xl shadow border p-8 m-10 bg-white">
            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <div>
                        <img className="mx-auto h-12 w-auto" src="http://content.sportslogos.net/logos/33/813/full/1073_rice_owls-alternate-2017.png" alt="Your Company"/>
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in</h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Not yet an user?
                            <a href="register" className="font-medium text-indigo-600 hover:text-indigo-500"> Sign up </a>
                        </p>
                    </div>
                    <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
                        <input type="hidden" name="remember" value="true"/>
                        <div className="-space-y-px rounded-md shadow-sm pb-10">
                            <div>
                                <span className="mt-2 text-center text-sm "> Username </span>
                                {/* <label htmlFor="email-address" className="sr-only">Email address</label> */}
                                <input id="username" 
                                       type="text" 
                                       {...register("username", { 
                                            required: true,
                                            validate: (value) => /^[A-Za-z]/i.test(value) ,
                                            pattern: /^[A-Za-z0-9]{0,}/i
                                        })}
                                       className="relative block w-full appearance-none  rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                />
                                {errors?.username?.type === "required" && <span className="text-sm text-red-600">Username required</span>}
                                {errors.username?.type === "validate" && <span className="text-sm text-red-600">Username cannot start with a number</span>}
                                {errors.username?.type === "pattern" && <span className="text-sm text-red-600">Username can only contain letters and numbers</span>}
                            </div>
                            <div>
                                <span className="mt-2 text-center text-sm "> Password </span>
                                {/* <label htmlFor="password" className="sr-only">Password</label> */}
                                <input id="password"
                                       type="password" 
                                       {...register("password", {
                                            required: true,                                      
                                        })} 
                                       className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                />
                                {errors?.password?.type === "required" && <span className="text-sm text-red-600">Password required</span>}
                            </div>
                        </div>

                        {/* <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"/>
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Remember me</label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Forgot your password?</a>
                            </div>
                        </div> */}

                        <div>
                            <button type="submit" className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                                </svg>
                            </span>
                            Sign in
                            </button>
                            <div className="inline-flex justify-center items-center w-full">
                                <hr className="my-8 w-full h-px bg-gray-200 border-0 dark:bg-gray-700"/>
                                <span className="absolute left-1/2 px-3 font-medium text-gray-900 bg-white -translate-x-1/2 dark:text-white dark:bg-gray-900">Or continue with</span>
                            </div>
                            <div className="grid grid-cols-1 gap-6 mx-20">
                                {/* <button type="button" className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90  focus:outline-none focus:bg-sky-400 font-medium rounded-lg text-sm pl-12 pr-4 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2">
                                    <svg className="mr-2 ml-2 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
                                    Sign in with Google
                                </button> */}
                                <Button 
                                    onClick={()=>  loginGoogle()}
                                    leftIcon={<GrGoogle />} 
                                    bg='#4285F4' 
                                    color='white' 
                                    variant='solid' 
                                    _hover={{ bg: '#5390f5' }} 
                                    _active={{
                                        bg: '##72a2f2',
                                        transform: 'scale(0.98)'
                                    }}>
                                    Google
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login 