import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useGetDate } from '../../hooks/useGetDate'
import { useSetMonthlyTour } from '../../hooks/useSetMonthlyTour';
import { ApiStorage, ApiUrl } from '../../services/ApiRest';
import { FooterScreen } from '../footer/FooterScreen';
import { NavBarScreen } from '../navBar/NavBarScreen'
import { WhatsappButtonScreen } from './whatsappButton/WhatsappButtonScreen';
import { useGetDateToDayMonth } from '../../hooks/useGetDateToDayMonth';

export const ViajaPeruScreen = () => {
    localStorage.removeItem("menu");
    window.localStorage.setItem("menu", 9);

    const { printMonth, printNextMonth, date } = useGetDate();

    const [tours, settours] = useState([]);

    const getData = async () => {
        await axios.get(ApiUrl + "monthly-tour-list")
            .then(response => {
                const data = response.data;
                settours(data);
            })
            .catch(e => {
                console.log(e);
            })
    }

    const convertDate = (date) => {
        const { letterMonth, day } = useGetDateToDayMonth(date);
        var dateText = day + ' ' + 'DE ' + letterMonth;
        return (dateText);
    }

    useEffect(() => {
        getData();
    }, [])

    const { monthlyTour, nextMonthlyTour } = useSetMonthlyTour(tours);
    console.log(nextMonthlyTour);

    return (
        <>
            <NavBarScreen />

            <div className="cont_img animate__animated  animate__fadeIn" >
                <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
                    <div className="carousel-inner" role="listbox">

                        <div className="banner" data-bs-interval="4000" style={{ backgroundImage: `url('./assets/images/principal/peru/b.jpg')` }}>
                            <div className="pantalla_dividida" style={{ height: "45vh" }}>
                                <div className="text_cent_img_dividida animate__animated animate__fadeInRight animate__delay-0.8s">
                                    <h1 className="tit-sob-img_dividida" style={{ textShadow: '1px 1px 2px rgba(0,0,0,1.5)', letterSpacing: '0px' }}>Conoce Perú <br />junto a nosotros </h1>
                                </div>

                            </div>

                        </div>
                    </div>

                </div>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <div className='container'>
                <h5 style={{ textAlign: 'center' }}>¡Descubre la maravillosa aventura que te espera en Perú! <br></br>Te ofrecemos emocionantes paquetes de viaje para que explores los magníficos atractivos de este hermoso país. Desde la majestuosidad de Machu Picchu hasta la impresionante montaña de 7 colores y la serenidad de la laguna de Humantay, hay un mundo de experiencias esperándote..</h5>
                <br></br>

            </div>


            <br></br>
            <div className='container'>
                <h1 className="camping-letters text-center" >LAND TOUR 6 DÍAS 5 NOCHES</h1>
                <h1 className="tit-sob-img_dividida blink text-center" style={{ textShadow: '1px 1px 2px rgba(0,0,0,1.5)', letterSpacing: '0px', color:'#28a745' }}>PRÓXIMAMENTE 🥳🎉</h1>

            </div>
            

            <div className='container pantalla-grande'>
                <br></br>
                <div className='row'>
                    <div className='col-12 col-sm-12 col-md-6'>
                        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                            <div className="carousel-inner">
                                <div className="carousel-item carousel-item2 active">
                                    {/* <img src={`${ApiStorage + tour.img_1}`} style={{ width: '100%' }} className="card-img-top" alt="..."></img> */}
                                    <img src={`./assets/images/principal/peru/per1.png`} className="rounded img-fluid img-thumbnail" alt="" width="100%" height="auto" />

                                </div>
                                <div className="carousel-item carousel-item2 ">
                                    {/* <img src={`${ApiStorage + tour.img_2}`} style={{ width: '100%' }} className="card-img-top" alt="..."></img> */}
                                    <img src={`./assets/images/principal/peru/per2.png`} className="rounded img-fluid img-thumbnail" alt="" width="100%" height="auto" />

                                </div>
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                    <div className='col-12 col-sm-12 col-md-6'>
                        <br></br>
                        <div>

                        </div>
                        {/* <h3 className='camping-letters'> {tour.tour_name}</h3>
                            <h1 className='camping-letters' style={{ textTransform: 'uppercase' }}> {tour.tour_destiny}</h1>
                            <p className='text-justify text-center'>{tour.description}</p> */}

                        <p className='text-justify text-center'><b>Día 1:</b>
                            <br></br>- Bienvenida y traslado del aeropuerto de Cusco al hotel seleccionado.
                            <br></br>- Tour en la Ciudad del Cusco: Qoricancha, Sacsayhuaman Qenqo, Puca-pucara, Tambomachay (recojo 13:30 pm).
                            <br></br>- Noche en hotel.
                        </p>
                        <p className='text-justify text-center'><b>Día 2:</b>
                            <br></br>- Desayuno en el hotel.
                            <br></br>- Laguna Humantay (recojo entre las 4:30 – 5:00 am).
                            <br></br>- Noche en hotel.
                        </p>
                        <p className='text-justify text-center'><b>Día 3:</b>
                            <br></br>- Desayuno en el hotel.
                            <br></br>- Transporte Cusco Hidroelectrica.
                            <br></br>- Noche en hotel.
                        </p>
                        <p className='text-justify text-center'><b>Día 4:</b>
                            <br></br>- Desayuno en el hotel.
                            <br></br>- Tour Machupicchu.
                            <br></br>- Tren de regreso Aguas Calientes Ollanta.
                            <br></br>- Noche en hotel.
                        </p>
                        <p className='text-justify text-center'><b>Día 5:</b>
                            <br></br>- Desayuno en el hotel.
                            <br></br>- Tour Montaña 7 Colores.
                            <br></br>- Noche en hotel.
                        </p>
                        <p className='text-justify text-center'><b>Día 6:</b>
                            <br></br>- Desayuno en el hotel.
                            <br></br>- Traslado del hotel al aeropuerto de Cusco
                            <br></br>- Fin del servicio.
                        </p>


                        <br></br>

                        {/* <div className='row text-center'>
                                <div className='col-12 col-sm-6'>
                                    <h4 className='camping-letters' style={{ textTransform: 'uppercase' }}>Fecha Salida<br></br> </h4>
                                    <h5>{convertDate(tour.departure_date)}</h5>
                                </div>
                                <div className='col-12 col-sm-6'>
                                    <h4 className='camping-letters' style={{ textTransform: 'uppercase' }}>Fecha Retorno <br></br> </h4>
                                    <h5>{convertDate(tour.return_date)}</h5>

                                </div>
                            </div> */}

                        <br></br>
                        {/* <div className='container text-center'>
                                <a href={`https://api.whatsapp.com/send?phone=+593${tour.contact_phone}&text=${tour.messagge_for_contact}`} target="_blank" style={{ padding: '5px' }}>
                                    <button type="button" className="btn btn-success" style={{ margin: '2vh' }}> COMPRAR  RUTA </button >
                                </a>

                                <Link to={'/tour-mensual'} style={{ padding: '5px' }}>
                                    <button type="button" className="btn btn-warning" >VOLVER A TOURS</button>
                                </Link>
                            </div> */}
                    </div>
                </div>
            </div>

            {/* *********PANTALLA PEQUE************* */}

            <div className='container pantalla-peque'>
                <br></br>
                <div className='col-12 col-sm-12 col-md-6'>
                    <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item carousel-item2 active">
                                {/* <img src={`${ApiStorage + tour.img_1}`} style={{ width: '100%' }} className="card-img-top" alt="..."></img> */}
                                <img src={`./assets/images/principal/peru/per1.png`} className="rounded img-fluid img-thumbnail" alt="" width="100%" height="auto" />

                            </div>
                            <div className="carousel-item carousel-item2 ">
                                {/* <img src={`${ApiStorage + tour.img_2}`} style={{ width: '100%' }} className="card-img-top" alt="..."></img> */}
                                <img src={`./assets/images/principal/peru/per2.png`} className="rounded img-fluid img-thumbnail" alt="" width="100%" height="auto" />

                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>


                <div className='col-12 col-sm-12 col-md-6 text-center'>
                    <br></br>
                    <div>

                    </div>
                    {/* <h3 className='camping-letters'> {tour.tour_name}</h3>
                            <h1 className='camping-letters' style={{ textTransform: 'uppercase' }}> {tour.tour_destiny}</h1>
                            <p className='text-justify text-center'>{tour.description}</p> */}

                    <p className='text-justify text-center'><b>Día 1:</b>
                        <br></br>- Bienvenida y traslado del aeropuerto de Cusco al hotel seleccionado.
                        <br></br>- Tour en la Ciudad del Cusco: Qoricancha, Sacsayhuaman Qenqo, Puca-pucara, Tambomachay (recojo 13:30 pm).
                        <br></br>- Noche en hotel.
                    </p>
                    <p className='text-justify text-center'><b>Día 2:</b>
                        <br></br>- Desayuno en el hotel.
                        <br></br>- Laguna Humantay (recojo entre las 4:30 – 5:00 am).
                        <br></br>- Noche en hotel.
                    </p>
                    <p className='text-justify text-center'><b>Día 3:</b>
                        <br></br>- Desayuno en el hotel.
                        <br></br>- Transporte Cusco Hidroelectrica.
                        <br></br>- Noche en hotel.
                    </p>
                    <p className='text-justify text-center'><b>Día 4:</b>
                        <br></br>- Desayuno en el hotel.
                        <br></br>- Tour Machupicchu.
                        <br></br>- Tren de regreso Aguas Calientes Ollanta.
                        <br></br>- Noche en hotel.
                    </p>
                    <p className='text-justify text-center'><b>Día 5:</b>
                        <br></br>- Desayuno en el hotel.
                        <br></br>- Tour Montaña 7 Colores.
                        <br></br>- Noche en hotel.
                    </p>
                    <p className='text-justify text-center'><b>Día 6:</b>
                        <br></br>- Desayuno en el hotel.
                        <br></br>- Traslado del hotel al aeropuerto de Cusco
                        <br></br>- Fin del servicio.
                    </p>


                    <br></br>



                    {/* <div className='row text-center'>
                                <div className='col-12 col-sm-6'>
                                    <h4 className='camping-letters' style={{ textTransform: 'uppercase' }}>Fecha Salida<br></br> </h4>
                                    <h5>{convertDate(tour.departure_date)}</h5>
                                </div>
                                <div className='col-12 col-sm-6'>
                                    <h4 className='camping-letters' style={{ textTransform: 'uppercase' }}>Fecha Retorno <br></br> </h4>
                                    <h5>{convertDate(tour.return_date)}</h5>
                                </div>
                            </div>

                            <br></br>
                            <div className='container text-center'>
                                <a href={`https://api.whatsapp.com/send?phone=+593${tour.contact_phone}&text=${tour.messagge_for_contact}`} target="_blank" style={{ padding: '5px' }}>
                                    <button type="button" className="btn btn-success" style={{ margin: '2vh' }}> COMPRAR  RUTA </button >
                                </a>

                                <Link to={'/tour-mensual'} style={{ padding: '5px' }}>
                                    <button type="button" className="btn btn-warning" >VOLVER A TOURS</button>
                                </Link>
                            </div> */}


                </div>
            </div >

            <br></br>
            <br></br>
            <WhatsappButtonScreen />
            <FooterScreen />
        </>

    )
}
