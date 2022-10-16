import React, {useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../store/actions';
import { AppState, LoginPayload} from '../../store/types';
// import Form from '../components/Form'

// interface LoginProps{
//     stateChanger: React.Dispatch<React.SetStateAction<boolean>>
// }


const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const loginState = useSelector((state: AppState) => state.loginState);
    const users = useSelector((state: AppState) => state.users);

    const { register, handleSubmit, watch, getValues, formState: { errors } } = useForm <LoginPayload>()

    const onSubmit = (data: LoginPayload) => {
        for(let i = 0; i < users.length; i++){
            if (users[i].username === getValues('username')){
                if (users[i].password === getValues('password')){
                    dispatch(login(i));
                    return;
                }
                else {
                    toast.error("Wrong Password", {duration: 1000});
                    return;
                }
                
            }
        }
        toast.error("Cannot Find User", {duration: 1000});
    };

    useEffect(() => {
        if (loginState.isLogin){
            toast.success("Login Successfully", {duration: 1000});
            navigate('/main');
        }
            
    }, [loginState])

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
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login 