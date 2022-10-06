import axios from "axios";
import { ApiUrl } from "../../services/ApiRest";
import {addTourToCatalogue} from './journalSlice'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { logout } from "../auth/authSlice";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const token = cookies.get('token');



export const startNewTourToCatalogue=(f)=>{
    return async(dispatch,getState)=>{
        const {uid}=getState().auth;

        
        await axios.post(ApiUrl+'catalogue-add',f)  
        .then(response=>{
            var resp=response.data;
            console.log(resp);
            if(resp.success){
                toast.success("Tour Agregado exitosamente", {position: toast.POSITION.BOTTOM_RIGHT}); 
                dispatch(addTourToCatalogue(resp.data));          
            }else{
                toast.error("El tour no se ha agregado", {position: toast.POSITION.BOTTOM_RIGHT});           
            }
        }) 
        .catch(e =>{
            console.log(e)
            toast.error(""+e+"  !", {position: toast.POSITION.BOTTOM_RIGHT});           

        })    

    }
}

export const startLoadingTourCatalogue=()=>{
    return async(dispatch,getState)=>{
        const {rol} = getState().auth;
        console.log(rol)
        if(rol =='admin'){

            await axios.get(ApiUrl+"catalogue-list")
            .then(response =>{
                const data=response.data;
                console.log(data);
            })
            .catch(e=>{
                console.log(e)
            })
            
        }else       //si no es un usuario admin se cierra la sesi[on]
        {
            //la condicion else me esta devolviendo un loop infinito
            // return dispatch(logout(token));
        }
    }
}