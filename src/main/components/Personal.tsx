import axios, { AxiosError } from "axios";
import { useEffect, useRef, useState } from "react"
import toast from 'react-hot-toast';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, relogin } from "../../store/actions";
import { BASE_URL } from "../../util/secrets";

interface UserProps {
    username?: string
}

const Personal = ({username}: UserProps) => {
    const [headline, setHeadline] = useState<string>("");
    const [avatar, setAvatar] = useState<string>("");
    const headlineInput = useRef<HTMLTextAreaElement | null>(null);
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const handleClick = async(e: React.FormEvent<HTMLFormElement>) => {
        
        e.preventDefault();
        const newHeadline: string = headlineInput.current!.value;
        

        if (newHeadline.trim() !== ""){
            axios.put(`${BASE_URL}/headline`, {
                headline: newHeadline
            }).then((res) => {
                setHeadline(res.data.headline);
                toast.success("Successful Update Headline", {duration: 1000});

                headlineInput.current!.value = '';
    
            }).catch((err: AxiosError) => {
                if (err.response!.status === 401) {
                    dispatch(relogin());
                    navigate("/");
                    console.clear();
                }
            });
            
        }
        else{
            toast.error("Content Required", {duration: 1000});
        }
    };


    const getData = async() => {
        axios.get(`${BASE_URL}/headline`).then((res) => {
            setHeadline(res.data.headline);

        }).catch((err: AxiosError) => {
            if (err.response!.status === 401) {
                dispatch(relogin());
                navigate("/");
                console.clear();
            }
        });

        axios.get(`${BASE_URL}/avatar`).then((res) => {
            setAvatar(res.data.avatar);

        }).catch((err: AxiosError) => {
            if (err.response!.status === 401) {
                dispatch(relogin());
                navigate("/");
                console.clear();
            }
        });
    } 

    useEffect(() => {
        getData();
    }, []);


    return (
        <div className="w-full mt-10 mx-auto max-w-md bg-white rounded-lg border shadow-md dark:bg-gray-800 dark:border-gray-700">
            <form onSubmit={handleClick}>
                <div className="px-2">
                    <div className="flex flex-wrap justify-center">
                        <div className="w-full text-center mt-4">
                            <div className="w-full flex justify-center">
                                <img src={avatar} className="shadow-xl w-20 h-20 rounded-full align-middle border-solid border-4 border-white"/>
                            </div>
                            <div className="w-full flex justify-center mt-2">
                                <span className="font-bold">{username}</span>
                            </div>
                            <div className="w-full flex justify-center mt-2">
                                <span className="text-xs text-slate-600">{headline}</span>
                            </div>
                            <div className="w-full flex justify-center mt-8 mb-4">
                                <div>
                                    <textarea id="message" rows={2} ref={headlineInput}  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your message..."></textarea>
                                    {/* <button type="submit" onClick={() => handleClick()} className="mt-6 relative flex w-full justify-center w-full rounded  px-6 py-2.5 bg-gray-600 text-white font-medium text-xs leading-tight uppercase hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out">
                                        Update
                                    </button> */}
                                    <button type="submit" className="mt-4 inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out">
                                        Update
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Personal