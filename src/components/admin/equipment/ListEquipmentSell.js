import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { ApiUrl } from '../../../services/ApiRest';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';


// import React, { useState } from 'react'
// import { useEffect } from 'react';

export const ListEquipmentSell = () => {

    const [listData, setListData] = useState([]);
    const [selectedEquipment, setSelectedEquipment] = useState([]);

    const dataList = async () => {
        await axios.get(ApiUrl + 'equipment-list')
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
        await axios.post(ApiUrl + 'equipment-delete/' + selectedEquipment.equipment_id)
            .then(resp => {
                toast.success("Equipo eliminado exitosamente", { position: toast.POSITION.BOTTOM_RIGHT });
                deleteTable();
                dataList();
                console.log('aaaaa')
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
                            LISTA DE TOURS MENSUALES
                        </div>
                        <div className="card-body">
                            <table className='table table-hover table-responsive' id="dataTable"  >
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Nombre</th>
                                        <th>Descripción</th>
                                        <th>Costo</th>
                                        <th>Estado</th>
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
                                        <tr key={equip.equipment_id}>
                                            <td>{i + 1}</td>
                                            <td>{equip.name}</td>
                                            <td>{equip.description}</td>
                                            <td>{equip.cost}</td>
                                            <td>{equip.state}</td>
                                            <td>{equip.discount}</td>
                                            <td>{equip.discount_description}</td>
                                            <td>{equip.contact_phone}</td>
                                            <td>{equip.type}</td>
                                            <td>
                                                <Link to={"../edit-equipment/" + equip.equipment_id}>
                                                    <button className='btn btn-outline-primary' >Editar</button>
                                                </Link>
                                                <button className='btn btn-outline-danger' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => selectEquipment(equip)}  >Eliminar</button>
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
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Eliminar</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            Está seguro que desea eliminar <b>{selectedEquipment.name}</b>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" onClick={() => deleteTour()} data-bs-dismiss="modal"  >Aceptar</button>
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"  >Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer theme="colored" />

        </div>
    )
}
