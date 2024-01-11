import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ApiUrl } from '../../../../services/ApiRest';
import { ToastContainer, toast } from 'react-toastify';
import { BrowserRouter as Router } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie/es6';
import { RequestProductsSelect } from '../../../guide/selects/RequestProductsSelect';
const cookies = new Cookies();
const userId = cookies.get('uid');

export const WarehouseRequestProductsAdm = () => {
    const [data, setdata] = useState([]);
    const [requestCompleteProductsId, setrequestCompleteProductsId] = useState();
    const [listTiltle, setlistTiltle] = useState();
    const [listDate, setlistDate] = useState();
    const [requestStatus, setrequestStatus] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [showForm2, setShowForm2] = useState(true);
    const [requestGenerate, setrequestGenerate] = useState(false);
    const [requestProductToAddSelected, setrequestProductToAddSelected] = useState(null);
    const [reloadChild, setReloadChild] = useState(false);
    const [resetSelect, setResetSelect] = useState(false);
    const [total, setTotal] = useState(0);
    const [storedStatusRequest, setStoredStatusRequest] = useState(null);
    const [productToDelete, setProductToDelete] = useState(null);
    const [productSelected, setproductSelected] = useState([]);
    const navigate = useNavigate();

    const [formD2, setformD2] = useState({
        user_id: '',
        detail: '',
        fecha: '',
        status_request: '',
    });

    const [formD, setformD] = useState({
        product_id: '',
        user_id: '',
        quantity_products: '',
        category_id: '',
        status: '',
        request_complete_products_id: '',
        product_warehouses_id: '',
        unit_price: '',
        total_price: '',
    });

    const onSubmitForm2 = async (event) => {
        event.preventDefault()
        // Validar si los campos obligatorios están llenos

        if (!formD2.detail || !formD2.fecha) {
            // alert("Por favor, completar todos los campos (Descripción y Fecha), porque son campos obligatorios para continuar con el porceso");
            toast.error("Por favor, completar todos los campos (Descripción y Fecha), porque son campos obligatorios para continuar con el proceso", { position: toast.POSITION.BOTTOM_RIGHT });
            return; // Detener la ejecución si los campos están vacíos
        }
        const f = new FormData();
        f.append("user_id", userId);
        f.append("detail", formD2.detail);
        f.append("fecha", formD2.fecha);
        f.append("status_request", 'proceso');
        f.append("status_acquisition", 'pendiente');
        await axios.post(ApiUrl + 'request-complete-products-add', f)
            .then(response => {
                var resp = response.data;
                console.log("RESPPP:", resp);
                setrequestCompleteProductsId(resp.request_complete_products_id);
                setlistTiltle(resp.data.detail);
                console.log("ID COMPLETE DETALLE:", resp.data.detail);
                setlistDate(resp.data.fecha);
                setrequestStatus(resp.data.status_request);
                console.log("resp.data.status_request:", resp.data.status_request);
                localStorage.setItem('status_request', resp.data.status_request);
                localStorage.setItem('request_complete_id', resp.request_complete_products_id);
                localStorage.setItem('request_complete_detail', resp.data.detail);
                localStorage.setItem('request_complete_date', resp.data.fecha);
                // Verificar si la solicitud ya se ha generado
                if (!resp.success) {
                    localStorage.setItem('request_complete_id', resp.data.request_complete_products_id);
                }
                if (resp.success) {
                    toast.success("Pedido Generados exitosamente", { position: toast.POSITION.BOTTOM_RIGHT });
                    setformD2({
                        user_id: '',
                        detail: '',
                        fecha: '',
                        status_request: '',
                    });
                    setShowForm(true);
                    setShowForm2(false);
                } else {
                    toast.error("El Producto no se ha agregado", { position: toast.POSITION.BOTTOM_RIGHT });
                }
                // Actualizar localStorage si requestGenerate es true
                if (requestGenerate) {
                    localStorage.setItem('status_request', 'finalizado');
                }

            })
            .catch(e => {
                console.log(e)
                toast.error("" + e + "  !", { position: toast.POSITION.BOTTOM_RIGHT });
            })
    }

    const onInputChange2 = (event) => {
        setformD2({
            ...formD2,
            [event.target.name]: event.target.value,
        });
    };

    const onSubmitAdm = async (event) => {
        event.preventDefault();
        if (requestProductToAddSelected && requestProductToAddSelected.value) {
            const selectedProductId = requestProductToAddSelected.value.product_warehouses_id;
            const selectedProductLabel = requestProductToAddSelected.label;
            // Validar que se haya seleccionado un producto
            if (!selectedProductId || !selectedProductLabel) {
                toast.error("Por favor, selecciona un producto válido.", { position: toast.POSITION.BOTTOM_RIGHT });
                return;
            }
            const quantityToAdd = formD.quantity_products;
            // Validar que la cantidad sea un número positivo
            if (!quantityToAdd || isNaN(quantityToAdd) || quantityToAdd <= 0) {
                toast.error("Por favor, ingresa una cantidad válida.", { position: toast.POSITION.BOTTOM_RIGHT });
                return;
            }
            // Obtener la cantidad disponible del producto seleccionado desde la etiqueta
            const availableQuantity = parseInt(selectedProductLabel.match(/\((\d+)\)/)[1], 10);
            // Validar que la cantidad a agregar no exceda la cantidad disponible
            if (quantityToAdd > availableQuantity) {
                toast.error("La cantidad solicitada excede la disponibilidad del producto.", { position: toast.POSITION.BOTTOM_RIGHT });
                return;
            }
            // Obtener request_complete_id de localStorage si está presente
            const storedRequestId = localStorage.getItem('request_complete_id');
            const requestIdToUse = storedRequestId || requestCompleteProductsId;
            const formData = new FormData();
            // formData.append("product_id", selectedProductId);
            formData.append("user_id", userId);
            formData.append("quantity_products", quantityToAdd);
            formData.append("status", 'A');
            formData.append("request_complete_products_id", requestIdToUse);
            formData.append("product_warehouses_id", selectedProductId);
            try {
                const response = await axios.post(ApiUrl + 'request-products-add', formData);
                const resp = response.data;
                localStorage.setItem('status_Aniadir', resp.data.status);
                // setcategoryId(resp.category_id);
                if (resp.success) {
                    toast.success("Producto agregado exitosamente", { position: toast.POSITION.BOTTOM_RIGHT });
                    setReloadChild(!reloadChild);
                    setformD({
                        ...formD,
                        quantity_products: '' // Limpiar la cantidad después de agregar el producto //classList
                    });
                    setrequestProductToAddSelected('');

                    dataListAdm();
                } else {
                    toast.error("El Producto no se ha agregado", { position: toast.POSITION.BOTTOM_RIGHT });
                }
            } catch (error) {
                console.log(error);
                toast.error("" + error + "  !", { position: toast.POSITION.BOTTOM_RIGHT });
            }
            setResetSelect(true);
            setResetSelect(false);
        } else {
            // alert("Por favor, selecciona un producto antes de continuar");
            toast.error("Por favor, selecciona un producto antes de continuar", { position: toast.POSITION.BOTTOM_RIGHT });
        }
    };

    const dataListAdm = async () => {
        try {
            const response = await axios.get(ApiUrl + `request-products-list/${userId}`);
            const responseData = response.data;
            setdata(responseData);
            console.log('DATALIST LISTADO:', responseData);
            // Calcular la suma total
            const newTotal = responseData.reduce((acc, item) => acc + parseFloat(item.total_price), 0);
            setTotal(newTotal);
            console.log(responseData);
        } catch (error) {
            console.error(error);
        }
    };

    const onDataListUpdateAdm = () => {
        console.log("Actualización de datos solicitada");
    };

    const onInputChangeAdm = ({ target }) => {
        const { name, value } = target;
        setformD({
            ...formD,
            [name]: value
        })
    }

    const deleteRequestProductAdm = async (id) => {
        console.log("ID a eliminar:", id);
        await axios.post(ApiUrl + `request-product-delete/${id}`)
            .then(resp => {
                toast.success("Producto eliminado exitosamente", { position: toast.POSITION.BOTTOM_RIGHT });
                // deleteTable();
                dataListAdm();
                setReloadChild(!reloadChild);
            })
            .catch(e => {
                console.log(e);
            });
        setProductToDelete(null);
    };

    const aceptarModal = async () => {
        // Realizar la actualización del estado en el servidor
        try {
            var response1 = '';
            if (requestCompleteProductsId != undefined) {
                response1 = await axios.post(`${ApiUrl}request-product-update-status/${requestCompleteProductsId}`);
            } else {
                response1 = await axios.post(`${ApiUrl}request-product-update-status/${localStorage.getItem('request_complete_id')}`);
            }
            if (response1.data.success) {
                console.log('hola');
            } else {
                toast.error("Error al generar la solicitud", { position: toast.POSITION.BOTTOM_RIGHT });
            }

            // Segunda API
            var response2 = '';
            if (requestCompleteProductsId != undefined) {
                response2 = await axios.post(`${ApiUrl}request-complete-update-status/${requestCompleteProductsId}`);
            } else {
                response2 = await axios.post(`${ApiUrl}request-complete-update-status/${localStorage.getItem('request_complete_id')}`);
            }

            if (response2.data.success) {
                toast.success("Solicitud generada exitosamente", { position: toast.POSITION.BOTTOM_RIGHT });
                navigate('/administrativo/Administrar-solicitud-productos');
                // Limpiar el estado almacenado en localStorage
                localStorage.removeItem('status_request');
                localStorage.removeItem('status_Aniadir');
                localStorage.removeItem('request_complete_id');
                localStorage.removeItem('request_complete_detail');
                localStorage.removeItem('request_complete_date');
            } else {
                toast.error("Error al generar la solicitud", { position: toast.POSITION.BOTTOM_RIGHT });
            }
        } catch (error) {
            console.error(error);
            toast.error("Error al generar la solicitud", { position: toast.POSITION.BOTTOM_RIGHT });
        }
    };

    useEffect(() => {
        dataListAdm();
    }, []);

    useEffect(() => {
        // Recuperar el estado de localStorage
        const storedStatusRequest = localStorage.getItem('status_request');
        // Establecer el estado si se encuentra en localStorage
        console.log("QUIRO SABER STATUS RQUES", storedStatusRequest);
        if (storedStatusRequest) {
            setStoredStatusRequest(storedStatusRequest);
            setrequestStatus(storedStatusRequest);
            setShowForm(storedStatusRequest === 'proceso');
            setShowForm2(storedStatusRequest === 'proceso');
        }
        if (storedStatusRequest === 'proceso') {
            setShowForm2(false);
        }
        setStoredStatusRequest(storedStatusRequest);
    }, []);

    return (
        <div>
            <div className='row'>
                <div className='col-12 '>
                    <div className="card">
                        <div className="card-header">
                            AGREGAR PRODUCTOS
                        </div>
                        {requestStatus != 'proceso' && showForm2 && (
                            <div className="card-body">
                                <form onSubmit={onSubmitForm2}>
                                    <div className='col-12'>
                                        <div>
                                            <p><b>AVISO IMPORTANTE:</b> Por favor, completar todos los campos (Descripción y Fecha), porque son campos obligatorios para continuar con el porceso.</p>
                                        </div>
                                        <div className="">
                                            <label className="form-label">Descripción (Lugar del tour)</label>
                                            <input type="text" name='detail' className="form-control" value={formD2.detail || ''} onChange={onInputChange2} ></input>
                                        </div>
                                    </div>
                                    <div className='col-6 col-md-6'>
                                        <div className="">
                                            <label className="form-label">Fecha de tour:</label>
                                            <input type="date" className="form-control" name='fecha' value={formD2.fecha || ''} onChange={onInputChange2}></input>
                                        </div>
                                    </div>
                                    <br></br>
                                    <button type="submit" className="btn btn-success"> Guardar </button> &nbsp;
                                </form>
                            </div>
                        )}
                        {requestStatus == 'proceso' && showForm && (
                            <div className="card-body">
                                <div className='col-12 '>
                                    <div className='row'>
                                        <div className='col-4'>
                                            <h5><b>Descripción (Lugar del tour):</b></h5>
                                        </div>
                                        <div className='col-8'>
                                            <p style={{ fontSize: '20px' }}> {storedStatusRequest === 'proceso' ? localStorage.getItem('request_complete_detail') : listTiltle} </p>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-12 '>
                                    <div className='row'>
                                        <div className='col-4'>
                                            <h5><b>Fecha de tour:</b></h5>
                                        </div>
                                        <div className='col-8'>
                                            <p style={{ fontSize: '20px' }}> {storedStatusRequest === 'proceso' ? localStorage.getItem('request_complete_date') : listDate} </p>
                                        </div>
                                    </div>
                                </div>
                                <form onSubmit={onSubmitAdm}>
                                    <div className='row'>
                                        <div className='col-12 '>
                                            <div className='row'>
                                                <div className='col-8'>
                                                    <div className="form-group">
                                                        <label >Seleccionar producto (Cantidad disponible)</label>
                                                        <RequestProductsSelect
                                                            requestProductSelect={requestProductToAddSelected}
                                                            setrequestProductSelect={setrequestProductToAddSelected}
                                                            resetValue={resetSelect}
                                                            onDataListUpdate={onDataListUpdateAdm}
                                                            reload={reloadChild}
                                                        // disabled={selectDisabled}
                                                        />
                                                    </div>
                                                </div>
                                                <div className='col-2'>
                                                    <div className="">
                                                        <label className="form-label">Cantidad</label>
                                                        <input type="number" name='quantity_products' className="form-control" value={formD.quantity_products} onChange={onInputChangeAdm} placeholder='000' required ></input>

                                                    </div>
                                                </div>
                                                <div className='col-2'>
                                                    <div className="">
                                                        <center><label className="form-label">Añade producto</label></center>
                                                        <center><button type="submit" className="btn btn-success" onClick={() => setResetSelect(false)}> Añadir </button></center>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>

                                <div className="card-body table-responsive">
                                    <table className='table table-hover ' id="dataTable-ord-col1"  >
                                        <thead>
                                            <tr>
                                                <th>Cant</th>
                                                <th>Producto</th>
                                                <th>Categoría</th>
                                                <th>Precio Unitario</th>
                                                <th>Precio Total</th>
                                                <th>Acciones</th>
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
                                                    <td>
                                                        <button className='btn btn-outline-danger' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => setProductToDelete(item.request_products_to_warehouses_id)}><i className="fas fa-trash-alt" aria-hidden="true"></i>  </button>
                                                    </td>
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

                                <button data-bs-toggle="modal" data-bs-target="#watchModal" className="btn btn-success" > Generar solicitud </button> &nbsp;
                            </div>
                        )}
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
                            Está seguro que desea eliminar<b>{productSelected.description}</b>
                        </div>
                        <div className="modal-footer">

                            <button type="button" className="btn btn-primary" onClick={() => deleteRequestProductAdm(productToDelete)} data-bs-dismiss="modal">Aceptar</button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"  >Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="watchModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Generar Solicitud</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Deseas generar la solicitud de productos?<b></b>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={aceptarModal}>Aceptar</button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"  >Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer theme="colored" />

        </div>
    )
}
export default WarehouseRequestProductsAdm;
