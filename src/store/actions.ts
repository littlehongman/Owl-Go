import { AxiosResponse } from "axios";
import { User, Post, DummyUser, LoginPayload } from "./types";

export const REGISTER = "REGISTER"
export const LOGIN = "LOGIN"
export const LOGOUT = "LOGOUT"
export const LOAD_DUMMY_USERS = "LOAD_DUMMY_USERS"
export const UPDATE_PROFILE = "UPDATE_PROFILE"
export const LOAD_POSTS = "LOAD_POSTS"
export const GET_POSTS = "GET_POSTS"
export const UPDATE_HEADLINE = "UPDATE_HEADLINE"

export const TEST = "TEST"
// export const ADDPOST = "POST"


export type ActionTypes = 
    | {type: typeof REGISTER; payload: User}
    | {type: typeof LOGIN; payload: number}
    | {type: typeof LOGOUT}
    | {type: typeof LOAD_DUMMY_USERS; payload: DummyUser[]}
    | {type: typeof UPDATE_PROFILE; payload: User}
    | {type: typeof LOAD_POSTS; payload: AxiosResponse}
    | {type: typeof GET_POSTS;}
    | {type: typeof UPDATE_HEADLINE, payload: string}
    | {type: typeof TEST}


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

export const loadPosts = (posts: AxiosResponse): ActionTypes => ({
    type: LOAD_POSTS,
    payload: posts
})

export const getPosts = (): ActionTypes => ({
    type: GET_POSTS
})

export const updateHeadline = (headline: string): ActionTypes => ({
    type: UPDATE_HEADLINE,
    payload: headline
})

export const changeTest = (): ActionTypes => ({
    type: TEST
})

