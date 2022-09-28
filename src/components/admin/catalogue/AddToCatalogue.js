import React from 'react'
import { useForm } from '../../../hooks/useForm'

export const AddToCatalogue = () => {

    const{tour_name,tour_destiny, description,include,cost_1,cost_2,cost_3,cost_4,state, type,dificulty,discount,discount_description,contact_phone,message_for_contacto, onInputChange,formState} = useForm({
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
        message_for_contacto:'Este es un mensaje',
        img_1:'',
        img_2:'',
    }) 

    const onsubmit = (event) =>{
        event.preventDefault();
        console.log(formState);       

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
                                            <input type="text" name='tour_name' value={tour_name} onChange={onInputChange} className="form-control"  placeholder='Ej: Camping Sobre las Nubes' ></input>
                                        </div>
                                    </div>
                                    <div className='col-12 col-sm-6'>
                                        <div className="form-group">
                                            <label >Destino</label>
                                            <input type="text" name='tour_destiny' value={tour_destiny} onChange={onInputChange} className="form-control text-uppercase" placeholder='Ej: Puñay'></input>
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
                                            <input type="text" name="cost_1" value={cost_1} onChange={onInputChange} className="form-control" placeholder='Ej: 39.49'></input>
                                        </div>
                                    </div>
                                    <div className='col-6 col-sm-6 col-md-3'>
                                        <div className="form-group">
                                            <label >Costo 2 Personas</label>
                                            <input type="text" name="cost_2" value={cost_2} onChange={onInputChange} className="form-control" placeholder='Ej: 39.49'></input>
                                        </div>
                                    </div>
                                    <div className='col-6 col-sm-6 col-md-3'>
                                        <div className="form-group">
                                            <label >Costo 3-4 Personas</label>
                                            <input type="text" name="cost_3" value={cost_3} onChange={onInputChange} className="form-control" placeholder='Ej: 39.49'></input>
                                        </div>
                                    </div>
                                    <div className='col-6 col-sm-6 col-md-3'>
                                        <div className="form-group">
                                            <label >Costo +4 Personas</label>
                                            <input type="text" name="cost_4" value={cost_4} onChange={onInputChange} className="form-control" placeholder='Ej: 39.49'></input>
                                        </div>
                                    </div>
                                </div>

                                <div className='row'>
                                    
                                    <div className='col-12 col-sm-6'>
                                        <div className="form-group">
                                            <label >Imagen Promocional</label>
                                            <input className="form-control form-control-sm" id="formFileSm" type="file"  accept="image/png, image/gif, image/jpeg"></input>
                                        </div>
                                    </div>
                                    <div className='col-12 col-sm-6'>
                                        <div className="form-group">
                                            <label >Imagen de ruta</label>
                                            <input className="form-control form-control-sm" id="formFileSm" type="file"  accept="image/png, image/gif, image/jpeg"></input>
                                        </div>

                                      
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-12 col-sm-6 col-md-3'>
                                        <div className="form-group">
                                            <label >Estado</label>
                                            <select className="form-select" name='state' value={state} onChange={onInputChange} aria-label="Default select example">
                                                <option >Seleccione una opcion</option>
                                                <option value="Activo">Activo</option>
                                                <option value="Inactivo">Inactivo</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className='col-12 col-sm-6 col-md-3'>
                                        <div className="form-group">
                                            <label >Tipo</label>
                                            <select className="form-select" name="type" value={type} onChange={onInputChange} aria-label="Default select example">
                                                <option >Seleccione una opcion</option>
                                                <option value="Full Day">Full Day</option>
                                                <option value="Camping">Camping</option>
                                            </select>                                        </div>
                                    </div>                                 
                                    
                                    <div className='col-12 col-sm-6 col-md-3'>
                                        <div className="form-group">
                                            <label >Dificultad</label>
                                            <select className="form-select" name="dificulty" value={dificulty} onChange={onInputChange} aria-label="Default select example">
                                                <option >Seleccione una opcion</option>
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
                                            <input type="text" name='discount' value={discount} onChange={onInputChange} className="form-control" placeholder='Ej: 10'></input>
                                        </div>
                                    </div>
                                    <div className='col-6 col-sm-6 col-md-3'>
                                        <div className="form-group">
                                            <label >Descripción Descuento</label>
                                            <input type="text" name='discount_description' value={discount_description} onChange={onInputChange} className="form-control" placeholder='Descuento habilitado cuando ...'></input>
                                        </div>
                                    </div>
                                    <div className='col-6 col-sm-6 col-md-3'>
                                        <div className="form-group">
                                            <label >Número de Contacto</label>
                                            <input type="text" name='contact_phone' value={contact_phone} onChange={onInputChange} className="form-control" placeholder='0961119670'></input>
                                        </div>
                                    </div>
                                    <div className='col-6 col-sm-6 col-md-3'>
                                        <div className="form-group">
                                            <label >Mensaje a Contacto</label>
                                            <input type="text" name='message_for_contacto' value={message_for_contacto} onChange={onInputChange} className="form-control" placeholder='Hola estoy interesado en la ruta ...'></input>
                                        </div>
                                    </div>
                                </div>
                               
                                <button type="submit" className="btn btn-success">Guardar Tour</button>
                                <button type="button" className="btn btn-danger">Cancelar</button>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
