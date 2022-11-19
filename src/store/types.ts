
export interface User {
    username: string;
    name: string;
    email: string;
    phone: string;
    birthday: string;
    zipCode: string;
    avatar: string;
    friends?: number[]
    headline?:string
}

export interface Friend {
    username: string;
    headline: string;
    avatar: string;
}

// export interface DummyUser {
//     id: number;
//     name: string;
//     username: string;
//     email: string;
//     address: {
//         street: string;
//     }
//     phone: string;
//     website: string;
//     company: any | null;
// }

// export interface Post {
//     id: number;
//     userId: number;
//     title: string;
//     body: string;
//     img: string;
//     timestamp: number
// }

export interface Post{
    pid: number,
    author: {
        username: string,
        avatar: string
    }
    text: string,
    img: string,
    timestamp: string;
    comments: Comment[];
}

export interface Comment{
    cid: number,
    author: {
        username: string,
        avatar: string
    }
    text: string
    timestamp: string;
}

// state: 
// 0 : Initial State
// 1 : Successful login
// 2: Wrong password
// 3: No user found
// 4: username duplicate

export interface LoginState{
    // isLogin: boolean;
    username: string | null
}

export interface LoginPayload {
    username: string;
    password: string;
}

export interface AppState {
    username: string | null
    // users: User[];
    // // loadDummies: boolean;
    // // // isPostLoaded: boolean;
    // // posts: Post[];
    // // loginState: LoginState;
    // // displayPosts: Post[]
}

export interface s3IConfig{
    bucketName:  string,
    // dirName: 'directory-name',      /* Optional */
    region: string,
    accessKeyId: string,
    secretAccessKey: string,
    s3Url: string
}



