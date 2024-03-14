import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { ApiStorage, ApiUrl } from '../../../services/ApiRest';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const ListAvailablePassengerTours = () => {
    const [tours, settours] = useState([]);
    const [selectedTourList, setselectedTourList] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    const [singleTourInfo, setsingleTourInfo] = useState({});
    /*********************************** */
    const [numCupos, setNumCupos] = useState(1);
    const [numCupos2, setNumCupos2] = useState(1);
    const [comprobantePago, setComprobantePago] = useState(null);
    const [showSubmodal, setShowSubmodal] = useState(false);
    const [subModal, setSubModal] = useState(false);
    const [listId, setlistId] = useState();
    const [collected, setCollected] = useState('');
    const [responsable, setResponsable] = useState('');
    const [meetingPoint, setMeetingPoint] = useState('');
    const [observation, setObservation] = useState('');
    const [img01, setimg01] = useState('');
    const [img02, setimg02] = useState('');
    const [productToDelete, setProductToDelete] = useState(null);
    const [unitCost, setUnitCost] = useState(0);
    const [userEnteredUnitCost, setUserEnteredUnitCost] = useState(0);
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
    const [isDisabled, setIsDisabled] = useState({
        responsible: false,
        meetingPoint: false,
        observation: false,
        img_cmp_1: false,
        img_cmp_2: false,
    });

    const [formData, setFormData] = useState(Array(numCupos).fill({
        numCupos: 1,
        // unit_cost: 10,
        // total_cost: 0,
        collected: '',
        // to_collect: 0,
        responsable: '',
        meeting_point: '',
        observation: '',
        img_cmp_1: '',
        img_cmp_2: '',
    }));

    const handleNumCuposChange = (e) => {
        const newNumCupos = parseInt(e.target.value, 10) || 0;
        setNumCupos(newNumCupos);
        setFormData(
            Array(newNumCupos).fill({
                numCupos: 1,
                collected: '',
                responsable: '',
                meeting_point: '',
                observation: '',
                img_cmp_1: '',
                img_cmp_2: '',
            })
        );
    };

    const [passengerForm, setpassengerForm] = useState({
        numCupos: 1,
        unit_cost: 0,
        total_cost: 0,
        collected: '',
        to_collect: 0,
        responsable: '',
        meeting_point: '',
        observation: '',
        img_cmp_1: '',
        img_cmp_2: '',
    })

    const handleCollectedChange = (e) => {
        const collectedValue = e.target.value;
        // const toCollectValue = passengerForm.to_collect;
        const toCollectValue = passengerForm.total_cost;
        setCollected(collectedValue);
        console.log("COLLECT:", collectedValue);
        console.log("TO COLLECT:", toCollectValue);
        const isCollectedGreaterThanToCollect = parseFloat(collectedValue) > parseFloat(toCollectValue);
        setIsDisabled({
            responsible: isCollectedGreaterThanToCollect,
            meetingPoint: isCollectedGreaterThanToCollect,
            observation: isCollectedGreaterThanToCollect,
            img_cmp_1: isCollectedGreaterThanToCollect,
            img_cmp_2: isCollectedGreaterThanToCollect,
        });
        setIsSubmitDisabled(isCollectedGreaterThanToCollect);
        if (collectedValue > toCollectValue) {
            toast.error("El valor que trata de ingresar debe ser menor o igual al valor Por Cobrar", { position: toast.POSITION.BOTTOM_RIGHT });
        };
    };

    const handleResponsableChange = (e) => {
        setResponsable(e.target.value);
    };
    const handleMeetingPointChange = (e) => {
        setMeetingPoint(e.target.value);
    };
    const handleObservationChange = (e) => {
        setObservation(e.target.value);
    };
    const handleImages1Change = (e) => {
        setimg01(e.target.files);
    };
    const handleImages2Change = (e) => {
        setimg02(e.target.files);
    };

    const handleFormChange = (index, key, value) => {
        const newFormData = [...formData];
        newFormData[index] = {
            ...newFormData[index],
            [key]: value,
        };
        setFormData(newFormData);
    };

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setpassengerForm({
            ...passengerForm,
            [name]: value
        });
        console.log("as");
    }

    /************************* Mis funciones**************************** */

    const onSubmit = async (e) => {
        e.preventDefault();
        const passengerDataArray = [];
        const list_id = listId;
        const f = new FormData();
        // Guardar los datos de cada acompañante en índices siguientes
        for (let i = 0; i < formData.length; i++) {
            const accompanyingData = {
                ci: formData[i].ci || '',
                name: formData[i].name || '',
                phone: formData[i].phone || '',
                city: formData[i].city || '',
                correo: formData[i].correo || '',
                born_date: formData[i].born_date || '',
                age: formData[i].age || '',
            };
            passengerDataArray.push(accompanyingData);
            console.log("DATOS ACOMPANIANTE:", passengerDataArray);
        }
        // Enviar cada conjunto de datos al backend
        for (const data of passengerDataArray) {
            try {
                const response = await axios.post(ApiUrl + 'passenger-create', data);
                const resp = response.data;
                if (resp.success) {
                    // toast.success("Pasajero agregado exitosamente", { position: toast.POSITION.BOTTOM_RIGHT });
                    console.log("Pasajero agregado exitosamente");
                } else {
                    // toast.error("Pasajero NO se ha agregado", { position: toast.POSITION.BOTTOM_RIGHT });
                    console.log("Pasajero NO se ha agregado");
                }
            } catch (error) {
                console.log(error);
            }
        }
        ////////////////////////////////////////////////////////////////////////////////////////////
        // GUARDAR DATOS EN LA TABLA PASSENGER_LIST  
        notify();
        for (let i = 0; i < formData.length; i++) {
            if (i == 0) {
                console.log("RESPONSABLE LIDER");
                f.append("list_id", list_id);
                f.append("passenger_ci", passengerDataArray[i].ci);
                f.append("seat", passengerForm.numCupos);
                f.append("unit_cost", passengerForm.unit_cost);
                f.append("total_cost", passengerForm.total_cost);
                f.append("collected", collected);
                f.append("to_collect", passengerForm.to_collect);
                f.append("responsable", responsable);
                f.append("meeting_point", meetingPoint);
                f.append("observation", observation);
                f.append("passenger_type", "Responsable");
                f.append("passenger_group_leader_ci", passengerDataArray[0].ci);
                f.append("img_cmp_1", img01[0]);
                f.append("img_cmp_2", img02[0]);
                if (collected == passengerForm.total_cost && collected > 0) {
                    f.append("state", "7");
                } else {
                    f.append("state", "8");
                }
                f.append("state_passenger", "Activo");
            } else {
                console.log("ACOMPAÑANTE");
                f.append("list_id", list_id);
                f.append("passenger_ci", passengerDataArray[i].ci);
                f.append("seat", "0");
                f.append("unit_cost", "0");
                f.append("total_cost", "0");
                f.append("collected", "0");
                f.append("to_collect", "0");
                f.append("responsable", responsable);
                f.append("meeting_point", meetingPoint);
                f.append("observation", "");
                f.append("passenger_type", "Acompañante");
                f.append("passenger_group_leader_ci", passengerDataArray[0].ci);
                f.append("img_cmp_1", "0");
                f.append("img_cmp_2", "0");
                f.append("state", "9");
                f.append("state_passenger", "Activo");
            }
            console.log("DATOS de GUAEDADOsssss:", f);
            console.log(Object.fromEntries(f));
            try {

                const response = await axios.post(ApiUrl + 'passenger-list-create', f);
                const resp = response.data;
                if (resp.success) {
                    success(resp.messagge);

                    // toast.success("Registro agregado exitosamente", { position: toast.POSITION.BOTTOM_RIGHT });
                } else {
                    toast.error("Registro NO ha sido agregado", { position: toast.POSITION.BOTTOM_RIGHT });
                }
            } catch (error) {
                console.log(error);
            }
        }

        // Limpiar los datos del formulario después de enviar los registros
        setFormData(Array(numCupos).fill({
            numCupos: 1,
            unit_cost: 0,
            total_cost: 0,
            collected: '',
            to_collect: 0,
            responsable: '',
            meeting_point: '',
            observation: '',
            img_cmp_1: '',
            img_cmp_2: '',
        }));

        setpassengerForm({
            numCupos: 1,
            unit_cost: 0,
            total_cost: 0,
            collected: '',
            to_collect: 0,
            responsable: '',
            meeting_point: '',
            observation: '',
            img_cmp_1: '',
            img_cmp_2: '',
        });
        // Restablecer los valores de los campos adicionales
        setCollected('');
        setResponsable('');
        setMeetingPoint('');
        setObservation('');
        setimg01('');
        setimg02('');

    };

    const toastId = React.useRef(null);
    const notify = () => toastId.current = toast("Enviando Datos...", { autoClose: true, type: toast.TYPE.INFO, position: toast.POSITION.BOTTOM_RIGHT });
    const success = (messagge) => toast.success("Registro agregado exitosamente", { position: toast.POSITION.BOTTOM_RIGHT });
    // toast.success("Registro agregado exitosamente", { position: toast.POSITION.BOTTOM_RIGHT });

    const closeSubModal = () => {
        setSubModal(false);
    };

    /*********************** */
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

    const deleteList = async (id) => {
        console.log("ID a eliminar:", id);
        await axios.post(ApiUrl + `list-delete/${id}`)
            .then(resp => {
                toast.success("Lista eliminada exitosamente", { position: toast.POSITION.BOTTOM_RIGHT });
                getData();
            })
            .catch(e => {
                console.log(e);
            });
        setProductToDelete(null);
    };

    const deleteTable = () => {
        const script1 = document.createElement("script");
        script1.src = `/assets/dataTable/datatable-destroy.js`;
        script1.async = true;
        document.body.appendChild(script1);
    }

    const selectTour = (data) => {
        setselectedTourList(data);
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

    const loadInfoMonthlyTour = async () => {
        console.log("Daaaas SAAAABERRR");
        console.log(selectedTourList.monthly_tour_id)
        var monthly_tour_id = selectedTourList.monthly_tour_id;
        await axios.get(ApiUrl + "monthly-tour-show-id/" + monthly_tour_id)
            .then(response => {
                const data = response.data[0];
                setsingleTourInfo(data);
                // console.log("setsingleTourInfo");
                console.log(data.person_cost);
                // setpassengerForm(...passengerForm, passengerForm.unit_cost = data.person_cost);
                setlistId(data.list_id);
                console.log("DAVID DATAAAA.LISTA_ID:");
                console.log(data.list_id);
                setUnitCost(response.data[0].person_cost);
                setUserEnteredUnitCost(response.data[0].person_cost);
                // setDefaultUnitCost(response.data[0].person_cost);
                setpassengerForm(prevPassengerForm => ({
                    ...prevPassengerForm,
                    unit_cost: response.data[0].person_cost
                }));
                console.log("VALOR DE UNITARIO PRECIO:", response.data[0].person_cost);

            })
            .catch(e => {
                console.log(e)
            })
    }

    const onUnitCostChange = (e) => {
        setUserEnteredUnitCost(e.target.value);
        setpassengerForm(prevPassengerForm => ({
            ...prevPassengerForm,
            unit_cost: e.target.value
        }));
    };

    const updatePastTours = async () => {
        await axios.post(ApiUrl + 'monthly-tour-update-past-tour')
            .then(resp => {
                toast.success("Tours Actualizados", { position: toast.POSITION.BOTTOM_RIGHT });
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

    useEffect(() => {
        loadInfoMonthlyTour();
    }, [selectedTourList])

    useEffect(() => {
        const result = passengerForm.numCupos * userEnteredUnitCost;
        let resultToShow;
        if (result) {
            resultToShow = result;
        } else {
            const result2 = unitCost * passengerForm.numCupos;
            resultToShow = result2;
        }
        setpassengerForm(prevPassengerForm => ({
            ...prevPassengerForm,
            total_cost: resultToShow
        }));
    }, [passengerForm.numCupos, userEnteredUnitCost, unitCost]);
    console.log("PRECIO UNITARIO ES EL NUEVOOOOO:", unitCost);

    useEffect(() => {
        setpassengerForm(prevPassengerForm => ({
            ...prevPassengerForm,
            to_collect: passengerForm.total_cost - collected
        }));
    }, [collected, passengerForm.total_cost])

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
                                                        <Link to={"../passengerList-single-tour/" + tour.monthly_tour_id}>
                                                            <button className='btn btn-outline-secondary btn-sm' onClick={() => setselectedTourList(tour)} ><i className="fas fa-eye"></i></button>
                                                        </Link>
                                                        <button className='btn btn-outline-danger btn-sm' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => setProductToDelete(tour.monthly_tour_id)}><i className="fas fa-trash-alt" aria-hidden="true"></i>  </button>
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
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <form onSubmit={onSubmit}>
                                <div className="modal-header">
                                    <p className="modal-title" id="exampleModalLabel">AGREGAR PASAJERO A: <b>{selectedTourList.tour_destiny} </b></p>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="card-body">
                                        {/* Primer map para los datos generales */}
                                        {[...Array(numCupos2)].map((_, index) => (
                                            <div key={index}>
                                                <div className='row'>
                                                    <div className='col-12 col-sm-4'>
                                                        <div className="form-group">
                                                            <label >Cupos:</label>
                                                            <input type="text" name='numCupos' onChange={(e) => { handleNumCuposChange(e); onInputChange(e); handleFormChange('numCupos', e.target.value) }} value={passengerForm.numCupos} className="form-control" placeholder='' required ></input>
                                                        </div>
                                                    </div>

                                                    <div className='col-12 col-sm-4'>
                                                        <div className="form-group">
                                                            <label >P. Unitario:</label>
                                                            <input type="text" name='unit_cost' onChange={onUnitCostChange} value={userEnteredUnitCost} className="form-control" placeholder='' required />
                                                        </div>
                                                    </div>

                                                    <div className='col-12 col-sm-4'>
                                                        <div className="form-group">
                                                            <label >P. Total:</label>
                                                            <input type="text" name='total_cost' onChange={onInputChange} value={passengerForm.total_cost} className="form-control" placeholder='' required></input>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                        {([...Array(numCupos)]) ? [...Array(numCupos)].map((_, index) => (
                                            <div key={index}>
                                                {(index == 0) ? <h4>Datos de persona que reserva:</h4> : <h4>Acompañante {index}</h4>}
                                                <div className='row'>
                                                    <div className='col-12 col-sm-4'>
                                                        <div className="form-group">
                                                            <label >Cédula de Identidad</label>
                                                            <input type="text" name={`ci${index}`} className="form-control" pattern="\d*" maxLength="10" value={formData[index] && formData[index].ci !== undefined ? formData[index].ci : ''} onChange={(e) => handleFormChange(index, 'ci', e.target.value)} placeholder='' required></input>
                                                        </div>
                                                    </div>
                                                    <div className='col-12 col-sm-8'>
                                                        <div className="form-group">
                                                            <label >Nombre y Apellido</label>
                                                            <input type="text" name={`name${index}`} value={formData[index] && formData[index].name !== undefined ? formData[index].name : ''} onChange={(e) => handleFormChange(index, 'name', e.target.value)} className="form-control " placeholder='' required></input>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='row'>
                                                    <div className='col-12 col-sm-4'>
                                                        <div className="form-group">
                                                            <label >Teléfono</label>
                                                            <input type="text" name={`phone${index}`} value={formData[index] && formData[index].phone !== undefined ? formData[index].phone : ''} onChange={(e) => handleFormChange(index, 'phone', e.target.value)} className="form-control " placeholder='' required></input>
                                                        </div>
                                                    </div>
                                                    <div className='col-12 col-sm-4'>
                                                        <div className="form-group">
                                                            <label >Ciudad</label>
                                                            <input type="text" name={`city${index}`} value={formData[index] && formData[index].city !== undefined ? formData[index].city : ''} onChange={(e) => handleFormChange(index, 'city', e.target.value)} className="form-control " placeholder='' required></input>
                                                        </div>
                                                    </div>
                                                    <div className='col-12 col-sm-4'>
                                                        <div className="form-group">
                                                            <label >Correo</label>
                                                            <input type="text" name={`correo${index}`} value={formData[index] && formData[index].correo !== undefined ? formData[index].correo : ''} onChange={(e) => handleFormChange(index, 'correo', e.target.value)} className="form-control " placeholder='' required></input>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='row'>
                                                    <div className='col-12 col-sm-6'>
                                                        <div className="form-group">
                                                            <label >Edad</label>
                                                            <input type="text" name={`age${index}`} value={formData[index] && formData[index].age !== undefined ? formData[index].age : ''} onChange={(e) => handleFormChange(index, 'age', e.target.value)} className="form-control " placeholder='' required></input>
                                                        </div>
                                                    </div>
                                                </div>

                                                Otros campos del participante
                                            </div>

                                        ))
                                            :
                                            <p>Esperando cantidad de personas</p>
                                        }
                                        <hr></hr>
                                        <div className='row'>
                                            <div className='col-6 col-sm-2'>
                                                <div className="form-group">
                                                    <label >Cobrado</label>
                                                    <input type="text" name='collected' onChange={handleCollectedChange} value={collected} className="form-control" placeholder='' required></input>
                                                </div>
                                            </div>
                                            <div className='col-6 col-sm-2'>
                                                <div className="form-group">
                                                    <label >Por Cobrar</label>
                                                    <input type="text" name='to_collect' onChange={onInputChange} value={passengerForm.to_collect} className="form-control" placeholder='' required disabled></input>
                                                </div>
                                            </div>
                                            <div className='col-12 col-sm-4'>
                                                <div className="form-group">
                                                    <label > Guía Responsable</label>
                                                    <input type="text" name='responsable' onChange={handleResponsableChange} value={responsable} className="form-control" placeholder='' required disabled={isDisabled.responsible}></input>
                                                </div>
                                            </div>
                                            <div className='col-12 col-sm-4'>
                                                <div className="form-group">
                                                    <label >Punto de Ecuentro</label>
                                                    <input type="text" name='meeting_point' onChange={handleMeetingPointChange} value={meetingPoint} className="form-control" placeholder='' required disabled={isDisabled.meetingPoint}></input>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-12 col-sm-12'>
                                                <div className="form-group">
                                                    <label >Observaciones</label>
                                                    <input type="text" name='observation' onChange={handleObservationChange} value={observation} className="form-control" placeholder='' disabled={isDisabled.observation}></input>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-12 col-sm-6'>
                                                <div className="mb-3">
                                                    <label className="form-label">Comprobante Reserva </label>
                                                    <input name='img_cmp_1' onChange={(e) => handleImages1Change(e)} className="form-control form-control-sm" id="formFileSm" type="file" accept="image/png, image/gif, image/jpeg" disabled={isDisabled.img_cmp_1}></input>
                                                </div>
                                            </div>
                                            <div className='col-12 col-sm-6'>
                                                <div className="mb-3">
                                                    <label className="form-label">Comprobante Pago Total</label>
                                                    <input name='img_cmp_2' onChange={(e) => handleImages2Change(e)} className="form-control form-control-sm" id="formFileSm" type="file" accept="image/png, image/gif, image/jpeg" disabled={isDisabled.img_cmp_2}></input>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    {/* <button type="submit" className="btn btn-primary"> Aceptar </button> &nbsp; */}
                                    <button type="submit" className="btn btn-primary" disabled={isSubmitDisabled}> Aceptar</button> &nbsp;
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                </div>
                            </form>
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

                                <button type="button" className="btn btn-primary" onClick={() => deleteList(productToDelete)} data-bs-dismiss="modal">Aceptar</button>
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"  >Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>

                {subModal && (
                    <div className="modal fade" id="subModal" tabIndex="-1" aria-labelledby="subModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="subModalLabel">Submodal Title</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeSubModal}></button>
                                </div>
                                <div className="modal-body">
                                    <p>Submodal Content</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <ToastContainer theme="colored" />
            </div >
        </>
    )
}
export default ListAvailablePassengerTours;
