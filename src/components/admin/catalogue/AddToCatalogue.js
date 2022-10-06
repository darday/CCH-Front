import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useForm } from '../../../hooks/useForm'
import { ApiUrl } from '../../../services/ApiRest';
import { startNewTourToCatalogue } from '../../../store/tour_catalogue/thunks';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AddToCatalogue = () => {

    

    const [img1, setimg1] = useState();
    const [img2, setimg2] = useState();

    const{tour_name,tour_destiny, description,include,cost_1,cost_2,cost_3,cost_4,state, type,dificulty,discount,
        discount_description,contact_phone,messagge_for_contact,img_1,img_2, onInputChange,formState} = useForm({
        tour_name:'PON A PRUEBA TU MENTE Y CUERPO',
        tour_destiny:'Altar',
        description:'Esta es una descripci[on',
        include: 'El tour incluye lo siguiente',
        cost_1:'230',
        cost_2:'150',
        cost_3:'120',
        cost_4:'80',
        state:'',
        type:'',
        dificulty:'',
        discount:'10',
        discount_description:'Esta es una descripci[on',
        contact_phone:'0961119670',
        messagge_for_contact:'Este es un mensaje',
       
    }) 

    const dispatch = useDispatch();

    const onClickAddTour =()=>{
        dispatch(startNewTourToCatalogue(formState,img1,img2));
    }



    const onsubmit = async (event) =>{
        event.preventDefault();
        const f = new FormData();

        f.append("tour_name",tour_name);
        f.append("tour_destiny",tour_destiny);
        f.append("description",description);
        f.append("include",include);
        f.append("cost_1",cost_1);
        f.append("cost_2",cost_2);
        f.append("cost_3",cost_3);
        f.append("cost_4",cost_4);
        f.append("state",state);
        f.append("type",type);
        f.append("dificulty",dificulty);
        f.append("discount",discount);
        f.append("discount_description",discount_description);
        f.append("contact_phone",contact_phone);
        f.append("messagge_for_contact",messagge_for_contact);
        f.append("img_1",img1[0]);
        f.append("img_2",img2[0]);
        
        dispatch(startNewTourToCatalogue(f));

    }

    const updateImg1 = e=>{
        setimg1(e);
    }

    const updateImg2 = e=>{
        setimg2(e);
    }

    

    return (
        <div>
            <div className='row'>
                <div className='col-12 '>
                    <div className="card">
                        <div className="card-header">
                            AGREGAR TOUR A CATÁLOGO
                        </div>
                        <div className="card-body">
                            <form onSubmit={onsubmit}>
                                <div className='row'>
                                    <div className='col-12 col-sm-6'>
                                        <div className="form-group">
                                            <label >Nombre del Tour</label>
                                            <input type="text" name='tour_name' value={tour_name} onChange={onInputChange} className="form-control"  placeholder='Ej: Camping Sobre las Nubes'  required></input>
                                        </div>
                                    </div>
                                    <div className='col-12 col-sm-6'>
                                        <div className="form-group">
                                            <label >Destino</label>
                                            <input type="text" name='tour_destiny' value={tour_destiny} onChange={onInputChange} className="form-control text-uppercase" placeholder='Ej: Puñay' required></input>
                                        </div>
                                    </div>
                                </div>

                                
                                <div className='row'>                                    
                                    <div className='col-12 col-sm-6'>
                                        <div className="form-group">
                                            <label >Descripción</label>
                                            <textarea name="description" value={description} onChange={onInputChange} className="form-control" id="exampleFormControlTextarea1" rows="2"></textarea>
                                        </div>
                                    </div>

                                    <div className='col-12 col-sm-6'>
                                        <div className="form-group">
                                            <label >Incluye</label>
                                            <textarea name="include" value={include} onChange={onInputChange} className="form-control" id="exampleFormControlTextarea1" rows="2"></textarea>
                                        </div>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-6 col-sm-6 col-md-3'>
                                        <div className="form-group">
                                            <label >Costo 1 Persona</label>
                                            <input type="text" name="cost_1" value={cost_1} onChange={onInputChange} className="form-control" placeholder='Ej: 39.49' required></input>
                                        </div>
                                    </div>
                                    <div className='col-6 col-sm-6 col-md-3'>
                                        <div className="form-group">
                                            <label >Costo 2 Personas</label>
                                            <input type="text" name="cost_2" value={cost_2} onChange={onInputChange} className="form-control" placeholder='Ej: 39.49' required></input>
                                        </div>
                                    </div>
                                    <div className='col-6 col-sm-6 col-md-3'>
                                        <div className="form-group">
                                            <label >Costo 3-4 Personas</label>
                                            <input type="text" name="cost_3" value={cost_3} onChange={onInputChange} className="form-control" placeholder='Ej: 39.49' required></input>
                                        </div>
                                    </div>
                                    <div className='col-6 col-sm-6 col-md-3'>
                                        <div className="form-group">
                                            <label >Costo +4 Personas</label>
                                            <input type="text" name="cost_4" value={cost_4} onChange={onInputChange} className="form-control" placeholder='Ej: 39.49' required></input>
                                        </div>
                                    </div>
                                </div>

                                <div className='row'>
                                    
                                    <div className='col-12 col-sm-6'>
                                        <div className="form-group">
                                            <label >Imagen Promocional</label>
                                            <input name="img_1" onChange={(e)=>updateImg1(e.target.files)} className="form-control form-control-sm" id="formFileSm" type="file"  accept="image/png, image/gif, image/jpeg" required></input>
                                        </div>
                                    </div>
                                    <div className='col-12 col-sm-6'>
                                        <div className="form-group">
                                            <label >Imagen de ruta</label>
                                            <input name="img_2" onChange={(e)=>updateImg2(e.target.files)}  className="form-control form-control-sm" id="formFileSm" type="file"  accept="image/png, image/gif, image/jpeg" required></input>
                                        </div>

                                      
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-12 col-sm-6 col-md-3'>
                                        <div className="form-group">
                                            <label >Estado</label>
                                            <select className="form-select" name='state' value={state} onChange={onInputChange} aria-label="Default select example" required>
                                                <option value="">Seleccione una opción</option>
                                                <option value="1">Activo</option>
                                                <option value="0">Inactivo</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className='col-12 col-sm-6 col-md-3'>
                                        <div className="form-group">
                                            <label >Tipo</label>
                                            <select className="form-select" name="type" value={type} onChange={onInputChange} aria-label="Default select example" required>
                                                <option value="" >Seleccione una opción</option>
                                                <option value="Full Day">Full Day</option>
                                                <option value="Camping">Camping</option>
                                            </select>                                        </div>
                                    </div>                                 
                                    
                                    <div className='col-12 col-sm-6 col-md-3'>
                                        <div className="form-group">
                                            <label >Dificultad</label>
                                            <select className="form-select" name="dificulty" value={dificulty} onChange={onInputChange} aria-label="Default select example" required>
                                                <option value="" >Seleccione una opción</option>
                                                <option value="Fácil">Fácil</option>
                                                <option value="Moderada - Fácil">Moderada - Fácil</option>
                                                <option value="Moderada">Moderada</option>
                                                <option value="Moderada - Alta">Moderada - Alta</option>
                                                <option value="Alta">Alta</option>
                                            </select>                                                        </div>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-6 col-sm-6 col-md-3'>
                                        <div className="form-group">
                                            <label >Porcentaje Descuento</label>
                                            <input type="text" name='discount' value={discount} onChange={onInputChange} className="form-control" placeholder='Ej: 10' required></input>
                                        </div>
                                    </div>
                                    <div className='col-6 col-sm-6 col-md-3'>
                                        <div className="form-group">
                                            <label >Descripción Descuento</label>
                                            <input type="text" name='discount_description' value={discount_description} onChange={onInputChange} className="form-control" placeholder='Descuento habilitado cuando ...' required></input>
                                        </div>
                                    </div>
                                    <div className='col-6 col-sm-6 col-md-3'>
                                        <div className="form-group">
                                            <label >Número de Contacto</label>
                                            <input type="text" name='contact_phone' value={contact_phone} onChange={onInputChange} className="form-control" placeholder='0961119670' required></input>
                                        </div>
                                    </div>
                                    <div className='col-6 col-sm-6 col-md-3'>
                                        <div className="form-group">
                                            <label >Mensaje a Contacto</label>
                                            <input type="text" name='messagge_for_contact' value={messagge_for_contact} onChange={onInputChange} className="form-control" placeholder='Hola estoy interesado en la ruta ...' required></input>
                                        </div>
                                    </div>
                                </div>
                               
                                <button type="submit" className="btn btn-success">Guardar Tour</button>
                                <button onClick={onClickAddTour} type="button" className="btn btn-danger">Cancelar</button>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer theme= "colored" />

        </div>
    )
}
