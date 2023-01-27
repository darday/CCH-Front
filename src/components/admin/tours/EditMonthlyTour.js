import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useForm } from '../../../hooks/useForm';
import { startNewTourToMonthly } from '../../../store/monthly_tours/thunks';

import { ToastContainer, toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ApiUrl } from '../../../services/ApiRest';

export const EditMonthlyTour = () => {

    const { tourId } = useParams([]);
    const [newData, setnewData] = useState({
        tour_name: '',
        tour_destiny: '',
        description: '',
        include: '',
        img_1: '',
        img_2: '',
        state: '',
        type: '',
        dificulty: '',
        person_cost: '',
        group_cost: '',
        discount: '',
        income: 0,
        egress: 0,
        utility: 0,
        contact_phone: '',
        messagge_for_contact: '',
        departure_date: '',
        return_date: '',
        varchar_1: '',
        varchar_2: '',
        varchar_3: ''
    })

    const [img1, setimg1] = useState([]);
    const [img2, setimg2] = useState([]);

    const getData = async () => {
        await axios.get(ApiUrl + 'monthly-tour-show-id/' + tourId)
            .then(result => {
                result = result.data[0];
                setnewData({
                    tour_name: result.tour_name,
                    tour_destiny: result.tour_destiny,
                    description: result.description,
                    include: result.include,
                    state: result.state,
                    type: result.type,
                    dificulty: result.dificulty,
                    person_cost: result.person_cost,
                    group_cost: result.group_cost,
                    discount: result.discount,
                    income: result.income,
                    egress: result.egress,
                    utility: result.utility,
                    contact_phone: result.contact_phone,
                    messagge_for_contact: result.messagge_for_contact,
                    departure_date: result.departure_date,
                    return_date: result.return_date,
                    varchar_1: result.varchar_1,
                    varchar_2: result.varchar_2,
                    varchar_3: result.varchar_3

                });
            })
            .catch(e => {
                console.log(e);
            })
    }

    useEffect(() => {
        getData();
    }, [])

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setnewData({
            ...newData,
            [name]: value
        });
    }





    const updateImg1 = e => {
        setimg1(e);
    }

    const updateImg2 = e => {
        setimg2(e);
    }


    const onSubmit = async (event) => {
        event.preventDefault();
        const f = new FormData();

        f.append("tour_name", newData.tour_name);
        f.append("tour_destiny", newData.tour_destiny);
        f.append("description", newData.description);
        f.append("include", newData.include);
        f.append("state", newData.state);
        f.append("type", newData.type);
        f.append("person_cost", newData.person_cost);
        f.append("group_cost", newData.group_cost);
        f.append("dificulty", newData.dificulty);
        f.append("discount", newData.discount);
        f.append("departure_date", newData.departure_date);
        f.append("return_date", newData.return_date);
        f.append("contact_phone", newData.contact_phone);
        f.append("messagge_for_contact", newData.messagge_for_contact);
        f.append("income", newData.income);
        f.append("egress", newData.egress);
        f.append("utility", newData.utility);
        f.append("img_1", img1[0]);
        f.append("img_2", img2[0]);

        console.log(Object.fromEntries(f));

        await axios.post(ApiUrl + "monthly-tour-update/" + tourId, f)
        .then(res => {
            console.log(res);
            console.log('vamos a ver q pasa');
            toast.success("Tour Editado exitosamente", { position: toast.POSITION.BOTTOM_RIGHT });

        })
        .catch(e => {
            console.log(e);
            toast.danger("Tour No Editado!!", { position: toast.POSITION.BOTTOM_RIGHT });

        })

    }

    return (
        <div>
            <div className='row'>
                <div className='col-12 '>
                    <div className="card">
                        <div className="card-header">
                            EDITAR TOUR MENSUAL
                        </div>
                        <div className="card-body">
                            <form onSubmit={onSubmit}>
                                <div className='row'>
                                    <div className='col-12 col-sm-6'>
                                        <div className="form-group">
                                            <label >Nombre del Tour</label>
                                            <input type="text" name='tour_name' value={newData.tour_name} onChange={onInputChange} className="form-control" placeholder='Ej: Camping Sobre las Nubes' ></input>
                                        </div>
                                    </div>
                                    <div className='col-12 col-sm-6'>
                                        <div className="form-group">
                                            <label >Destino</label>
                                            <input type="text" name='tour_destiny' value={newData.tour_destiny} onChange={onInputChange} className="form-control" placeholder='Ej: Puñay'></input>
                                        </div>
                                    </div>
                                </div>


                                <div className='row'>

                                    <div className='col-12 col-sm-12'>
                                        <div className="form-group">
                                            <label >Descripción</label>
                                            <textarea className="form-control" name='description' value={newData.description} onChange={onInputChange} id="exampleFormControlTextarea1" rows="2"></textarea>
                                        </div>
                                    </div>

                                    <div className='col-12 col-sm-12'>
                                        <div className="form-group">
                                            <label >Incluye</label>
                                            <textarea className="form-control" name='include' value={newData.include} onChange={onInputChange} id="exampleFormControlTextarea1" rows="2"></textarea>
                                        </div>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-12 col-sm-6 col-md-3'>
                                        <div className="form-group">
                                            <label >Estado</label>
                                            <select className="form-select" name='state' value={newData.state} onChange={onInputChange} aria-label="Default select example">
                                                <option value="" >Seleccione una opcion</option>
                                                <option value="1">Activo</option>
                                                <option value="0">Inactivo</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className='col-12 col-sm-6 col-md-3'>
                                        <div className="form-group">
                                            <label >Tipo</label>
                                            <select className="form-select" name='type' value={newData.type} onChange={onInputChange} aria-label="Default select example">
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
                                            <input type="text" name='person_cost' value={newData.person_cost} onChange={onInputChange} className="form-control" placeholder='Ej: 39.49'></input>
                                        </div>
                                    </div>
                                    <div className='col-12 col-sm-6 col-md-3'>
                                        <div className="form-group">
                                            <label >Costo Grupo +4 personas</label>
                                            <input type="text" name='group_cost' value={newData.group_cost} onChange={onInputChange} className="form-control" placeholder='Ej: 39.49'></input>
                                        </div>

                                    </div>
                                </div>

                                {console.log(newData.dificulty)}
                                <div className='row'>
                                    <div className='col-12 col-sm-3'>
                                        <div className="form-group">
                                            <label >Dificultad</label>
                                            <select className="form-select" name='dificulty' value={newData.dificulty} onChange={onInputChange} aria-label="Default select example">
                                                <option value="" >Seleccione una opcion</option>
                                                <option value="Facil">Facil</option>
                                                <option value="Moderada - Facil">Moderada - Facil</option>
                                                <option value="Moderada">Moderada</option>
                                                <option value="Moderada - Alta">Moderada - Alta</option>
                                                <option value="Alta">Alta</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className='col-12 col-sm-3'>
                                        <div className="form-group">
                                            <label >Porcentaje Descuento</label>
                                            <input type="text" name='discount' value={newData.discount} onChange={onInputChange} className="form-control" placeholder='Ej: 39.49'></input>
                                        </div>
                                    </div>
                                    <div className='col-12 col-sm-3'>
                                        <div className="form-group">
                                            <label >Fecha de Salida:</label>
                                            <input type="date" name='departure_date' value={newData.departure_date} onChange={onInputChange} className="form-control" id="exampleInputEmail1"  ></input>
                                        </div>
                                    </div>
                                    <div className='col-12 col-sm-3'>
                                        <div className="form-group">
                                            <label >Fecha de Regreso:</label>
                                            <input type="date" name='return_date' value={newData.return_date} onChange={onInputChange} className="form-control" id="exampleInputEmail1"  ></input>
                                        </div>
                                    </div>
                                    <div className='col-12 col-sm-6'>
                                        <div className="form-group">
                                            <label >Imagen Promocional</label>
                                            <input name="img_1" onChange={(e) => updateImg1(e.target.files)} className="form-control form-control-sm" id="formFileSm" type="file" accept="image/png, image/gif, image/jpeg" ></input>
                                        </div>
                                    </div>
                                    <div className='col-12 col-sm-6'>
                                        <div className="form-group">
                                            <label >Imagen de ruta</label>
                                            <input name="img_2" onChange={(e) => updateImg2(e.target.files)} className="form-control form-control-sm" id="formFileSm" type="file" accept="image/png, image/gif, image/jpeg" ></input>
                                        </div>


                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-12 col-sm-6'>
                                        <div className="form-group">
                                            <label >Telefono de Contacto</label>
                                            <input type="text" name='contact_phone' value={newData.contact_phone} onChange={onInputChange} className="form-control" placeholder='Ej: 0961119670' ></input>
                                        </div>
                                    </div>
                                    <div className='col-12 col-sm-6'>
                                        <div className="form-group">
                                            <label >Destino</label>
                                            <input type="text" name='messagge_for_contact' value={newData.messagge_for_contact} onChange={onInputChange} className="form-control" placeholder='Ej: Puñay'></input>
                                        </div>
                                    </div>
                                </div>

                                <hr></hr>
                                <div className='row'>
                                    <small>Estos campos llenar al final de la ruta. Cuando se haya realizado el reporte de ruta</small>
                                    <div className='col-12 col-sm-4'>
                                        <div className="form-group">
                                            <label >Ingreso</label>
                                            <input name='income' value={newData.income} onChange={onInputChange} type="text" className="form-control" placeholder='Ej: 39.49'></input>
                                        </div>
                                    </div>
                                    <div className='col-12 col-sm-3'>
                                        <div className="form-group">
                                            <label >Egreso</label>
                                            <input type="text" name='egress' value={newData.egress} onChange={onInputChange} className="form-control" id="exampleInputEmail1"  ></input>
                                        </div>
                                    </div>
                                    <div className='col-12 col-sm-3'>
                                        <div className="form-group">
                                            <label >Utilidad:</label>
                                            <input type="text" name='utility' value={newData.utility} onChange={onInputChange} className="form-control" id="exampleInputEmail1"  ></input>
                                        </div>
                                    </div>

                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer theme="colored" />

        </div>
    )
}
