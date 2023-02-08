import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { ApiUrl } from '../../../services/ApiRest';

export const AddToEquipmentSell = () => {
    const [img, setimg] = useState();
    const [sendingPetition, setsendingPetition] = useState(false);
    const [fData, setFormData] = useState({  //Es un hook = useState
        name: '',
        description: '',
        cost: '',
        state: '',
        discount: 0,
        discount_description: '',
        contact_phone: '',
        messagge_for_contact: '',
        type: '',
    });

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormData({
            ...fData,
            [name]: value
        })
    }
    useEffect(() => {
        setFormData({
            name: '',
            description: '',
            cost: '',
            state: '',
            discount: '',
            discount_description: '',
            contact_phone: '',
            messagge_for_contact: '',
            type: '',
        });
    }, [])

    const onSubmit = async(event) => {
        event.preventDefault();
        
        setsendingPetition(true);
        const form = new FormData();
        form.append("name", fData.name);
        form.append("description", fData.description);
        form.append("cost", fData.cost);
        form.append("state", fData.state);
        form.append("discount", fData.discount); 
        form.append("discount_description", fData.discount_description); 
        form.append("contact_phone", fData.contact_phone); 
        form.append("messagge_for_contact", fData.messagge_for_contact); 
        form.append("type", fData.type); 
        form.append("img_1", img[0]);

        notify();
        await axios.post(ApiUrl+'equipment-add', form)
        .then(resp=>{
            setsendingPetition(false);

            const data=resp.data;
            if (data.success == true){
                success(resp.messagge);

            }else{
                error(resp.messagge);
            }
            console.log(data);
            setFormData({
                name: '',
                description: '',
                cost: '',
                state: '',
                discount: '',
                discount_description: '',
                contact_phone: '',
                messagge_for_contact: '',
                type: '',
                img_1:''
            });

        })
        .catch(err =>{
            error('Error de Servidor, Contactese con soporte');
            console.log(err);
            setsendingPetition(false);

        })

        
        
        // console.log(Object.fromEntries(form));

    }

    const updateImg = (e) => {
        setimg(e);
    }

    const toastId = React.useRef(null);
    const notify = () => toastId.current = toast("Enviando Datos...", { autoClose: false,  type: toast.TYPE.INFO, position: toast.POSITION.BOTTOM_RIGHT });
    const success = (messagge) => toast.update(toastId.current, { render:messagge,type: toast.TYPE.SUCCESS, position: toast.POSITION.BOTTOM_RIGHT, autoClose: 5000 });
    const error = (messagge) => toast.update(toastId.current, { render:messagge,type: toast.TYPE.ERROR, position: toast.POSITION.BOTTOM_RIGHT, autoClose: 5000 });



    return (
        <div>
            <div className='row'>
                <div className='col-12 '>
                    <div className="card">
                        <div className="card-header">
                            AGREGAR EQUIPO PARA VENTA
                        </div>
                        <div className="card-body">
                            <form onSubmit={onSubmit}>
                                <div className='row'>
                                    <div className='col-12 col-sm-6'>
                                        <div className="form-group">
                                            <label >Nombre del Equipo</label>
                                            <input type="text" name='name' className="form-control" placeholder='Ej: Carpa' value={fData.name} onChange={onInputChange} required ></input>
                                        </div>
                                    </div>
                                    <div className='col-12 col-sm-6 col-md-6'>
                                        <div className="form-group">
                                            <label >Precio</label>
                                            <input className="form-control" name='cost' placeholder='Ej: 00.00' value={fData.cost} onChange={onInputChange} required></input>

                                        </div>
                                    </div>

                                    <div className='col-12 col-sm-12'>
                                        <div className="form-group">
                                            <label >Descripción</label>
                                            <textarea class="form-control" placeholder="Leave a comment here" name='description' value={fData.description} rows="4" onChange={onInputChange}  style={{ color: 'black' }}  required></textarea>

                                        </div>
                                    </div>
                                    
                                </div>

                                <div className='row'>
                                    
                                    <div className='col-12 col-sm-6 col-md-3'>
                                        <div className="form-group">
                                            <label >Estado</label>
                                            <select className="form-select" name="state" aria-label="Default select example" value={fData.state} onChange={onInputChange} required>
                                                <option value="" >Seleccione una opción</option>
                                                <option value="1" >Habilitado</option>
                                                <option value="0" >Deshabilitado</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className='col-12 col-sm-6 col-md-3'>
                                        <div className="form-group">

                                            <div className="form-group">
                                                <label >Descuento</label>
                                                <input name="discount" className="form-control" placeholder='Ej: 0%' value={fData.discount} onChange={onInputChange} required></input>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-12 col-sm-6 col-md-3'>
                                        <div className="form-group">
                                            <label >Descripción del Descuento</label>
                                            <input name="discount_description" className="form-control" placeholder='Ej: Descuentos' value={fData.discount_description} onChange={onInputChange} required></input>
                                        </div>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-12 col-sm-6 col-md-3'>
                                        <div className="form-group">
                                            <label >Teléfono</label>
                                            <input type="text" name='contact_phone' className="form-control" placeholder='Ej: 123456789' value={fData.contact_phone} onChange={onInputChange} required></input>
                                        </div>
                                    </div>
                                    <div className='col-12 col-sm-6 col-md-9'>
                                        <div className="form-group">
                                            <label >Mensaje</label>
                                            <input type="text" name='messagge_for_contact' className="form-control" value={fData.messagge_for_contact} onChange={onInputChange} required></input>
                                        </div>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-12 col-sm-6'>
                                        <div className="form-group">
                                            <label >Imagen del Equipo</label>
                                            <input name="img_1" className="form-control form-control-sm" id="formFileSm" type="file" accept="image/png, image/gif, image/jpeg" onChange={(e)=>updateImg(e.target.files)} required></input>
                                        </div>
                                    </div>
                                    <div className='col-12 col-sm-6'>
                                        <div className="form-group">
                                            <label >Tipo</label>
                                            <select className="form-select" name="type" aria-label="Default select example" value={fData.type} onChange={onInputChange} required>
                                                <option value="" >Seleccione una opción</option>
                                                <option value="Sleeping" >Sleeping</option>
                                                <option value="Carpa" >Carpa</option>
                                                <option value="Mochila" >Mochila</option>
                                                <option value="Ropa" >Ropa</option>
                                                <option value="Accesorios" >Accesorios</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-success" disabled={sendingPetition}> Guardar Tour </button> &nbsp;
                                <Link to={'../list-equipment-sell'}>
                                    <button type="button" className="btn btn-danger">Regresar</button> &nbsp;
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer theme="colored" />
        </div>
    )
}

