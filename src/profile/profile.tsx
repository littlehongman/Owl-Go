import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm} from "react-hook-form";
import { AppState, User } from '../store/types';

import { useFilePicker } from 'use-file-picker';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axios, { AxiosError } from 'axios';
import { ActionTypes, relogin } from '../store/actions';
import { BASE_URL } from '../util/secrets';
import { Button } from '@chakra-ui/button';
import { GrUpdate } from 'react-icons/gr';

const Profile = () => {
    
    const navigate = useNavigate();
    const [user, setUser] = useState<User>();

    const [openFileSelector, { plainFiles }] = useFilePicker({
        accept: ['.png', '.jpg'],
    });

    const { register, handleSubmit, watch, getValues ,formState: { errors } } = useForm()
    // const onSubmit: SubmitHandler<any> = data => console.log(data);
    const onSubmit = (data: any) => {
        console.log(data, user);
        if (data.email !== user?.email){
            axios.put(`${BASE_URL}/email`, {
                email: data.email
            }).then().catch((err: AxiosError) => {
                if (err.response!.status === 401) {
                    return;
                }
                else{
                    console.log(err);
                }
            });
        }

        if (data.phone !== user?.phone){
            axios.put(`${BASE_URL}/phone`, {
                email: data.phone
            }).then().catch((err: AxiosError) => {
                if (err.response!.status === 401) {
                    return;
                }
                else{
                    console.log(err);
                }
            });
        }

        if (data.zipCode !== user?.zipCode){
            axios.put(`${BASE_URL}/zipcode`, {
                zipcode: data.zipCode
            }).then().catch((err: AxiosError) => {
                if (err.response!.status === 401) {
                    return;
                }
                else{
                    console.log(err);
                }
            });
        }

        if (plainFiles.length > 0) {
            const formData = new FormData();
            formData.append("image", plainFiles[0]);


            axios.put(`${BASE_URL}/avatar`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then().catch((err: AxiosError) => {
                if (err.response!.status === 401) {
                    return;
                }
                else{
                    console.log(err);
                }
            });
        }
        
        toast.success("Profile Updated", {duration: 1000});
    };

    const getProfile = async() => {
        axios.get(`${BASE_URL}/profile`).then((res) => {
            setUser(res.data.profile);

        }).catch((err: AxiosError) => {
            if (err.response!.status === 401) {
                toast.error("Session Expired", {duration: 1000});
                dispatch(relogin());
                navigate("/");
            }
        });
    } 

    useEffect(() => {
        getProfile();
    }, [])
    
    // Upload file
    

    return (
        <>
        <div className="flex space-x-2 mt-4 mx-4">
            <button
                type="button"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                onClick={() => navigate('../main')}
                className="inline-block px-6 py-2.5 bg-indigo-50 text-back font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-indigo-200 hover:shadow-lg focus:bg-indigo-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >Back to main page</button>
        </div>
        
        {(user) && 
        <div className="container w-10/12 mx-auto rounded-xl shadow border p-8 mb-8 mt-4 mx-auto bg-white">
            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full space-y-8">
                    {/* <div>
                        <img className="mx-auto h-12 w-auto" src="http://content.sportslogos.net/logos/33/813/full/1073_rice_owls-alternate-2017.png" alt="Your Company"/>
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Create your account</h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Already an user?
                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500"> Login </a>
                        </p>
                    </div> */}

                    
                        
                    
                    { plainFiles.length == 0 &&
                    <div className="flex flex-wrap justify-center " >
                        <img
                        src={user?.avatar}
                        className="rounded-xl w-[150px] h-[150px] bg-white border max-w-sm"
                        alt="..."
                        />
                    
                    </div>}
                
                    { plainFiles.length > 0 &&
                    <div className="flex flex-wrap justify-center " >
                        <img
                        src={URL.createObjectURL(plainFiles[0])}
                        className="object-scale-down rounded-xl w-[150px] h-[150px] bg-white border max-w-sm"
                        alt="..."
                        />
                    
                    </div> }
                    <div></div>
                    
                       
                    <div className="flex space-x-2 justify-center">
                            
                            <Button className="relative" colorScheme='teal' variant='solid'>Change Photo</Button>
                            
                            {/* <button
                                type="button"
                                data-mdb-ripple="true"
                                data-mdb-ripple-color="light"
                                className="inline-block px-6 py-2.5 bg-teal-400 text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-teal-200 hover:shadow-lg focus:bg-teal-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-teal-700 active:shadow-lg transition duration-150 ease-in-out"
                                onClick={() => openFileSelector()}
                            >Change Photo
                            </button> */}
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        {/* <input type="number" 
                               hidden
                               value={user?.username}
                               readOnly
                        /> */}
                        <div className="-space-y-px rounded-md shadow-sm pb-10">
                            <div className="grid grid-cols-2 gap-6">
                                {/* <div> */}
                                <div>
                                    <span className="mt-2 text-center text-sm "> Username </span>
                                    <input id="username" 
                                            type="text" 
                                            {...register("username", { 
                                                
                                                validate: (value) => /^[A-Za-z]/i.test(value) ,
                                                pattern: /^[A-Za-z0-9]{0,}/i
                                            })}
                                            // defaultValue={user?.username}
                                            value={user?.username}
                                            disabled
                                            className="bg-slate-300 relative block w-full appearance-none  rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    />
                                    {/* {errors?.username?.type === "required" && <span className="before::content-['']  text-sm text-red-600">Username required</span>}
                                    {errors.username?.type === "validate" && <span className="before::content-['']  text-sm text-red-600">Username cannot start with a number</span>}
                                    {errors.username?.type === "pattern" && <span className="before::content-['']  text-sm text-red-600">Username can only contain letters and numbers</span>} */}
                                </div>
                                <div>
                                    <span className="mt-2 text-center text-sm "> Display Name </span>
                                    <input id="display-name" 
                                           type="text" 
                                           {...register("name")}
                                           defaultValue={user?.name}
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
                                            defaultValue={user?.email? user.email: ""}
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
                                           defaultValue={user?.phone? user.phone: ""}
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
                                            // required: true,
                                            // validate: (value) => checkAdult(value)
                                        })}
                                        value={user?.birthday}
                                        // disabled
                                        disabled // cannot write with required
                                        className="bg-slate-300 relative block w-full appearance-none  rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                />
                                    {/* {errors?.birthday?.type === "required" && <span className="text-sm text-red-600">Date of birth required</span>}
                                    {errors?.birthday?.type === "validate" && <span className="text-sm text-red-600">Only individuals 18 years of age or older are allowed</span>} */}
                                </div>
                                <div>
                                    <label className="mt-2 text-center text-sm" htmlFor="zipcode" >Zip Code</label>
                                    <input id="zipcode" 
                                           type="text" 
                                           {...register("zipCode", {
                                                required: true,
                                                pattern: /^[0-9]{5}$/
                                            })} 
                                           defaultValue={user?.zipCode? user.zipCode: ""}
                                           className="relative block w-full appearance-none  rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    />
                                    {errors?.zipCode?.type === "required" && <span className="text-sm text-red-600">Zip code required</span>}
                                    {errors?.zipCode?.type === "pattern" && <span className="text-sm text-red-600">Expect a 5 digits number</span>}
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
                                            defaultValue="12345678"
                                           className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    />
                                    {errors?.password?.type === "required" && <span className="text-sm text-red-600">Password required</span>}
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
                            <Button className="relative flex w-full" leftIcon={<GrUpdate />} colorScheme='orange' variant='solid'>Update</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>}
        {/* <div className="container w-6/12 mx-auto rounded-xl shadow border p-8 m-10 bg-white">
            <form className="w-full max-w-lg">
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                        First Name
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane"/>
                    <p className="text-red-500 text-xs italic">Please fill out this field.</p>
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                        Last Name
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Doe"/>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                        Password
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************"/>
                    <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-2">
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                        City
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Albuquerque"/>
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                        State
                    </label>
                    <div className="relative">
                        <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                        <option>New Mexico</option>
                        <option>Missouri</option>
                        <option>Texas</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
                        Zip
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="90210"/>
                    </div>
                </div>
            </form>
        </div> */}
        </>
    )
}

export default Profile

function dispatch(arg0: ActionTypes) {
    throw new Error('Function not implemented.');
}
