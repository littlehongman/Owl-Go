import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useFilePicker } from "use-file-picker";
import { Post } from "../../store/types";
import { MdOutlineClear } from "react-icons/md"

import ReactS3Client from 'react-aws-s3-typescript';
import { s3Config } from '../../store/s3Config';
import axios, { AxiosError } from "axios";
import { relogin } from "../../store/actions";
import { BASE_URL } from "../../util/secrets";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../App";


interface UserProps {
    username: string;
    setMainPosts: React.Dispatch<React.SetStateAction<Post[]>>
    // setNewPost: React.Dispatch<React.SetStateAction<string>>
}

const ShareBox = ({ username, setMainPosts }: UserProps) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const formData = new FormData();

    //const inputRef = useRef<HTMLTextAreaElement>(null);
    const [message, setMessage] = useState("");
    const [imageName, setImageName] = useState("")

    const [openFileSelector, { filesContent, plainFiles, loading }] = useFilePicker({
        accept: ['.png', '.jpg'],
    });

    const handleClick = async(e: any) => {
        // });
        // e.preventDefault();
        
        if (message.trim() !== ""){
            //let newPosts = [...userPosts?? []]
            if (plainFiles.length > 0) {
                const formData = new FormData();
                formData.append("image", plainFiles[0]);
                formData.append("text", message);
                formData.append("username", username);

                await axiosInstance.post(`${BASE_URL}/article`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then((res)=>{
                    setMainPosts(res.data.articles);
                    setImageName("");
                    toast.success("Successful Post", {duration: 1000});
                }).catch((err: AxiosError) => {
                    if (err.response!.status === 401) {
                        return;
                    }
                    else{
                        console.log(err);
                    }
                });
            
            }
            else{
                await axiosInstance.post(`${BASE_URL}/article`,{
                    text: message
                }).then((res) => {
                    setMainPosts(res.data.articles);
                    toast.success("Successful Post", {duration: 1000});
                }).catch((err: AxiosError) => {
                    if (err.response!.status === 401) {
                        dispatch(relogin());
                        navigate("/");
                    }
                });
            }

            setMessage("")
            // setNewPost(message);
        }
        else{
            toast.error("Content Required", {duration: 1000})
        }
            
            // setHeadline(inputRef.current?.value);
    };

    useEffect(() => {
        if (plainFiles.length > 0){
            setImageName(plainFiles[0].name);
        }

    },[plainFiles])


    // const uploadFile = async() => {
    //     const s3 = new ReactS3Client(s3Config);

    //     try {
    //         const image = plainFiles[0];
    //         const res = await s3.uploadFile(image);
            
            
    //         return res;
    //     } catch (exception) {
    //         console.log(exception);
    //         /* handle the exception */
    //     }

    // }
    

    return (
        <div className="container mx-auto rounded-xl shadow border m-4 bg-white">
            {/* <form onSubmit={handleClick}> */}
                <label htmlFor="chat" className="sr-only">Your message</label>
                <div className="bg-gray-50 rounded-lg dark:bg-gray-700">
                    <div className="flex items-center py-2 px-3 ">
                        <button type="button" onClick={() => openFileSelector()}  className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                            <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"></path></svg>
                            <span className="sr-only">Upload image</span>
                        </button>
                        <textarea id="chat" rows={1} value={message} onChange={(e) => setMessage(e.target.value)} className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="What you have in mind..."></textarea>
                        <button type="submit" onClick={(e) => handleClick(e)}className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
                            <svg aria-hidden="true" className="w-6 h-6 rotate-90" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
                            <span className="sr-only">Send message</span>
                        </button>
                        <button onClick={() => setMessage("")} className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
                            <MdOutlineClear className="w-6 h-6"/>
                        </button>
                        
                    </div>
                    <p className="mx-6">{imageName}</p>
                </div>
                
            {/* </form> */}
        </div>
    )

}


export default ShareBox