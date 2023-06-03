import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useGetDate } from '../../hooks/useGetDate'
import { useSetMonthlyTour } from '../../hooks/useSetMonthlyTour';
import { ApiStorage, ApiUrl } from '../../services/ApiRest';
import { FooterScreen } from '../footer/FooterScreen';
import { NavBarScreen } from '../navBar/NavBarScreen'
import { WhatsappButtonScreen } from './whatsappButton/WhatsappButtonScreen';

export const MonthlyTourScreen = () => {
    localStorage.removeItem("menu");
    window.localStorage.setItem("menu", 2);

    const { printMonth, printNextMonth, date } = useGetDate();
    const currentMonth = ((date.getMonth()) + 1);
    const currentYear = date.getFullYear();

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

                        <div className="banner" data-bs-interval="4000" style={{ backgroundImage: `url('./assets/images/principal/monthly-tour.jpeg')` }}>
                            <div className="pantalla_dividida" style={{ height: "45vh" }}>
                                <div className="text_cent_img_dividida animate__animated animate__fadeInRight animate__delay-0.8s">
                                    <h1 className="tit-sob-img_dividida" style={{ textShadow: '1px 1px 2px rgba(0,0,0,1.5)', letterSpacing: '0px' }}>Reserva tu cupo ahora <br />y comienza a crear recuerdos </h1>
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
                <h5 style={{ textAlign: 'center' }}>Tenemos estas rutas disponibles para el mes de <b>{printMonth} y {printNextMonth} </b> asi que acompañanos a vivir estas aventuras que tenemos planificadas para ti. Escoge la que más te guste y disfrutala al máximo junto a tus amigos, pareja o familia</h5>
                <br></br>
                <h1 className="camping-letters text-center" >TOURS DE {printMonth}</h1>
                {
                    (monthlyTour.length == 0) ?
                        <h5 style={{ textAlign: 'center' }}>Por el momento no tenemos rutas disponibles para {printMonth} pronto tendremos más información </h5>
                        :
                        ''
                }
            </div>
            <div className='container'>
                <div className='row'>
                    {monthlyTour.map((tour, index) => (
                        <div className='card-group col-12 col-sm-6 col-md-4 current-month-card'  key={tour.monthly_tour_id}>
                            <div className="card" >
                                <img src={`${ApiStorage + tour.img_1}`} style={{ width: '100%' }} className="card-img-top" alt="..."></img>

                                {/* <img src="./assets/images/principal/monthly-tour.jpeg" className="card-img-top" alt="..."></img> */}
                                {/* <h4 className="card-title camping-letters text-center" style={{ textTransform: 'uppercase' }} >{tour.tour_destiny}</h4> */}
                                {/* <h5 className="card-title camping-letters text-center" style={{ textTransform: 'uppercase' }} >{tour.tour_name}</h5> */}
                                {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                                <small className='text-center camping-letters'style={{ margin: '1vh' }} >{tour.tour_destiny} / {tour.departure_date}</small>
                                <div className='text-center'>
                                    <Link to={`/tour-mensual/${tour.monthly_tour_id}`}>
                                        <button type="button" className="btn btn-outline-success" style={{ marginBottom: '1vh' }}>
                                            Más información
                                        </button>
                                    </Link>
                                </div>

                            </div>
                        </div>
                    ))}

                </div>
            </div>

            <br></br>
            <div className='container'>
                <h1 className="camping-letters text-center" >TOURS DE {printNextMonth}</h1>
                {
                    (nextMonthlyTour.length == 0) ?
                        <h5 style={{ textAlign: 'center' }}>Por el momento no tenemos rutas disponibles para {printNextMonth} pronto tendremos más información </h5>
                        :
                        ''
                }
                {/* <p style={{ textAlign: 'center' }}>Tenemos estas rutas disponibles para el mes de {printMonth} asi que acompañanos a vivir estas aventuras que tenemos planificadas para ti. Escoge la que más te guste y disfrutala al máximo junto a tus amigos, pareja o familia</p> */}
            </div>

            <div className='container'>
                <div className='row'>
                    {nextMonthlyTour.map((tour, index) => (
                        <div className='card-group col-12 col-sm-6 col-md-4 next-month-card' key={tour.monthly_tour_id}>
                            <div className="card" > 
                                <img src={`${ApiStorage + tour.img_1}`} style={{ width: '100%' }} className="card-img-top" alt="..."></img>
                                {/* <h4 className="card-title camping-letters text-center" style={{ textTransform: 'uppercase' }} >{tour.tour_destiny}</h4> */}
                                {/* <h5 className="card-title camping-letters text-center" style={{ textTransform: 'uppercase' }} >{tour.tour_name}</h5> */}
                                {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                                <small className='text-center camping-letters' style={{ margin: '1vh' }}>{tour.tour_destiny} / {tour.departure_date}</small>
                                <div className='text-center'>
                                    <Link to={`/tour-mensual/${tour.monthly_tour_id}`}>
                                        <button type="button" className="btn btn-outline-success" style={{ marginBottom: '1vh' }}>
                                            Más información
                                        </button>
                                    </Link>
                                </div>


                            </div>
                        </div>

                    ))}

                </div>
            </div>
            <br></br>
            <br></br>
            <WhatsappButtonScreen/>
            <FooterScreen />
        </>

    )
}
