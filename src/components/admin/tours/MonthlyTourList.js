import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ApiUrl } from '../../../services/ApiRest';

export const MonthlyTourList = () => {
    const [tours, settours] = useState([]);

    const getData= async ()=>{
        await axios.get(ApiUrl+"monthly-tour-list")
        .then(response=>{
            const data = response.data;
            settours(data);
        })
        .catch (e =>{
            console.log(e)
        })
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
                                <table className='table table-hover'>
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
                                                    <button className='btn btn-outline-primary'>Editar</button>
                                                    <button className='btn btn-outline-danger'>Eliminar</button>

                                                </td>


                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
