import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ApiUrl } from '../../../services/ApiRest';
import { ToastContainer, toast } from 'react-toastify';
// import { WarehouseSelect } from './selects/WarehouseSelect';
// import { StatusSelect } from './selects/StatusSelect';
// import { ProductsSelect } from './selects/ProductsSelect';

export const WarehouseProductsList = () => {
    const [data, setdata] = useState([]);


    const dataList = async () => {
        await axios.get(ApiUrl + 'products-list')
            .then(resp => {
                resp = resp.data;
                setdata(resp);
                console.log(resp);
                const script = document.createElement("script");
                script.src = `/assets/dataTable/dataTable.js`;
                script.async = true;
                document.body.appendChild(script);
            })
            .catch(e => {
                console.log(e);
            })
    }


    useEffect(() => {
        dataList();
    }, [])


    return (
        <div>
            <div className='row'>
                <div className='col-12 '>
                    <div className="card">
                        <div className=" card-header">
                            <div className='row'>
                                <div className='col-12 col-md-6'>
                                    <b>LISTA DE PRODUCTOS CAMPING CHIMBORAZO</b>
                                </div>

                            </div>
                        </div>
                        <div className="card-body table-responsive">
                            <table className='table table-hover ' id="dataTable-ord-col1"  >
                                <thead>
                                    <tr>
                                        <th>Cant</th>
                                        <th>Producto</th>
                                        <th>Proveedor</th>
                                        <th>Categoría</th>
                                        <th>Bodega</th>
                                        <th>Observación</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {/* INICIO */}
                                    {data.map((data, i) => (
                                        // <tr class="alert alert-primary" role="alert" style={{ backgroundColor:  data.status_id === 5 ?'red':'white'}} key={data.inventories_id}>
                                        <tr key={data.inventories_id}>
                                            <td>{data.quantity}</td>
                                            <td >{data.product}</td>
                                            <td >{data.name_store}</td>
                                            <td >{data.description}</td>
                                            <td>{data.warehouse}</td>
                                            <td><b><small>{data.observation}</small></b></td>                                            
                                        </tr>
                                    ))
                                    }

                                    {/* FIN */}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer theme="colored" />
        </div>
    )
}
