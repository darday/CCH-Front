import React from 'react';
import 'animate.css';

import './initial.css';
import { NavBarScreen } from '../navBar/NavBarScreen';
import { Banner } from './Banner';
import { FooterScreen } from '../footer/FooterScreen';


export const IndexScreen = () => {
    return (
        <div>
            <NavBarScreen/>
            <Banner/>

            <div className="container ">
                <br></br>
                <h1 className="camping-letters text-center">SOBRE NUESTROS TOURS</h1>
                <hr></hr>

                <div className="row" style={{textAlign:'justify',justifyContent:"center",alignItems:"center",display:"flex"}}>
                   
                    <div className="col-md-5" style={{margin:"10px"}} >
                        {/* <p >Quieres Aventurarte salir de la rutina diaria y del estrés de la ciudad? Si es así Acompañanos!!! Tenemos un plan perfecto para ti, contamos con
                             las rutas más divertidas y hermosas que tiene la provincia de <b>Chimborazo</b> vive estas aventuras junto a guias amigables y experimentados 
                             que te ayudarán a que disfrutes de la maravillosa naturaleza en su máximo esplendor.
                        </p> */}
                        <p>
                            Tenemos <b>13 destinos </b> diferentes para que puedas distraerte y compartir con la naturaleza. Puede ser solo, con amigos o junto a tu familia.
                            No te preocupes por el <b>equipo de camping</b> nosotros te lo proporcionamos.
                        </p>
                        <p>
                            Contamos con un <b>tour mensual </b> el cual es propuesto por nosotros, cada mes viajamos a un lugar diferente, si estas libre en la fecha que 
                            proponemos inscribete y <b>conocerás más aventureros </b>como tú viviendo una experiencia inolvidable.
                        </p>

                        <p>
                            <b>Tour personalizado </b> en este tour nosotros nos acoplamos a tu disponibilidad, <b>CAMPING CHIMBORAZO</b> te asignará un guía para que te 
                            acompañe en la ruta que desees y además te proporcionara el <b>equipo de camping</b> para que disfrutes de esta aventura. No olvides que <b>la fecha la 
                            pones tu</b>.
                        </p>

                        <div className="text-center">
                            <button type="button" style={{width:"40%",margin:"5px"}} className="btn btn-success">TOUR MENSUAL</button>
                            <button type="button" style={{width:"40%",margin:"5px"}} className="btn btn-outline-secondary">RUTAS DISPONIBLES</button>
                        </div>
                    </div>
                    
                    <div className="col-md-5"  style={{margin:"10px"}}>
                        <img src={`./assets/images/principal/machay1.jpg`} className="rounded img-fluid img-thumbnail"  alt="" width="100%" height="auto"/>

                    </div>
                </div>
            </div>

            {/* ****************************NUESTRAS RUTAS*************************** */}

            <div className="container ">
                <br></br>
                <h1 className="camping-letters text-center"> PRÓXIMAS RUTAS</h1>
                <hr></hr>

                <div className="row row-cols-1 row-cols-md-3 g-4">
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
                    
                </div>


            </div>

            <FooterScreen/>
        </div>
    )
}
