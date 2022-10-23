
import { configureStore } from '@reduxjs/toolkit'
import { User, Post, LoginState, AppState, DummyUser, LoginPayload } from "./types"
import { ActionTypes, LOAD_POSTS, LOAD_DUMMY_USERS, REGISTER, TEST, LOGIN, LOGOUT, UPDATE_PROFILE, GET_POSTS, UPDATE_HEADLINE, UPDATE_POSTS } from "./actions"

// Redux Persist
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import { AxiosResponse } from 'axios';

// const addUser = (users: User[], newUser: User): User[] => {
//     console.log(users);
//     return ;
// }

const getRandomTime = (): number => {
    return new Date(new Date('2020/1/1').getTime() + Math.random() * (Date.now() - new Date('2020/1/1').getTime())).getTime()
}

const transfromPosts = (res: AxiosResponse): Post[] => {
    let posts: Post[] = []

    res.data.forEach((item:any, idx:any) => {
        let post: Post = {
            userId: item['userId'],
            id: item['id'],
            title: item['title'],
            body: item['body'],
            img: "https://source.unsplash.com/random/640x360?sig=" + idx,
            timestamp: getRandomTime()
        } 

        posts.push(post);
        
    });

    return posts
}

export const dummyUsersToUsers = (users: User[], dummyUsers: DummyUser[]): User[] => {
    if(users.length === 0){
        let newUsers: User[] = []

        for(let dummy of dummyUsers){
            let user: User = {
                id: dummy.id,
                name: dummy.name,
                username: dummy.username,
                password: dummy.address.street,
                email: dummy.email,
                phone: "123-123-1245",
                birthday: "1998-01-02",
                zipCode: "77024",
                avatar: "https://api.lorem.space/image/face?w=150&h=150&hash=" + dummy.id,
                friends: [1 + dummy.id % 10, 1 + (dummy.id + 1) % 10, 1 + (dummy.id + 2) % 10],
                posts: []
            };

            newUsers.push(user); 
        }

        return newUsers;
    }
    else{
        return users.slice(0, 10);
    }
}

const login = (loginState: LoginState, userId: number, numsOfUser: number) => {
    if (userId >= numsOfUser || userId < 0){
        return loginState
    }

    let newLoginState: LoginState = {...loginState}
    newLoginState.isLogin = true
    newLoginState.userId = userId

    return newLoginState;
}



const updateProfile = (users: User[], user: User): User[] => {
    let newUsers = [...users]

    newUsers[user.id - 1] = user

    return newUsers
}

// const getUserPost = (posts: Post[], loginState: LoginState) => {
//     let newloginState: LoginState = {...loginState}
//     let userPosts: Post[] = posts.filter((post) => post.userId === loginState.user?.id).sort((a, b) => b.timestamp - a.timestamp)
    
//     if (newloginState.user)
//         newloginState.user.posts = userPosts;
    
//     return newloginState;
// }

const getUsersPosts = (posts: Post[], users: User[]): User[] => {
    let newUsers: User[] = [...users]
    let sortedPosts: Post[] = posts.sort((a, b) => b.timestamp - a.timestamp)
    
    for(const user of newUsers){
        user.posts = []
    }

    for(const post of sortedPosts){
        newUsers[post.userId - 1].posts.push(post)
    }
    console.log(newUsers);
    
    return newUsers;
}

const updateHeadline = (headline: string, users: User[], userId: number): User[] => {
    let newUsers: User[] = [...users]
    newUsers[userId].headline = headline;

    return newUsers;
}

// const initialLoginState : LoginState = {
//     isLogin: false,
//     user: null
// }

// Redux implementation
function AppReducer(
    state: AppState = { // Need to assign value to initial state
        users: [], 
        loadDummies: false,
        // isPostLoaded: false,
        posts: [],
        loginState: {
            isLogin: false,
            userId: -1
        },
        displayPosts:[]
    }, 
        action: ActionTypes
){
    switch(action.type){
        case REGISTER:
            return {
                ...state,
                loginState: {isLogin: true, userId: state.users.length}, 
                users: [...state.users, action.payload]
            }
        
        case LOGIN:
            return {
                ...state,
                loginState: login(state.loginState, action.payload, state.users.length)
            }

        case LOGOUT:
            return {
                ...state,
                loginState: {isLogin: false, userId: -1}
            }
        
        case LOAD_DUMMY_USERS:
            return {
                ...state,
                users: dummyUsersToUsers(state.users, action.payload),
                loadDummies: true
            }
        
        case UPDATE_PROFILE:
            return {
                ...state,
                //loginState: {state:1, isLogin: true, user: action.payload},
                users: updateProfile(state.users, action.payload)
            }
        
        case LOAD_POSTS:
            // Modified may have problem
            let resToPosts = transfromPosts(action.payload);
            //let userFriends = state.users[state.loginState.userId].friends?? [];

            return {
                ...state,
                // isPostLoaded: true,
                users: getUsersPosts(resToPosts, state.users),
                posts: resToPosts,
                //displayPosts:  resToPosts.filter((post) => userFriends.includes(post.userId)).sort((a, b) => b.timestamp - a.timestamp)
            }
        
        case UPDATE_POSTS:
            let userFriends = action.payload

            return {
                ...state,
                displayPosts:  state.posts.filter((post) => userFriends.includes(post.userId)).sort((a, b) => b.timestamp - a.timestamp)
            }

        case UPDATE_HEADLINE:
            return {
                ...state,
                users: updateHeadline(action.payload, state.users, state.loginState.userId),
            }
        
        // case GET_POSTS:
        //     return {
        //         ...state,
        //         loginState: getUserPost(state.posts, state.loginState)
        //     }
        
        // case TEST:
        //     return {
        //         ...state,
        //     }
        
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