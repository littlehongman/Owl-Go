import React, {useEffect, useState} from 'react';
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Button } from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
// import { logout } from '../store/actions';
import { useDispatch, useSelector } from 'react-redux';
// import { AppState } from '../store/types';
import { useLocation, useNavigate } from 'react-router-dom';
import { logout, relogin } from '../store/actions';
import { AppState } from '../store/types';
import axios, { AxiosError } from 'axios';
import { BASE_URL } from '../util/secrets';
import { axiosInstance } from '../App';

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}


const Header = () => {
    const dispatch = useDispatch();
    const username = useSelector((state: AppState) => state.username)
    
    const location = useLocation();
    const navigate = useNavigate();

    const [avatar, setAvatar] = useState<string>("");
    const [isLoading, setLoading] = useState(false);

    const logoutUser = async() => {
        dispatch(logout());
        await axiosInstance.put(`${BASE_URL}/logout`).then((res) => {
            //navigate("../profile");
            
        }).catch((err: AxiosError) => {
            
            console.log(err);
        });
        
    }

    const navigation: any[] = [
        { name: 'Dashboard', href: '../main', current: true },
    ]

    const dropdownOptions: any[] = [
        { name: 'Your Profile', href: '../profile', action: null},
        { name: 'Logout', href: '../', action: logoutUser}
    ]

    const getData = async() => {
        await axiosInstance.get(`${BASE_URL}/avatar`).then((res) => {
            setLoading(true);
            setAvatar(res.data.avatar);
            setLoading(false);

        }).catch((err: AxiosError) => {
            if (err.response!.status === 401) {
                dispatch(relogin());
                navigate("../");
                //console.clear();
            }
        });
    } 

    useEffect(() => {
        if (username){
            getData();
        }
        
    }, []);
    
    if (isLoading) {
        return <div>Loading...</div>;
    }
    
    return (

        <Disclosure as="nav" className="bg-gray-800">
            {({ open }) => (
                <>
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            {/* Mobile menu button*/}
                            <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                            <span className="sr-only">Open main menu</span>
                            {open ? (
                                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                            ) : (
                                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                            )}
                            </Disclosure.Button>
                        </div>
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex flex-shrink-0 items-center">
                                <img
                                    className="block h-8 w-auto lg:hidden"
                                    src="https://i0.wp.com/owlspark.com/wp-content/uploads/2020/02/cropped-Rice_Owl_Flat_280_Blue-01.png?fit=512%2C512&ssl=1"
                                    alt="Your Company"
                                />
                                <img
                                    className="hidden h-8 w-auto lg:block"
                                    src="https://i0.wp.com/owlspark.com/wp-content/uploads/2020/02/cropped-Rice_Owl_Flat_280_Blue-01.png?fit=512%2C512&ssl=1"
                                    alt="Your Company"
                                />
                            </div>
                            <div className="hidden sm:ml-6 sm:block">
                            {username &&
                                <div className="flex space-x-4">
                                    {navigation.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className={classNames(
                                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'px-3 py-2 rounded-md text-sm font-medium'
                                        )}
                                        aria-current={item.current ? 'page' : undefined}
                                    >
                                        {item.name}
                                    </a>
                                    ))}
                                </div>
                            }
                            </div>
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            {/* <button
                            type="button"
                            className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                            >
                            <span className="sr-only">View notifications</span>
                            <BellIcon className="h-6 w-6" aria-hidden="true" />
                            </button> */}

                            {/* Profile dropdown */}
                            {username && 
                                
                                <Menu as="div" className="relative ml-3">
                                    <div className="flex">
                                        <h6 className="pt-1 pr-2 font-bold text-white">{username}</h6>
                                        <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                        <span className="sr-only">Open user menu</span>
                                        
                                        <img
                                            className="h-8 w-8 rounded-full"
                                            referrerPolicy="no-referrer"
                                            src={avatar}
                                            alt=""
                                        />
                                        
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            {dropdownOptions.map((item, i) => (
                                                <Menu.Item key={i}>
                                                    {({ active }) => (
                                                    <a
                                                        href={item.href}
                                                        onClick={() => item.action() }
                                                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                    >
                                                        {item.name}
                                                    </a>
                                                    )}
                                                </Menu.Item>

                                            ))}
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            }
                            {!username &&
                                <div>
                                    {location.pathname === '/register' && <Button onClick={() => navigate('../')} color="white">Login</Button> }
                                    {location.pathname === '/' && <Button onClick={() => navigate('/register')} color="white">  Register </Button>}
                                </div>
                            }   
                        </div>
                    </div>
                </div>
                
                {/* {avatar &&
                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 px-2 pt-2 pb-3">
                        {navigation.map((item) => (
                            <Disclosure.Button
                                key={item.name}
                                as="a"
                                href={item.href}
                                className={classNames(
                                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                    'block px-3 py-2 rounded-md text-base font-medium'
                            )}
                                aria-current={item.current ? 'page' : undefined}
                            >
                            {item.name}
                            </Disclosure.Button>
                        ))}
                        </div>
                    </Disclosure.Panel>
                } */}
                </>
            )}
        </Disclosure>
    )}


export default Header