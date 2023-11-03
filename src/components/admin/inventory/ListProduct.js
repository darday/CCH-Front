import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ApiStorage, ApiUrl } from '../../../services/ApiRest';
import { ToastContainer, toast } from 'react-toastify';


import { CategorySelect } from './selects/CategorySelect';
import { SupplierSelect } from './selects/SupplierSelect';


export const ListProduct = () => {
    const [data, setdata] = useState([]);
    const [img1, setimg1] = useState();
    const [selectedImage, setselectedImage] = useState([]);

    const [formD, setformD] = useState({
        description: '',
        buying_price: '',
        min_selling_price: '',
        selling_price: '',
        rent_price: '',
        entry_date: '',

    });
    const [categorySelected, setcategorySelected] = useState();
    const [supplierSelected, setsupplierSelected] = useState();
    const [productSelected, setproductSelected] = useState([]);

    const dataList = async () => {
        await axios.get(ApiUrl + 'product-list')
            .then(resp => {
                resp = resp.data;
                setdata(resp);
                console.log(resp);
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

    const updateImg1 = e => {
        setimg1(e);
    }

    const onSubmit = async (event) => {

        event.preventDefault();
        const f = new FormData();

        f.append("category_id", categorySelected[""]);
        f.append("supplier_id", supplierSelected[""]);
        f.append("description", formD.description);
        f.append("buying_price", formD.buying_price);
        f.append("min_selling_price", formD.min_selling_price);
        f.append("selling_price", formD.selling_price);
        f.append("rent_price", formD.rent_price);
        f.append("entry_date", formD.entry_date);
        if (img1 != undefined) {
            f.append("img", img1[0]);
        }
        // console.log(Object.fromEntries(f));
        await axios.post(ApiUrl + 'product-add', f)
            .then(response => {
                var resp = response.data;
                console.log(resp);
                if (resp.success) {

                    toast.success("Tour Agregado exitosamente", { position: toast.POSITION.BOTTOM_RIGHT });
                    deleteTable();
                    dataList();
                    setformD({
                        description: '',
                        buying_price: '',
                        min_selling_price: '',
                        selling_price: '',
                        rent_price: '',
                        entry_date: ''
                    });
                    setcategorySelected('');
                    setsupplierSelected('');


                } else {
                    toast.error("El tour no se ha agregado", { position: toast.POSITION.BOTTOM_RIGHT });
                }
            })
            .catch(e => {
                console.log(e)
                toast.error("" + e + "  !", { position: toast.POSITION.BOTTOM_RIGHT });

            })

    }

    const selectProduct = (data) => {
        setproductSelected(data);
    }

    const deleteTour = async () => {
        await axios.post(ApiUrl + 'product-delete/' + productSelected.product_id)
            .then(resp => {
                toast.success("Producto eliminado exitosamente", { position: toast.POSITION.BOTTOM_RIGHT });
                deleteTable();
                dataList();
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
                                    <b>LISTA DE PRODUCTOS</b>
                                </div>
                                <div className='col-12 col-md-6 ' style={{ textAlign: 'right' }}>
                                    <button className='btn btn-success btn-sm' data-bs-toggle="modal" data-bs-target="#addProductModal" ><i className="fa fa-plus" aria-hidden="true"></i></button>
                                </div>
                            </div>
                        </div>
                        <div className="card-body table-responsive">
                            <table className='table table-hover ' id="dataTable"  >
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Descripción</th>
                                        <th>Categoría</th>
                                        <th>Proovedor</th>
                                        <th>PC</th>
                                        <th>PV</th>
                                        <th>PVMin</th>
                                        <th>PA</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((data, i) => (
                                        <tr key={data.product_id}>
                                            <td>{i + 1}</td>
                                            <td>{data.description}</td>
                                            <td>{data.category}</td>
                                            <td>{data.supplier}</td>
                                            <td>{data.buying_price}</td>
                                            <td>{data.selling_price}</td>
                                            <td>{data.min_selling_price}</td>
                                            <td>{data.rent_price}</td>
                                            <td>
                                                <button className='btn btn-outline-primary' data-bs-toggle="modal" data-bs-target="#watchModal" onClick={() => setselectedImage(data.img)}><i className="fas fa-eye" aria-hidden="true"></i></button>
                                                <button className='btn btn-outline-danger' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => selectProduct(data)}><i className="fas fa-trash-alt" aria-hidden="true"></i></button>
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
                            Está seguro que desea eliminar <b>{productSelected.description}</b>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={() => deleteTour()} data-bs-dismiss="modal"  >Aceptar</button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"  >Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="modal fade" id="watchModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">  <b>{productSelected.description}</b></h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body text-center">
                            {
                                (selectedImage) ? <img src={`${ApiStorage + selectedImage}`} style={{ width: '100%', padding: '1.5vh' }} className="card-img-top" alt="..."></img>
                                    : <p>Cargando Imagen...</p>
                            }

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={() => deleteTour()} data-bs-dismiss="modal"  >Aceptar</button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"  >Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="modal fade" id="addProductModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel"><b>AGREGAR PRODUCTO</b></h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={onSubmit}>
                                <div className='row'>
                                    <div className='col-12'>
                                        <div className="">
                                            <label className="form-label">Descripción</label>
                                            <input type="text" name='description' className="form-control" value={formD.description} onChange={onInputChange} required ></input>
                                        </div>
                                    </div>

                                    <div className='col-6 col-md-6'>
                                        <div className="">
                                            <label className="form-label">Categoría</label>
                                            <CategorySelect
                                                category={categorySelected}
                                                setcategory={setcategorySelected}
                                            />
                                        </div>
                                    </div>
                                    <div className='col-6 col-md-6'>
                                        <div className="">
                                            <label className="form-label">Proveedor</label>
                                            <SupplierSelect
                                                supplier={supplierSelected}
                                                setsupplier={setsupplierSelected}
                                            />
                                        </div>
                                    </div>
                                    <div className='col-4 col-md-3'>
                                        <div className="">
                                            <label className="form-label">P. Compra</label>
                                            <input type="text" className="form-control" name="buying_price" value={formD.buying_price} onChange={onInputChange} required ></input>
                                        </div>
                                    </div>

                                    <div className='col-4 col-md-3'>
                                        <div className="">
                                            <label className="form-label">P. Venta</label>
                                            <input type="text" className="form-control" name="selling_price" value={formD.selling_price} onChange={onInputChange} required></input>
                                        </div>
                                    </div>

                                    <div className='col-4 col-md-3'>
                                        <div className="">
                                            <label className="form-label">P. Min Venta</label>
                                            <input type="text" className="form-control" name='min_selling_price' value={formD.min_selling_price} onChange={onInputChange} required></input>
                                        </div>
                                    </div>

                                    <div className='col-4 col-md-3'>
                                        <div className="">
                                            <label className="form-label">P. Alquiler</label>
                                            <input type="text" className="form-control" name="rent_price" value={formD.rent_price} onChange={onInputChange} required></input>
                                        </div>
                                    </div>
                                    <div className='col-6 col-md-6'>
                                        <div className="">
                                            <label className="form-label">Fecha Ingreso</label>
                                            <input type="date" className="form-control" name='entry_date' value={formD.entry_date} onChange={onInputChange} required></input>
                                        </div>
                                    </div>
                                    <div className='col-6 col-md-6'>
                                        <div className="">
                                            <label className="form-label">Imagen (Opcional)</label>
                                            <input className="form-control" type="file" name="img" onChange={(e) => updateImg1(e.target.files)} id="formFile"></input>
                                        </div>
                                    </div>
                                </div>

                                {/* <button type="submit" className="btn btn-primary">Submit</button> */}
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                    <button type="submit" className="btn btn-success" >Guardar</button>
                                </div>
                            </form>

                        </div>

                    </div>
                </div>
            </div>
            <ToastContainer theme="colored" />
        </div>
    )
}
