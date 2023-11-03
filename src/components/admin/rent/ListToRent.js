import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { ApiUrl } from '../../../services/ApiRest';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';


export const ListToRent = () => {
    const [listData, setListData] = useState([]);
    const [selectedEquipment, setSelectedEquipment] = useState([]);

    const dataList = async () => {
        await axios.get(ApiUrl + 'equipment-rent-list')
            .then(resp => {
                const data = resp.data
                setListData(data);

                //cargamos los datos nuevos
                const script = document.createElement("script");
                script.src = `/assets/dataTable/dataTable.js`;
                script.async = true;
                document.body.appendChild(script);
            })
            .catch(err => {
                console.log(err);
            })
    }


    const deleteTable = () => {
        const script1 = document.createElement("script");
        script1.src = `/assets/dataTable/datatable-destroy.js`;
        script1.async = true;
        document.body.appendChild(script1);
    }

    const selectEquipment = (data) => {
        setSelectedEquipment(data);
        console.log(data);
    }

    const deleteTour = async () => {
        await axios.post(ApiUrl + 'equipment-rent-delete/' + selectedEquipment.equipment_rent_id)
            .then(resp => {
                toast.success("Equipo eliminado exitosamente", { position: toast.POSITION.BOTTOM_RIGHT });
                deleteTable();
                dataList();
            })
            .catch(e => {
                console.log(e);
            })
    }
    useEffect(() => {
        dataList()
    }, [])
    return (
        <div>
            <div className='row'>
                <div className='col-12 '>
                    <div className="card">
                        <div className="card-header">
                            PRODUCTOS A ALQUILAR
                        </div>
                        <div className="card-body table-responsive">
                            <table className='table table-hover ' id="dataTable"  >
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Nombre</th>
                                        {/* <th>Descripción</th> */}
                                        <th>Costo</th>
                                        <th>Está Activo?</th>
                                        <th>Decuento</th>
                                        <th>Descripción descuento</th>
                                        <th>Contacto</th>
                                        <th>Tipo</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {console.log(listData)}
                                    {listData.map((equip, i) => (
                                        <tr key={equip.equipment_rent_id}>
                                            <td>{i + 1}</td>
                                            <td>{equip.product}</td>
                                            {/* <td>{equip.description}</td> */}
                                            <td>{equip.rent_price}</td>
                                            <td>{equip.isActive}</td>
                                            <td>{equip.discount}</td>
                                            <td>{equip.discount_description}</td>
                                            <td>{equip.contact_phone}</td>
                                            <td>{equip.category}</td>
                                            <td>
                                                <Link to={"../edit-equipment-rent/" + equip.equipment_rent_id}>
                                                    <button className='btn btn-outline-primary' ><ModeEditOutlineOutlinedIcon/></button>
                                                </Link>
                                                <button className='btn btn-outline-danger' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => selectEquipment(equip)}  ><DeleteOutlinedIcon/></button>
                                            </td>
                                        </tr>
                                    ))
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Eliminar</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Está seguro que desea eliminar <b>{selectedEquipment.name}</b>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={() => deleteTour()} data-bs-dismiss="modal"  >Aceptar</button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"  >Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer theme="colored" />
        </div>
    )
}
