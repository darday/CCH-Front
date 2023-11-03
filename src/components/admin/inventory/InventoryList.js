import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ApiUrl } from '../../../services/ApiRest';
import { ToastContainer, toast } from 'react-toastify';
import { WarehouseSelect } from './selects/WarehouseSelect';
import { StatusSelect } from './selects/StatusSelect';
import { ProductsSelect } from './selects/ProductsSelect';

export const InventoryList = () => {
    const [data, setdata] = useState([]);
    const [productSelected, setproductSelected] = useState([]);
    const [warehouseSelected, setwarehouseSelected] = useState();

    const [optionSelected, setoptionSelected] = useState()

    // USESTATES FOR PRODUCTS TO ADD
    const [productToAddSelected, setproductToAddSelected] = useState();
    const [statusSelected, setstatusSelected] = useState([])
    const [quantityAdd, setquantityAdd] = useState()
    const [observationAdd, setobservationAdd] = useState()




    const [formD, setformD] = useState({
        quantityToMove: '',
        observation: '',
    });


    const dataList = async () => {
        await axios.get(ApiUrl + 'inventory-list')
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

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setformD({
            ...formD,
            [name]: value
        })

        // setobservationAdd(...observationAdd);
    }

    const selectProduct = (data, opc) => {
        setproductSelected(data);
        if (opc == 1) {
            console.log('opc1')
            setoptionSelected(1);
        } else {
            console.log('opc2')
            setoptionSelected(2);
        }
    }

    const onSubmit = async (event) => {
        event.preventDefault();

        let quantityToMove = formD.quantityToMove;
        let available = productSelected.stock - productSelected.inWarehouse;
        console.log(available);
        console.log(quantityToMove);
        if (quantityToMove > available || quantityToMove < 0) {
            toast.error("La cantidad ingresada debe ser menor o igual a la cantidad disponible y mayor que 0", { position: toast.POSITION.BOTTOM_RIGHT });
        } else {
            const f = new FormData();

            f.append("inventories_id", productSelected.inventories_id);
            f.append("product_id", productSelected.product_id);
            f.append("warehouse_id", warehouseSelected[""]);
            f.append("quantityToMove", formD.quantityToMove);
            f.append("observation", formD.observation);
            f.append("product_status_id", productSelected.status_id);


            console.log(Object.fromEntries(f));

            await axios.post(ApiUrl + 'productsWarehouse-add', f)
                .then(response => {
                    var resp = response.data;
                    console.log(resp);
                    if (resp.success) {

                        toast.success(resp.messagge, { position: toast.POSITION.BOTTOM_RIGHT });
                        deleteTable();
                        dataList();
                        setformD({
                            quantityToMove: '',
                            observation: '',
                        });

                    } else {
                        toast.error(resp.messagge, { position: toast.POSITION.BOTTOM_RIGHT });
                    }
                })
                .catch(e => {
                    console.log(e)
                    toast.error("" + e + "  !", { position: toast.POSITION.BOTTOM_RIGHT });

                })


        }
    }

    const onSubmitAddToInventory = async (event) => {
        event.preventDefault();
        console.log(productToAddSelected.value)
        console.log(formD.quantityToMove)
        console.log(statusSelected[""])
        console.log(formD.observation)

        if (formD.quantityToMove < 0) {
            toast.error("La cantidad ingresada debe ser mayor a 0", { position: toast.POSITION.BOTTOM_RIGHT });
        } else {
            const f = new FormData();

            f.append("product_id", productToAddSelected.value);
            f.append("stock", formD.quantityToMove);
            f.append("status_id", statusSelected[""]);
            f.append("Observation", formD.observation);

            // console.log(Object.fromEntries(f));

            await axios.post(ApiUrl + 'inventory-add', f)
                .then(response => {
                    var resp = response.data;
                    console.log(resp);
                    if (resp.success) {
                        toast.success(resp.messagge, { position: toast.POSITION.BOTTOM_RIGHT });
                        deleteTable();
                        dataList();

                    } else {
                        toast.error(resp.messagge, { position: toast.POSITION.BOTTOM_RIGHT });
                    }
                })
                .catch(e => {
                    console.log(e)
                    toast.error("" + e + "  !", { position: toast.POSITION.BOTTOM_RIGHT });

                })

        }
    }

    const onSubmitEdit = async (event) => {
        event.preventDefault();
        console.log(productSelected.inventories_id)
        console.log(formD.quantityToMove)
        console.log(statusSelected[""])
        console.log(formD.observation)

        if (formD.quantityToMove < 0) {
            toast.error("La cantidad ingresada debe ser mayor a 0", { position: toast.POSITION.BOTTOM_RIGHT });
        } else {
            const f = new FormData();

            f.append("inventories_id", productSelected.inventories_id);
            f.append("quantity", formD.quantityToMove);
            f.append("status_id", statusSelected[""]);
            f.append("Observation", formD.observation);

            // console.log(Object.fromEntries(f));

            await axios.post(ApiUrl + 'inventory-edit', f)
                .then(response => {
                    var resp = response.data;
                    console.log(resp);
                    if (resp.success) {
                        toast.success(resp.messagge, { position: toast.POSITION.BOTTOM_RIGHT });
                        deleteTable();
                        dataList();

                    } else {
                        toast.error(resp.messagge, { position: toast.POSITION.BOTTOM_RIGHT });
                    }
                })
                .catch(e => {
                    console.log(e)
                    toast.error("" + e + "  !", { position: toast.POSITION.BOTTOM_RIGHT });

                })

        }
    }

    const deleteTable = () => {
        const script1 = document.createElement("script");
        script1.src = `/assets/dataTable/datatable-destroy.js`;
        script1.async = true;
        document.body.appendChild(script1);
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
                                    <b>INVENTARIO CAMPING CHIMBORAZO</b>
                                </div>
                                <div className='col-12 col-md-6 ' style={{ textAlign: 'right' }}>
                                    <button className='btn btn-success btn-sm' data-bs-toggle="modal" data-bs-target="#addProductsToInventory" ><i className="fa fa-plus" aria-hidden="true"></i></button>
                                </div>
                            </div>
                        </div>
                        <div className="card-body table-responsive">
                            <table className='table table-hover ' id="dataTable-ord-col1"  >
                                <thead>
                                    <tr>
                                        {/* <th>ID Prod</th> */}
                                        <th>Cant</th>
                                        <th>Producto</th>
                                        <th>Proveedor</th>
                                        <th>Estado</th>
                                        <th>Categoría</th>
                                        <th>En Bodega</th>
                                        <th>Sin Bodega</th>

                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((data, i) => (
                                        // <tr class="alert alert-primary" role="alert" style={{ backgroundColor:  data.status_id === 5 ?'red':'white'}} key={data.inventories_id}>
                                        <tr className={` 
                                            ${data.status_id == 5 ? 'text-danger' : ''
                                            // data.status_id == 4 ? 'text-warning' : ''
                                            }
                                            `} key={data.inventories_id}>
                                            {/* <td>{data.product_id}</td> */}
                                            <td>{data.stock}</td>
                                            {/* <td>{ textLimit(data.description,20)}</td> */}
                                            <td >{data.product}</td>
                                            <td >{data.name_store}</td>
                                            <td ><span className={` 
                                                ${data.status_id == 5 ? 'badge rounded-pill bg-danger' :
                                                    data.status_id == 4 ? 'badge rounded-pill bg-warning' : ''
                                                }
                                                `}>{data.status} </span></td>
                                            <td>{data.category}</td>
                                            <td>{data.inWarehouse}</td>
                                            <td><span className={` 
                                                ${data.withoutWarehouse > 0 ? 'badge rounded-pill bg-danger' : ''
                                                }
                                                `} style={{ paddingRight: '0.5vw', paddingLeft: '0.5vw' }}>{data.withoutWarehouse}</span></td>

                                            <td>
                                                
                                                <button className='btn btn-outline-success' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => selectProduct(data, 1)} ><i className="fas fa-share-square"></i></button>
                                                <button className='btn btn-outline-secondary' data-bs-toggle="modal" data-bs-target="#editModal" onClick={() => selectProduct(data, 2)} ><i className="fas fa-edit"></i></button>
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
                            <h5 className="modal-title" id="exampleModalLabel"><b>Mover a Bodega</b></h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div style={{ textAlign: 'center' }}>
                                <b>{productSelected.product}</b><br></br>
                                <label className="form-label">Sin Asignar: {productSelected.stock - productSelected.inWarehouse - formD.quantityToMove} </label>

                            </div>
                            <br></br>
                            <form onSubmit={onSubmit}>
                                <div className='row'>
                                    <div className='col-6'>
                                        <div className="">
                                            <label className="form-label">Productos que desea mover</label>
                                            {/* <input type="text" name='quantity' className="form-control" value={formD.quantity} onChange={onInputChange} required ></input> */}
                                            <input type="number" name='quantityToMove' className="form-control" value={formD.quantityToMove} onChange={onInputChange} placeholder='Ejemplo: 5' required ></input>

                                        </div>
                                    </div>

                                    <div className='col-6 col-md-6'>
                                        <div className="">
                                            <label className="form-label">Bodega</label>
                                            <WarehouseSelect
                                                warehouse={warehouseSelected}
                                                setwarehouse={setwarehouseSelected}
                                            />
                                        </div>
                                    </div>


                                    <div className='col-12'>
                                        <div className="form-group">
                                            <label >Observaciones</label>
                                            <textarea className="form-control" id="exampleFormControlTextarea1" name="observation" value={formD.observation} onChange={onInputChange} rows="3"></textarea>
                                        </div>
                                    </div>

                                </div>

                                {/* <button type="submit" className="btn btn-primary">Submit</button> */}
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                    <button type="submit" className="btn btn-success"  data-bs-dismiss="modal">Guardar</button>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            {/* <button type="button" className="btn btn-primary" onClick={() => deleteTour()} data-bs-dismiss="modal"  >Aceptar</button> */}
                            {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"  >Cancelar</button> */}
                        </div>
                    </div>
                </div>
            </div>


            {/* MODAL DE AGREGAR PRODUCTOS A INVENTARIO */}

            <div className="modal fade" id="addProductsToInventory" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel"><b>AGREGAR PRODUCTOS A INVENTARIO</b></h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div style={{ textAlign: 'center' }}>
                                {/* <b>{productSelected.product}</b><br></br> */}
                                {/* <label className="form-label">Sin Asignar: {productSelected.stock - productSelected.inWarehouse} </label> */}

                            </div>
                            <br></br>
                            <form onSubmit={onSubmitAddToInventory}>
                                <div className='row'>
                                    <div className='col-12'>
                                        <div className="">
                                            <label className="form-label">Seleccione Producto</label>
                                            {/* <input type="text" name='quantity' className="form-control" value={formD.quantity} onChange={onInputChange} required ></input> */}
                                            {/* <input type="number" name='quantityToMove' className="form-control" value={formD.quantityToMove} onChange={onInputChange} placeholder='Ejemplo: 5' required ></input> */}
                                            <ProductsSelect
                                                productSelect={productToAddSelected}
                                                setproductSelect={setproductToAddSelected}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-6 col-md-6'>
                                        <div className="">
                                            <label className="form-label">Cantidad</label>
                                            {/* <input type="text" name='quantity' className="form-control" value={formD.quantity} onChange={onInputChange} required ></input> */}
                                            <input type="number" name='quantityToMove' className="form-control" value={formD.quantityToMove} onChange={onInputChange} placeholder='Ejemplo: 5' required ></input>
                                        </div>
                                    </div>

                                    <div className='col-6 col-md-6'>
                                        <div className="">
                                            <label className="form-label">Estado</label>
                                            <StatusSelect
                                                status={statusSelected}
                                                setstatus={setstatusSelected}
                                            />
                                        </div>
                                    </div>


                                    <div className='col-12'>
                                        <div className="form-group">
                                            <label >Observaciones</label>
                                            <textarea className="form-control" id="exampleFormControlTextarea1" name="observation" value={formD.observation} onChange={onInputChange} rows="3"></textarea>
                                        </div>
                                    </div>

                                </div>

                                {/* <button type="submit" className="btn btn-primary">Submit</button> */}
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                    <button type="submit" className="btn btn-success"  data-bs-dismiss="modal" >Guardar</button>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            {/* <button type="button" className="btn btn-primary" onClick={() => deleteTour()} data-bs-dismiss="modal"  >Aceptar</button> */}
                            {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"  >Cancelar</button> */}
                        </div>
                    </div>
                </div>
            </div>

            {/* EDIT MODAL */}

            <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="editModal" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="editModal"><b>Editar Inventario</b></h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div style={{ textAlign: 'center' }}>
                                <b>{productSelected.product}</b><br></br>
                                <label className="form-label">Sin Bodega: {productSelected.stock - productSelected.inWarehouse - formD.quantityToMove} </label>

                            </div>
                            <br></br>
                            <form onSubmit={onSubmitEdit}>
                                <div className='row'>
                                    <div className='col-6'>
                                        <div className="">
                                            <label className="form-label">Productos que desea editar</label>
                                            {/* <input type="text" name='quantity' className="form-control" value={formD.quantity} onChange={onInputChange} required ></input> */}
                                            <input type="number" name='quantityToMove' className="form-control" value={formD.quantityToMove} onChange={onInputChange} placeholder='Ejemplo: 5' required ></input>

                                        </div>
                                    </div>

                                    <div className='col-6 col-md-6'>
                                        <div className="">
                                            <label className="form-label">Estado a Asignar</label>
                                            <StatusSelect
                                                status={statusSelected}
                                                setstatus={setstatusSelected}
                                            />
                                        </div>
                                    </div>


                                    <div className='col-12'>
                                        <div className="form-group">
                                            <label >Observaciones</label>
                                            <textarea className="form-control" id="exampleFormControlTextarea1" name="observation" value={formD.observation} onChange={onInputChange} rows="3"></textarea>
                                        </div>
                                    </div>

                                </div>

                                {/* <button type="submit" className="btn btn-primary">Submit</button> */}
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                    <button type="submit" className="btn btn-success" data-bs-dismiss="modal">Guardar</button>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            {/* <button type="button" className="btn btn-primary" onClick={() => deleteTour()} data-bs-dismiss="modal"  >Aceptar</button> */}
                            {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"  >Cancelar</button> */}
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer theme="colored" />
        </div>
    )
}
