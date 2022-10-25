import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useFilePicker } from "use-file-picker";
import { addPost } from "../../store/actions";
import { Post } from "../../store/types";


interface UserProps {
    userId?: number;
    // userPosts: Post[];
    // setUserPosts: React.Dispatch<React.SetStateAction<Post[]>>
    setNewPost: React.Dispatch<React.SetStateAction<string>>
}

const ShareBox = ({userId, setNewPost}: UserProps) => {
    const dispatch = useDispatch()

    //const inputRef = useRef<HTMLTextAreaElement>(null);
    const [message, setMessage] = useState('');

    const [openFileSelector, { filesContent, loading }] = useFilePicker({
        accept: ['.png', '.jpg'],
    });

    const handleClick = (e: React.FormEvent<HTMLFormElement>):void => {
        console.log(filesContent);
        e.preventDefault();
        
        if (message.trim() !== "" && userId){
            //let newPosts = [...userPosts?? []]

            let post: Post = {
                userId: userId,
                id: 100 + Math.floor(Math.random() * 100),
                title: "",
                body: message.trim(),
                img: "",
                timestamp: Date.now()
            }

            if (filesContent.length > 0){
                post.img = "https://source.unsplash.com/random/640x360?sig=" + 100 + Math.floor(Math.random() * 100)
            }
                
                //post.img = filesContent[0].name // TO BE MODIFIED

            //setUserPosts([post, ...userPosts]);
            dispatch(addPost(post));
            setNewPost(message);
            toast.success("Successful Post", {duration: 1000})
        }
        else{
            toast.error("Content Required", {duration: 1000})
        }
            
            //setHeadline(inputRef.current?.value);
    };

    return (
        <div className="container mx-auto rounded-xl shadow border m-4 bg-white">
            <form onSubmit={handleClick}>
                <label htmlFor="chat" className="sr-only">Your message</label>
                <div className="flex items-center py-2 px-3 bg-gray-50 rounded-lg dark:bg-gray-700">
                    <button type="button" onClick={() => openFileSelector()}  className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                        <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"></path></svg>
                        <span className="sr-only">Upload image</span>
                    </button>
                    <textarea id="chat" rows={1} onChange={(e) => setMessage(e.target.value)} className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="What you have in mind..."></textarea>
                    <button type="submit" className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
                        <svg aria-hidden="true" className="w-6 h-6 rotate-90" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
                        <span className="sr-only">Send message</span>
                    </button>
                </div>
            </form>
        </div>
    )

}


export default ShareBox