import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { ApiUrl } from '../../../services/ApiRest';

export const SingleListPassenger = () => {
  const { tourId } = useParams([]);
  console.log("Tour" + tourId);

  const [dataTour, setdataTour] = useState({});
  const [isLoading, setisLoading] = useState(false);


  const loadDataTour = async () => {
    setisLoading(true)
    await axios.get(ApiUrl + 'monthly-tour-show-id/' + tourId)
      .then(resp => {
        setisLoading(false)

        var response = resp.data[0];
        console.log(response);
        setdataTour(response);

      })
      .catch(e => {
        console.log(e);
      })
  }

  

  useEffect(() => {
    loadDataTour();
  }, [])

  if(isLoading){
    return(<h5>Cargando...</h5>)
  }
  

  return (
    <>
      <div className='row'>
        <div className='col-12 '>
          <div className="card">
            <div className="card-header">
              <b> LISTA {dataTour.tour_destiny} / {dataTour.departure_date} </b>
            </div>
            <div className="card-body table-responsive">
              <table className='table table-hover small' id="dataTable" >
                <thead>
                  <tr>
                    {/* <th>#</th> */}
                    <th>Cupos</th>
                    <th>Nombre</th>
                    <th>P Unitario</th>
                    <th>Extra</th>
                    <th>P Total</th>
                    <th>Cobrado</th>
                    <th>Por Cobrar</th>
                    <th>Banco</th>
                    <th>Responsable</th>
                    <th>Punto de Encuentro</th>
                    <th>Observaciones</th>
                    <th>Comprobante</th>

                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>

                  {
                    // tours.map((tour, index) => (
                    //   <tr key={tour.monthly_tour_id}>
                    //     {/* <td>{index + 1}</td> */}
                    //     <td >{tour.tour_destiny}</td>
                    //     <td>{tour.departure_date}</td>
                    //     <td>{tour.cant_passengers}</td>
                    //     <td>{tour.incomes}</td>
                    //     <td>{tour.expenses}</td>
                    //     <td>{tour.utility}</td>

                    //     <td>
                    //       <button className='btn btn-outline-primary btn-sm' data-bs-toggle="modal" data-bs-target="#addPassenger" onClick={() => setselectedTourList(tour)} ><i className="fas fa-user-plus"></i></button>
                    //       <Link to={"../passengerList-single-tour/" + tour.monthly_tour_id}>
                    //         <button className='btn btn-outline-secondary btn-sm'  ><i className="fas fa-eye"></i></button>
                    //       </Link>

                    //       <button className='btn btn-outline-danger btn-sm' data-bs-toggle="modal" data-bs-target="#exampleModal2" onClick={() => (tour.img_1)}  ><i className="fas fa-trash-alt"></i></button>
                    //       {
                    //         <button className='btn btn-outline-success btn-sm ' data-bs-toggle="modal" data-bs-target="#modal-lista-pasajeros" > <i className="far fa-calendar-check"></i> </button>
                    //       }
                    //     </td>


                    //   </tr>
                    // ))

                  }

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
