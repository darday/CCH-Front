import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ApiUrl } from '../../../services/ApiRest';
import { ToastContainer, toast } from 'react-toastify';
import { RequestProductsSelect } from '../selects/RequestProductsSelect';
import { BrowserRouter as Router } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import WarehouseRequestHistory from './WarehouseRequestHistory';
import { WarehouseList } from '../../admin/inventory/WarehouseList';
import Cookies from 'universal-cookie/es6';
// const userId = 2;
const cookies = new Cookies();
const userId = cookies.get('uid');

export const WarehouseRequestProducts = () => {
    const [data, setdata] = useState([]);
    const [requestProductToAddSelected, setrequestProductToAddSelected] = useState(null);
    const [total, setTotal] = useState(0);
    const [productToDelete, setProductToDelete] = useState(null);
    const [productSelected, setproductSelected] = useState([]);
    const [isProductFormEnabled, setIsProductFormEnabled] = useState(false);
    const navigate = useNavigate();
    const [showForm, setShowForm] = useState(false);
    const [showForm2, setShowForm2] = useState(true);
    const [requestCompleteProductsId, setrequestCompleteProductsId] = useState();
    const [requestGenerate, setrequestGenerate] = useState(false);
    const [resetSelect, setResetSelect] = useState(false);
    const [warehouseProductSelect, setwarehouseProductSelect] = useState();
    const [reloadChild, setReloadChild] = useState(false);
    // const [dataHistory, setdataHistory] = useState([]);
    const [listTiltle, setlistTiltle] = useState();
    const [listDate, setlistDate] = useState();
    const [buttonDisabled, setbuttonDisabled] = useState(false);
    const [btnAdd, setbtnAdd] = useState(true);
    const [btnGenerate, setbtnGenerate] = useState(true);
    const [selectDisabled, setselectDisabled] = useState(true);
    const [requestStatus, setrequestStatus] = useState('');
    const [storedStatusRequest, setStoredStatusRequest] = useState(null);

    const [formD, setformD] = useState({
        product_id: '',
        user_id: '',
        quantity_products: '',
        category_id: '',
        request_complete_products_id: '',
        unit_price: '',
        total_price: '',
    });

    const [formD2, setformD2] = useState({
        user_id: '',
        detail: '',
        fecha: '',
    });

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
                navigate('/guide/Historial-solicitud-productos');
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

    const deleteTable = () => {
        const script1 = document.createElement("script");
        script1.src = `/assets/dataTable/datatable-destroy.js`;
        script1.async = true;
        document.body.appendChild(script1);
    }

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setformD({
            ...formD,
            [name]: value
        })
    }

    const onSubmit = async (event) => {
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
                const response = await axios.post(ApiUrl + 'request-product-add', formData);
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

                    dataList();
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

    const dataList = async () => {
        try {
            const response = await axios.get(ApiUrl + `request-product-list/${userId}`);
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

    const deleteRequestProduct = async (id) => {
        console.log("ID a eliminar:", id);
        await axios.post(ApiUrl + `request-product-delete/${id}`)
            .then(resp => {
                toast.success("Producto eliminado exitosamente", { position: toast.POSITION.BOTTOM_RIGHT });
                deleteTable();
                dataList();
                setReloadChild(!reloadChild);
            })
            .catch(e => {
                console.log(e);
            });
        setProductToDelete(null);
    };

    const onInputChange2 = (event) => {
        setformD2({
            ...formD2,
            [event.target.name]: event.target.value,
        });
    };

    const onSubmitForm2 = async (event) => {
        event.preventDefault()
        // Validar si los campos obligatorios están llenos
        if (!formD2.detail || !formD2.fecha) {
            toast.error("Por favor, completar todos los campos (Descripción y Fecha), porque son campos obligatorios para continuar con el proceso", { position: toast.POSITION.BOTTOM_RIGHT });
            return; // Detener la ejecución si los campos están vacíos
        }
        setbuttonDisabled(false);
        setbtnAdd(false);
        setbtnGenerate(false);
        setselectDisabled(false);
        const f = new FormData();
        f.append("user_id", userId);
        f.append("detail", formD2.detail);
        f.append("fecha", formD2.fecha);
        f.append("status_request", 'proceso');
        f.append("status_acquisition", 'pendiente');
        await axios.post(ApiUrl + 'request-complete-product-add', f)
            .then(response => {
                var resp = response.data;
                console.log("VER RESP");
                console.log(resp);
                console.log("ID COMPLETE:", resp.request_complete_products_id);
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
                        category_id: ''
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

    const onDataListUpdate = () => {
        console.log("Actualización de datos solicitada");
    };

    useEffect(() => {
        dataList();
    }, []);

    useEffect(() => {
        // Recuperar el estado de localStorage
        const storedStatusRequest = localStorage.getItem('status_request');
        // Establecer el estado si se encuentra en localStorage
        console.log("QUIRO SABER STATUS RQUES", storedStatusRequest);

        if (storedStatusRequest) {
            setrequestStatus(storedStatusRequest);
            setShowForm(storedStatusRequest === 'proceso');
            setShowForm2(storedStatusRequest === 'proceso');
        }
        // else {
        //     // Si no hay un estado almacenado, mostrar el formulario solo si el estado es 'proceso'
        //     // setShowForm(requestStatus === 'proceso');
        //     // setShowForm2(requestStatus !== 'proceso');
        // }
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
                                    <button type="submit" className="btn btn-success" disabled={buttonDisabled} > Guardar </button> &nbsp;
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
                                <form onSubmit={onSubmit}>
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
                                                            onDataListUpdate={onDataListUpdate}
                                                            reload={reloadChild}
                                                            disabled={selectDisabled}
                                                        />
                                                    </div>
                                                </div>
                                                <div className='col-2'>
                                                    <div className="">
                                                        <label className="form-label">Cantidad</label>
                                                        <input type="number" name='quantity_products' className="form-control" value={formD.quantity_products} onChange={onInputChange} placeholder='000' required ></input>

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

                            <button type="button" className="btn btn-primary" onClick={() => deleteRequestProduct(productToDelete)} data-bs-dismiss="modal">Aceptar</button>
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
export default WarehouseRequestProducts;
