import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ApiStorage, ApiUrl } from '../../services/ApiRest';
import { FooterScreen } from '../footer/FooterScreen';
import { NavBarScreen } from '../navBar/NavBarScreen';


export const GeneralTourScreen = () => {
    const { tourId } = useParams();
    console.log(tourId)

    const [tour, settour] = useState([]);

    const getData = async () => {
        await axios.get(ApiUrl + "show-catalogue-tour/" + tourId)
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
                            <h3 className='camping-letters'> {tour.tour_name}</h3>
                            <h1 className='camping-letters' style={{ textTransform: 'uppercase' }}> {tour.tour_destiny}</h1>
                            <p>{tour.description}</p>
                            <p><b>Incluye:</b> {tour.include}</p>
                            <p><b>Dificultad:</b> {tour.dificulty}</p>
                            <p><b>Tipo de Ruta:</b> {tour.type}</p>
                            <p><b>Costo 1 Persona: </b>{tour.cost_1} <br></br>
                                <b>Costo 2 Personas: </b>{tour.cost_2}<br></br>
                                <b>Costo 3-4 Personas: </b>{tour.cost_3}<br></br>
                                <b>Costo +4 Persona: </b>{tour.cost_4} <br></br>
                                <small>El precio puede variar dependiendo si se requiere transporte, equipo de camping etc.</small>
                            </p>
                            <br></br>
                            <br></br>
                            <div className='container text-center'>
                                <a href='https://wa.link/3h7nxd' target="_blank" style={{padding:'5px'}}>
                                    <button type="button" className="btn btn-success"> COMPRAR  RUTA </button >
                                </a>

                                <a href='https://wa.link/3h7nxd' target="_blank" style={{padding:'5px'}}>
                                    <button type="button" className="btn btn-warning" >VOLVER A TOURS</button>
                                </a>
                            </div>


                        </div>
                    </div>
                ))}
            </div>
            <br></br>
            <br></br>
            <br></br>

            <FooterScreen/>


        </>
    )
}
