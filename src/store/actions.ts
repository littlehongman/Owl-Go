import { User, Post, DummyUser, LoginPayload } from "./types";

export const REGISTER = "REGISTER"
export const LOGIN = "LOGIN"
export const LOGOUT = "LOGOUT"
export const LOAD_DUMMY_USERS = "LOAD_DUMMY_USERS"
export const UPDATE_PROFILE = "UPDATE_PROFILE"
export const LOAD_POSTS = "LOAD_POSTS"
export const GET_POSTS = "GET_POSTS"

export const TEST = "TEST"
// export const ADDPOST = "POST"


export type ActionTypes = 
    | {type: typeof REGISTER; payload: User}
    | {type: typeof LOGIN; payload: number}
    | {type: typeof LOGOUT}
    | {type: typeof LOAD_DUMMY_USERS; payload: DummyUser[]}
    | {type: typeof UPDATE_PROFILE; payload: User}
    | {type: typeof LOAD_POSTS; payload: Post[]}
    | {type: typeof GET_POSTS;}
    | {type: typeof TEST; payload: string}


export const registerUser = (newUser: User): ActionTypes => ({
    type: REGISTER,
    payload: newUser
}) 

export const login = (userId: number): ActionTypes => ({
    type: LOGIN,
    payload: userId
})

export const logout = (): ActionTypes => ({
    type:  LOGOUT
})

export const loadDummyUsers = (users: DummyUser[]): ActionTypes => ({
    type: LOAD_DUMMY_USERS,
    payload: users
})

export const updateProfile = (user: User): ActionTypes => ({
    type: UPDATE_PROFILE,
    payload: user
})

export const loadPosts = (posts: Post[]): ActionTypes => ({
    type: LOAD_POSTS,
    payload: posts
})

export const getPosts = (): ActionTypes => ({
    type: GET_POSTS
})

export const changeTest = (newText: string): ActionTypes => ({
    type: TEST,
    payload: newText
})

