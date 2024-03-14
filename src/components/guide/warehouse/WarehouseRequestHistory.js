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
    const [data, setdata] = useState([])
    const [requestHistoryToDelete, setrequestHistoryToDelete] = useState(null);
    const [total, setTotal] = useState(0);
    const [requestCompleteProductsId, setrequestCompleteProductsId] = useState();
    // const [disableOtherButtons, setDisableOtherButtons] = useState(false);
    // const [disableOtherButtons2, setDisableOtherButtons2] = useState(false);
    const [TitleModal, setTitleModal] = useState([]);

    const [rejectedIds, setRejectedIds] = useState(() => {
        // Cargar IDs rechazados desde el almacenamiento local al inicio
        const storedIds = localStorage.getItem('rejectedIds');
        return storedIds ? JSON.parse(storedIds) : [];
    });

    const [readyIds, setreadyIds] = useState(() => {
        // Cargar IDs rechazados desde el almacenamiento local al inicio
        const storeIds = localStorage.getItem('kReadyIds');
        return storeIds ? JSON.parse(storeIds) : [];
    });

    const dataListHistoryAdm = async () => {        
        await axios.get(ApiUrl + 'request-complete-product-list/'+userId)
            .then(resp => {
                const responseData = resp.data;
                console.log("RESPONSEDATA VER CVOMPLETOOOOO:", responseData);
                setdataHistory(responseData);
                const script = document.createElement("script");
                script.src = `/assets/dataTable/dataTable.js`;
                script.async = true;
                document.body.appendChild(script);
            })
            .catch(e => {
                console.log(e);
            })
    }

    const deleteRequestHistoryAdm = async (id) => {
        await axios.post(ApiUrl + `request-complete-product-delete/${id}`)
            .then(resp => {
                toast.success("Solicitud eliminada exitosamente", { position: toast.POSITION.BOTTOM_RIGHT });
                dataListHistoryAdm();
            })
            .catch(e => {
                console.log(e);
            });
        setrequestHistoryToDelete(null);
    };

    const getStatusName = (status) => {
        switch (status) {
            case 'pendiente':
                return 'Pendiente';
            case 'listo':
                return 'Listo para retirar';
            case 'retirada':
                return 'Retirada';
            case 'rechazada':
                return 'Rechazada';
            default:
                return status;
        }
    };

    const dataListAdm = async (requestCompProdId) => {
        try {
            const response = await axios.get(ApiUrl + `request-products-guide-list/${requestCompProdId}/${userId}`);
            const responseData = response.data;
            setdata(responseData);
            setrequestCompleteProductsId(requestCompProdId);
            console.log('SABER LA LISTA SIIIII para TITULO:::', responseData);
            const newTotal = responseData.reduce((acc, item) => acc + parseFloat(item.total_price), 0);
            setTotal(newTotal);

            // Verificar si la propiedad status_acquisition está definida en el primer elemento
            if (responseData.length > 0 && 'status_acquisition' in responseData[0]) {
                const statusName = getStatusName(responseData[0].status_acquisition);
                setTitleModal(statusName);
                console.log('QUIERO SABER status_acquisition:', statusName);
            } else {
                console.log('La propiedad "status_acquisition" no está definida en el primer elemento o el array está vacío.');
            }
        } catch (error) {
            console.error(error);
        }
    };

    // const upDateReadyWithdrawWarehouse = async () => {
    //     // Realizar la actualización del estado en el servidor
    //     try {
    //         const response1 = await axios.post(`${ApiUrl}request-completes-update-status/${requestCompleteProductsId}`);
    //         if (response1.data.success) {
    //             toast.success("Solicitud actualizada exitosamente", { position: toast.POSITION.BOTTOM_RIGHT });
    //             dataListHistoryAdm();
    //             setreadyIds(prevIds => [...prevIds, requestCompleteProductsId]);
    //             localStorage.setItem('kReadyIds', JSON.stringify([...readyIds, requestCompleteProductsId]));
    //         } else {
    //             toast.error("Error al actualizar la solicitud", { position: toast.POSITION.BOTTOM_RIGHT });
    //         }
    //     } catch (error) {
    //         console.error(error);
    //         toast.error("Error al actualizar la solicitud", { position: toast.POSITION.BOTTOM_RIGHT });
    //     }
    // };

    // const upDateProductsWithdrawWarehouse = async () => {
    //     try {
    //         const response1 = await axios.post(`${ApiUrl}request-completes-update-products-retired/${requestCompleteProductsId}`);
    //         if (response1.data.success) {
    //             toast.success("Solicitud de retiro de productos exitosa", { position: toast.POSITION.BOTTOM_RIGHT });
    //             dataListHistoryAdm();
    //             setRejectedIds(prevIds => [...prevIds, requestCompleteProductsId]);
    //             localStorage.setItem('rejectedIds', JSON.stringify([...rejectedIds, requestCompleteProductsId]));
    //         } else {
    //             toast.error("Error Solicitud de retiro de productos", { position: toast.POSITION.BOTTOM_RIGHT });
    //         }
    //     } catch (error) {
    //         console.error(error);
    //         toast.error("Error Solicitud de retiro de productos", { position: toast.POSITION.BOTTOM_RIGHT });
    //     }
    // };

    // const upDateProductsRejectedWarehouse = async () => {
    //     try {
    //         const response1 = await axios.post(`${ApiUrl}request-product-update-products-withdrawal/${requestCompleteProductsId}`);
    //         if (response1.data.success) {
    //             toast.success("La solicitud ha sido rechazada", { position: toast.POSITION.BOTTOM_RIGHT });
    //             dataListHistoryAdm();
    //             // Agregar el ID al conjunto de IDs rechazados
    //             setRejectedIds(prevIds => [...prevIds, requestCompleteProductsId]);
    //             // Almacenar IDs rechazados en el almacenamiento local
    //             localStorage.setItem('rejectedIds', JSON.stringify([...rejectedIds, requestCompleteProductsId]));
    //             //  setDisableOtherButtons(true);       
    //         } else {
    //             toast.error("Error al recharaz solicitud", { position: toast.POSITION.BOTTOM_RIGHT });
    //         }

    //     } catch (error) {
    //         console.error(error);
    //         toast.error("Error al recharaz solicitud", { position: toast.POSITION.BOTTOM_RIGHT });
    //     }
    // };

    useEffect(() => {
        dataListHistoryAdm();
    }, [])

    useEffect(() => {
        dataListAdm();
    }, [])

    return (
        <div>
            <div className='row'>
                <div className='col-12 '>
                    <div className="card">
                        <div className=" card-header">
                            <div className='row'>
                                <div className='col-12 col-md-12'>
                                    <b>ADMINISTRACIÓN DE SOLICITUD DE PRODUCTOS CAMPING CHIMBORAZO GUIAAAAAA</b>
                                </div>

                            </div>
                        </div>
                        <div className="card-body table-responsive">
                            <table className='table table-hover' id="dataTable"  >
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Rol</th>
                                        <th>Usuario</th>
                                        <th>detalle</th>
                                        <th>Fecha de tour</th>
                                        <th>Estado</th>
                                        <th>Accione</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataHistory.map((dataHistory, i) => (
                                        <tr key={dataHistory.request_complete_products_id}>
                                            <td>{i + 1}</td>
                                            <td>
                                                {dataHistory.rol === 'guide' ? 'Guia' : (dataHistory.rol === 'admin' ? 'Administrador' : dataHistory.rol)}
                                            </td>
                                            <td>{dataHistory.name} {dataHistory.last_name}</td>
                                            <td>{dataHistory.detail}</td>
                                            <td>{dataHistory.fecha}</td>
                                            <td>{dataHistory.status_acquisition === 'pendiente' ? 'Pendiente' : (dataHistory.status_acquisition === 'listo' ? 'Listo Para Retirar' : (dataHistory.status_acquisition === 'retirada' ? 'Retirada' : (dataHistory.status_acquisition === 'rechazada' ? 'Rechazada' : dataHistory.status_acquisition)))}</td>
                                            <td>
                                                <button
                                                    className='btn btn-outline-primary'
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#watchModal"
                                                    onClick={() => dataListAdm(dataHistory.request_complete_products_id)}
                                                >
                                                    <i className="fas fa-eye" aria-hidden="true"></i>
                                                </button>
                                                {/* <button className='btn btn-outline-primary' data-bs-toggle="modal" data-bs-target="#watchModal" onClick={() => handleOpenModal(data)}><i className="fas fa-eye" aria-hidden="true"></i></button> */}
                                                {/* <button
                                                    className='btn btn-outline-danger'
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#exampleModal"
                                                    onClick={() => setrequestHistoryToDelete(dataHistory.request_complete_products_id)}
                                                >
                                                    <i className="fas fa-trash-alt" aria-hidden="true"></i>
                                                </button> */}
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
                            <button type="button" className="btn btn-primary" onClick={() => deleteRequestHistoryAdm(requestHistoryToDelete)} data-bs-dismiss="modal">Aceptar</button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"  >Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="watchModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg"> {/* Aquí se añade la clase modal-lg */}
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className='col-12 '>
                                <div className='row'>
                                    <div className='col-6'>
                                        <div className="form-group">
                                            <h5 className="modal-title" id="exampleModalLabel">Detalles del Pedido</h5>
                                        </div>
                                    </div>
                                    <div className='col-6'>
                                        <div className="form-group">
                                            <h5 className="modal-title" id="exampleModalLabel">Estado: {TitleModal}</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body text-center">
                            <div className="card-body table-responsive">
                                <table className='table table-hover' id="dataTable"  >
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
            <ToastContainer theme="colored" />
        </div>
    )
}


