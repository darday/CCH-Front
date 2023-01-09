import React, { useEffect, useState } from 'react'
import MUIDataTable from "mui-datatables";
import axios from 'axios';
import { ApiUrl } from '../../../services/ApiRest';
import { Download } from '@mui/icons-material';



export const CatalogueList = () => {

  const [tours, settours] = useState([]);



  const getData = async () => {
    await axios.get(ApiUrl + "catalogue-list")
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

  useEffect(() => {
    getData()
  }, [])


  return (
    <div>
      <div className='row'>
        <div className='col-12 '>
          <div className="card">
            <div className="card-header">
              CATÁLOGO DE TOURS2
            </div>
            <div className="card-body">
              <table className='table table table-striped table-bordered' id="dataTable" >
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Destino</th>
                    <th>Tipo</th>
                    <th>Estado</th>
                    <th>Dificultad</th>
                    <th>Costo 1</th>
                    <th>Costo 2</th>
                    <th>Costo 3</th>
                    <th>Costo +4</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {tours.map((tour, index) => (
                    <tr key={tour.tour_catalogues_id}>
                      <td>{index + 1}</td>
                      <td>{tour.tour_destiny}</td>
                      <td>{tour.type}</td>
                      <td>{(tour.state == 1) ? 'Habilitado' : 'Deshanilitado'}</td>
                      <td>{tour.dificulty}</td>
                      <td>{tour.cost_1}</td>
                      <td>{tour.cost_2}</td>
                      <td>{tour.cost_3}</td>
                      <td>{tour.cost_4}</td>
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


  )
}
