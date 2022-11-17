import { User, Post, LoginPayload } from "./types";

export const REGISTER = "REGISTER"
export const RELOGIN = "RELOGIN"
export const LOGIN = "LOGIN"
export const LOGOUT = "LOGOUT"

// export const ADDPOST = "POST"


export type ActionTypes = 
    // | {type: typeof REGISTER; payload: User}
    | {type: typeof RELOGIN}
    | {type: typeof LOGIN; payload: string}
    | {type: typeof LOGOUT}


// export const registerUser = (newUser: User): ActionTypes => ({
//     type: REGISTER,
//     payload: newUser
// }) 

export const login = (username: string): ActionTypes => ({
    type: LOGIN,
    payload: username
})

export const logout = (): ActionTypes => ({
    type:  LOGOUT
})

export const relogin = (): ActionTypes => ({
    type: RELOGIN
})
