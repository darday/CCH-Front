import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';

// import React, { useState } from 'react'
// import { useEffect } from 'react';

export const ListEquipmentSell = () => {

    const [listData, setListData] = useState([]);
    const dataList = async () => {
        await axios.get('http://localhost:8000/api/equipment-list')
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
                            <table className='table table-hover' id="dataTable" >
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
                                                <button className='btn btn-outline-primary'>Editar</button>
                                                <button className='btn btn-outline-danger'>Eliminar</button>
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
        </div>
    )
}
