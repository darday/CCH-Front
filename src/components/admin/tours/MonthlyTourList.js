import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ApiStorage, ApiUrl } from '../../../services/ApiRest';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';


export const MonthlyTourList = () => {
    const [tours, settours] = useState([]);
    const [selectedTour, setselectedTour] = useState([]);
    const [selectedImage, setselectedImage] = useState([]);


    const getData = async () => {
        await axios.get(ApiUrl + "monthly-tour-list")
            .then(response => {
                const data = response.data;
                settours(data);
                //cargamos los datos nuevos
                const script = document.createElement("script");
                script.src = `/assets/dataTable/dataTable.js`;
                script.async = true;
                document.body.appendChild(script);
            })
            .catch(e => {
                console.log(e)
            })
    }

    const deleteTable = () => {
        const script1 = document.createElement("script");
        script1.src = `/assets/dataTable/datatable-destroy.js`;
        script1.async = true;
        document.body.appendChild(script1);
    }

    const deleteTour = async () => {
        console.log(selectedTour.monthly_tour_id);
        await axios.post(ApiUrl + 'monthly-tour-delete/' + selectedTour.monthly_tour_id)
            .then(resp => {
                deleteTable();
                getData();
                toast.success("Tour Mensual Eliminado exitosamente", { position: toast.POSITION.BOTTOM_RIGHT });

            })
            .catch(e => {
                console.log(e);
            })

    }

    const selectTour = (data) => {
        setselectedTour(data);
    }

    const updatePastTours = async ()=>{
        await axios.post(ApiUrl + 'monthly-tour-update-past-tour')
          .then(resp => {
            toast.success("Tours Actualizados Exitosamente", { position: toast.POSITION.BOTTOM_RIGHT });
    
          })
          .catch(e => {
            console.log(e);
          })
      }
    
      useEffect(() => {
        updatePastTours()
      }, [])

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            <div>
                <div className='row'>
                    <div className='col-12 '>
                        <div className="card">
                            <div className="card-header">
                                LISTA DE TOURS MENSUALES
                            </div>
                            <div className="card-body table-responsive">
                            <table className='table table-hover' id="dataTable" >
                                    <thead>
                                        <tr>
                                            {/* <th>#</th> */}
                                            <th>Destino</th>
                                            <th>Tipo</th>
                                            <th>Estado</th>
                                            <th>Dificultad</th>
                                            <th>CPP</th>
                                            <th>CPG</th>
                                            <th>Salida</th>
                                            <th>Regreso</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tours.map((tour, index) => (
                                            <tr key={tour.monthly_tour_id}>
                                                {/* <td>{index + 1}</td> */}
                                                <td >{tour.tour_destiny}</td>
                                                <td>{tour.type}</td>
                                                <td style={{color: (tour.state === 1) ? 'green' : 'red'}}><b> {(tour.state === 1) ? 'Activo' : 'Inactivo'}</b></td>
                                                <td>{tour.dificulty}</td>
                                                <td>{tour.person_cost}</td>
                                                <td>{tour.group_cost}</td>
                                                <td>{tour.departure_date}</td>
                                                <td>{tour.return_date}</td>
                                                <td>
                                                    <Link to={"../monthly-tour-edit/" + tour.monthly_tour_id}>
                                                        <button className='btn btn-outline-primary btn-sm'><ModeEditOutlineOutlinedIcon/></button>
                                                    </Link>
                                                    <button className='btn btn-outline-danger btn-sm' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => selectTour(tour)}  ><DeleteOutlinedIcon/></button>
                                                    <button className='btn btn-outline-success btn-sm' data-bs-toggle="modal" data-bs-target="#exampleModal2" onClick={() => setselectedImage(tour.img_1)}  ><VisibilityOutlinedIcon/></button>

                                                </td>


                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="exampleModal"  aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Eliminar</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                Está seguro que desea eliminar <b>{selectedTour.tour_destiny}</b>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={() => deleteTour()} data-bs-dismiss="modal" >Aceptar</button>
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"  >Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="exampleModal2"  aria-labelledby="exampleModalLabel2" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Eliminar</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                            {/* <p>Cargando Imagen...</p> */}
                                {
                                    (selectedImage)?<img src={`${ApiStorage + selectedImage}`} style={{ width: '100%', padding: '1.5vh' }} className="card-img-top" alt="..."></img>
                                    : <p>Cargando Imagen...</p>
                                }

                            </div>
                            <div className="modal-footer">
                                {/* <button type="button" className="btn btn-primary" onClick={() => deleteTour()} data-bs-dismiss="modal" >Aceptar</button> */}
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
