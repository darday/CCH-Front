import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { ApiUrl } from '../../../services/ApiRest';
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ApiStorage } from '../../../services/ApiRest';
import { UsersGuideSelect } from '../inventory/selects/UsersGuideSelect';

export const SingleListPassenger = () => {
  const { tourId } = useParams([]);
  // console.log("Toursss:" + tourId);

  const [dataTour, setdataTour] = useState({});
  const [isLoading, setisLoading] = useState(false);
  const [data, setdata] = useState([]);
  const [listId, setlistId] = useState();
  const [productToDelete, setProductToDelete] = useState(null);
  const [selectedImageCP, setselectedImageCP] = useState(null);
  const [selectedImageCP2, setselectedImageCP2] = useState(null);
  const [totalCostValue, settotalCostValue] = useState();
  const [toCollectValue, settoCollectValue] = useState();
  const [passengerCi, setpassengerCi] = useState('');
  const [passengerNames, setpassengerNames] = useState('');
  const [passengerPhone, setpassengerPhone] = useState('');
  const [passengerMail, setpassengerMail] = useState('');
  const [passengerCity, setpassengerCity] = useState('');
  const [passengerAge, setpassengerAge] = useState('');
  const [passengerType, setpassengerType] = useState('');
  const [passengerLeader, setpassengerLeader] = useState('');
  const [passengerId, setpassengerId] = useState('');
  const [passengerListId, setpassengerListId] = useState('');
  const [passengerSeats, setpassengerSeats] = useState('');
  const [passengerUnitCost, setpassengerUnitCost] = useState(0);
  const [passengerTotalCost, setpassengerTotalCost] = useState(0);
  const [passengerCollected, setpassengerCollected] = useState(0);
  const [passengerToCollect, setpassengerToCollect] = useState(0);
  const [resultTotalCost, setresultTotalCost] = useState(0);
  const [resultRestToCollect, setresultRestToCollect] = useState(0);
  const [img02, setimg02] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [passengerGroupLeaderCI, setpassengerGroupLeaderCI] = useState('');
  const [passengerListCiId, setpassengerListCiId] = useState('');
  const [CiAntigua, setCiAntigua] = useState('');
  const [newData, setnewData] = useState({
    name: '',
    ci: '',
    phone: '',
    city: '',
    correo: '',
    age: '',
    passenger_ci: '',
    unit_cost: 0,
    total_cost: 0,
    collected: 0,
    to_collect: 0,
    responsable: '',
    meeting_point: '',
    img_cmp_2: '',
    state: '',
    observation: '',
    passenger_group_leader_ci: '',
  })

  const loadDataTour = async () => {
    setisLoading(true);
    try {
      const resp = await axios.get(ApiUrl + 'monthly-tour-show-id/' + tourId);
      // console.log("RESPONSE loadDataTour:", resp.data);
      setisLoading(false);
      // setdataTour(resp.data[0].tour_destiny);
      setdataTour(resp.data[0]);
      setlistId(resp.data[0].list_id);
    } catch (error) {
      console.error("Error en loadDataTour:", error);
      setisLoading(false);
    }
  }

  const listsPassengers = async () => {

    try {
      const response = await axios.get(ApiUrl + `list-passenger-list/${listId}`);
      const responseData = response.data;
      notify();
      // console.log("API 1 LISTA:", responseData);
      // Obtener nombres para passenger_group_leader_ci
      for (const passenger of responseData) {
        if (passenger.list_id) {
          const nameResponse = await axios.get(ApiUrl + `passenger-name/${passenger.passenger_group_leader_ci}`);
          // console.log("API 2 LISTA:", nameResponse);
          passenger.passenger_group_leader_name = nameResponse.data.name;
        }
      }
      setdata(responseData);
      const script = document.createElement("script");
      script.src = `/assets/dataTable/dataTable.js`;
      script.async = true;
      document.body.appendChild(script);
    } catch (error) {
      console.error(error);
    }
  };

  const listsPassengersComplete = async (ListPassengerId) => {
    try {
      const response = await axios.get(ApiUrl + `list-passenger-list-complete/${ListPassengerId}`);
      // const responseData = response.data;
      var responseData = response.data[0];
      console.log("listsPassengersComplete:", responseData);
      if (responseData) {
        setnewData({
          name: responseData.name || '',
          ci: responseData.passenger_ci || '',
          phone: responseData.phone || '',
          city: responseData.city || '',
          correo: responseData.correo || '',
          age: responseData.age || '',

          unit_cost: responseData.unit_cost || '',
          total_cost: responseData.total_cost || '',
          collected: responseData.collected || '',
          to_collect: responseData.to_collect || '',

          responsable: responseData.responsable || '',
          meeting_point: responseData.meeting_point || '',
          description: responseData.description || '',
          observation: responseData.observation || '',
          passenger_type: responseData.passenger_type || '',
          passenger_group_leader_ci: responseData.passenger_group_leader_ci || '',
          // img_cmp_2: responseData.img_cmp_2 || '',
        });
        // console.log('ESTADO PAY:', responseData.observation);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setnewData({
      ...newData,
      [name]: value
    });
  }

  const handleImages2Change = (e) => {
    setimg02(e.target.files);
    console.log('SOY la IMAGEN');
  };


  // const onsubmitUpdate = async (event) => {
  //   event.preventDefault();
  //   if (resultRestToCollect < 0) {
  //     toast.error("El campo Por Cobrar, tiene una cantidad negativa", { position: toast.POSITION.BOTTOM_RIGHT });
  //     setIsModalOpen(true);
  //     return;
  //   }
  //   try {
  //     const f = new FormData();
  //     f.append('name', newData.name);
  //     f.append('ci', newData.ci);
  //     f.append('phone', newData.phone);
  //     f.append('city', newData.city);
  //     f.append('correo', newData.correo);
  //     f.append('age', newData.age);
  //     const responsePassenger = await axios.post(ApiUrl + `passenger-update/${passengerId}`, f, {
  //     });
  //     console.log('Respuesta de passenger-updateEEE:', responsePassenger);
  //     if (responsePassenger.status === 200) {
  //       toast.success("Registro Actualizado exitosamente", { position: toast.POSITION.BOTTOM_RIGHT });
  //       console.log('Deseo ver RESP UPDATE:', responsePassenger);
  //     } else {
  //       toast.error("Registro NO ha sido agregado", { position: toast.POSITION.BOTTOM_RIGHT });
  //     }

  //     const formData = new FormData();
  //     formData.append('passenger_ci', newData.ci);
  //     if (newData.description === 'No Aplica - Acompañante') {
  //       formData.append('unit_cost', 0);
  //     } else {
  //       formData.append('unit_cost', newData.unit_cost);
  //     }
  //     if (newData.description === 'No Aplica - Acompañante') {
  //       formData.append('total_cost', 0);
  //     } else {
  //       formData.append('total_cost', resultTotalCost || '');
  //     }
  //     if (newData.description === 'No Aplica - Acompañante') {
  //       formData.append('collected', 0);
  //     } else {
  //       formData.append('collected', newData.collected);
  //     }
  //     if (resultRestToCollect === 0) {
  //       formData.append('to_collect', 0);
  //     } else {
  //       formData.append('to_collect', resultRestToCollect || '');
  //     }
  //     formData.append('responsable', newData.responsable);
  //     formData.append('meeting_point', newData.meeting_point);
  //     formData.append("img_cmp_2", img02[0]);
  //     if (newData.state != undefined || newData.state != null) {
  //       formData.append('state', newData.state);
  //     }
  //     formData.append('observation', newData.observation);
  //     // formData.append("passenger_group_leader_ci", newData.ci)
  //     console.log('Datos enviados al backend:', Object.fromEntries(f));
  //     const responseList = await axios.post(ApiUrl + `passenger-list-update/${passengerListId}/${passengerListCiId}`, formData);
  //     const respList = responseList.data;
  //     console.log('Respuesta del servidor PASENGER LIIIST:', respList);
  //     // listsPassengers();
  //     if (respList) {
  //       // toast.success("Registro en LISTA de pasajeros ACTUALIZADO exitosamente", { position: toast.POSITION.BOTTOM_RIGHT });
  //       listsPassengers();
  //     } else {
  //       toast.error("Registro en lista de pasajeros NO ha sido actualizado", { position: toast.POSITION.BOTTOM_RIGHT });
  //       console.log('ok');
  //     }



  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  const onsubmitUpdate = async (event) => {
    event.preventDefault();
    if (resultRestToCollect < 0) {
      toast.error("El campo Por Cobrar, tiene una cantidad negativa", { position: toast.POSITION.BOTTOM_RIGHT });
      setIsModalOpen(true);
      return;
    }
    try {
      const f = new FormData();
      f.append('name', newData.name);
      f.append('ci', newData.ci);
      f.append('phone', newData.phone);
      f.append('city', newData.city);
      f.append('correo', newData.correo);
      f.append('age', newData.age);
      const responsePassenger = await axios.post(ApiUrl + `passenger-update/${passengerId}`, f, {
      });
      console.log('Respuesta de passenger-updateEEE:', responsePassenger);
      if (responsePassenger.status === 200) {
        toast.success("Registro Actualizado exitosamente", { position: toast.POSITION.BOTTOM_RIGHT });
        console.log('Deseo ver RESP UPDATE:', responsePassenger);
      } else {
        toast.error("Registro NO ha sido agregado", { position: toast.POSITION.BOTTOM_RIGHT });
      }

      const formData = new FormData();
      formData.append('passenger_ci', newData.ci);
      if (newData.description === 'No Aplica - Acompañante') {
        formData.append('unit_cost', 0);
      } else {
        formData.append('unit_cost', newData.unit_cost);
      }
      if (newData.description === 'No Aplica - Acompañante') {
        formData.append('total_cost', 0);
      } else {
        formData.append('total_cost', resultTotalCost || '');
      }
      if (newData.description === 'No Aplica - Acompañante') {
        formData.append('collected', 0);
      } else {
        formData.append('collected', newData.collected);
      }
      if (resultRestToCollect === 0) {
        formData.append('to_collect', 0);
      } else {
        formData.append('to_collect', resultRestToCollect || '');
      }
      formData.append('responsable', newData.responsable);
      formData.append('meeting_point', newData.meeting_point);
      formData.append("img_cmp_2", img02[0]);
      if (newData.state != undefined || newData.state != null) {
        formData.append('state', newData.state);
      }
      formData.append('observation', newData.observation);
      // formData.append("passenger_group_leader_ci", newData.ci)
      console.log('Datos enviados al backend:', Object.fromEntries(formData));
      console.log("DATOS de GUAEDADOsssss TOODOS:", formData);
      const responseList = await axios.post(ApiUrl + `passenger-list-update/${passengerListId}/${passengerListCiId}`, formData);
      const respList = responseList.data;
      console.log('Respuesta del servidor PASENGER LIIIST:', respList);
      // listsPassengers();
      if (respList) {
        toast.success("Registro en LISTA de pasajeros ACTUALIZADO exitosamente", { position: toast.POSITION.BOTTOM_RIGHT });
        listsPassengers();
      } else {
        toast.error("Registro en lista de pasajeros NO ha sido actualizado", { position: toast.POSITION.BOTTOM_RIGHT });
        console.log('ok');
      }

      // const formD = new FormData();
      // formD.append("img_cmp_2", img02[0]);
      // console.log('Datos enviados al backend IMAGEN 2:', Object.fromEntries(formD));
      // const responseList2 = await axios.post(ApiUrl + `passenger-list-update-img2/${passengerListId}`, formData);
      // const respList2 = responseList2.data;
      // console.log('Respuesta del servidor PASENGER LIIIST IMG 2:', respList2);
      // if (respList2) {
      //   toast.success("Registro en IMAGEN ACTUALIZADA exitosamente", { position: toast.POSITION.BOTTOM_RIGHT });

      // } else {
      //   toast.error("Registro en lista de pasajeros NO IMAGEN ACTUALIZADA", { position: toast.POSITION.BOTTOM_RIGHT });

      // }

    } catch (error) {
      console.log(error);
    }
  }

  const updateFullPaymentBtn = async () => {
    try {
      const response = await axios.post(ApiUrl + `passenger-list-update/${passengerListId}`);
      const responseD = response.data;
      if (responseD) {
        toast.success("Pago total realizado exitosamente", { position: toast.POSITION.BOTTOM_RIGHT });
        // console.log('Datos enviados al backend Del PAGO TOTAL BTN:', Object.fromEntries(responseD.data));
        console.log('Datos enviados al backend Del PAGO TOTAL BTN:', responseD.data);
        listsPassengers();
      } else {
        toast.error("No se ha realizado el pago total", { position: toast.POSITION.BOTTOM_RIGHT });
      }      
    } catch (error) {
      console.error(error);
    }
  };

  const toastId = React.useRef(null);
  const notify = () => toastId.current = toast("Cargando Datos...", { autoClose: true, type: toast.TYPE.INFO, position: toast.POSITION.BOTTOM_RIGHT });
  const success = (messagge) => toast.success("Registro agregado exitosamente", { position: toast.POSITION.BOTTOM_RIGHT });

  const calculateTotalCost = () => {
    let total = 0;
    data.forEach((listP) => {
      total += parseFloat(listP.total_cost) || 0;
    });
    return total;
  };

  const calculateCollected = () => {
    let totalCollected = 0;
    data.forEach((listP) => {
      totalCollected += parseFloat(listP.collected) || 0;
    });
    return totalCollected;
  };

  const calculateToCollect = () => {
    let totalToCollect = 0;
    data.forEach((listP) => {
      totalToCollect += parseFloat(listP.to_collect) || 0;
    });
    return totalToCollect;
  };

  const deleteRequestProduct = async (id) => {
    // console.log("ID a eliminar:", id);
    await axios.post(ApiUrl + `list-passenger-delete/${id}`)
      .then(resp => {
        toast.success("Pasajero eliminado exitosamente", { position: toast.POSITION.BOTTOM_RIGHT });
        listsPassengers();
      })
      .catch(e => {
        console.log(e);
      });
    setProductToDelete(null);
  };

  useEffect(() => {
    loadDataTour();
  }, [])

  useEffect(() => {
    if (listId) {
      listsPassengers();
    }
  }, [listId]);

  useEffect(() => {
    listsPassengersComplete();
  }, [])

  useEffect(() => {
    const result = passengerSeats * newData.unit_cost;
    let resultToShow;
    if (!isNaN(result)) {
      resultToShow = result;
      console.log("PRECIO TOTAL ES EL NUEVOOOOO:", resultToShow);
    } else {
      console.log(" NO HAY PRECIO TOTAL");
    }
    const resultResta = resultToShow - newData.collected
    if (!isNaN(resultResta)) {
      console.log("PRECIO POR PAGAR:", resultResta);
    } else {
      console.log("No HAY PRECIO POR PAGAR:");
    }
    setresultTotalCost(resultToShow);
    setresultRestToCollect(resultResta);
  }, [passengerSeats, newData.unit_cost, newData.collected]);

  if (isLoading) {
    return (<h5>Cargando...</h5>)
  }

  return (
    <div>
      <Link to="../passenger-available-tour"><button type="button" className="btn btn-secondary" style={{ marginBottom: "1vh" }}>Regresar</button><br></br></Link>
      <div className='row'>
        <div className='col-12 '>
          <div className="card">
            <div className="card-header">
              <div className='row'>
                <div className='col-12 col-md-12'>
                  <b> LISTA: {dataTour.tour_destiny} / {dataTour.departure_date} </b>
                </div>
              </div>
            </div>
            <br></br>
            <div className='col-12 col-md-12'>
              <h6>A continuación se detalla los valores de sumatoria total de:</h6>
            </div>
            <div className='row'>
              <div className='col-4 col-md-4'>
                <center><h5>PRECIO TOTAL: {calculateTotalCost()}</h5></center>
              </div>
              <div className='col-4 col-md-4'>
                <center><h5>VALOR COBRADO: {calculateCollected()}</h5></center>
              </div>
              <div className='col-4 col-md-4'>
                <center><h5>VALOR POR COBRAR: {calculateToCollect()}</h5></center>
              </div>
            </div>

            <div className="card-body table-responsive">
              {/* <table className='table table-hover small' id="#dataTable-ord-col1" > */}
              <table className='table table-hover small' id="dataTable">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Cupos</th>
                    <th>CI</th>
                    <th>Cliente</th>
                    <th>P Unitario</th>
                    <th>P Total</th>
                    <th>Cobrado</th>
                    <th>Por Cobrar</th>
                    <th>Tipo de pago</th>
                    <th>Tipo de pasajero</th>
                    <th>Cliente que reserva</th>
                    <th>Guía Responsable</th>
                    <th>Punto de Encuentro</th>
                    <th>Observaciones</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    data.map((listP, index) => (
                      <tr key={listP.passenger_lists_id}>
                        <td>{index + 1}</td>
                        <td >{listP.seat}</td>
                        <td >{listP.ci}</td>
                        <td>{listP.name}</td>
                        <td>{listP.unit_cost}</td>
                        <td>{listP.total_cost}</td>
                        <td><span className={`${listP.collected === listP.total_cost && listP.collected > 0 ? 'badge rounded-pill bg-success' : ''}`}>{listP.collected}</span></td>
                        <td><span className={`${listP.to_collect > 0 ? 'badge rounded-pill bg-danger' : ''}`}>{listP.to_collect}</span></td>
                        <td><span className={`${listP.description === 'Pagado Todo' ? 'badge rounded-pill bg-success' : listP.description === 'Pago Parcial' ? 'badge rounded-pill bg-danger' : ''}`}>{listP.description}</span></td>
                        <td style={{ color: (listP.passenger_type === 'Responsable') ? 'blue' : 'inherit' }}>{listP.passenger_type}</td>
                        <td >{listP.passenger_group_leader_name}</td>
                        <td>{listP.responsable}</td>
                        <td>{listP.meeting_point}</td>
                        <td>{listP.observation}</td>
                        <td>
                          <button className='btn btn-outline-primary btn-sm w-50' data-bs-toggle="modal" data-bs-target="#exampleModaEdit" onClick={() => { console.log("Valor de setlistPassengerId:", listP.passenger_lists_id); listsPassengersComplete(listP.passenger_lists_id); setpassengerType(listP.passenger_type); setpassengerSeats(listP.seat); setpassengerLeader(listP.passenger_group_leader_name); console.log("Valor de passenger_group_leader_CI:", listP.passenger_group_leader_ci); setpassengerId(listP.passenger_id); setpassengerUnitCost(listP.unit_cost); setpassengerTotalCost(listP.total_cost); setpassengerCollected(listP.collected); setpassengerToCollect(listP.to_collect); setpassengerListId(listP.passenger_lists_id); setpassengerGroupLeaderCI(listP.passenger_group_leader_ci); console.log('El valor de CI de API:', listP.passenger_ci); setpassengerListCiId(listP.passenger_ci); setCiAntigua(listP.passenger_group_leader_name); }}><i className="fas fa-edit"></i></button>
                          <button className='btn btn-outline-secondary btn-sm w-50' data-bs-toggle="modal" data-bs-target="#exampleModaPI" onClick={() => { setpassengerCi(listP.ci); setpassengerNames(listP.name); setpassengerMail(listP.correo); setpassengerPhone(listP.phone); setpassengerCity(listP.city); setpassengerAge(listP.age); }}><i className="fas fa-eye"></i></button>
                          {
                            listP.state === 7 || listP.state === 8 ? (
                              <button className='btn btn-outline-primary btn-sm w-50' data-bs-toggle="modal" data-bs-target="#exampleModaCP" onClick={() => { console.log("Valor de listP.img_cmp_1:", listP.img_cmp_1); setselectedImageCP(listP.img_cmp_1 || ''); settotalCostValue(listP.total_cost); settoCollectValue(listP.collected); console.log("Valor de listP.img_cmp_2:", listP.img_cmp_2); setselectedImageCP2(listP.img_cmp_2 || ''); }}><i className="fas fa-file-invoice-dollar"></i></button>
                            ) : (
                              <button className='btn btn-outline-primary btn-sm w-50' data-bs-toggle="modal" data-bs-target="#exampleModaCP" disabled><i className="fas fa-file-invoice-dollar"></i></button>
                            )
                          }
                          <button className='btn btn-outline-danger btn-sm w-50' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => setProductToDelete(listP.passenger_lists_id)}><i className="fas fa-trash-alt" aria-hidden="true"></i></button>
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
              Está seguro que desea eliminar
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={() => deleteRequestProduct(productToDelete)} data-bs-dismiss="modal">Aceptar</button>
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"  >Cancelar</button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="exampleModaCP" aria-labelledby="exampleModalLabel2" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Comprobantes de pago</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {
                toCollectValue === totalCostValue && toCollectValue > 0 ? (
                  <center><h5>COMPROBANTE DE PAGO TOTAL</h5></center>
                ) : (<center><h5>COMPROBANTE DE PAGO PARCIAL</h5></center>)
              }
              {selectedImageCP ? (
                <img src={`${ApiStorage + selectedImageCP}`} className="card-img-top" alt="..." />
                // <div style={{backgroundImage: `url(${ApiStorage + selectedImageCP})`, backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', height: '300px', }} onError={(e) => console.error("Error al cargar la imagen:", e)}> IMG001</div>
              ) : (
                <p>Es un pasajero acompañante</p>
              )}
            </div>
            <div className="modal-body">
              {/* {
                selectedImageCP2 !== 'undefined' && toCollectValue === totalCostValue && toCollectValue > 0 ? (
                  <center><h5>COMPROBANTE DE PAGO TOTAL</h5></center>
                ) : ('')
              } */}
              {selectedImageCP2 !== 'undefined' ? (
                <img src={`${ApiStorage + selectedImageCP2}`} className="card-img-top" alt="..." />
              ) : (
                ''
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"  >Cerrar</button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="exampleModaPI" aria-labelledby="exampleModal" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Información de Pasajeros</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className='container'>
                <center><h4>TOUR: {dataTour.tour_destiny} </h4></center>
                <div className="row">
                  <div className="col-sm-8">
                    <label htmlFor="staticEmail" className="col-form-label"><b>Nombres y Apellidos:</b></label>
                  </div>
                  <div className="col-sm-4">
                    <label htmlFor="staticEmail" className="col-form-label"><b>Número de cédula:</b></label>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-8">
                    <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value={passengerNames}></input>
                  </div>
                  <div className="col-sm-4">
                    <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value={passengerCi}></input>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-8">
                    <label htmlFor="staticEmail" className="col-form-label"><b>Correo electrónico:</b></label>
                  </div>
                  <div className="col-sm-4">
                    <label htmlFor="staticEmail" className="col-form-label"><b>Contacto:</b></label>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-8">
                    <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value={passengerMail}></input>
                  </div>
                  <div className="col-sm-4">
                    <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value={passengerPhone}></input>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-8">
                    <label htmlFor="staticEmail" className="col-form-label"><b>Ciudad:</b></label>
                  </div>
                  <div className="col-sm-4">
                    <label htmlFor="staticEmail" className="col-form-label"><b>Edad:</b></label>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-8">
                    <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value={passengerCity}></input>
                  </div>
                  <div className="col-sm-4">
                    <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value={passengerAge}></input>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"  >Cerrar</button>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="modal fade" id="exampleModaEdit" aria-labelledby="exampleModal" aria-hidden="true"> */}
      <div className="modal fade" id="exampleModaEdit" aria-labelledby="exampleModal" aria-hidden="true" style={{ display: isModalOpen ? 'block' : 'none' }}>
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <form onSubmit={onsubmitUpdate}>
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">EDITAR PASAJERO</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className='container'>
                  <center><h4>TOUR: {dataTour.tour_destiny} </h4></center>
                  <div className='row'>
                    <div className='col-12 col-sm-6'>
                      <center><h5>TIPO DE PASAJERO: {passengerType} </h5></center>
                    </div>
                    <div className='col-12 col-sm-6'>
                      {
                        passengerSeats === 0 && passengerType === 'Acompañante' ? (<center><h5>RESPONSABLE: {passengerLeader} </h5></center>) : (<center><h5>CUPOS: {passengerSeats} </h5></center>)
                      }
                    </div>
                  </div>
                  <br></br>
                  <div className='row'>
                    <div className='col-12 col-sm-8'>
                      <div className="form-group">
                        <label >Nombres y Apellidos</label>
                        <input type="text" name='name' className="form-control" value={newData.name} onChange={onInputChange} placeholder='' required></input>
                      </div>
                    </div>
                    <div className='col-12 col-sm-4'>
                      <div className="form-group">
                        <label >Cédula de Identidad</label>
                        <input type="text" name='ci' className="form-control" value={newData.ci} onChange={onInputChange} pattern="\d*" maxLength="10" placeholder='' required></input>
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-12 col-sm-6'>
                      <div className="form-group">
                        <label >Teléfono</label>
                        <input type="text" name='phone' className="form-control" value={newData.phone} onChange={onInputChange} pattern="\d*" maxLength="10" placeholder='' required></input>
                      </div>
                    </div>
                    <div className='col-12 col-sm-6'>
                      <div className="form-group">
                        <label >Ciudad</label>
                        <input type="text" name='city' className="form-control" value={newData.city} onChange={onInputChange} placeholder='' required></input>
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-12 col-sm-8'>
                      <div className="form-group">
                        <label >Correo electrónico</label>
                        <input type="text" name='correo' className="form-control" value={newData.correo} onChange={onInputChange} placeholder='' required></input>
                      </div>
                    </div>
                    <div className='col-12 col-sm-4'>
                      <div className="form-group">
                        <label >edad</label>
                        <input type="text" name='age' className="form-control" value={newData.age} onChange={onInputChange} placeholder='' required></input>
                      </div>
                    </div>
                  </div>
                  {
                    newData.description !== 'No Aplica - Acompañante' && (
                      <div>
                        {/* Aquí va todo el formulario que quieres mostrar cuando la condición no se cumple */}
                        <div className='row'>
                          <div className='row'>
                            {
                              newData.description === 'No Aplica - Acompañante' ? (<div className="col-12"><hr style={{ margin: '10px 0' }} /></div>) : ''
                            }
                            {
                              newData.description === 'No Aplica - Acompañante' ? (<h6>Campos vacíos porque: <b>No Aplica - Acompañante.</b> Revisar en: <b>Pasajero Responsable</b></h6>) : ''
                            }
                            <div className='col-12 col-sm-3'>
                              <div className="form-group">
                                <label >P. Unitario:</label>
                                <input type="text" name='unit_cost' className="form-control" value={newData.description === 'No Aplica - Acompañante' ? '0' : newData.unit_cost} onChange={onInputChange} placeholder='' required disabled={newData.description === 'No Aplica - Acompañante'} ></input>
                              </div>
                            </div>
                            <div className='col-12 col-sm-3'>
                              <div className="form-group">
                                <label >P. Total:</label>
                                <input type="text" name='total_cost' className="form-control" value={resultTotalCost !== undefined ? resultTotalCost : ''} onChange={onInputChange} placeholder='' required disabled={newData.description === 'No Aplica - Acompañante'} />
                              </div>
                            </div>
                            <div className='col-12 col-sm-3'>
                              <div className="form-group">
                                <label >Cobrado</label>
                                <input type="text" name='collected' className="form-control" value={newData.description === 'No Aplica - Acompañante' ? '0' : newData.collected} onChange={onInputChange} placeholder='' required disabled={newData.description === 'No Aplica - Acompañante'}></input>
                              </div>
                            </div>
                            <div className='col-12 col-sm-3'>
                              <div className="form-group">
                                <label >Por Cobrar</label>
                                <input type="text" name='to_collect' className="form-control" value={resultRestToCollect !== undefined ? resultRestToCollect : ''} onChange={onInputChange} placeholder='' disabled></input>
                              </div>
                            </div>
                            {
                              newData.description === 'No Aplica - Acompañante' ? (<div className="col-12"><hr style={{ margin: '10px 0' }} /></div>) : ''
                            }
                          </div>
                          <div className='row'>
                            <div className='col-12 col-sm-6'>
                              <div className="form-group">
                                <label > Guía Responsable</label>
                                <input type="text" name='responsable' className="form-control" value={newData.responsable} onChange={onInputChange} placeholder=''></input>
                                {/* <UsersGuideSelect
                        userGuide={userGuide}
                        setUserGuide={setUserGuide}
                        requestUsersGuideSelected={requestUsersGuideSelected}
                        setrequestUsersGuideSelected={setrequestUsersGuideSelected}
                      /> */}
                              </div>
                            </div>
                            <div className='col-12 col-sm-6'>
                              <div className="form-group">
                                <label >Punto de Ecuentro</label>
                                <input type="text" name='meeting_point' className="form-control" value={newData.meeting_point} onChange={onInputChange} placeholder=''></input>
                              </div>
                            </div>
                          </div>
                          <div className='row'>
                            <div className='col-12 col-sm-6'>
                              <div className="mb-3">
                                <label className="form-label">Comprobante Pago Total</label>
                                {/* <input name='img_cmp_2' className="form-control" onChange={handleImages2Change} id="formFileSm" type="file" accept="image/png, image/gif, image/jpeg" disabled={newData.description === 'No Aplica - Acompañante'}></input> */}
                                <input name='img_cmp_2' className="form-control" onChange={(e) => handleImages2Change(e)} id="formFileSm" type="file" accept="image/png, image/gif, image/jpeg" disabled={newData.description === 'No Aplica - Acompañante'}></input>
                              </div>
                            </div>
                            <div className='col-12 col-sm-6'>
                              <div className="form-group">
                                <label >Estado de Pago</label>
                                <select className="form-select" name="state" onChange={onInputChange} aria-label="Default select example" disabled={newData.description === 'No Aplica - Acompañante'}>
                                  <option value="" >{newData.description}</option>
                                  <option value="6">No Paga Nada</option>
                                  <option value="8">Pago Parcial</option>
                                  <option value="7">Pagado Todo</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className='row'>
                            <div className='col-12 col-sm-12'>
                              <div className="form-group">
                                <label > Observaciones</label>
                                <input type="text" name='observation' className="form-control" value={newData.observation} onChange={onInputChange} placeholder=''></input>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  }
                </div>
              </div>
              <div className="modal-footer">
                {/* <button type="button" className="btn btn-success" onChange={updateFullPaymentBtn}> Pago Total</button> */}
                <button type="button" className="btn btn-success" onClick={updateFullPaymentBtn}> Pago Total</button>
                <button type="submit" className="btn btn-primary"> Aceptar</button>
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" >Cerrar</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <ToastContainer theme="colored" />
    </div>
  )
}
