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
    const [singleTourInfo, setsingleTourInfo] = useState({});
    /*********************************** */
    const [numCupos, setNumCupos] = useState(1);
    const [comprobantePago, setComprobantePago] = useState(null);

    const [numSeats, setnumSeats] = useState(1)
    const [formData, setFormData] = useState([]);

    const handleNumCuposChange = (e) => {
        var newNumCupos = 0;
        if (e.target.value == '') {
            newNumCupos = parseInt(0, 10);
        } else {
            newNumCupos = parseInt(e.target.value, 10);
        }
        setNumCupos(newNumCupos);
        setFormData([]);
    };

    const handleFormChange = (index, key, value) => {
        const newFormData = [...formData];
        newFormData[index] = {
            ...newFormData[index],
            [key]: value,
        };
        setFormData(newFormData);
    };

    const handleComprobantePagoChange = (e) => {
        // Aquí puedes agregar lógica para manejar la carga de la imagen
        const file = e.target.files[0];
        setComprobantePago(file);
    };

    const handleSubmit = (e) => {
        // e.preventDefault();
        // Aquí puedes enviar formData y comprobantePago a tu backend o realizar otras acciones
        console.log(formData, comprobantePago);

        formData.forEach((data) => {
            console.log(data)
            console.log("*************")
        })
    };

    /*********************** */



    // const [selectedImage, setselectedImage] = useState([]);

    const [passengerForm, setpassengerForm] = useState({
        seat: 1,
        unit_cost: 0,
        total_cost: 0,
        ci: '',
        name: '',
        phone: '',
        city: '',
        email: '',
        age: 0,
        collected: 0,
        extra: 0,
        to_collect: 0,
        bank: 0,
        responsable: '',
        meeting_point: '',
        observation: '',
        state: ''
    })


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

    const loadInfoMonthlyTour = async () => {
        console.log("Daaaas");
        console.log(selectedTourList.monthly_tour_id)
        var monthly_tour_id = selectedTourList.monthly_tour_id;
        await axios.get(ApiUrl + "monthly-tour-show-id/" + monthly_tour_id)
            .then(response => {
                const data = response.data[0];
                setsingleTourInfo(data);
                // console.log("setsingleTourInfo");
                console.log(data.person_cost);
                // setpassengerForm(...passengerForm, passengerForm.unit_cost = data.person_cost);
                setpassengerForm(prevPassengerForm => ({
                    ...prevPassengerForm,
                    unit_cost: response.data[0].person_cost
                }));

            })
            .catch(e => {
                console.log(e)
            })
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

    const addPassengerToList = async () => {
        console.log("guardado");
        console.log(passengerForm);

    }

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setpassengerForm({
            ...passengerForm,
            [name]: value
        });
        console.log("as");
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
        console.log(passengerForm.seat + "*" + passengerForm.unit_cost)
        setpassengerForm(prevPassengerForm => ({
            ...prevPassengerForm,
            total_cost: passengerForm.seat * passengerForm.unit_cost
        }));
    }, [passengerForm.seat, passengerForm.unit_cost])


    useEffect(() => {
        // console.log(passengerForm.seat+"*"+passengerForm.unit_cost)
        setpassengerForm(prevPassengerForm => ({
            ...prevPassengerForm,
            to_collect: passengerForm.total_cost - passengerForm.collected
        }));
    }, [passengerForm.collected, passengerForm.total_cost])

    const clearPassengerForm = () => {
        // setpassengerForm({
        //     seat: 0,
        //     // unit_cost: 0,
        //     // total_cost: 0,
        //     ci: '',
        //     name: '',
        //     phone: '',
        //     city: '',
        //     email: '',
        //     age: 0,
        //     collected: 0,
        //     extra: 0,
        //     to_collect: 0,
        //     bank: 0,
        //     responsable: '',
        //     meeting_point: '',
        //     observation: '',
        //     state: ''
        // })    
    }

    const serchCi = async () => {
        console.log("cambia foco");

    }

    const manejarEnter = (e) => {
        if (e.key === 'Enter') {
            console.log('Se presionó Enter');
            // Aquí puedes llamar a tu función
            // Ejemplo: tuFuncion(valor);
        }
    };

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
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <p className="modal-title" id="exampleModalLabel">AGREGAR PASAJERO A: <b>{selectedTourList.tour_destiny} </b></p>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="card-body">
                                    <form >
                                        <div className='row'>
                                            <div className='col-12 col-sm-4'>
                                                <div className="form-group">
                                                    <label >Cupos:</label>
                                                    <input type="text" name='numCupos' onChange={handleNumCuposChange} value={numCupos} className="form-control" placeholder='' required ></input>
                                                    {/* <input type="text" name='seat' onChange={onInputChange} value={passengerForm.seat} className="form-control" placeholder='' required ></input> */}
                                                </div>
                                            </div>

                                            <div className='col-12 col-sm-4'>
                                                <div className="form-group">
                                                    <label >P. Unitario:</label>
                                                    <input type="text" name='unit_cost' onChange={onInputChange} value={passengerForm.unit_cost} className="form-control" placeholder='' required></input>
                                                </div>
                                            </div>
                                            <div className='col-12 col-sm-4'>
                                                <div className="form-group">
                                                    <label >P. Total:</label>
                                                    <input type="text" name='total_cost' onChange={onInputChange} value={passengerForm.total_cost} className="form-control" placeholder='' required></input>
                                                </div>
                                            </div>
                                        </div>

                                        {([...Array(numCupos)]) ?
                                            [...Array(numCupos)].map((_, index) => (
                                                <div key={index}>
                                                    {(index == 0) ? <h4>Datos de persona que reserva:</h4> : <h4>Acompañante {index}</h4>}

                                                    <label htmlFor={`nombre${index}`}>Nombre del Participante:</label>
                                                    <input
                                                        type="text"
                                                        id={`nombre${index}`}
                                                        name={`nombre${index}`}
                                                        onChange={(e) => handleFormChange(index, 'nombre', e.target.value)}
                                                    />

                                                    <label htmlFor={`apellido${index}`}>Apellido del Participante:</label>
                                                    <input
                                                        type="text"
                                                        id={`apellido${index}`}
                                                        name={`apellido${index}`}
                                                        onChange={(e) => handleFormChange(index, 'apellido', e.target.value)}
                                                    />

                                                    {/* <div className='row'>
                                                        <div className='col-12 col-sm-4'>
                                                            <div className="form-group">
                                                                <label >Cédula de Identidad</label>
                                                                <input type="text" name='ci' onChange={onInputChange} onKeyPress={manejarEnter} onBlur={serchCi} className="form-control" placeholder='' required></input>
                                                            </div>
                                                        </div>
                                                        <div className='col-12 col-sm-4'>
                                                            <div className="form-group">
                                                                <label >Nombre y Apellido</label>
                                                                <input type="text" name='name' onChange={onInputChange} className="form-control " placeholder='' required></input>
                                                            </div>
                                                        </div>
                                                        <div className='col-12 col-sm-4'>
                                                            <div className="form-group">
                                                                <label >Teléfono</label>
                                                                <input type="text" name='phone' onChange={onInputChange} className="form-control" placeholder='' required></input>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='row'>

                                                        <div className='col-12 col-sm-4'>
                                                            <div className="form-group">
                                                                <label >Ciudad</label>
                                                                <input type="text" name='city' onChange={onInputChange} className="form-control " placeholder='' required></input>
                                                            </div>
                                                        </div>
                                                        <div className='col-12 col-sm-4'>
                                                            <div className="form-group">
                                                                <label >Correo</label>
                                                                <input type="text" name='email' onChange={onInputChange} className="form-control" placeholder='' ></input>
                                                            </div>
                                                        </div>
                                                        <div className='col-12 col-sm-4'>
                                                            <div className="form-group">
                                                                <label >Edad</label>
                                                                <input type="text" name='age' onChange={onInputChange} className="form-control " placeholder='' ></input>
                                                            </div>
                                                        </div>
                                                    </div> */}

                                                    {/* Otros campos del participante */}
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
                                                    <input type="text" name='collected' onChange={onInputChange} className="form-control" placeholder='' required></input>
                                                </div>
                                            </div>
                                            <div className='col-6 col-sm-2'>
                                                <div className="form-group">
                                                    <label >Por Cobrar</label>
                                                    <input type="text" name='to_collect' onChange={onInputChange} value={passengerForm.to_collect} className="form-control" placeholder='' required readOnly></input>
                                                </div>
                                            </div>
                                            <div className='col-12 col-sm-4'>
                                                <div className="form-group">
                                                    <label >Responsable</label>
                                                    <input type="text" name='responsable' onChange={onInputChange} className="form-control " placeholder='' required></input>
                                                </div>
                                            </div>
                                            <div className='col-12 col-sm-4'>
                                                <div className="form-group">
                                                    <label >Punto de Ecuentro</label>
                                                    <input type="text" name='meeting_point' onChange={onInputChange} className="form-control" placeholder='' required></input>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-12 col-sm-12'>
                                                <div className="form-group">
                                                    <label >Observaciones</label>
                                                    <input type="text" name='observation' onChange={onInputChange} className="form-control " placeholder='' ></input>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-12 col-sm-6'>
                                                <div className="mb-3">
                                                    <label className="form-label">Comprobante Reserva </label>
                                                    <input className="form-control form-control-sm" id="formFileSm" type="file"></input>
                                                </div>
                                            </div>
                                            <div className='col-12 col-sm-6'>
                                                <div className="mb-3">
                                                    <label className="form-label">Comprobante Pago Total</label>
                                                    <input className="form-control form-control-sm" id="formFileSm" type="file"></input>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={() => handleSubmit()} data-bs-dismiss="modal" >Aceptar</button>
                                <button type="button" className="btn btn-secondary" onClick={() => clearPassengerForm()} data-bs-dismiss="modal"   >Cancelar</button>
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
