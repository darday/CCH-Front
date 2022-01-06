import { Formik, useFormik } from 'formik'
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { Link } from 'react-router-dom'
import './auth.css'
import { NavBarScreen } from '../navBar/NavBarScreen';
import { FooterScreen } from '../footer/FooterScreen';
import { useDispatch, useSelector } from 'react-redux';
import { startLogin } from '../../actions/authAction';
import Cookies from 'universal-cookie/es6';


const cookies = new Cookies();
const rol = cookies.get('role');
const islogged = cookies.get('log');


export const LoginScreen = () => {

  

    const dispatch = useDispatch();
    const loading = useSelector( state => state.ui );

 
    


    const [formState, setformState] = useState({
        
        email:'darday1980@gmail.com',      
        password:'123456789',
        isLogged:false
        
    });
    const {email,password,isLogged} = formState;

    const handleChange  = (e)=>{
        setformState({
            ...formState,
            [e.target.name]:e.target.value
        });
    }

    const postPetition = async (e)=>{
        e.preventDefault();
        console.log(email);
        dispatch(startLogin(email,password,isLogged));
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
                                <form onSubmit={postPetition} >
                                    
                                    <div className='row'>
                                        <div className="col-12 col-sm-12" style={{paddingTop:'2vh'}}>
                                            <label  className="form-label"><b>Correo</b></label>
                                            <input onChange={handleChange} type="email" name='email' value={email}  className="form-control" placeholder='Ej: campingchimborazo@gmail.com' aria-describedby="textHelp" required></input>
                                        </div>
                                        
                                    </div>

                                    <div className='row'>
                                        <div className="col-12 col-sm-12" style={{paddingTop:'2vh'}}>
                                            <label  className="form-label"><b>Contraseña</b></label>
                                            <input onChange={handleChange} type="password" name='password' value={password} className="form-control"  aria-describedby="textHelp" placeholder='********' required></input>
                                        </div>

                                    </div>
                                
                                    <div className="text-center" style={{paddingTop:'2vh'}}>
                                        <button type="submit" className="btn  btn btn-success "  style={{margin:"5px", width:"180px"}} disabled={loading.loading} > <b>Iniciar Sesión</b></button>
                                        {/* <Link to="/">
                                            <button type="" className="btn  btn btn-dark "  style={{margin:"5px", width:"180px"}}  ><b>Cancelar </b></button>
                                        </Link>                                 */}
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
