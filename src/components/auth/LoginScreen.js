import { Formik, useFormik } from 'formik'
import React, { useMemo, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { Link } from 'react-router-dom'
import './auth.css'
import { NavBarScreen } from '../navBar/NavBarScreen';
import { FooterScreen } from '../footer/FooterScreen';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'universal-cookie/es6';
import { useForm } from '../../hooks/useForm';
import { chekingAutentication } from '../../store/auth/thunks';


const cookies = new Cookies();
const rol = cookies.get('role');
const islogged = cookies.get('log');


export const LoginScreen = () => {

    if(cookies.get('token') && cookies.get('uid') && cookies.get('rol')){
        console.log("Estoy en administrativo logeado!!!")
        window.location.href="/administrativo";

     }else{
         console.log('no está logeado')
       
     }
    
    const {status,errorMessage} = useSelector(state=>state.auth);

    const isAuthenticate = useMemo(()=>status === 'checking',[status]);

  
    const { email,password,onInputChange } = useForm({
        email:'',
        password:''
    })
    const dispatch = useDispatch();
    const loading = useSelector( state => state.ui );

 
    const onSubmit = (event)=>{
        event.preventDefault();
        dispatch(chekingAutentication(email,password));
        // console.log({email,password});

    }
    
    if(islogged){
        if(rol === "admin"){
            window.location.href="/administrativo";
        }       
    }else{
        
        return (
        <>
        <NavBarScreen/>
        <div className='fondo-register ' >    
            <div className="container" style={{width:"85%",paddingBottom:'10vh'}}>
                <div className="row justify-content-center " style={{paddingTop:'25vh'}}>
                    <div className= " col-xs-12 col-lg-5 col-xl-5 color-istmas">
                        <div className="card shadow p-3 mb-5 bg-white form-fondo">
                            <div className="card-header text-center">
                                <h3 className='camping-letters text-center'>Comencemos!  </h3>
                            </div>
                            <div className="card-body">
                                <form onSubmit={onSubmit} >
                                    
                                    <div className='row'>
                                        <div className="col-12 col-sm-12" style={{paddingTop:'2vh'}}>
                                            <label  className="form-label"><b>Correo</b></label>
                                            <input  type="email" onChange={onInputChange} name='email' value={email}  className="form-control" placeholder='Ej: campingchimborazo@gmail.com' aria-describedby="textHelp" required></input>
                                        </div>
                                        
                                    </div>

                                    <div className='row'>
                                        <div className="col-12 col-sm-12" style={{paddingTop:'2vh'}}>
                                            <label  className="form-label"><b>Contraseña</b></label>
                                            <input  type="password" onChange={onInputChange}  name='password' value={password} className="form-control"  aria-describedby="textHelp" placeholder='********' required></input>
                                        </div>

                                    </div>
                                    <div>
                                    </div>
                                
                                    <div className="text-center" style={{paddingTop:'2vh'}}>
                                        {
                                            (errorMessage)
                                            ?
                                            <div className="alert alert-danger" role="alert">
                                                {errorMessage}
                                            </div>
                                            :
                                            <></>
                                        }
                                        
                                        <button type="submit" disabled={isAuthenticate} className="btn  btn btn-success "  style={{margin:"5px", width:"180px"}} > <b>Iniciar Sesión</b></button>
                                        <Link to="/">
                                            <button type="" className="btn  btn btn-dark "  style={{margin:"5px", width:"180px"}}  ><b>Cancelar </b></button>
                                        </Link>                                
                                    </div>                               
                                    
                                </form> 
                            </div>
                        </div>                                                          
                    </div>                    
                </div>                
            </div>  


            
            <ToastContainer theme= "colored" />
            {/* <FooterScreen/> */}

        </div>
        </>

        )
    }
}
