import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useGetDate } from '../../hooks/useGetDate'
import { ApiStorage, ApiUrl } from '../../services/ApiRest';
import { FooterScreen } from '../footer/FooterScreen';
import { NavBarScreen } from '../navBar/NavBarScreen'

export const AllToursScreen = () => {
    localStorage.removeItem("menu");
    window.localStorage.setItem("menu", 3);

    const { printMonth } = useGetDate();
    console.log(printMonth)

    const [tour, settour] = useState([])

    const getData = async () => {
        await axios.get(ApiUrl + "catalogue-list")
            .then(response => {
                const data = response.data;
                settour(data);

            }).catch(e => {
                console.log(e);
            })
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <>
            <NavBarScreen />

            {console.log(tour)}

            <div className="cont_img animate__animated  animate__fadeIn" >
                <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
                    <div className="carousel-inner" role="listbox">

                        <div className="banner" data-bs-interval="4000" style={{ backgroundImage: `url('./assets/images/principal/tours/at1.jpeg')` }}>
                            <div className="pantalla_dividida" style={{ height: "45vh" }}>
                                <div className="text_cent_img_dividida animate__animated animate__fadeInRight animate__delay-0.8s">
                                    <h1 className="tit-sob-img_dividida" style={{textShadow:'1px 1px 2px rgba(0,0,0,1.5)'}} >Encuentra la ruta<br />que más te guste</h1>
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
                <h1 className="camping-letters text-center" >TODOS NUESTROS TOURS</h1>
                <p style={{ textAlign: 'center' }}> Saludos amigo aventurero! aquí encontraraás información de todos los tours que tenemos disponibles, estos pueden ser campings, full days o cumbres. 
                Selecciona la ruta que más te guste y escribenos para cuadrar una fecha. Te esperamos para hacer la ruta que desees. </p>
            </div>
            <br></br>
            <br></br>

            <div className='container'>
                {tour.map((tour, index) => (
                    <div key={tour.tour_catalogues_id}>
                        <div className="card mb-12" >
                            <div className="row g-0">
                                <div className="col-md-3  text-center">
                                    <img src={`${ApiStorage + tour.img_1}`} style={{ width: '80%', padding: '1.5vh' }} className="card-img-top" alt="..."></img>

                                </div>
                                <div className="col-md-7">
                                    <div className="card-body">
                                        <h5 className="card-title camping-letters">{tour.tour_name}</h5>
                                        <h4 className="card-title camping-letters" style={{ textTransform: 'uppercase' }}>{tour.tour_destiny}</h4>
                                        <p className="card-text">{tour.description}</p>
                                        <p className="card-text"><small className="text-muted">Nivel: {tour.dificulty}</small></p>
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <div className="card-body text-center" style={{padding:'0.2rem'}}>
                                        <br></br>
                                        <h5 className="card-title camping-letters ">Desde:</h5>
                                        <h1 className="card-text camping-letters">{tour.cost_4}</h1>
                                        <Link to={`/tour-disponibles/${tour.tour_catalogues_id}`}>
                                            <button type="button" className="btn btn-outline-success" >
                                                Ver Más
                                            </button>
                                        </Link>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <br></br>


                    </div>

                ))}
            </div>

            <FooterScreen />


        </>

    )
}
