import React from 'react'
import { useGetDate } from '../../hooks/useGetDate'
import { NavBarScreen } from '../navBar/NavBarScreen'
import { WhatsappButtonScreen } from './whatsappButton/WhatsappButtonScreen';
import { FooterScreen } from '../footer/FooterScreen';

export const CampingTourScreen = () => {
    // var date = new Date();
    // var mes = date.getMonth();
    // var meses= ['ENERO','FEBRERO','MARZO','ABRIL','MAYO','JUNIO','JULIO','AGOSTO','SEPTIEMBRE','OCTUBRE','NOVIEMBRE','DICIEMBRE'];
    // var mesImprimir = meses[mes];
    // console.log(mesImprimir);

    const {printMonth} = useGetDate();
    console.log(printMonth)
  return (
    <>
        <NavBarScreen/>

        <div className="cont_img animate__animated  animate__fadeIn" >  
            <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">                
                <div className="carousel-inner" role="listbox">

                    <div className="banner" data-bs-interval="4000"  style={{backgroundImage:`url('./assets/images/principal/tours/tour3.png')`}}>
                        <div className="pantalla_dividida"  style={{height:"45vh"}}>
                            <div className="text_cent_img_dividida animate__animated animate__fadeInRight animate__delay-0.8s">
                                <h1 className="tit-sob-img_dividida" >UN CAMPING <br/>EN MEDIO DE LA NATURALEZA</h1>
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
            <h1 className="camping-letters text-center" >CAMPING</h1>
            <p style={{textAlign:'center'}}>Tenemos estas rutas disponibles para el mes de {printMonth} asi que acompañanos a vivir estas aventuras que tenemos planificadas para ti. Escoge la que más te guste y disfrutala al máximo junto a tus amigos, pareja o familia</p>
        </div>
        <br></br>
        <br></br>

        <div className='container'>
            <div className='row'>
                <div className='col-sm-12 col-md-6'>
                    <div className="card" >
                        <img src="./assets/images/principal/monthly-tour.jpeg" className="card-img-top" alt="..."></img>
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="#" className="btn btn-primary">Reservar Cupo</a>
                        </div>
                    </div>

                </div>

                <div className='col-sm-12 col-md-6'>
                    <div className="card" >
                        <img src="./assets/images/principal/monthly-tour.jpeg" className="card-img-top" alt="..."></img>
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="#" className="btn btn-primary">Reservar Cupo</a>
                        </div>
                    </div>

                </div>
            </div>

            <br></br>
            <div className='row'>
                <div className='col-sm-12 col-md-6'>
                    <div className="card" >
                        <img src="./assets/images/principal/monthly-tour.jpeg" className="card-img-top" alt="..."></img>
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="#" className="btn btn-primary">Reservar Cupo</a>
                        </div>
                    </div>

                </div>

                <div className='col-sm-12 col-md-6'>
                    <div className="card" >
                        <img src="./assets/images/principal/monthly-tour.jpeg" className="card-img-top" alt="..."></img>
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="#" className="btn btn-primary">Reservar Cupo</a>
                        </div>
                    </div>

                </div>
            </div>
        

        </div>
        <WhatsappButtonScreen/>
        <FooterScreen/>


    </>

  )
}
