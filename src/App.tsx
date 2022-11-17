import { Provider } from "react-redux";

// Redux Persist
import { persistor, store } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';

import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';

import Auth from './auth/auth';
import Header from './components/Header';
// import Main from './main/main';
// import Profile from './profile/profile';

import './App.css';
import Register from "./auth/registration/Registration";

// UI elements
import {Toaster} from "react-hot-toast";
import { ChakraProvider } from '@chakra-ui/react'
import { useEffect } from "react";

// Backend
import axios from "axios";
import Main from "./main/main";
axios.defaults.withCredentials = true;


export default function App() {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        
        <ChakraProvider>
          <Toaster/>
          <Router>
            <Header/>
            <Routes>
                <Route path={'/'} element= {<Auth />}/>
                <Route path={'/register'} element= {<Register />}/>
                <Route path={'/main'} element= {<Main />}/>
                {/* <Route path={'/profile'} element= {<Profile/>}/> */}
            </Routes>
          </Router>
        </ChakraProvider>
        {/* <Header/>
        {/* <Auth/> */}
        {/* <Main/> */}
      </PersistGate>
    </Provider>
  );
}

