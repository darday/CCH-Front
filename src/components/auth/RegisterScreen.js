import { Formik, useFormik } from 'formik'
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { Link } from 'react-router-dom'
import './auth.css'
import { NavBarScreen } from '../navBar/NavBarScreen';
import { FooterScreen } from '../footer/FooterScreen';
import { useDispatch } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { createUser } from '../../store/auth/thunks';

export const RegisterScreen = () => {

    const dispatch = useDispatch();

    const { name,last_name,cellphone,email,password,password_confirm,onInputChange,formState } = useForm({
        name:'dario',
        last_name:'janeta',
        email:'darday1981@gmail.com',
        cellphone:'0961119670',
        password:'123456789',
        password_confirm:'123456789'
    })

    const postPetition = async (e)=>{
        e.preventDefault();
        //console.log(formState);
        if(password === password_confirm){
            if(validarFormulario()){
                // dispatch(startRegister(name,last_name,email,cellphone,password,password_confirm))
                dispatch(createUser(formState));
            }
        }
        else{
            console.log("no son Iguales");
            toast.error("Las Contraseñas no coinciden", {position: toast.POSITION.BOTTOM_RIGHT});
            }
    }

    const validarFormulario =()=>{
        //si el campo está fuera(!) de ese rango acepta tildes y la ñ 
        if((/[^a-zA-ZÀ-ÿ\s]/.test(name)) || (/[^a-zA-ZÀ-ÿ\s]/.test(last_name))){
            toast.error("Error: Los campos Nombres y Apellidos solo pueden ser letras", {position: toast.POSITION.BOTTOM_RIGHT});            
            return false;
        }else{
            if(/[^\d]/.test(cellphone) ){
                toast.error("Error: El campo Teléfono Celular deben tener solamente números", {position: toast.POSITION.BOTTOM_RIGHT});           
                return false;
            }
        }
        return true;
    }
    
    return (
    <>
    <NavBarScreen/>
    <div className='fondo-register ' >    
        <div className="container" style={{width:"85%"}}>
            <div className="row justify-content-center " style={{paddingTop:'20vh'}}>
                <div className= " col-xs-12 col-lg-8 col-xl-8 color-istmas">
                    <div className="card shadow p-3 mb-5 bg-white form-fondo">
                        <div className="card-header text-center">
                            <h3 className='camping-letters text-center'>LA AVENTURA ESTÁ POR COMENZAR </h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={postPetition} >
                                <div className='row' >
                                    <div className="col-12 col-sm-6  " style={{paddingTop:'2vh'}}>
                                        <label  className="form-label"><b>Nombres:</b></label>
                                        <input onChange={onInputChange} type="text" name='name' value={name} className="form-control"  aria-describedby="textHelp" placeholder='Ej: Darío Javier' required></input>
                                    </div>
                                    <div className="col-12 col-sm-6" style={{paddingTop:'2vh'}}>
                                        <label  className="form-label"><b>Apellidos:</b></label>
                                        <input onChange={onInputChange} type="text" name='last_name' value={last_name} className="form-control" placeholder='Ej: Janeta Paca'  required></input>
                                    </div>                                         

                                </div>
                                <div className='row'>
                                    <div className="col-12 col-sm-6" style={{paddingTop:'2vh'}}>
                                        <label  className="form-label"><b>Correo</b></label>
                                        <input onChange={onInputChange} type="email" name='email' value={email} className="form-control" placeholder='Ej: campingchimborazo@gmail.com' aria-describedby="textHelp" required></input>
                                    </div>
                                    <div className="col-12 col-sm-6" style={{paddingTop:'2vh'}}>
                                        <label  className="form-label"><b>Teléfono Celular</b></label>
                                        <input onChange={onInputChange} type="text" name='cellphone' value={cellphone} className="form-control" placeholder='Ej: 0961119670' placeholder='Ej: 0961119670' required></input>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className="col-12 col-sm-6" style={{paddingTop:'2vh'}}>
                                        <label  className="form-label"><b>Contraseña</b></label>
                                        <input onChange={onInputChange} type="password" name='password' value={password} className="form-control"  aria-describedby="textHelp" placeholder='********' required></input>
                                    </div>
                                    <div className="col-12 col-sm-6" style={{paddingTop:'2vh'}}>
                                        <label  className="form-label"><b>Confirmar Contraseña</b></label>
                                        <input onChange={onInputChange} type="password" name='password_confirm' value={password_confirm} className="form-control" placeholder='********' required></input>
                                    </div>
                                </div>
                                <div className="text-center" style={{paddingTop:'2vh'}}>
                                    <button type="submit" className="btn  btn btn-success "  style={{margin:"5px", width:"180px"}} > <b>Registrarme</b></button>
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

    </div>
        {/* <FooterScreen/> */}
    </>

    )
}
