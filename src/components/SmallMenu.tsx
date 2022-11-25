import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisHorizontalIcon, ChevronDownIcon, PencilSquareIcon } from '@heroicons/react/24/solid'

interface UserProps {
    idx: number
    // username?: string;
    // mainFeeds?: Post[];
    // keyword: string
}

const SmallMenu = ({idx}: UserProps) => {

    return (
        <Menu as="div" className="relative ml-3">
            <div className="flex">
                <Menu.Button className="inline-flex w-full justify-center rounded-md bg-slate-300 bg-opacity-30 pr-4 px-1 text-xs font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                {/* <span className="sr-only">Open user menu</span> */}
                    {/* <HiDotsHorizontal  />   */}
                    {/* <IconButton className="" aria-label='Tools' fontSize='20px' icon={<HiDotsHorizontal />}>                           
                    </IconButton> */}
                    {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg> */}
                    <EllipsisHorizontalIcon
                        className="ml-2 -mr-1 h-10 w-8 text-slate-700 hover:text-slate-400"
                        aria-hidden="true"
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
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item key={idx}>
                    {({ active }) => (
                        <button
                            // onClick = {() => showEditPostHandler(idx)}
                            className={`${
                                active ? 'bg-slate-300 text-black' : 'text-gray-900'
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                        {active ? (
                            <PencilSquareIcon
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                            />
                        ) : (
                            <PencilSquareIcon
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                            />
                        )}
                        Edit
                        </button>
                    )}
                    </Menu.Item>                                               
                </Menu.Items>
            </Transition>
        </Menu>
    )
}




export default SmallMenu