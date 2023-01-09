import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ApiStorage, ApiUrl } from '../../services/ApiRest';
import { FooterScreen } from '../footer/FooterScreen';
import { NavBarScreen } from '../navBar/NavBarScreen';


export const MonthlyTourSingleScreen = () => {
    const { tourId } = useParams();
    console.log(tourId)

    const [tour, settour] = useState([]);

    const getData = async () => {
        await axios.get(ApiUrl + "monthly-tour-show-id/" + tourId)
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
            <NavBarScreen var='.' />
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            {console.log(tour)}
            <div className='container'>
                <br></br>
                {tour.map((tour, index) => (
                    <div className=' row' key={tour.tour_catalogues_id} >
                        <div className='col-12 col-sm-12 col-md-6'>
                            <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <img src={`${ApiStorage + tour.img_1}`} style={{ width: '100%' }} className="card-img-top" alt="..."></img>
                                    </div>
                                    <div className="carousel-item">
                                        <img src={`${ApiStorage + tour.img_2}`} style={{ width: '100%' }} className="card-img-top" alt="..."></img>
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
                            <h3 className='camping-letters'> {tour.tour_name}</h3>
                            <h1 className='camping-letters' style={{ textTransform: 'uppercase' }}> {tour.tour_destiny}</h1>
                            <p>{tour.description}</p>

                            <p><b>Incluye:</b> {tour.include}</p>
                            <p><b>Dificultad:</b> {tour.dificulty}</p>
                            <p><b>Tipo de Ruta:</b> {tour.type}</p>
                            <p><b>Costo por Persona: </b>{tour.person_cost} <br></br>
                                <b>Costo por grupo +3: </b>{tour.group_cost}<br></br>
                            </p>
                            <br></br>

                            <div className='row text-center'>
                                <div className='col-12 col-sm-6'>
                                    <h4 className='camping-letters' style={{ textTransform: 'uppercase' }}>Fecha Salida<br></br> {tour.departure_date}</h4>
                                </div>
                                <div className='col-12 col-sm-6'>
                                    <h4 className='camping-letters' style={{ textTransform: 'uppercase' }}>Fecha Retorno <br></br> {tour.return_date}</h4>
                                </div>
                            </div>

                            <br></br>
                            <div className='container text-center'>
                                <a href={`https://api.whatsapp.com/send?phone=+593${tour.contact_phone}&text=${tour.messagge_for_contact}`} target="_blank" style={{ padding: '5px' }}>
                                    <button type="button" className="btn btn-success"> COMPRAR  RUTA </button >
                                </a>
                                
                                <Link to={'/tour-mensual'} style={{ padding: '5px' }}>
                                    <button type="button" className="btn btn-warning" >VOLVER A TOURS</button>
                                </Link>
                            </div>


                        </div>
                    </div>
                ))}
            </div>
            <br></br>
            <br></br>
            <br></br>

            <FooterScreen />


        </>
    )
}
