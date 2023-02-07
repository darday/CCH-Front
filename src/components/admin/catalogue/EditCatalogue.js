import React, { useEffect, useState } from 'react'
import { useForm } from '../../../hooks/useForm';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { ApiUrl } from '../../../services/ApiRest';


export const EditCatalogue = () => {

    const { tourId } = useParams([]);
    const [isLoading, setisLoading] = useState(false);
    const [newData, setnewData] = useState({
        tour_name: '',
        tour_destiny: '',
        description: '',
        include: '',
        cost_1: '',
        cost_2: '',
        cost_3: '',
        cost_4: '',
        state: '',
        type: '',
        dificulty: '',
        discount: '',
        discount_description: '',
        contact_phone: '',
        messagge_for_contact: '',
    })
    const [loading, setloading] = useState(true)
    const [img1, setimg1] = useState([]);
    const [img2, setimg2] = useState([]);

    const getData = async () => {
        await axios.get(ApiUrl + 'show-catalogue-tour/' + tourId)
            .then(res => {
                var respuesta = res.data[0];
                setnewData({
                    tour_name: respuesta.tour_name,
                    tour_destiny: respuesta.tour_destiny,
                    description: respuesta.description,
                    include: respuesta.include,
                    cost_1: respuesta.cost_1,
                    cost_2: respuesta.cost_2,
                    cost_3: respuesta.cost_3,
                    cost_4: respuesta.cost_4,
                    state: respuesta.state,
                    type: respuesta.type,
                    dificulty: respuesta.dificulty,
                    discount: respuesta.discount,
                    discount_description: respuesta.discount_description,
                    contact_phone: respuesta.contact_phone,
                    messagge_for_contact: respuesta.messagge_for_contact,

                });
                setloading({

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


    const onsubmit = async (event) => {
        event.preventDefault();
        const f = new FormData();

        f.append("tour_name", newData.tour_name);
        f.append("tour_destiny", newData.tour_destiny);
        f.append("description", newData.description);
        f.append("include", newData.include);
        f.append("cost_1", newData.cost_1);
        f.append("cost_2", newData.cost_2);
        f.append("cost_3", newData.cost_3);
        f.append("cost_4", newData.cost_4);
        f.append("state", newData.state);
        f.append("type", newData.type);
        f.append("dificulty", newData.dificulty);
        f.append("discount", newData.discount);
        f.append("discount_description", newData.discount_description);
        f.append("contact_phone", newData.contact_phone);
        f.append("messagge_for_contact", newData.messagge_for_contact);
        if (img1[0] != undefined) {
            f.append("img_1", img1[0]);
        }

        if (img2[0] != undefined) {
            f.append("img_2", img2[0]);
        }

        notify();
        console.log(Object.fromEntries(f));
        setisLoading(true);
        await axios.post(ApiUrl + "catalogue-tour-update/" + tourId, f)
            .then(res => {
                res = res.data;
                console.log(res);
                setisLoading(false);
                if (res.success == true) {
                    success(res.messagge);
                } else {
                    error(res.messagge);
                }

            })
            .catch(e => {
                console.log(e);
                error('Error de Servidor, Contactese con soporte');
                setisLoading(false);

            })


    }
    const toastId = React.useRef(null);
    const notify = () => toastId.current = toast("Enviando Datos...", { autoClose: false,  type: toast.TYPE.INFO, position: toast.POSITION.BOTTOM_RIGHT });
    const success = (messagge) => toast.update(toastId.current, { render:messagge,type: toast.TYPE.SUCCESS, position: toast.POSITION.BOTTOM_RIGHT, autoClose: 5000 });
    const error = (messagge) => toast.update(toastId.current, { render:messagge,type: toast.TYPE.ERROR, position: toast.POSITION.BOTTOM_RIGHT, autoClose: 5000 });

    if (loading == true) {
        return (<h3>Cargando Datos...</h3>)
    }

    return (

        <div>

            <div className='row'>
                <div className='col-12 '>
                    <div className="card">
                        <div className="card-header">
                            EDITAR TOUR EN CATÁLOGO
                        </div>
                        <div className="card-body">
                            <form onSubmit={onsubmit}>
                                <div className='row'>
                                    <div className='col-12 col-sm-6'>
                                        <div className="form-group">
                                            <label >Nombre del Tour</label>
                                            <input type="text" name='tour_name' value={newData.tour_name} onChange={onInputChange} className="form-control" placeholder='Ej: Camping Sobre las Nubes' required></input>
                                        </div>
                                    </div>
                                    <div className='col-12 col-sm-6'>
                                        <div className="form-group">
                                            <label >Destino</label>
                                            <input type="text" name='tour_destiny' value={newData.tour_destiny} onChange={onInputChange} className="form-control " placeholder='Ej: Puñay' required></input>
                                        </div>
                                    </div>
                                </div>


                                <div className='row'>
                                    <div className='col-12 col-sm-6'>
                                        <div className="form-group">
                                            <label >Descripción</label>
                                            <textarea name="description" value={newData.description} onChange={onInputChange} className="form-control" id="exampleFormControlTextarea1" rows="2"></textarea>
                                        </div>
                                    </div>

                                    <div className='col-12 col-sm-6'>
                                        <div className="form-group">
                                            <label >Incluye</label>
                                            <textarea name="include" value={newData.include} onChange={onInputChange} className="form-control" id="exampleFormControlTextarea1" rows="2"></textarea>
                                        </div>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-6 col-sm-6 col-md-3'>
                                        <div className="form-group">
                                            <label >Costo 1 Persona</label>
                                            <input type="text" name="cost_1" value={newData.cost_1} onChange={onInputChange} className="form-control" placeholder='Ej: 39.49' required></input>
                                        </div>
                                    </div>
                                    <div className='col-6 col-sm-6 col-md-3'>
                                        <div className="form-group">
                                            <label >Costo 2 Personas</label>
                                            <input type="text" name="cost_2" value={newData.cost_2} onChange={onInputChange} className="form-control" placeholder='Ej: 39.49' required></input>
                                        </div>
                                    </div>
                                    <div className='col-6 col-sm-6 col-md-3'>
                                        <div className="form-group">
                                            <label >Costo 3-4 Personas</label>
                                            <input type="text" name="cost_3" value={newData.cost_3} onChange={onInputChange} className="form-control" placeholder='Ej: 39.49' required></input>
                                        </div>
                                    </div>
                                    <div className='col-6 col-sm-6 col-md-3'>
                                        <div className="form-group">
                                            <label >Costo +4 Personas</label>
                                            <input type="text" name="cost_4" value={newData.cost_4} onChange={onInputChange} className="form-control" placeholder='Ej: 39.49' required></input>
                                        </div>
                                    </div>
                                </div>

                                <div className='row'>

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
                                    <div className='col-12 col-sm-6 col-md-3'>
                                        <div className="form-group">
                                            <label >Estado</label>
                                            <select className="form-select" name='state' value={newData.state} onChange={onInputChange} aria-label="Default select example" required>
                                                <option value="">Seleccione una opción</option>
                                                <option value="1">Activo</option>
                                                <option value="0">Inactivo</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className='col-12 col-sm-6 col-md-3'>
                                        <div className="form-group">
                                            <label >Tipo</label>
                                            <select className="form-select" name="type" value={newData.type} onChange={onInputChange} aria-label="Default select example" required>
                                                <option value="" >Seleccione una opción</option>
                                                <option value="Full Day">Full Day</option>
                                                <option value="Camping">Camping</option>
                                            </select>                                        </div>
                                    </div>

                                    <div className='col-12 col-sm-6 col-md-3'>
                                        <div className="form-group">
                                            <label >Dificultad</label>
                                            <select className="form-select" name="dificulty" value={newData.dificulty} onChange={onInputChange} aria-label="Default select example" required>
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
                                            <input type="text" name='discount' value={newData.discount} onChange={onInputChange} className="form-control" placeholder='Ej: 10' required></input>
                                        </div>
                                    </div>
                                    <div className='col-6 col-sm-6 col-md-3'>
                                        <div className="form-group">
                                            <label >Descripción Descuento</label>
                                            <input type="text" name='discount_description' value={newData.discount_description} onChange={onInputChange} className="form-control" placeholder='Descuento habilitado cuando ...' required></input>
                                        </div>
                                    </div>
                                    <div className='col-6 col-sm-6 col-md-3'>
                                        <div className="form-group">
                                            <label >Número de Contacto</label>
                                            <input type="text" name='contact_phone' value={newData.contact_phone} onChange={onInputChange} className="form-control" placeholder='0961119670' required></input>
                                        </div>
                                    </div>
                                    <div className='col-6 col-sm-6 col-md-3'>
                                        <div className="form-group">
                                            <label >Mensaje a Contacto</label>
                                            <input type="text" name='messagge_for_contact' value={newData.messagge_for_contact} onChange={onInputChange} className="form-control" placeholder='Hola estoy interesado en la ruta ...' required></input>
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-success" disabled={isLoading} >Guardar Tour</button> &nbsp;
                                <Link to={'../catalogue-list'}>
                                    <button type="button" className="btn btn-danger">Regresar</button> &nbsp;
                                </Link>
                                {/* <button onClick={onClickAddTour} type="button" className="btn btn-danger">Cancelar</button> */}
                            </form>

                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer theme="colored" />

        </div>

    )
}
