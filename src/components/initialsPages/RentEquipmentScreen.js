import React from 'react'
import { useGetDate } from '../../hooks/useGetDate'
import { FooterScreen } from '../footer/FooterScreen';
import { NavBarScreen } from '../navBar/NavBarScreen'

export const RentEquipmentScreen = () => {

    localStorage.removeItem("menu");
    window.localStorage.setItem("menu", 5);

    const { printMonth } = useGetDate();
    console.log(printMonth)
    return (
        <>
            <NavBarScreen />

            <div className="cont_img animate__animated  animate__fadeIn" >
                <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
                    <div className="carousel-inner" role="listbox">

                        <div className="banner" data-bs-interval="4000" style={{ backgroundImage: `url('./assets/images/principal/tours/alqui.jpeg')` }}>
                            <div className="pantalla_dividida" style={{ height: "45vh" }}>
                                <div className="text_cent_img_dividida animate__animated animate__fadeInRight animate__delay-0.8s">
                                    <h1 className="tit-sob-img_dividida" >TODO NUESTRO EQUIPO<br />A TU ALCANCE</h1>
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
                <h1 className="camping-letters text-center" >ALQUILAMOS TODO EL EQUIPO DE CAMPING</h1><br></br>
                <h5 className="text-center" style={{ textAlign: 'center' }}>¿Deseas acampar pero no tienes equipo de camping? </h5>
                <h5 className='text-center'>Nosotros te podemos ayudar!... Ponemos a tu disposición todo nuestro equipo de camping para que puedas disfrutar al máximo tu aventura en la naturaleza.</h5>
            </div>
            <br></br>
            <br></br>

            <div className='container'>
                <div className='row'>
                    <div className='col-sm-12 col-md-3'>
                        <div className="card h-100" >
                            <img src="./assets/images/principal/monthly-tour.jpeg" className="card-img-top" alt="..."></img>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">the bulk of the card's content.</p>
                            </div>
                            <div class="card-footer text-center">
                                <a href="#" className="btn btn-success">Alquilar</a>
                            </div>


                        </div>

                    </div>

                    <div className='col-sm-12 col-md-3'>
                        <div className="card h-100" >
                            <img src="./assets/images/principal/monthly-tour.jpeg" className="card-img-top" alt="..."></img>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">the bulk of the card's content.</p>
                            </div>
                            <div class="card-footer text-center">
                                <a href="#" className="btn btn-success">Alquilar</a>
                            </div>


                        </div>

                    </div>

                    <div className='col-sm-12 col-md-3'>
                        <div className="card h-100" >
                            <img src="./assets/images/principal/monthly-tour.jpeg" className="card-img-top" alt="..."></img>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">the bulk of the card's content.</p>
                            </div>
                            <div class="card-footer text-center">
                                <a href="#" className="btn btn-success">Alquilar</a>
                            </div>


                        </div>

                    </div>

                    <div className='col-sm-12 col-md-3'>
                        <div className="card h-100" >
                            <img src="./assets/images/principal/monthly-tour.jpeg" className="card-img-top" alt="..."></img>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">the bulk of the card's content.</p>
                            </div>
                            <div class="card-footer text-center">
                                <a href="#" className="btn btn-success">Alquilar</a>
                            </div>
                        </div>

                    </div>
                </div>




            </div>
            <br></br>
            <br></br>
            <FooterScreen />


        </>

    )
}
