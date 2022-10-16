import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { AppState } from "../../store/types";

interface UserProps {
    userFriends?: number[];
}

interface Friend {
    name: string;
    headline: string;
    avatar: string;
}

const Friends = ({ userFriends }: UserProps) => {
    const users = useSelector((state: AppState) => state.users)
    const [friendData, setFriendData] = useState<Friend[]>([])

    const inputRef = useRef<HTMLInputElement>(null);
   // const [friendIds, setFriendIds] = useState<number[]>([...userFriends?? []])
    const sentences: string[] = ["Nothing new here", "Actively recruting", "Having Fun in campus"]

    const getFriendData = (displayFriendIds: number[]):void => {
        if (displayFriendIds){
            let friends: Friend[] = []

            for(const userId of displayFriendIds){
                let friend: Friend = {
                    name: users[userId - 1].name,
                    headline: sentences[Math.floor(Math.random() * 3)],
                    avatar: users[userId - 1].avatar
                }

                friends.push(friend);
            }

            setFriendData(friends);
        }
    }

    const handleRemoveFriend = (index: number):void => {
        let newFriendData: Friend[] = [...friendData]

        newFriendData.splice(index, 1)

        setFriendData(newFriendData);
        toast.success("Friend Unfollowed", {duration: 1000});
        // getFriendData(newFriendIds);
    } 

    const handleAddFriend = ():void => {
        if (inputRef.current?.value !== undefined && inputRef.current.value !== ""){
            let friend: Friend = {
                name: inputRef.current.value,
                headline: sentences[Math.floor(Math.random() * 3)],
                avatar: "https://api.lorem.space/image/face?w=150&h=150&hash=" + Math.floor(Math.random() * 100),
            }
            setFriendData([...friendData, friend]);
            toast.success("Friend Added", {duration: 1000});
        }
        else{
            toast.error("Username Required", {duration: 1000});
        }
    } 

    

    useEffect(() => {
        if (userFriends){
            let friends: Friend[] = []

            for(const userId of userFriends){
                let friend: Friend = {
                    name: users[userId - 1].name,
                    headline: sentences[Math.floor(Math.random() * 3)],
                    avatar: users[userId - 1].avatar
                }

                friends.push(friend);
            }

            setFriendData(friends);
        }
            
    }, [])


    return (
        <>
        <div className="w-full mt-10 mx-auto max-w-md bg-white rounded-lg border shadow-md dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4 px-4 pt-4">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Contacts</h5>
            </div>
            <div className="flow-root px-4">
                <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                    {friendData?.map((friend, i) => (
                        <li key={i} className="py-3 sm:py-4">
                            <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0">
                                    <img className="w-8 h-8 rounded-full" src={friend.avatar} alt="Neil image"/>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                        {friend.name}
                                    </p>
                                    <p className="text-xs text-slate-600 truncate dark:text-gray-400">
                                        {friend.headline}
                                    </p>
                                </div>
                                <button type="submit" onClick={() => handleRemoveFriend(i)}  className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                                    </svg>
                                    <span className="sr-only">Send message</span>
                                </button>
                            </div>
                            
                        </li>
                    ))}
                    
                </ul>
                <div className="w-full flex justify-center mt-8 mb-4 space-x-2">
                    <input id="message" ref={inputRef} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Username"></input>
                    <button type="button" onClick={() => handleAddFriend()} className="inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out">Add</button>
                </div>
            </div>
        </div>
        {/* <div className="container mt-10 rounded-xl shadow border p-8 bg-white">
            <div className="mx-auto w-full max-w-5xl bg-white">
            <ul className="flex flex-col">
                {users.map(user => (
                <li key={user.name} className="border-b-2 border-gray-100">
                    <div className={`py-5 px-4 flex justify-between border-l-4 border-transparent bg-transparent ${user.online ? "hover:border-green-400 hover:bg-gray-200" : "hover:border-red-500 hover:bg-red-50"}`}>
        
                  
                    <div className="sm:pl-4 pr-8 flex sm:items-center">
                      
                        <img src={user.avatar} alt="" className="mr-3 w-8 sm:w-12 h-8 sm:h-12 rounded-full" />
                    
                        <div className="space-y-1">
                       
                        <p className="text-base text-gray-700 font-bold tracking-wide">{user.name}</p>
                       
                        <p className="text-sm text-gray-500 font-medium">{user.role}</p>
                        </div>
                    </div>
        
        
                   
                    <div className="pr-4 flex flex-col justify-between items-end">
                     
                        <div>
                        {user.online ?
                            <div className="relative">
                            <span className="text-xs text-gray-500 font-semibold">Online</span>
                            <span className="absolute top-1 -right-2 w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                            </div>
                            : <span className="text-xs text-red-500 font-semibold">Offline</span>
                        }
                        </div>
                      
                        <a href={user.link} className="text-sm text-gray-500 font-semibold hover:underline hover:text-gray-700">Details</a>
                    </div>
        
                    </div>
                </li>
                ))
                }
            </ul>
            </div>
        </div> */}
        </>
    )

}

export default Friends