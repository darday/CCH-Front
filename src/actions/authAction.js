import axios from "axios";
import Cookies from "universal-cookie/es6";
import { ApiUrl } from "../services/ApiRest";
import { types } from "../types/types";
import { uiFinishLogin, uiStartLogin } from "./uiActions";

const cookies = new Cookies;
const urlLogin = ApiUrl+'login';
const urlLogout = ApiUrl+'logout';
const urlRegister = ApiUrl+'register';

const headers={
    Accept:'application/json'
}

export const startLogin = (email,password,isLogged)=>{
    return (dispatch) =>{
        dispatch(uiStartLogin());
        axios.post(urlLogin,{
            email:email,
            password:password
        },headers)
        .then(response =>{
            dispatch(uiFinishLogin());
            response = response.data;
            
            isLogged=true;
            var logged=isLogged;
            cookies.set('log',logged,{path:"/"})
            cookies.set('uid',response.data.id,{path:"/"})
            cookies.set('role',response.data.rol,{path:"/"})
            cookies.set('token',response.token,{path:"/"})

           
            console.log(response.token);
            dispatch(login(response.data.id,response.token))

            if(logged && cookies.get('role') == 'admin'){
                console.log("logeado y es Admin ")
                window.location.href="administrativo/home";
            }else{
                if(logged && cookies.get('role')=='user'){
                    console.log("Es USER")
                }
            }
        })
        .catch(e=>{
            console.log(e);
        }) 
    }
}

export const startRegister = (name,last_name,email,cellphone,password,password_confirm)=>{
    return (dispatch)=>{
        axios.post(urlRegister,{
            name:name,
            last_name:last_name,
            cellphone:cellphone,
            email:email,
            password:password,
            password_confirmation:password_confirm,
            rol:'user'

        },headers)
        .then(response =>{

            response = response.data;
            console.log(response);
            dispatch(register(response.data.id,response.data));
        })
        .catch(e=>{
            console.log(e);
        }) 
    }
}

export const startLogout =()=>{
    return async (dispatch)=>{
        const token = cookies.get('token');
        await axios.get(urlLogout ,{headers: { Authorization: `Bearer ${token}` } })
        .then(response =>{
            console.log("esto devuelve el logout");
            console.log(response);

            cookies.remove('log',{path:"/"});
            cookies.remove('uid',{path:"/"});
            cookies.remove('role',{path:"/"});
            cookies.remove('token',{path:"/"});


            dispatch(logout());
            window.location.href="/iniciar-sesion";

        })
        .catch(e=>{
            console(e);
        })


    }
}

export const login = (uid,token)=>{
    return {
        type:types.login,
        payload:{
            uid,
            token            
        }
    }
}

export const register = (uid,data=[])=>{
    return {
        type:types.register,
        payload:{
            uid,
            data,
        }
    }
}

export const logout = ()=>{
    return {
        type:types.logout
    }
}