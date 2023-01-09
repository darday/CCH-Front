import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useForm } from '../../../hooks/useForm';
import { startNewTourToMonthly } from '../../../store/monthly_tours/thunks';

export const AddMonthlyTour = () => {
    const [img1, setimg1] = useState();
    const [img2, setimg2] = useState();

    const {tour_name, tour_destiny,description,include,state,type, person_cost,
        group_cost,dificulty,discount,departure_date,return_date,income, egress,
        utility,contact_phone,messagge_for_contact, onInputChange,formState} = useForm({
            tour_name:'CAMPING SOBRE LAS NUBES', 
            tour_destiny:'CERRO PU;AY',
            description:'Acompañanos a visitar una de las lagunas más hermosas del ecuador y contemplar un cielo estrellado y hermoso. Es una aventura que sin duda no te la puedes perder.',
            include:'Carpa de media-alta montaña. Sleeping Bag, Aislante térmico, Cena sábado, Desayuno Domingo, Ticket de ingreso al atractivo, Charla y observación astronómica, Guianza.',
            state:1,
            type:'Camping',
            person_cost:40,
            group_cost:35,
            dificulty:'MODERADA',
            discount:0,
            contact_phone:'0961119670',
            messagge_for_contact:'Hola me gustaría reservar mi cupo para la ruta mensual',
            departure_date:'2023-01-28',
            return_date:'2023-01-29',
            income:'', 
            egress:'',
            utility:'', 
    })

    const updateImg1 = e=>{
        setimg1(e);
    }

    const updateImg2 = e=>{
        setimg2(e);
    }

    const dispatch = useDispatch();

    const onClickAddMonthlyTour =()=>{
        dispatch(startNewTourToMonthly(formState,img1,img2))
    }

    const onSubmit = async (event) =>{
        event.preventDefault();
        const f = new FormData();

        f.append("tour_name",tour_name);
        f.append("tour_destiny",tour_destiny);
        f.append("description",description);
        f.append("include",include);
        f.append("state",state);
        f.append("type",type);
        f.append("person_cost",person_cost);
        f.append("group_cost",group_cost);
        f.append("dificulty",dificulty);
        f.append("discount",discount);
        f.append("departure_date",departure_date);
        f.append("return_date",return_date);
        f.append("contact_phone",contact_phone);
        f.append("messagge_for_contact",messagge_for_contact);
        f.append("income",income);
        f.append("egress",egress);
        f.append("utility",utility);
        f.append("img_1",img1[0]);
        f.append("img_2",img2[0]);

        console.log(Object.fromEntries(f));

        dispatch(startNewTourToMonthly(f));

        
    }

    return (
        <div>
            <div className='row'>
                <div className='col-12 '>
                    <div className="card">
                        <div className="card-header">
                            AGREGAR TOUR MENSUAL
                        </div>
                        <div className="card-body">
                            <form onSubmit={onSubmit}>
                                <div className='row'>
                                    <div className='col-12 col-sm-6'>
                                        <div className="form-group">
                                            <label >Nombre del Tour</label>
                                            <input type="text" name='tour_name' value={tour_name} onChange={onInputChange} className="form-control" placeholder='Ej: Camping Sobre las Nubes' ></input>
                                        </div>
                                    </div>
                                    <div className='col-12 col-sm-6'>
                                        <div className="form-group">
                                            <label >Destino</label>
                                            <input type="text" name='tour_destiny' value={tour_destiny} onChange={onInputChange} className="form-control" placeholder='Ej: Puñay'></input>
                                        </div>
                                    </div>
                                </div>


                                <div className='row'>

                                    <div className='col-12 col-sm-12'>
                                        <div className="form-group">
                                            <label >Descripción</label>
                                            <textarea className="form-control" name='description' value={description} onChange={onInputChange}  id="exampleFormControlTextarea1" rows="2"></textarea>
                                        </div>
                                    </div>

                                    <div className='col-12 col-sm-12'>
                                        <div className="form-group">
                                            <label >Incluye</label>
                                            <textarea className="form-control" name='include' value={include} onChange={onInputChange} id="exampleFormControlTextarea1" rows="2"></textarea>
                                        </div>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-12 col-sm-6 col-md-3'>
                                        <div className="form-group">
                                            <label >Estado</label>
                                            <select className="form-select" name='state' value={state} onChange={onInputChange} aria-label="Default select example">
                                                <option value="" >Seleccione una opcion</option>
                                                <option value="1">Activo</option>
                                                <option value="0">Inactivo</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className='col-12 col-sm-6 col-md-3'>
                                        <div className="form-group">
                                            <label >Tipo</label>
                                            <select className="form-select" name='type' value={type} onChange={onInputChange}   aria-label="Default select example">
                                                <option value="" >Seleccione una opcion</option>
                                                <option value="Full Day">Full Day</option>
                                                <option value="Camping">Camping</option>
                                                <option value="Camping">Descanso en Refugio</option>
                                                <option value="Intento de Cumbre">Intento de Cumbre</option>
                                                <option value="Cumbre">Cumbre</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className='col-12 col-sm-6 col-md-3'>
                                        <div className="form-group">
                                            <label >Costo por Persona</label>
                                            <input type="text" name='person_cost' value={person_cost} onChange={onInputChange} className="form-control" placeholder='Ej: 39.49'></input>
                                        </div>
                                    </div>
                                    <div className='col-12 col-sm-6 col-md-3'>
                                        <div className="form-group">
                                            <label >Costo Grupo +4 personas</label>
                                            <input type="text" name='group_cost' value={group_cost} onChange={onInputChange} className="form-control" placeholder='Ej: 39.49'></input>
                                        </div>

                                    </div>
                                </div>


                                <div className='row'>
                                    <div className='col-12 col-sm-3'>
                                        <div className="form-group">
                                            <label >Dificultad</label>
                                            <select className="form-select" name='dificulty' valor={dificulty} onChange={onInputChange} aria-label="Default select example">
                                                <option value="" >Seleccione una opcion</option>
                                                <option value="activo">Facil</option>
                                                <option value="inactivo">Moderada - Facil</option>
                                                <option value="inactivo">Moderada</option>
                                                <option value="inactivo">Moderada - Alta</option>
                                                <option value="inactivo">Alta</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className='col-12 col-sm-3'>
                                        <div className="form-group">
                                            <label >Porcentaje Descuento</label>
                                            <input type="text" name='discount' value={discount} onChange={onInputChange} className="form-control" placeholder='Ej: 39.49'></input>
                                        </div>
                                    </div>
                                    <div className='col-12 col-sm-3'>
                                        <div className="form-group">
                                            <label >Fecha de Salida:</label>
                                            <input type="date" name='departure_date' value={departure_date} onChange={onInputChange} className="form-control" id="exampleInputEmail1"  ></input>
                                        </div>
                                    </div>
                                    <div className='col-12 col-sm-3'>
                                        <div className="form-group">
                                            <label >Fecha de Regreso:</label>
                                            <input type="date" name='return_date' value={return_date} onChange={onInputChange} className="form-control" id="exampleInputEmail1"  ></input>
                                        </div>
                                    </div>
                                    <div className='col-12 col-sm-6'>
                                        <div className="form-group">
                                            <label >Imagen Promocional</label>
                                            <input name="img_1" onChange={(e)=>updateImg1(e.target.files)} className="form-control form-control-sm" id="formFileSm" type="file" accept="image/png, image/gif, image/jpeg" required></input>
                                        </div>
                                    </div>
                                    <div className='col-12 col-sm-6'>
                                        <div className="form-group">
                                            <label >Imagen de ruta</label>
                                            <input name="img_2" onChange={(e)=>updateImg2(e.target.files)} className="form-control form-control-sm" id="formFileSm" type="file" accept="image/png, image/gif, image/jpeg" required></input>
                                        </div>


                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-12 col-sm-6'>
                                        <div className="form-group">
                                            <label >Telefono de Contacto</label>
                                            <input type="text" name='contact_phone' value={contact_phone} onChange={onInputChange} className="form-control" placeholder='Ej: 0961119670' ></input>
                                        </div>
                                    </div>
                                    <div className='col-12 col-sm-6'>
                                        <div className="form-group">
                                            <label >Destino</label>
                                            <input type="text" name='messagge_for_contact' value={messagge_for_contact} onChange={onInputChange} className="form-control" placeholder='Ej: Puñay'></input>
                                        </div>
                                    </div>
                                </div>

                                <hr></hr>
                                <div className='row'>
                                    <small>Estos campos llenar al final de la ruta. Cuando se haya realizado el reporte de ruta</small>
                                    <div className='col-12 col-sm-4'>
                                        <div className="form-group">
                                            <label >Ingreso</label>
                                            <input name='income' value={income} onChange={onInputChange} type="text" className="form-control" placeholder='Ej: 39.49'></input>
                                        </div>
                                    </div>
                                    <div className='col-12 col-sm-3'>
                                        <div className="form-group">
                                            <label >Egreso</label>
                                            <input type="text" name='egress' value={egress} onChange={onInputChange} className="form-control" id="exampleInputEmail1"  ></input>
                                        </div>
                                    </div>
                                    <div className='col-12 col-sm-3'>
                                        <div className="form-group">
                                            <label >Utilidad:</label>
                                            <input type="text" name='utility' value={utility} onChange={onInputChange} className="form-control" id="exampleInputEmail1"  ></input>
                                        </div>
                                    </div>
                
                                </div>
                                <button type="submit"  className="btn btn-primary">Submit</button>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
