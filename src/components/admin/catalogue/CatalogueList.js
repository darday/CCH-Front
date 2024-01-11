import React, { useEffect, useState } from 'react'
import MUIDataTable from "mui-datatables";
import axios from 'axios';
import { ApiUrl } from '../../../services/ApiRest';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';


export const CatalogueList = () => {

  const [tours, settours] = useState([]);
  const [selectedTour, setselectedTour] = useState([]);



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

  const deleteTable = () => {
    const script1 = document.createElement("script");
    script1.src = `/assets/dataTable/datatable-destroy.js`;
    script1.async = true;
    document.body.appendChild(script1);
  }

  const selectTour = (data) => {
    setselectedTour(data);
  }

  const deleteTour = async () => {
    await axios.post(ApiUrl + 'catalogue-tour-delete/' + selectedTour.tour_catalogues_id)
      .then(resp => {
        deleteTable();
        getData();
        toast.success("Tour Eliminado exitosamente", { position: toast.POSITION.BOTTOM_RIGHT });

      })
      .catch(e => {
        console.log(e);
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
              CATÁLOGO DE TOURS 
            </div>
            <div className="card-body table-responsive">
              <table className='table table-hover' id="dataTable" style={{width:'100%'}} >
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
                        <Link to={"../edit-catalogue/" + tour.tour_catalogues_id}>
                          <button className='btn btn-outline-primary' ><ModeEditOutlineOutlinedIcon/></button>
                        </Link>
                        <button className='btn btn-outline-danger' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => selectTour(tour)}><DeleteOutlinedIcon/></button>

                      </td>

                    </tr>
                  ))}

                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
      </div>

      <ToastContainer theme="colored" />

    </div>


  )
}
