import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { WarehouseSelect } from './selects/WarehouseSelect'
import axios from 'axios';
import { ApiUrl } from '../../../services/ApiRest';

export const WarehouseList = () => {

    const [warehouseSelected, setwarehouseSelected] = useState("");
    const [warehouseSelectedDesctiption, setwarehouseSelectedDesctiption] = useState("");
    const [warehouseList, setwarehouseList] = useState();
    const [productsInWarehouse, setproductsInWarehouse] = useState()
    const [productSelected, setproductSelected] = useState([]);
    const [productState, setproductState] = useState();
    const [productquantity, setproductquantity] = useState('');
    const [productId, setproductId] = useState();
    const [inventoriesId, setinventoriesId] = useState();
    const [warehouseId, setwarehouseId] = useState();
    const [formD, setformD] = useState({
        quantityToMove: '',
        observation: '',
    });
    const [formData, setFormData] = useState({
        status_id: '',
        quantity_products: '',
    });

    // const updateStateQuantity = async () => {
    //     const f = new FormData();
    //     f.append("status_id", formData.status_id);
    //     // f.append("stock", formData.quantity_products);
    //     f.append("stock", formData.quantity_products);
    //     const quantityProducts = f.get("stock");
    //     console.log("Cantidad de productos:", quantityProducts);
    //     console.log('DENTRO DE YA ESTAN AQUI. VALOR DE STAUTS:', formData.status_id);
    //     console.log('DENTRO DE YA ESTAN AQUI. VALOR DE STOCK:', formData.quantity_products);
    //     try {
    //         const response = await axios.post(ApiUrl + `warehouse-update/${inventoriesId}/${productId}`);
    //         const responseData = response.data;
    //         console.log('YA ESTAN AQUI LLEGAN POR MILLONES', responseData);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    const updateStateQuantity = async () => {
        const f = new FormData();
        f.append("status_id", formData.status_id);
        f.append("stock", productquantity);
        f.append("warehouse_id", warehouseId);
        console.log('VALOR DE STOCK:', productquantity);
        console.log('DENTRO DE YA ESTAN AQUI. VALOR DE STAUTS:', formData.status_id);
        console.log('DENTRO DE YA ESTAN AQUI. VALOR DE STOCK:', productquantity);
        // Verificar que los datos estén incluidos en FormData
        console.log('Datos enviados al backend:', Object.fromEntries(f));
        try {
            const response = await axios.post(ApiUrl + `warehouse-update/${inventoriesId}/${productId}`, f);
            const responseData = response.data;
            console.log('Respuesta del servidor:', responseData);
            if (responseData.success === false ) {
                console.error('Error al realizar la actualización:', responseData.message);
                // Aquí puedes mostrar el mensaje en tu interfaz de usuario
                // alert('NOOOOO');
                // alert(responseData.message);
                toast.error("No existen productos en bodegas asignados con el estado seleccionado", { position: toast.POSITION.BOTTOM_RIGHT });
            } else {
                // Aquí puedes manejar la lógica de éxito
                toast.success("Producto actualizado exitosamente", { position: toast.POSITION.BOTTOM_RIGHT });
                listDataProductWarehouse();
            }


            // if (!responseData.success) {
            //     // alert(responseData.message); // Muestra un mensaje al usuario
            //     toast.error("No existen productos en bodegas asignados con el estado seleccionado", { position: toast.POSITION.BOTTOM_RIGHT });
            // }

            // if (responseData.message !== undefined) {
            //     // Mostrar el mensaje si está presente
            //     alert(responseData.message);
            // } else {
            //     // Manejar el caso en el que el campo 'message' no esté presente
            //     console.error('La respuesta del servidor no contiene un mensaje.');
            // }
            // listDataProductWarehouse();

        } catch (error) {
            console.error('Error al realizar la actualización:', error);
        }
    }

    const warehouseListData = async () => {
        await axios.get(ApiUrl + 'warehouse-list')
            .then(resp => {
                resp = resp.data;
                setwarehouseList(resp);
                const script = document.createElement("script");
                script.src = `/assets/dataTable/dataTable.js`;
                script.async = true;
                document.body.appendChild(script);
            })
            .catch(e => {
                console.log(e);
            })
    }

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setformD({
            ...formD,
            [name]: value
        })
    }

    const addObservation = async () => {
        const f = new FormData();
        f.append("product_warehouses_id", productSelected.product_warehouses_id);
        f.append("observation", formD.observation);
        console.log(Object.fromEntries(f));
        await axios.post(ApiUrl + 'productsWarehouse-addObservation/' + productSelected.product_warehouses_id, f)
            .then(response => {
                var resp = response.data;
                console.log(resp);
                if (resp.success) {
                    toast.success(resp.messagge, { position: toast.POSITION.BOTTOM_RIGHT });
                    deleteTable();
                    listDataProductWarehouse();

                } else {
                    toast.error(resp.messagge, { position: toast.POSITION.BOTTOM_RIGHT });
                }
            })
            .catch(e => {
                console.log(e)
                toast.error("" + e + "  !", { position: toast.POSITION.BOTTOM_RIGHT });
            })
    }

    const deleteProductWarehouse = async () => {
        await axios.post(ApiUrl + 'productsWarehouse-delete/' + productSelected.product_warehouses_id)
            .then(response => {
                var resp = response.data;
                if (resp.success) {
                    toast.success(resp.messagge, { position: toast.POSITION.BOTTOM_RIGHT });
                    deleteTable();
                    listDataProductWarehouse();

                } else {
                    toast.error(resp.messagge, { position: toast.POSITION.BOTTOM_RIGHT });
                }
            })
            .catch(e => {
                console.log(e)
                toast.error("" + e + "  !", { position: toast.POSITION.BOTTOM_RIGHT });
            })
    }

    const listDataProductWarehouse = async () => {
        await axios.get(ApiUrl + 'productsInWarehouse/' + warehouseSelected[""])
            .then(resp => {
                resp = resp.data;
                setproductsInWarehouse(resp);
                console.log("IMPRIMIR TODOS LOS DATOSSSSSS:", resp)
            })
            .catch(e => {
                console.log(e);
            })
        await createTable();
    }

    const deleteTable = () => {
        const script1 = document.createElement("script");
        script1.src = `/assets/dataTable/datatable-destroy.js`;
        script1.async = true;
        document.body.appendChild(script1);
    }

    const createTable = () => {
        const script = document.createElement("script");
        script.src = `/assets/dataTable/dataTable.js`;
        script.async = true;
        document.body.appendChild(script);
    }

    useEffect(() => {
        warehouseListData();
    }, [])

    useEffect(() => {
        if (warehouseList) {
            console.log("warehouseList")
            console.log(warehouseSelected[""])
            const foundWarehouse = warehouseList.find(warehouse => warehouse.warehouse_id === parseInt(warehouseSelected[""]));
            setwarehouseSelectedDesctiption(foundWarehouse)
            if (productsInWarehouse) {
                deleteTable();
            }
            listDataProductWarehouse();
        }
    }, [warehouseSelected])

    return (
        <div>
            <div className='row'>
                <div className='col-12 '>
                    <div className="card">
                        <div className=" card-header">
                            <div className='row'>
                                <div className='col-12 col-md-6'>
                                    <b>PRODUCTOS EN BODEGA</b>
                                </div>
                                <div className='col-12 col-md-6 ' style={{ textAlign: 'right' }}>
                                    <WarehouseSelect
                                        warehouse={warehouseSelected}
                                        setwarehouse={setwarehouseSelected}
                                    />
                                </div>
                            </div>
                        </div>
                        {
                            (warehouseSelectedDesctiption) ?
                                <div className="card-body table-responsive">
                                    <div className='container text-center'>
                                        <h1 className='text-uppercase'>{(warehouseSelectedDesctiption) ? warehouseSelectedDesctiption["description"] : ''}</h1>
                                    </div>
                                    <table className='table table-hover ' id="dataTable"  >
                                        <thead>
                                            <tr>
                                                <th>Cantidad</th>
                                                <th>Producto</th>
                                                <th>Categoría</th>
                                                <th>Estado</th>
                                                <th>Bodega</th>
                                                <th>Observación</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                (productsInWarehouse) ?
                                                    productsInWarehouse.map((data, i) => (
                                                        <tr className={` 
                                                        ${data.status_id == 5 ? 'text-danger' : ''
                                                            }
                                                        `} key={i}>
                                                            <td>{data.quantity}</td>
                                                            <td>{data.product}</td>
                                                            <td>{data.category}</td>
                                                            <td ><span className={` 
                                                                ${data.status_id == 5 ? 'badge rounded-pill bg-danger' :
                                                                    data.status_id == 4 ? 'badge rounded-pill bg-warning' : ''
                                                                }
                                                                `}>{data.status} </span></td>
                                                            <td>{data.warehouse}</td>
                                                            <td><b><small>{data.observation}</small></b></td>

                                                            <td>
                                                                <button className='btn btn-outline-primary' data-bs-toggle="modal" data-bs-target="#observation" onClick={() => setproductSelected(data)} ><i className="fas fa-eye" ></i></button>
                                                                <button className='btn btn-outline-primary' data-bs-toggle="modal" data-bs-target="#exampleModaEditWarehouse" onClick={() => { setproductSelected(data); console.log("El valor del ID STATUS:", data.status_id); console.log("El valor de STATUS:", data.status); console.log("El valor de CANTIDAD:", data.quantity); setproductState(data.status); setproductquantity(data.quantity); console.log('El valor de PRODUCT ID:', data.product_id); setproductId(data.product_id); console.log('EL valor de INVENTORIES ID:', data.inventories_id); setinventoriesId(data.inventories_id); console.log('EL ID de BODEGA:', data.warehouse_id); setwarehouseId(data.warehouse_id); }}><i className="fas fa-edit"></i></button>
                                                                <button className='btn btn-outline-danger' data-bs-toggle="modal" data-bs-target="#delete" onClick={() => setproductSelected(data)} ><i className="fas fa-trash-alt" aria-hidden="true" ></i></button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                    :
                                                    <tr></tr>
                                            }

                                        </tbody>
                                    </table>
                                </div>
                                :
                                <h1 className='text-center text-success' style={{ padding: '10vh' }}>SELECCIONE UNA BODEGA</h1>
                        }

                    </div>
                </div>
            </div>

            {/* OBSERVACION DE BODEGAS */}
            <div className="modal fade" id="observation" tabIndex="-1" aria-labelledby="observationLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="observationLabel">Observación</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className='text-center'>
                                <b style={{ textAlign: 'center' }}>{productSelected.product}</b><br></br>
                                Estado: <b style={{ textAlign: 'center' }}>{productSelected.status}</b><br></br>
                                Bodega: <b style={{ textAlign: 'center' }}>{productSelected.warehouse}</b><br></br>
                            </div>
                            <br></br>
                            <label >Ingrese Observaciones</label>
                            <textarea className="form-control" id="exampleFormControlTextarea1" name="observation" value={formD.observation} onChange={onInputChange} rows="5"></textarea>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={() => addObservation()} data-bs-dismiss="modal"  >Aceptar</button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"  >Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ELIMINAR BODEGAS */}
            <div className="modal fade" id="delete" tabIndex="-1" aria-labelledby="deleteLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="deleteLabel">Eliminar Producto</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className='text-center'>
                                Está seguro que desea eliminar el producto: <br></br>
                                <b style={{ textAlign: 'center' }}>{productSelected.product}</b>
                            </div>
                            <br></br>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={() => deleteProductWarehouse()} data-bs-dismiss="modal"  >Aceptar</button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"  >Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* EDICION ESTADO Y CANTIDAD DE BODEGAS */}
            <div className="modal fade" id="exampleModaEditWarehouse" tabIndex="-1" aria-labelledby="observationLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="observationLabel">EDITAR PRODUCTO</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form>
                            <div className="modal-body">
                                <div className='text-center'>
                                    <h4 style={{ textAlign: 'center' }}>{productSelected.product}</h4><br></br>
                                    <div className='row'>
                                        <div className='col-12 col-sm-6'>
                                            <b>Estado:</b>{productSelected.status}
                                        </div>
                                        <div className='col-12 col-sm-6'>
                                            <b>Bodega:</b>{productSelected.warehouse}
                                        </div>
                                    </div>
                                </div>
                                <br></br>
                                <div className='row'>
                                    <div className='col-12 col-sm-6'>
                                        <div className="mb-3">
                                            <label className="form-label">Estado: </label>
                                            {/* <input type="text" name='meetquantitying_point' className="form-control" value={productState} placeholder='' required></input> */}
                                            {/* <select className="form-select" name="status_id" aria-label="Default select example" required> */}
                                            <select className="form-select" name="status_id" aria-label="Default select example" required onChange={(e) => setFormData({ ...formData, status_id: e.target.value })}>
                                                <option value="" >{productState}</option>
                                                <option value="1">Nuevo</option>
                                                <option value="2">Bueno</option>
                                                <option value="3">Regular</option>
                                                <option value="4">Malo Funcional</option>
                                                <option value="5">Malo No Funcional</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className='col-12 col-sm-6'>
                                        <div className="mb-3">
                                            <label className="form-label">Cantidad:</label>
                                            {/* <input type="text" name="quantity_products" className="form-control" value={productquantity} onChange={(e) => setproductquantity(e.target.value)} placeholder="" required /> */}
                                            <input type="text" name="quantity_products" className="form-control" value={productquantity} onChange={(e) => setproductquantity(e.target.value)} placeholder="" required />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                {/* <button type="button" className="btn btn-primary" onClick={() => { updateStateQuantity(); }} data-bs-dismiss="modal">Aceptar</button> */}
                                <button type="button" className="btn btn-primary" onClick={() => { updateStateQuantity(); }} data-bs-dismiss="modal">Aceptar</button>
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"  >Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <ToastContainer theme="colored" />
        </div>
    )
}
