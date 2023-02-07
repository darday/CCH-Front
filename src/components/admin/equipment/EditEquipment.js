import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'
import { ApiUrl } from '../../../services/ApiRest';

export const EditEquipment = () => {
    const { equipmentId } = useParams([]);
    const [isLoading, setisLoading] = useState(false);
    const [newData, setnewData] = useState({
        name: '',
        description: '',
        cost: '',
        state: '',
        discount: 0,
        discount_description: '',
        contact_phone: '',
        messagge_for_contact: '',
        type: '',
    })

    const [loading, setloading] = useState(true)
    const [img1, setimg1] = useState([]);

    const getData = async ()=>{
        await axios.get(ApiUrl+'equipment-show/'+equipmentId)
        .then(resp=>{
            var respuesta=resp.data[0];
            setnewData({
                name:respuesta.name,
                description:respuesta.description,
                cost:respuesta.cost,
                state:respuesta.state,
                discount:respuesta.discount,
                discount_description:respuesta.discount_description,
                contact_phone:respuesta.contact_phone,
                messagge_for_contact:respuesta.messagge_for_contact,
                type:respuesta.type,

            })

        })
        .catch(e=>{
            console.log(e);
        })
    }
    console.log(newData);

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setnewData({
            ...newData,
            [name]: value
        });
    }

    const updateImg = e => {
        setimg1(e);
    }

    const onsubmit = async (event) => {
        event.preventDefault();
        const f = new FormData();

        f.append("name", newData.name);
        f.append("description", newData.description);
        f.append("cost", newData.cost);
        f.append("state", newData.state);
        f.append("type", newData.type);
        f.append("discount", newData.discount);
        f.append("discount_description", newData.discount_description);
        f.append("contact_phone", newData.contact_phone);
        f.append("messagge_for_contact", newData.messagge_for_contact);
        
        if (img1[0] != undefined) {
            f.append("img_1", img1[0]);
        }

        notify();
        console.log(Object.fromEntries(f));
        setisLoading(true);
        await axios.post(ApiUrl + "equipment-update/" + equipmentId, f)
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


    useEffect(() => {
      getData();
    }, [])
    


    return (
        <div>
            <div className='row'>
                <div className='col-12 '>
                    <div className="card">
                        <div className="card-header">
                            EDITAR EQUIPO
                        </div>
                        <div className="card-body">
                            <form onSubmit={onsubmit}>
                                <div className='row'>
                                    <div className='col-12 col-sm-6'>
                                        <div className="form-group">
                                            <label >Nombre del Equipo</label>
                                            <input type="text" name='name' className="form-control" placeholder='Ej: Carpa' value={newData.name} onChange={onInputChange} required ></input>
                                        </div>
                                    </div>
                                    <div className='col-12 col-sm-6'>
                                        <div className="form-group">
                                            <label >Descripción</label>
                                            <input type="text" name='description' className="form-control" value={newData.description} placeholder='Ej: Tienda de campaña impermeable ultraligera' onChange={onInputChange} required></input>
                                        </div>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-12 col-sm-6 col-md-3'>
                                        <div className="form-group">
                                            <label >Precio</label>
                                            <input className="form-control" name='cost' placeholder='Ej: 00.00' value={newData.cost} onChange={onInputChange} required></input>

                                        </div>
                                    </div>
                                    <div className='col-12 col-sm-6 col-md-3'>
                                        <div className="form-group">
                                            <label >Estado</label>
                                            <select className="form-select" name="state" aria-label="Default select example" value={newData.state} onChange={onInputChange} required>
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
                                                <input name="discount" className="form-control" placeholder='Ej: 0%' value={newData.discount} onChange={onInputChange} required></input>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-12 col-sm-6 col-md-3'>
                                        <div className="form-group">
                                            <label >Descripción del Descuento</label>
                                            <input name="discount_description" className="form-control" placeholder='Ej: Descuentos' value={newData.discount_description} onChange={onInputChange} required></input>
                                        </div>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-12 col-sm-6 col-md-3'>
                                        <div className="form-group">
                                            <label >Teléfono</label>
                                            <input type="text" name='contact_phone' className="form-control" placeholder='Ej: 123456789' value={newData.contact_phone} onChange={onInputChange} required></input>
                                        </div>
                                    </div>
                                    <div className='col-12 col-sm-6 col-md-9'>
                                        <div className="form-group">
                                            <label >Mensaje</label>
                                            <input type="text" name='messagge_for_contact' className="form-control text-uppercase" value={newData.messagge_for_contact} onChange={onInputChange} required></input>
                                        </div>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-12 col-sm-6'>
                                        <div className="form-group">
                                            <label >Imagen del Equipo</label>
                                            <input name="img_1" className="form-control form-control-sm" id="formFileSm" type="file" accept="image/png, image/gif, image/jpeg" onChange={(e) => updateImg(e.target.files)} ></input>
                                        </div>
                                    </div>
                                    <div className='col-12 col-sm-6'>
                                        <div className="form-group">
                                            <label >Tipo</label>
                                            <select className="form-select" name="type" aria-label="Default select example" value={newData.type} onChange={onInputChange} required>
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
                                <button type="submit" className="btn btn-success" disabled={isLoading} > Guardar Tour </button> &nbsp;
                                <Link to={'../list-equipment-sell'}>
                                    <button type="button" className="btn btn-danger">Regresar</button> &nbsp;
                                </Link>                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer theme="colored" />
        </div>
    )
}
