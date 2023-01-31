import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ApiUrl } from '../../../services/ApiRest';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';


export const MonthlyTourList = () => {
    const [tours, settours] = useState([]);
    const [selectedTour, setselectedTour] = useState([]);


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
                            <div className="card-body">
                            <table className='table table table-striped table-bordered table-responsive' id="dataTable" >
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Destino</th>
                                            <th>Tipo</th>
                                            <th>Estado</th>
                                            <th>Dificultad</th>
                                            <th>Costo PP</th>
                                            <th>Costo PG</th>
                                            <th>Fecha Salida</th>
                                            <th>Fecha Regreso</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tours.map((tour, index) => (
                                            <tr key={tour.monthly_tour_id}>
                                                <td>{index + 1}</td>
                                                <td>{tour.tour_destiny}</td>
                                                <td>{tour.type}</td>
                                                <td>{(tour.state == 1) ? 'Habilitado' : 'Deshanilitado'}</td>
                                                <td>{tour.dificulty}</td>
                                                <td>{tour.person_cost}</td>
                                                <td>{tour.group_cost}</td>
                                                <td>{tour.departure_date}</td>
                                                <td>{tour.return_date}</td>
                                                <td>
                                                    <Link to={"../monthly-tour-edit/" + tour.monthly_tour_id}>
                                                        <button className='btn btn-outline-primary'>Editar</button>
                                                    </Link>
                                                    <button className='btn btn-outline-danger' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => selectTour(tour)}  >Eliminar</button>


                                                </td>


                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Eliminar</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                Está seguro que desea eliminar <b>{selectedTour.tour_destiny}</b>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" onClick={() => deleteTour()} data-bs-dismiss="modal" >Aceptar</button>
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"  >Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer theme="colored" />

            </div>
        </>
    )
}
