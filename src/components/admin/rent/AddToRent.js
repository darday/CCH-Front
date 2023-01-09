import React, { useState } from 'react'
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

export const AddToRent = () => {
    const [img, setimg] = useState()
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
            name: 'Carpa',
            description: 'Es una carpa',
            cost: '10.00',
            state: '1',
            discount: '15',
            discount_description: 'Descripcion 1',
            contact_phone: '123456789',
            messagge_for_contact: 'Mensaje 1',
            type: 'Carpa',
        });
    }, [])

    const onSubmit = (event) => {
        event.preventDefault();
         console.log(img);
        console.log(fData);

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
        
        console.log(Object.fromEntries(form));

    }

    const updateImg = (e) => {
        setimg(e);
    }


    return (
        <div>
            <div className='row'>
                <div className='col-12 '>
                    <div className="card">
                        <div className="card-header">
                            AGREGAR EQUIPO
                        </div>
                        <div className="card-body">
                            <form onSubmit={onSubmit}>
                                <div className='row'>
                                    <div className='col-12 col-sm-6'>
                                        <div className="form-group">
                                            <label >Nombre del Equipo</label>
                                            <input type="text" name='name' className="form-control" placeholder='Ej: Carpa' value={fData.name} onChange={onInputChange} ></input>
                                        </div>
                                    </div>
                                    <div className='col-12 col-sm-6'>
                                        <div className="form-group">
                                            <label >Descripción</label>
                                            <input type="text" name='description' className="form-control" value={fData.description} placeholder='Ej: Tienda de campaña impermeable ultraligera' onChange={onInputChange} ></input>
                                        </div>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-12 col-sm-6 col-md-3'>
                                        <div className="form-group">
                                            <label >Precio</label>
                                            <input className="form-control" name='cost' placeholder='Ej: 00.00' value={fData.cost} onChange={onInputChange}></input>

                                        </div>
                                    </div>
                                    <div className='col-12 col-sm-6 col-md-3'>
                                        <div className="form-group">
                                            <label >Estado</label>
                                            <select className="form-select" name="state" aria-label="Default select example" value={fData.state} onChange={onInputChange} >
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
                                                <input name="discount" className="form-control" placeholder='Ej: 0%' value={fData.discount} onChange={onInputChange} ></input>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-12 col-sm-6 col-md-3'>
                                        <div className="form-group">
                                            <label >Descripción del Descuento</label>
                                            <input name="discount_description" className="form-control" placeholder='Ej: Descuentos' value={fData.discount_description} onChange={onInputChange}></input>
                                        </div>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-12 col-sm-6 col-md-3'>
                                        <div className="form-group">
                                            <label >Teléfono</label>
                                            <input type="text" name='contact_phone' className="form-control" placeholder='Ej: 123456789' value={fData.contact_phone} onChange={onInputChange} ></input>
                                        </div>
                                    </div>
                                    <div className='col-12 col-sm-6 col-md-9'>
                                        <div className="form-group">
                                            <label >Mensaje</label>
                                            <input type="text" name='messagge_for_contact' className="form-control text-uppercase" value={fData.messagge_for_contact} onChange={onInputChange} ></input>
                                        </div>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-12 col-sm-6'>
                                        <div className="form-group">
                                            <label >Imagen del Equipo</label>
                                            <input name="img_1" className="form-control form-control-sm" id="formFileSm" type="file" accept="image/png, image/gif, image/jpeg" onChange={(e)=>updateImg(e.target.files)} ></input>
                                        </div>
                                    </div>
                                    <div className='col-12 col-sm-6'>
                                        <div className="form-group">
                                            <label >Tipo</label>
                                            <select className="form-select" name="type" aria-label="Default select example" value={fData.type} onChange={onInputChange}>
                                                <option value="" >Seleccione una opción</option>
                                                <option value="1" >Sleeping</option>
                                                <option value="2" >Carpa</option>
                                                <option value="3" >Mochila</option>
                                                <option value="4" >Ropa</option>
                                                <option value="5" >Accesorios</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-success"> Guardar Tour </button> &nbsp;
                                <button type="button" className="btn btn-danger"> Cancelar </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer theme="colored" />
        </div>
    )
}

