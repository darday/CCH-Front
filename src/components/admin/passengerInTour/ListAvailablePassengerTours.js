import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { ApiStorage, ApiUrl } from '../../../services/ApiRest';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import AssignmentIndTwoToneIcon from '@mui/icons-material/AssignmentIndTwoTone';


export const ListAvailablePassengerTours = () => {
    const [tours, settours] = useState([]);
    const [selectedTourList, setselectedTourList] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    // const [selectedImage, setselectedImage] = useState([]);


    const getData = async () => {
        await axios.get(ApiUrl + "passengerlistTour-list-active")
            .then(response => {
                const data = response.data;
                settours(data);
                console.log("data");
                console.log(data);
            })
            .catch(e => {
                console.log(e)
            })
        //cargamos los datos nuevos
        const script = document.createElement("script");
        script.src = `/assets/dataTable/dataTable.js`;
        script.async = true;
        document.body.appendChild(script);
        setisLoading(false);
    }

    const deleteTable = () => {
        const script1 = document.createElement("script");
        script1.src = `/assets/dataTable/datatable-destroy.js`;
        script1.async = true;
        document.body.appendChild(script1);
    }

    const deleteTour = async () => {
        // // console.log(selectedTour.monthly_tour_id);
        // await axios.post(ApiUrl + 'monthly-tour-delete/' + selectedTour.monthly_tour_id)
        //     .then(resp => {
        //         deleteTable();
        //         getData();
        //         toast.success("Tour Mensual Eliminado exitosamente", { position: toast.POSITION.BOTTOM_RIGHT });

        //     })
        //     .catch(e => {
        //         console.log(e);
        //     })

    }

    const selectTour = (data) => {
        setselectedTourList(data);
        
        
    }

    const updatePastTours = async () => {
        await axios.post(ApiUrl + 'monthly-tour-update-past-tour')
            .then(resp => {
                toast.success("Tours Actualizados", { position: toast.POSITION.BOTTOM_RIGHT });

            })
            .catch(e => {
                console.log(e);
            })
    }

    const addPassengerToList = async () =>{
        console.log("guardado");
        
    }

    useEffect(() => {
        updatePastTours()
    }, [])

    useEffect(() => {
        getData()
    }, [])


    if (isLoading) {
        return (
            <div>
                <h5>Cargando Datos...</h5>
            </div>
        )
    }

    return (
        <>
            <div>
                <Link to="../monthly-tour-available"><button type="button" className="btn btn-secondary" style={{ marginBottom: "1vh" }}>Agregar Lista Nueva</button><br></br></Link>
                <div className='row'>
                    <div className='col-12 '>
                        <div className="card">
                            <div className="card-header">
                                LISTA DE PASAJEROS EN TOURS DISPONIBLES
                            </div>
                            <div className="card-body table-responsive">
                                <table className='table table-hover' id="dataTable" >
                                    <thead>
                                        <tr>
                                            {/* <th>#</th> */}
                                            <th>Destino</th>
                                            <th>Fecha</th>
                                            <th>Cant. Pasajeros</th>
                                            <th>Ingreso</th>
                                            <th>Egreso</th>
                                            <th>Utilidad</th>

                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            tours.map((tour, index) => (
                                                <tr key={tour.monthly_tour_id}>
                                                    {/* <td>{index + 1}</td> */}
                                                    <td >{tour.tour_destiny}</td>
                                                    <td>{tour.departure_date}</td>
                                                    <td>{tour.cant_passengers}</td>
                                                    <td>{tour.incomes}</td>
                                                    <td>{tour.expenses}</td>
                                                    <td>{tour.utility}</td>

                                                    <td>
                                                        <button className='btn btn-outline-primary btn-sm' data-bs-toggle="modal" data-bs-target="#addPassenger" onClick={() => setselectedTourList(tour)} ><i className="fas fa-user-plus"></i></button>
                                                        <button className='btn btn-outline-secondary btn-sm' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => (tour)}  ><i className="fas fa-eye"></i></button>
                                                        <button className='btn btn-outline-danger btn-sm' data-bs-toggle="modal" data-bs-target="#exampleModal2" onClick={() => (tour.img_1)}  ><i className="fas fa-trash-alt"></i></button>
                                                        {
                                                            <button className='btn btn-outline-success btn-sm ' data-bs-toggle="modal" data-bs-target="#modal-lista-pasajeros" > <i className="far fa-calendar-check"></i> </button>
                                                        }
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

                {/************ modal para agregar un pasajero a la lista *********************/}
                <div className="modal fade" id="addPassenger" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <p className="modal-title" id="exampleModalLabel">AGREGAR PASAJERO A: <b>{selectedTourList.tour_destiny} </b></p>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="card-body">
                                    <form >
                                        <div className='row'>
                                            <div className='col-12 col-sm-6'>
                                                <div className="form-group">
                                                    <label >Cédula de Identidad</label>
                                                    <input type="text" name='tour_name'  className="form-control" placeholder='0603935008' required></input>
                                                </div>
                                            </div>
                                            <div className='col-12 col-sm-6'>
                                                <div className="form-group">
                                                    <label >Nombre y Apellido</label>
                                                    <input type="text" name='tour_destiny' className="form-control " placeholder='Usuario Prueba' required></input>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-12 col-sm-6'>
                                                <div className="form-group">
                                                    <label >Teléfono</label>
                                                    <input type="text" name='tour_name'  className="form-control" placeholder='0961119670' required></input>
                                                </div>
                                            </div>
                                            <div className='col-12 col-sm-6'>
                                                <div className="form-group">
                                                    <label >Ciudad</label>
                                                    <input type="text" name='tour_destiny' className="form-control " placeholder='Riobamba' required></input>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-12 col-sm-6'>
                                                <div className="form-group">
                                                    <label >Correo</label>
                                                    <input type="text" name='tour_name'  className="form-control" placeholder='correo@gmail.com' required></input>
                                                </div>
                                            </div>
                                            <div className='col-12 col-sm-6'>
                                                <div className="form-group">
                                                    <label >Edad</label>
                                                    <input type="text" name='tour_destiny' className="form-control " placeholder='25' required></input>
                                                </div>
                                            </div>
                                        </div>


                                    </form>

                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={() => addPassengerToList()} data-bs-dismiss="modal" >Aceptar</button>
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"  >Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Eliminar</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                {/* Está seguro que desea eliminar <b>{selectedTour.tour_destiny}</b> */}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={() => deleteTour()} data-bs-dismiss="modal" >Aceptar</button>
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"  >Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>



                <ToastContainer theme="colored" />

            </div>
        </>
    )
}
