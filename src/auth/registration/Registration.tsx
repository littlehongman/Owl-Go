import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux'
import { useForm} from "react-hook-form";
// import { registerUser } from '../../store/actions';
// import { AppState } from '../../store/types';
import { BASE_URL } from '../../util/secrets';
import toast from 'react-hot-toast';
import axios, { AxiosError, AxiosResponse } from "axios";
import { AppState } from '../../store/types';
import { login } from '../../store/actions';
axios.defaults.withCredentials = true;



const Register = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const username = useSelector((state: AppState) => state.username);
    // const loginState = useSelector((state: AppState) => state.loginState);
    // const newID = useSelector((state: AppState) => state.users.length + 1);
    // const users = useSelector((state: AppState) => state.users);

    // React Hook Form
    const { register, handleSubmit, watch, getValues ,formState: { errors } } = useForm()
    const onSubmit = (data: any) => {
        axios.post(`${BASE_URL}/register`, {
            username: getValues('username'),
            password: getValues('password'),
            name: getValues('displayName'),
            email: getValues('email'),
            phone: getValues('phone'),
            birthday: new Date(getValues('birthday')).getTime(),
            zipCode: getValues('zipcode'),
        }).then((res: AxiosResponse) => {
            axios.post(`${BASE_URL}/login`, {
                username: getValues('username'),
                password: getValues('password')
            }).then((res) => {
                dispatch(login(res.data!.username));
    
            }).catch((err: AxiosError) => {
               console.log(err);
            });
        }).catch((err: AxiosError) => {
            if (err.response!.status === 409) {
                console.log(err);
                toast.error("Username already taken")
            } else {
              // Handle else
            }
        });
    
    }

    useEffect(() => {
        if (username !== null){
            navigate("/main");
        }
            
    }, [username])

    

    // const handleSubmit = (): void => {
    //     // 👇️ navigate to /contacts
    //     // event.preventDefault();
        
    //     navigate('/main');
    // };

    
    const checkAdult = (date: Date): boolean =>{
        const bday: Date = new Date(date);
        const currentDate: Date = new Date(Date.now());
        let isAdult: boolean = false;

        
        if((currentDate.getFullYear() - bday.getFullYear()) > 18){
            isAdult = true;
        }
        else if((currentDate.getFullYear() - bday.getFullYear()) < 18){
            isAdult = false;
        }
        else{ // currentDate.getDate() - birthday.getDate() == 18
            console.log("Here")
            if((currentDate.getMonth() - bday.getMonth() > 0) || (currentDate.getMonth() - bday.getMonth() == 0) && (currentDate.getDate() - bday.getDate() >= 0)){
                isAdult = true;
                console.log(currentDate, bday)
                console.log(currentDate.getDate(), bday.getDate());
            }
            else{
                isAdult = false;
            }
        }
        // console.log(isAdult);
        return isAdult;
    }

    // console.log(watch('username'));
    // console.log(errors);
    
    return (
        <div className="container w-10/12 mx-auto rounded-xl shadow border p-8 m-10 bg-white">
            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full space-y-8">
                    <div>
                        <img className="mx-auto h-12 w-auto" src="http://content.sportslogos.net/logos/33/813/full/1073_rice_owls-alternate-2017.png" alt="Your Company"/>
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Create your account</h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Already an user?
                            <a href="../" className="font-medium text-indigo-600 hover:text-indigo-500"> Login </a>
                        </p>
                    </div>
                    <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
                        <input type="hidden" name="remember" value="true"/>
                        <div className="-space-y-px rounded-md shadow-sm pb-10">
                            <div className="grid grid-cols-2 gap-6">
                                {/* <div> */}
                                <div>
                                    <span className="mt-2 text-center text-sm "> Username </span>
                                    <input id="username" 
                                            type="text" 
                                            {...register("username", { 
                                                required: true,
                                                validate: {
                                                    format : (value) => /^[A-Za-z]/i.test(value),
                                                    //duplicate: (value) => checkExistedUser(value)
                                                } ,
                                                pattern: /^[A-Za-z0-9]{0,}/i
                                            })}
                                            className="relative block w-full appearance-none  rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    />
                                    {errors?.username?.type === "required" && <span className="before::content-['']  text-sm text-red-600">Username required</span>}
                                    {errors.username?.type === "format" && <span className="before::content-['']  text-sm text-red-600">Username cannot start with a number</span>}
                                    {errors.username?.type === "duplicate" && <span className="before::content-['']  text-sm text-red-600">Username existed</span>}
                                    {errors.username?.type === "pattern" && <span className="before::content-['']  text-sm text-red-600">Username can only contain letters and numbers</span>}
                                </div>
                                <div>
                                    <span className="mt-2 text-center text-sm "> Display Name </span>
                                    <input id="display-name" 
                                           type="text" 
                                           {...register("displayName")}
                                           className="relative block w-full appearance-none  rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>                               
                            </div>
                            
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                   
                                    <label className="mt-2 text-center text-sm " htmlFor="email">Email Address</label>
                                    <input id="email"   
                                            type="text"                                                                     
                                            autoComplete="email" 
                                            {...register("email", {
                                                required: true,
                                                pattern: /\S+@\S+\.\S+/
                                            })}
                                            className="relative block w-full appearance-none  rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    />
                                    {errors?.email?.type === "required" && <span className="before::content-['']  text-sm text-red-600">Email required</span>}
                                    {errors?.email?.type === "pattern" && <span className="before::content-['']  text-sm text-red-600">Entered value does not match email format</span>}
                                </div>
                                <div>
                                <label className="mt-2 text-center text-sm" htmlFor="phone">Phone number</label>
                                    <input id="phone" 
                                           type="text"     
                                           autoComplete="phone" 
                                           {...register("phone", {
                                                required: true,
                                                pattern: /^\d{3}-\d{3}-\d{4}$/
                                            })}
                                           className="relative block w-full appearance-none  rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    />
                                    {errors?.phone?.type === "required" && <span className="text-sm text-red-600">Phone number required</span>}
                                    {errors?.phone?.type === "pattern" && <span className="text-sm text-red-600">Entered value does not match phone format</span>}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="mt-2 text-center text-sm" htmlFor="birthday" >Date of Birth</label>
                                    <input id="birthday"
                                    type="date"
                                    {...register("birthday", {
                                        required: true,
                                        validate: (value) => checkAdult(value)
                                    })}
                                    className="relative block w-full appearance-none  rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                />
                                    {errors?.birthday?.type === "required" && <span className="text-sm text-red-600">Date of birth required</span>}
                                    {errors?.birthday?.type === "validate" && <span className="text-sm text-red-600">Only individuals 18 years of age or older are allowed</span>}
                                </div>
                                <div>
                                    <label className="mt-2 text-center text-sm" htmlFor="zipcode" >Zip Code</label>
                                    <input id="zipcode" 
                                           type="text" 
                                           {...register("zipcode", {
                                                required: true,
                                                pattern: /^[0-9]{5}$/
                                            })} 
                                           className="relative block w-full appearance-none  rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    />
                                    {errors?.zipcode?.type === "required" && <span className="text-sm text-red-600">Zip code required</span>}
                                    {errors?.zipcode?.type === "pattern" && <span className="text-sm text-red-600">Expect a 5 digits number</span>}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="mt-2 text-center text-sm" htmlFor="password" >Password</label>                                  
                                    <input id="password" 
                                           type="password" 
                                           {...register("password", {
                                                required: true,
                                                
                                            })} 
                                           className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    />
                                    {errors?.password?.type === "required" && <span className="text-sm text-red-600">Password required</span>}
                                </div>
                                <div>
                                    <label className="mt-2 text-center text-sm" htmlFor="confirm_password" >Confirm Password</label>                                          
                                    <input id="confirm_password" 
                                           type="password" 
                                           {...register("confirm_password", {
                                                required: true,
                                                validate: (value) =>  getValues("password") === value
                                            })} 
                                           className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    />
                                    {errors?.confirm_password?.type === "required" && <span className="text-sm text-red-600">Confirm Password required</span>}
                                    {errors?.confirm_password?.type === "validate" && <span className="text-sm text-red-600">Password and confirm password does not match</span>}
                                </div>
                            </div>
                            
                        </div>

                        {/* <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"/>
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Remember me</label>
                            </div>
                        </div> */}

                        <div className="w-60 mx-auto">
                            <button type="submit" className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                                </svg>
                            </span>
                            Sign up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register