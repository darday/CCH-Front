import React, { useState } from 'react'
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

export const AddToEquipmentSell = () => {
    const [FormData, setFormData] = useState({  //Es un hook = useState
        name: '',
        description: '',
        cost: '',
        state: '',
        discount: 0,
        discount_description: '',
        contact_phone: '',
        messagge_for_contact: '',
    });
    
    const onInputChange=()=>{
        console.log('DAVID PACA');
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
        });      
     }, [])
    
    console.log(FormData);
  return (
    <div>
            <div className='row'>
                <div className='col-12 '>
                    <div className="card">
                        <div className="card-header">
                            AGREGAR EQUIPO 
                        </div>
                        <div className="card-body">
                            <form onSubmit={onsubmit}>
                                <div className='row'>
                                    <div className='col-12 col-sm-6'>
                                        <div className="form-group">
                                            <label >Nombre del Equipo</label>
                                            <input type="text" name='name' className="form-control"  placeholder='Ej: Carpa' value={FormData.name} onChange={onInputChange} required></input>
                                        </div>
                                    </div>
                                    <div className='col-12 col-sm-6'>
                                        <div className="form-group">
                                            <label >Descripción</label>
                                            <input type="text" name='description' className="form-control" placeholder='Ej: Tienda de campaña impermeable ultraligera' required></input>
                                        </div>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-12 col-sm-6 col-md-3'>
                                        <div className="form-group">
                                            <label >Precio</label>
                                            <input className="form-control" name='cost' placeholder='Ej: 00.00' required></input>
                                            
                                        </div>
                                    </div>                                                                          
                                    <div className='col-12 col-sm-6 col-md-3'>
                                        <div className="form-group">
                                            <label >Estado</label>
                                            <select className="form-select" name="state" aria-label="Default select example" required>
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
                                                <input name="discount" className="form-control"  placeholder='Ej: 0%' required></input>
                                            </div> 
                                        </div>
                                    </div>
                                    <div className='col-12 col-sm-6 col-md-3'>
                                        <div className="form-group">                                             
                                            <label >Descripción del Descuento</label>
                                            <input name="discount_description" className="form-control"  placeholder='Ej: Descuentos' required></input>                                        
                                        </div>
                                    </div>
                                </div>

                                <div className='row'>                                                                        
                                    <div className='col-12 col-sm-6 col-md-3'>
                                        <div className="form-group">                                            
                                            <label >Teléfono</label>
                                            <input type="text" name='contact_phone' className="form-control"  placeholder='Ej: 123456789'  required></input>                                                    
                                        </div>
                                    </div>                                    
                                    <div className='col-12 col-sm-6 col-md-9'>
                                        <div className="form-group">
                                            <label >Mensaje</label>
                                            <input type="text" name='messagge_for_contact' className="form-control text-uppercase" required></input>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className='row'>
                                    <div className='col-12 col-sm-6'>
                                        <div className="form-group">
                                            <label >Imagen del Equipo</label>
                                            <input name="img_1" className="form-control form-control-sm" id="formFileSm" type="file"  accept="image/png, image/gif, image/jpeg" required></input>
                                        </div>
                                    </div> 
                                    <div className='col-12 col-sm-6'>
                                        <div className="form-group">
                                            <label >Tipo</label>
                                            <select className="form-select" name="type" aria-label="Default select example" required>
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
            <ToastContainer theme= "colored" />    
    </div>    
  )
}

