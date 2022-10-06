import axios from 'axios';
import Cookies from 'universal-cookie/es6';
import { ApiUrl } from '../../services/ApiRest';
import {checkingCredentials, login,logout} from './authSlice';
// import ApiUrl from '../../services/ApiRest'
const url=ApiUrl;
const cookies = new Cookies;

export const chekingAutentication=(email,password)=>{
    return async (dispatch)=>{
        dispatch(checkingCredentials() )

        await axios.post("http://127.0.0.1:8000/api/login",{
        email:email,
        password:password,
        })
        .then(response =>{
            const result = response.data           
            
            if(result.success === true){                
                cookies.set('uid',result.user.id,{path:"/"})
                cookies.set('token',result.accessToken,{path:"/"})
                var rol = cookies.set('rol',result.rol,{path:"/"})
                dispatch(login(result));
                if(rol === 'admin'){
                    window.location.href="/administrativo";
                }else{
                    if(rol='user'){
                        console.log("desarrollar pantalla para user");
                    }
                }

            }else{
                dispatch(logout(result));
                // window.location.href="/iniciar-sesion";
            }
        })
        .catch(error =>{
            console.log(error);
            dispatch(logout(error));
        })
            
        

    }
}

export const createUser = (formState)=>{
    return async (dispatch)=>{
        console.log("este es ");
        console.log(formState);
        await axios.post("http://127.0.0.1:8000/api/register",{
            name:formState.name,
            last_name:formState.last_name,
            cellphone:formState.cellphone,
            email:formState.email,
            password:formState.password,
            password_confirmation:formState.password_confirm

           
        })
        .then(response =>{
            const result = response.data
            console.log("usuario registrado")
            console.log(result)
            
            dispatch(login(result));
        })
        .catch(error =>{
            console.log(error);
        })
    }
}

export const logoutSesion = (AccessToken)=>{
    return async (dispatch)=>{
        var config = {
            headers: {
              'Authorization': 'Bearer ' + AccessToken
            }
        }
        console.log(config);
        await axios.post("http://127.0.0.1:8000/api/logout",{},config)
        .then(response =>{
            const result = response.data
            cookies.remove('uid',{path:"/"});
            cookies.remove('token',{path:"/"});
            cookies.remove('rol',{path:"/"});
            console.log("SESION CERRADA")
            console.log(result)
            dispatch(logout(result));
            window.location.href="/iniciar-sesion";



        })
        .catch(error =>{
            console.log(error);
        })
    }
}

export const loadUser = (id)=>{
    // console.log("aa@"+id)
    return async (dispatch)=>{

        await axios.get(url+'user_info/'+id)
        .then(response =>{
            const result = response.data;
            dispatch(login(result));

        })
        .catch(e=>{
            console.log(e);
        })        
    }
}