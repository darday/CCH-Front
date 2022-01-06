import React from 'react'
import { Navigate } from 'react-router-dom';
import Cookies from 'universal-cookie/es6'

export const PrivateRoute = ({children}) => {
    const cookies=new Cookies();

    var isLoggedIn = cookies.get('log');
    console.log("Private islogged")
    console.log(isLoggedIn);
    
    return isLoggedIn
    ?children
    :<Navigate to="/iniciar-sesion" />
    
    
}
