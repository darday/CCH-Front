import React from 'react'
// import React, { useState } from 'react'
// import { useEffect } from 'react';

export const ListEquipmentSell = () => {

    // const [listData, setListData] = useState({
    //     name: '',
    //     description: '',
    //     cost: '',
    //     state: '',
    //     discount: 0,
    //     discount_description: '',
    //     contact_phone: '',
    //     messagge_for_contact: '',
    //     type: '',
    // });

    // useEffect(() => {
    //   setListData({
    //     escription: 'Es una carpa',
    //     cost: '10.00',
    //     state: '1',
    //     discount: '15',
    //     discount_description: 'Descripcion 1',
    //     contact_phone: '123456789',
    //     messagge_for_contact: 'Mensaje 1',
    //     type: 'Carpa',
    //     });
    //   }, [])
    

    // console.log(listData);
  return (
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
                                  <th>Nombre</th>
                                  <th>Descripción</th>
                                  <th>Costo</th>
                                  <th>Estado</th>
                                  <th>Decuento</th>
                                  <th>Descripción descuento</th>
                                  <th>Contacto</th>
                                  <th>Tipo</th>
                                  <th>Acciones</th>
                              </tr>
                          </thead>
                          <tbody>
                              {/* {tours.map((tour, index) => (
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
                              ))} */}

                          </tbody>
                      </table>
                  </div>
              </div>
          </div>
      </div>
    </div>
  )
}
