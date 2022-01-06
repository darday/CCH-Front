import React, { useEffect, useState } from 'react'
import { RegisterScreen } from '../components/auth/RegisterScreen'
import { LoginScreen } from '../components/auth/LoginScreen'
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
  
} from "react-router-dom";
import { IndexScreen } from '../components/initialsPages/IndexScreen';
import { FooterScreen } from '../components/footer/FooterScreen';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/authAction';
import Cookies from 'universal-cookie/es6';
import axios from 'axios';
import { ApiUrl } from '../services/ApiRest';
import { HomeScreen } from '../components/user/HomeScreen';
import { AdminRoute } from './AdminRoute';
import { PrivateRoute } from './PrivateRoute';
import { UserRouteScreen } from './UserRouteScreen';


export const CampingRoute = () => {
    
    const cookies = new Cookies();
    const islogged = cookies.get('log');
    const id = cookies.get('uid');
    const token = cookies.get('token');
    const dispatch = useDispatch();
    
    
    if(islogged){
        dispatch(login(id,token));
    }
    
   
    

    return (
        <>
            {/* <div style={{margin:'0',minHeight:'100vh',display:'grid', gridTemplateRows:'1fr '  }}> */}
            <div >
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<IndexScreen />}></Route>
                        <Route path="/registrar" element={<RegisterScreen />}></Route>
                        <Route path="/iniciar-sesion" element={<LoginScreen/>}></Route>
                        <Route path="/administrativo/*" element={<AdminRoute/>}></Route>
                        <Route path="user-home" element={<UserRouteScreen/>}></Route>
                        {/* <Route path="/*" element={
                            <PrivateRoute>
                                <AdminRoute/>
                            </PrivateRoute>
                        }/> */}
                        {/* <Route path="/home" element={<HomeScreen/>}></Route> */}
                    </Routes>
                </BrowserRouter>
                {/* <FooterScreen/> */}
            </div>
        </>
    )
}
