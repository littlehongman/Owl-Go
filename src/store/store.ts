
import { configureStore } from '@reduxjs/toolkit'
import { User, Post, LoginState, AppState, LoginPayload } from "./types"
import { ActionTypes,LOGIN, LOGOUT, RELOGIN } from "./actions"

// Redux Persist
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import { AxiosResponse } from 'axios';

// const addUser = (users: User[], newUser: User): User[] => {
//     console.log(users);
//     return ;
// }

// const getRandomTime = (): number => {
//     return new Date(new Date('2020/1/1').getTime() + Math.random() * (Date.now() - new Date('2020/1/1').getTime())).getTime()
// }

// const transfromPosts = (res: AxiosResponse): Post[] => {
//     let posts: Post[] = []

//     res.data.forEach((item:any, idx:any) => {
//         let post: Post = {
//             userId: item['userId'],
//             id: item['id'],
//             title: item['title'],
//             body: item['body'],
//             img: "https://source.unsplash.com/random/640x360?sig=" + idx,
//             timestamp: getRandomTime()
//         } 

//         posts.push(post);
        
//     });

//     return posts
// }

// // export const dummyUsersToUsers = (users: User[], dummyUsers: DummyUser[]): User[] => {
// //     if(users.length === 0){
// //         let newUsers: User[] = []

// //         for(let dummy of dummyUsers){
// //             let user: User = {
// //                 id: dummy.id,
// //                 name: dummy.name,
// //                 username: dummy.username,
// //                 password: dummy.address.street,
// //                 email: dummy.email,
// //                 phone: "123-123-1245",
// //                 birthday: "1998-01-02",
// //                 zipCode: "77024",
// //                 avatar: "https://api.lorem.space/image/face?w=150&h=150&hash=" + dummy.id,
// //                 friends: [1 + dummy.id % 10, 1 + (dummy.id + 1) % 10, 1 + (dummy.id + 2) % 10],
// //                 posts: []
// //             };

// //             newUsers.push(user); 
// //         }

// //         return newUsers;
// //     }
// //     else{
// //         return users.slice(0, 10);
// //     }
// // }

// const login = (loginState: LoginState, userId: number, numsOfUser: number) => {
//     if (userId >= numsOfUser || userId < 0){
//         return loginState
//     }

//     let newLoginState: LoginState = {...loginState}
//     newLoginState.isLogin = true
//     newLoginState.userId = userId

//     return newLoginState;
// }



// const updateProfile = (users: User[], user: User): User[] => {
//     let newUsers = [...users]

//     newUsers[user.id - 1] = user

//     return newUsers
// }

// // const getUserPost = (posts: Post[], loginState: LoginState) => {
// //     let newloginState: LoginState = {...loginState}
// //     let userPosts: Post[] = posts.filter((post) => post.userId === loginState.user?.id).sort((a, b) => b.timestamp - a.timestamp)
    
// //     if (newloginState.user)
// //         newloginState.user.posts = userPosts;
    
// //     return newloginState;
// // }

// const getUsersPosts = (posts: Post[], users: User[]): User[] => {
//     let newUsers: User[] = [...users]
//     let sortedPosts: Post[] = posts.sort((a, b) => b.timestamp - a.timestamp)
    
//     for(const user of newUsers){
//         user.posts = []
//     }

//     for(const post of sortedPosts){
//         newUsers[post.userId - 1].posts.push(post)
//     }
//     //console.log(newUsers);
    
//     return newUsers;
// }

// const updateHeadline = (headline: string, users: User[], userId: number): User[] => {
//     let newUsers: User[] = [...users]
//     newUsers[userId].headline = headline;

//     return newUsers;
// }

// // helper function
// const searchFilter = (content: string, keyword:string): boolean => { 
//     if(content.toLowerCase().includes(keyword.toLowerCase().trim()))
//         return true;
    
//     return false
// }

// const initialLoginState : LoginState = {
//     isLogin: false,
//     user: null
// }


// Redux implementation
function AppReducer(
    state: AppState = { // Need to assign value to initial state
        username: null
    }, 
        action: ActionTypes
){
    switch(action.type){
        case RELOGIN:
            return {
                ...state,
                username: null
            }
        
        case LOGIN:
            return {
                ...state,
                username: action.payload
            }

        case LOGOUT:
            return {
                ...state,
                username: null
            }
     
        default:
            return state


    }
}


const persistConfig = {
  key: 'root',
  storage,
}

export const persistedReducer = persistReducer(persistConfig, AppReducer)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk]
})

export const persistor = persistStore(store)

// const store = configureStore({reducer: AppReducer});
// const store = createStore(AppReducer)

// export default store