import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ApiUrl } from '../../../services/ApiRest';
import { ToastContainer, toast } from 'react-toastify';
import { WarehouseRequestProducts } from './WarehouseRequestProducts';
import Cookies from 'universal-cookie/es6';

// const userId = 2;
const cookies = new Cookies();
const userId = cookies.get('uid');


export const WarehouseRequestHistory = () => {
    const [dataHistory, setdataHistory] = useState([]);
    const [data, setdata] = useState([]);
    const [requestHistoryToDelete, setrequestHistoryToDelete] = useState(null);
    const [selectedRowData, setSelectedRowData] = useState(null);
    const [total, setTotal] = useState(0);
    const [requestCompletProductsId, setrequestCompletProductsId] = useState();
    const [showModal, setShowModal] = useState(false);
    const [titleTour, settitleTour] = useState();

    const handleOpenModal = (rowData) => {
        setSelectedRowData(rowData);
    };

    const deleteTable = () => {
        const script1 = document.createElement("script");
        script1.src = `/assets/dataTable/datatable-destroy.js`;
        script1.async = true;
        document.body.appendChild(script1);
    }


    // const dataListHistory = async () => {
    //     await axios.get(ApiUrl + 'request-complete-product-list/'+ userId)
    //         .then(resp => {
    //             resp = resp.data;
    //             setdataHistory(resp);                 

    //             //cargamos los datos nuevos
    //             const script = document.createElement("script");
    //             script.src = `/assets/dataTable/dataTable.js`;
    //             script.async = true;
    //             document.body.appendChild(script);
    //         })
    //         .catch(e => {
    //             console.log(e);
    //         })
    // }

    const dataListHistory = async () => {
        await axios.get(ApiUrl + 'request-complete-product-list/' + userId)
            .then(resp => {
                const responseData = resp.data;
                setdataHistory(responseData);
                const firstRequestCompleteProductId = responseData.length > 0 ? responseData[0].request_complete_products_id : null;
                console.log("request_complete_products_idIII:", firstRequestCompleteProductId);
                //cargamos los datos nuevos
                const script = document.createElement("script");
                script.src = `/assets/dataTable/dataTable.js`;
                script.async = true;
                document.body.appendChild(script);
            })
            .catch(e => {
                console.log(e);
            })
    }

    const deleteRequestHistory = async (id) => {
        console.log("ID a eliminar:", id);
        await axios.post(ApiUrl + `request-complete-product-delete/${id}`)
            .then(resp => {
                toast.success("Solicitud eliminada exitosamente", { position: toast.POSITION.BOTTOM_RIGHT });
                deleteTable();
                dataListHistory();
            })
            .catch(e => {
                console.log(e);
            });
        setrequestHistoryToDelete(null);
    };


    const dataList = async (requestCompProdId) => {
        try {
            const response = await axios.get(ApiUrl + `request-product-guide-list/${requestCompProdId}`);
            const responseData = response.data;
            setdata(responseData);
            // Calcular la suma total
            const newTotal = responseData.reduce((acc, item) => acc + parseFloat(item.total_price), 0);
            setTotal(newTotal);
            console.log('Quiero SABER GUIDE', responseData);  
            // Muestra el modal después de cargar los datos
            setShowModal(true);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        dataListHistory();
    }, [])

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
                                    <b>HISTORIAL DE SOLICITUD DE PRODUCTOS CAMPING CHIMBORAZO</b>
                                </div>

                            </div>
                        </div>
                        <div className="card-body table-responsive">
                            <table className='table table-hover' id="dataTable-ord-col1"  >
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Usuario</th>
                                        <th>detalle</th>
                                        <th>Fecha de tour</th>
                                        <th>Accione</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataHistory.map((dataHistory, i) => (
                                        <tr key={dataHistory.request_complete_products_id}>
                                            <td>{i + 1}</td>
                                            <td>{dataHistory.name} {dataHistory.last_name}</td>
                                            <td>{dataHistory.detail}</td>
                                            <td>{dataHistory.fecha}</td>
                                            <td>
                                                <button
                                                    className='btn btn-outline-primary'
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#watchModal"
                                                    onClick={() => dataList(dataHistory.request_complete_products_id)}
                                                >
                                                    <i className="fas fa-eye" aria-hidden="true"></i>
                                                </button>
                                                {/* <button className='btn btn-outline-primary' data-bs-toggle="modal" data-bs-target="#watchModal" onClick={() => handleOpenModal(data)}><i className="fas fa-eye" aria-hidden="true"></i></button> */}
                                                <button className='btn btn-outline-danger' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => setrequestHistoryToDelete(dataHistory.request_complete_products_id)} >{dataHistory.request_complete_products_id}<i className="fas fa-trash-alt" aria-hidden="true"></i></button>
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

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Eliminar</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Está seguro que desea eliminar<b></b>
                        </div>
                        <div className="modal-footer">

                            <button type="button" className="btn btn-primary" onClick={() => deleteRequestHistory(requestHistoryToDelete)} data-bs-dismiss="modal">Aceptar</button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"  >Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
            {showModal && (
                <div className="modal fade" id="watchModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg"> {/* Aquí se añade la clase modal-lg */}
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Detalles del Pedido</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body text-center">
                                <div className="card-body table-responsive">
                                    <table className='table table-hover ' id="dataTable-ord-col1"  >
                                        <thead>
                                            <tr>
                                                <th>Cant</th>
                                                <th>Producto</th>
                                                <th>Categoría</th>
                                                <th>Precio Unitario</th>
                                                <th>Precio Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.map((item) => (
                                                <tr key={item.request_products_to_warehouses_id}>
                                                    <td>{item.quantity_products}</td>
                                                    <td>{item.description_product}</td>
                                                    <td>{item.category_product}</td>
                                                    <td>{item.unitary_price}</td>
                                                    <td>{item.total_price}</td>
                                                </tr>
                                            ))
                                            }
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td colSpan="4"><strong>Total:</strong></td>
                                                <td><strong>{total}</strong></td>
                                                <td></td> {/* Esto es para mantener la alineación de las columnas */}
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Salir</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <ToastContainer theme="colored" />
        </div>
    )
}
