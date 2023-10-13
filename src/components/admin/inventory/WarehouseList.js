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

    const [formD, setformD] = useState({
        quantityToMove: '',
        observation: '',
    });





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

    const listDataProductWarehouse = async () => {
        await axios.get(ApiUrl + 'productsInWarehouse/' + warehouseSelected[""])
            .then(resp => {
                resp = resp.data;
                setproductsInWarehouse(resp);
                console.log(resp)
                console.log("cargadenuevo")
                const script = document.createElement("script");
                script.src = `/assets/dataTable/dataTable.js`;
                script.async = true;
                document.body.appendChild(script);

            })
            .catch(e => {
                console.log(e);
            })
    }

    const deleteTable = () => {
        const script1 = document.createElement("script");
        script1.src = `/assets/dataTable/datatable-destroy.js`;
        script1.async = true;
        document.body.appendChild(script1);
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
                                    <b>PRODUCTOPS EN BODEGA</b>
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
                                    <table className='table table-hover ' id="dataTable-ord-col1"  >
                                        <thead>
                                            <tr>
                                                {/* <th>Id</th> */}
                                                <th>Cantidad</th>
                                                <th>Producto</th>
                                                {/* <th>Categoría</th> */}
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
                                                            // data.status_id == 4 ? 'text-warning' : ''
                                                            }
                                                        `} key={i}>
                                                            {/* <td>{data.product_id}</td> */}
                                                            <td>{data.quantity}</td>
                                                            <td>{data.product}</td>
                                                            {/* <td>{data.ca}</td> */}
                                                            <td ><span className={` 
                                                                ${data.status_id == 5 ? 'badge rounded-pill bg-danger' :
                                                                    data.status_id == 4 ? 'badge rounded-pill bg-warning' : ''
                                                                }
                                                                `}>{data.status} </span></td>                                                            <td>{data.warehouse}</td>
                                                            <td><b><small>{data.observation}</small></b></td>

                                                            <td>
                                                                <button className='btn btn-outline-primary' data-bs-toggle="modal" data-bs-target="#observation" ><i className="fas fa-eye" onClick={() => setproductSelected(data)} ></i></button>
                                                                <button className='btn btn-outline-danger' data-bs-toggle="modal" data-bs-target="#delete" ><i className="fas fa-trash-alt" aria-hidden="true" onClick={() => setproductSelected(data)}></i></button>
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


            <div className="modal fade" id="observation" tabIndex="-1" aria-labelledby="observationLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="observationLabel">Observación</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className='text-center'>
                                <b style={{ textAlign: 'center' }}>{productSelected.product}</b>
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



            <ToastContainer theme="colored" />
        </div>
    )
}
