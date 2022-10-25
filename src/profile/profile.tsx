import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm} from "react-hook-form";
import { AppState, User } from '../store/types';
import { updateProfile } from '../store/actions';

import { useFilePicker } from 'use-file-picker';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

const Profile = () => {
    const user = useSelector((state: AppState) => {
        if(state.loginState.isLogin) {
            return state.users[state.loginState.userId]
        }
        return null;
    });

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [openFileSelector, { filesContent, loading }] = useFilePicker({
        accept: ['.png', '.jpg'],
    });

    const { register, handleSubmit, watch, getValues ,formState: { errors } } = useForm<User>()
    // const onSubmit: SubmitHandler<User> = data => console.log(data);
    const onSubmit = (data: User) => {
        console.log(data);
        toast.success("Profile Updated", {duration: 1000});
        //dispatch(updateProfile(data));
    };

    // const DateToString = (date: Date): string => {
    //     console.log(date);
    //     const year:string = date.getFullYear().toString();
    //     let month: string = (date.getMonth() + 1).toString();
    //     let day: string = date.getDate().toString();

    //     if (month.length == 1)
    //         month = '0' + month
    //     if (day.length == 1)
    //         day = '0' + day

        
    //     return [year, month, day].join('-')
    // }

    useEffect(() => {
        if (user === null){
            navigate("../")
        } 
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
                   
                    <div className="flex flex-wrap justify-center " >
                        <img
                        src={user?.avatar}
                        className="rounded-xl  w-25 h-25 bg-white border  max-w-sm"
                        alt="..."
                        />
                       
                    </div>
                    
                    <div className="flex space-x-2 justify-center">
                            <button
                                type="button"
                                data-mdb-ripple="true"
                                data-mdb-ripple-color="light"
                                className="inline-block px-6 py-2.5 bg-teal-400 text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-teal-200 hover:shadow-lg focus:bg-teal-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-teal-700 active:shadow-lg transition duration-150 ease-in-out"
                                onClick={() => openFileSelector()}
                            >Change Photo
                            </button>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <input type="number" 
                               hidden
                               {...register("id")}
                               value={user?.id}
                               readOnly
                        />
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
                                            defaultValue={user?.username}
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
                                            required: true,
                                            // validate: (value) => checkAdult(value)
                                        })}
                                        defaultValue={user?.birthday? user?.birthday: "1999-04-02"}
                                        // disabled
                                        className="relative block w-full appearance-none  rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
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
                                            defaultValue={user?.password? user.password: ""}
                                           className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    />
                                    {errors?.password?.type === "required" && <span className="text-sm text-red-600">Password required</span>}
                                </div>
                                {/* <div>
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
                                </div> */}
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
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                                </svg>
                            </span>
                            Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
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