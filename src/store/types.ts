
export interface User {
    id: number;
    name: string;
    username: string; // Display Name
    password: string;
    email: string | null;
    phone: string | null;
    birthday: string;
    zipCode: string | null;
    avatar: string;
    posts: Post[] ;
    friends?: number[]
    headline?:string
}

export interface DummyUser {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
        street: string;
    }
    phone: string;
    website: string;
    company: any | null;
}

export interface Post {
    id: number;
    userId: number;
    title: string;
    body: string;
    img: string;
    timestamp: number
}

// state: 
// 0 : Initial State
// 1 : Successful login
// 2: Wrong password
// 3: No user found
// 4: username duplicate

export interface LoginState{
    isLogin: boolean;
    userId: number
}

export interface LoginPayload {
    username: string;
    password: string;
}

export interface AppState {
    users: User[];
    loadDummies: boolean;
    // isPostLoaded: boolean;
    posts: Post[];
    loginState: LoginState;
    displayPosts: Post[]
}

