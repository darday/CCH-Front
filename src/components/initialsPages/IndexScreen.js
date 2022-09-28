import React from 'react';
import 'animate.css';

import './initial.css';
import { NavBarScreen } from '../navBar/NavBarScreen';
import { Banner } from './Banner';
import { FooterScreen } from '../footer/FooterScreen';
import { useGetDate } from '../../hooks/useGetDate';
import { Link } from 'react-router-dom';


export const IndexScreen = () => {
    
    localStorage.removeItem("menu");
    window.localStorage.setItem("menu",1);  

    const {printMonth} = useGetDate()
    return (
        <div>
            <NavBarScreen/>
            <Banner/>

            

            {/* ****************************NUESTRAS RUTAS*************************** */}

            <div className="container ">
                <br></br>
                <h1 className="camping-letters text-center"> PRÓXIMAS RUTAS</h1>
                <hr></hr>

                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
                    <div className="col">
                        <div className="card h-100">
                        <img src="..." className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card h-100">
                        <img src="..." className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">This is a short card.</p>
                        </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card h-100">
                        <img src="..." className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
                        </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="card h-100">
                        <img src="..." className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
                        </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="card h-100">
                        <img src="..." className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
                        </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="card h-100">
                        <img src="..." className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
                        </div>
                        </div>
                    </div>

                    
                </div>


            </div>

            <div className="container ">
                <br></br>
                <br></br>
                <h1 className="camping-letters text-center"> EQUIPO DE CAMPING</h1>
                <br></br>
                <div className="row row-cols-1 row-cols-md-3 g-4 text-center justify-content-center">
                    <div className="col">
                        <div className="card h-100" style={{border:'none'}}>
                            <a href="/equipo-alquiler">
                                <img src={`./assets/images/principal/alquilar.jpg`} className="card-img-top" alt="..." style={{borderRadius:'110vh'}}/>
                            </a>
                            <div className="card-body">
                                <a href="/equipo-alquiler">
                                    <button type="button" className="btn btn-outline-success camping-letters">            
                                        ALQUILAR EQUIPO
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card h-100" style={{border:'none'}}>
                            <a href="/equipo-venta">
                                <img src={`./assets/images/principal/comprar.jpeg`} className="card-img-top" alt="..." style={{borderRadius:'110vh'}}/>
                            </a>

                            <div className="card-body">
                                <a href="/equipo-venta">
                                    <button type="button" className="btn btn-outline-success camping-letters">            
                                        COMPRAR EQUIPO
                                    </button>       
                                </a>

                                                
                            </div>
                        </div>
                    </div>
                    
                    
                    
                    
                </div>


            </div>

            <br></br>
            <br></br>
                
            <div className='imagen-fondo-index' style={{backgroundImage:`url('./assets/images/principal/info-index.jpeg')`}} >
                <div className='container' style={{padding:'10vh'}}>
                    <div className='row text-center justify-content-center'>
                        <div className='col-12 col-sm-6 col-md-3'>                            
                                <h1 className="card-title camping-letters" >+300</h1>
                                <h5 className="card-title camping-letters"  >Clientes Satisfechos</h5>
                                
                        </div>
                        <div className='col-12 col-sm-6 col-md-3'>                            
                                <h1 className="card-title camping-letters" >+15</h1>
                                <h5 className="card-title camping-letters"  >Rutas Disponibles</h5>
                                
                        </div>
                        <div className='col-12 col-sm-6 col-md-3'>                            
                                <h1 className="card-title camping-letters" >10</h1>
                                <h5 className="card-title camping-letters"  >Años de Experiencia</h5>
                                
                        </div>
                        <div className='col-12 col-sm-6 col-md-3'>                            
                                <h1 className="card-title camping-letters" >100%</h1>
                                <h5 className="card-title camping-letters"  >Garantizado</h5>
                                
                        </div>
                    </div>
                </div>

                
               
            </div>

            <br></br>
            <br></br>
            <br></br>

            <div className="container ">
                <h1 className="camping-letters text-center"> TOP DE RUTAS DESTACADAS</h1>
                <hr></hr>

                <div className='row justify-content-center'>
                    <div className='col-12 col-sm-6 col-md-4 ' style={{paddingBottom:'2vh'}}>
                        <div className="card h-100">
                            <img src={`./assets/images/principal/desta-altar.jpeg`} className="card-img-top" alt="..."></img>
                            <div className="card-body">
                                <h5 className="card-title camping-letters">ALTAR - LAGUNA AMARILLA</h5>
                                <p className="card-text">Una de las rutas más hermosas del Ecuador te espera, un lugar en donde pondrás a prueba tu cuerpo y mente para alcanzar el objetivo y disfrutar de un paisaje que solo pocos lo pueden hacer.</p>
                            </div>
                            <div className="card-footer">
                                <small className="text-muted">Dificultad: Moderadamente Alta</small>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-sm-6 col-md-4 ' style={{paddingBottom:'2vh'}}>
                        <div className="card h-100">
                            <img src={`./assets/images/principal/desta-punay.jpeg`} className="card-img-top" alt="..."></img>
                            <div className="card-body">
                                <h5 className="card-title camping-letters">PUÑAY - CAMPING SOBRE LAS NUBES</h5>
                                <p className="card-text">Un atardecer como nunca antes lo has visto y por la noche un cielo totalmente estrellado, una aventura que sin duda debes vivirla.</p>
                            </div>
                            <div className="card-footer">
                                <small className="text-muted">Dificultad: Moderadamente Alta</small>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-sm-6 col-md-4 ' style={{paddingBottom:'2vh'}}>
                        <div className="card h-100">
                            <img src={`./assets/images/principal/desta-cari.jpeg`} className="card-img-top" alt="..."></img>
                            <div className="card-body">
                                <h5 className="card-title camping-letters">CARIHUAIRAZO - LAGUNA CONGELADA</h5>
                                <p className="card-text">Una ruta divertida en la que observaremos Vicuñas, atravesaremos hermosos lugares y le tendremos de fondo al Coloso Chimborazo durante toda la ruta.</p>
                            </div>
                            <div className="card-footer">
                                <small className="text-muted">Dificultad: Moderadamente Alta</small>
                            </div>
                        </div>
                    </div>
                </div>


            </div>

            <br></br>
            <br></br>

            <div className='container'>
                <h1 className="camping-letters text-center"> ¿QUE HACER EN RIOBAMBA?</h1>
                <hr></hr>
            </div>

            <br></br>
            <br></br>
            <br></br>

            <FooterScreen/>
        </div>
    )
}
