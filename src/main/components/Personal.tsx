import { useRef, useState } from "react"
import toast from 'react-hot-toast';
import { useDispatch } from "react-redux";
import { updateHeadline } from "../../store/actions";

interface UserProps {
    username?: string
    userAvatar?:string
    userHeadline?:string
}

const Personal = ({username, userAvatar, userHeadline}: UserProps) => {
    const [headline, setHeadline] = useState<string>("")
    const dispatch = useDispatch()

    const handleClick = (e: React.FormEvent<HTMLFormElement>):void => {
        e.preventDefault();

        if (headline.trim() !== ""){
            dispatch(updateHeadline(headline));
            toast.success("Successful Update Headline", {duration: 1000});
        }
        else{
            toast.error("Content Required", {duration: 1000});
        }
            
            //setHeadline(inputRef.current?.value);
    };


    return (
        <div className="relative max-w-md mt-10 mx-auto md:max-w-2xl min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl">
            <form onSubmit={handleClick}>
                <div className="px-6">
                    <div className="flex flex-wrap justify-center">
                        <div className="w-full text-center mt-4">
                            <div className="w-full flex justify-center">
                                <img src={userAvatar} className="shadow-xl w-20 h-20 rounded-full align-middle border-solid border-4 border-white"/>
                            </div>
                            <div className="w-full flex justify-center mt-2">
                                <span className="font-bold">{username}</span>
                            </div>
                            <div className="w-full flex justify-center mt-2">
                                <span className="text-xs text-slate-600">{userHeadline}</span>
                            </div>
                            <div className="w-full flex justify-center mt-8 mb-4">
                                <div>
                                    <textarea id="message" rows={2} onChange={(e) => setHeadline(e.target.value)} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your message..."></textarea>
                                    {/* <button type="submit" onClick={() => handleClick()} className="mt-6 relative flex w-full justify-center w-full rounded  px-6 py-2.5 bg-gray-600 text-white font-medium text-xs leading-tight uppercase hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out">
                                        Update
                                    </button> */}
                                    <button type="submit" className="inline-block mt-6 px-6 py-2.5 bg-gray-400 text-gray-700 font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out">
                                        Update
                                    </button>
                                </div>
                            </div>


                            {/* <div className="flex justify-center lg:pt-4 pt-8 pb-0">
                                <div className="p-3 text-center">
                                    <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">3,360</span>
                                    <span className="text-sm text-slate-400">Photos</span>
                                </div>
                                <div className="p-3 text-center">
                                    <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">2,454</span>
                                    <span className="text-sm text-slate-400">Followers</span>
                                </div>

                                <div className="p-3 text-center">
                                    <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">564</span>
                                    <span className="text-sm text-slate-400">Following</span>
                                </div>
                            </div> */}
                        </div>
                    </div>
                    {/* <div className="text-center mt-2">
                        <h3 className="text-2xl text-slate-700 font-bold leading-normal mb-1">Mike Thompson</h3>
                        <div className="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
                            <i className="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75"></i>Paris, France
                        </div>
                    </div> */}
                    {/* <div className="mt-6 py-6 border-t border-slate-200 text-center">
                        <div className="flex flex-wrap justify-center">
                            <div className="w-full px-4">
                                <p className="font-light leading-relaxed text-slate-600 mb-4">An artist of considerable range, Mike is the name taken by Melbourne-raised, Brooklyn-based Nick Murphy writes, performs and records all of his own music, giving it a warm.</p>
                                <a href="#" className="font-normal text-slate-700 hover:text-slate-400">Follow Account</a>
                            </div>
                        </div>
                    </div> */}
                </div>
            </form>
        </div>
    )
}

export default Personal