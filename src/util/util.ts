import axios from "axios";


export const fetchPosts = async () => {
    return await axios.get("https://jsonplaceholder.typicode.com/users");
};