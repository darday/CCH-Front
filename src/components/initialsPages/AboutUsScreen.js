import React from 'react'
import { Link } from 'react-router-dom';
import { useGetDate } from '../../hooks/useGetDate'
import { FooterScreen } from '../footer/FooterScreen';
import { NavBarScreen } from '../navBar/NavBarScreen'
import { WhatsappButtonScreen } from './whatsappButton/WhatsappButtonScreen';

export const AboutUsScreen = () => {
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

                    <div className="banner" data-bs-interval="4000"  style={{backgroundImage:`url('./assets/images/principal/about-us.jpeg')`}}>
                        <div className="pantalla_dividida"  style={{height:"45vh"}}>
                            <div className="text_cent_img_dividida animate__animated animate__fadeInRight animate__delay-0.8s">
                                <h1 className="tit-sob-img_dividida" style={{textShadow:'1px 1px 2px rgba(0,0,0,1.5)'}} >Acerca de<br/>nosotros</h1>
                            </div>
                        
                        </div>
                            
                    </div>                         
                </div>
               
            </div>
        </div>  
        
        <br></br>
        <div className='container'>
            {/* <h1 className="camping-letters text-center" >Más de 10 años disfrutando de aventuras en la montaña</h1> */}
        </div>
        <br></br>
        <br></br>

        <div className="container ">
                <br></br>
                <h1 className="camping-letters text-center">Bienvenidos a Camping Chimborazo :D</h1>
                <hr></hr>

                <div className="row" style={{textAlign:'justify',justifyContent:"center",display:"flex"}}>
                   
                    <div className="col-md-5" style={{margin:"10px"}} >
                        {/* <p >Quieres Aventurarte salir de la rutina diaria y del estrés de la ciudad? Si es así Acompañanos!!! Tenemos un plan perfecto para ti, contamos con
                             las rutas más divertidas y hermosas que tiene la provincia de <b>Chimborazo</b> vive estas aventuras junto a guias amigables y experimentados 
                             que te ayudarán a que disfrutes de la maravillosa naturaleza en su máximo esplendor.
                        </p> */}
                        <p>
                            Somos una <b>operadora de turismo</b> que ofrece rutas de trekking, camping y senderismo en los increíbles paisajes de la región. 
                            Nuestra empresa se dedica a brindar una <b>experiencia única y auténtica de la naturaleza</b>, combinando la aventura con la comodidad y 
                            seguridad que nuestros clientes merecen.
                        </p>
                        <p>
                            Desde nuestros inicios, hemos estado comprometidos en proporcionar un <b>servicio de calidad</b>, respetando el medio ambiente y 
                            contribuyendo al desarrollo sostenible de la región. Nuestro <b>equipo de guías expertos y profesionales</b> está a su disposición para 
                            acompañarle en las rutas, brindar información detallada sobre los lugares y cuidar de su seguridad durante el viaje.
                        </p>

                        <p>
                            En Camping Chimborazo, creemos que el contacto con la naturaleza es una <b>experiencia transformadora y enriquecedora</b>, por eso ofrecemos 
                            rutas de trekking, camping y senderismo adaptadas a <b>todos los niveles de experiencia</b>, desde principiantes hasta expertos. Podrá disfrutar 
                            de vistas impresionantes, respirar aire puro y vivir <b>momentos inolvidables</b> en compañía de amigos, familiares o en solitario.
                        </p>

                        
                    </div>
                    
                    <div className="col-md-5"  style={{margin:"10px"}}>
                        {/* <img src={`./assets/images/principal/machay1.jpg`} className="rounded img-fluid img-thumbnail"  alt="" width="100%" height="auto"/> */}
                        <p>
                            Además de nuestras rutas, también ofrecemos servicios adicionales como el <b>alquiler de equipos</b>, alojamiento en nuestras tiendas de campaña y 
                            transporte. Nos aseguramos de que todos los detalles estén cubiertos para que usted pueda relajarse y disfrutar de su <b>aventura en la 
                            naturaleza.</b>
                        </p>
                        <p>
                            En Camping Chimborazo, estamos comprometidos en hacer que su experiencia sea única e inolvidable. Únase a nosotros y descubra los paisajes más 
                            hermosos y emocionantes de la región. <b>¡Estamos listos para acompañarlo en su próxima aventura de trekking, camping y senderismo!</b>
                        </p>
                        <div className="text-center">
                            <Link className="" to="/tour-mensual">
                                <button type="button" style={{width:"40%",margin:"5px"}} className="btn btn-success">TOURS DE {printMonth}</button>
                            </Link>
                            <button type="button" style={{width:"40%",margin:"5px"}} className="btn btn-outline-secondary">RUTAS DISPONIBLES</button>
                        </div>
                    </div>
                </div>
        </div>

        <div className="container ">
                <br></br>
                <h1 className="camping-letters text-center">Nuestro Equipo de Guías</h1>
                <hr></hr>
                <div className='row'>
                    <div className='col-12 col-sm-12 col-md-6 text-center'>
                        <img src={`./assets/images/nosotros/luis.jpg`}  alt="" width="70%" height="auto"/>

                    </div>
                    <div className='col-12 col-sm-12 col-md-6'>
                        <h3 className="card-title camping-letters"  >Luis Yumiseba  (Luchito)</h3>
                        <p>Luis Yumiseba es un guía de montaña con más de 5 años de experiencia en la guianza de expediciones de montañismo en diferentes regiones del país. A pesar de su juventud, Luis ha adquirido una gran cantidad de conocimientos y habilidades en la orientación, planificación y seguridad en la montaña.</p>
                        <p>Una de las virtudes más destacadas de Luis es su personalidad sociable y divertida. Él tiene una gran habilidad para conectarse con sus clientes y crear un ambiente amigable y relajado durante sus expediciones de montañismo. Esta habilidad hace que sus clientes se sientan cómodos y en confianza, lo que les permite disfrutar plenamente de la experiencia de montaña.</p>

                    </div>

                </div>
                <br></br>
                <br></br>

                <div className='row'>
                    <div className='col-12 col-sm-12 col-md-6 text-center'>
                        <img src={`./assets/images/nosotros/jhon.jpg`}  alt="" width="70%" height="auto"/>

                    </div>
                    <div className='col-12 col-sm-12 col-md-6'>
                        <h3 className="card-title camping-letters"  >Jhon Santos  (Jhon Paúl)</h3>
                        <p>Jhon Santos es un guía turístico con más de 5 años de experiencia en la guianza de rutas de trekking y senderismo en diferentes regiones del país. Su pasión por la naturaleza y el deseo de compartir su conocimiento lo llevaron a convertirse en guía de montaña, donde ha perfeccionado sus habilidades en la planificación y organización de expediciones de trekking.</p>
                        <p>Lo que hace que Jhon sea un guía excepcional es su paciencia y habilidad para trabajar con personas que realizan trekking por primera vez. Él sabe cómo hacer que la experiencia sea agradable y gratificante, y se asegura de que todos los miembros del grupo estén cómodos y seguros durante todo el recorrido. Su enfoque en la seguridad y el bienestar de sus clientes lo convierte en un guía altamente confiable y comprometido con la satisfacción del cliente.</p>

                    </div>

                </div>
                <br></br>
                <br></br>
                <div className='row'>
                    <div className='col-12 col-sm-12 col-md-6 text-center'>
                        <img src={`./assets/images/nosotros/dario.jpg`}  alt="" width="70%" height="auto"/>

                    </div>
                    <div className='col-12 col-sm-12 col-md-6'>
                        <h3 className="card-title camping-letters"  >Darío Janeta  (Darius)</h3>
                        <p style={{textAlign:'justify'}}>Darío Janeta es un apasionado explorador de la naturaleza y guía turístico, con más de 5 años de experiencia en la guianza de rutas de trekking, camping y senderismo en diferentes regiones del país. Su amor por la naturaleza lo llevó a dedicarse a la guianza, donde ha perfeccionado sus habilidades en la orientación, la seguridad y la planificación de expediciones en condiciones extremas.                          
                        </p>
                        <p style={{textAlign:'justify'}}>
                        Lo que hace que Darío sea un guía excepcional es su habilidad para transmitir su pasión por la naturaleza y la aventura a sus clientes. Con él, no solo tendrás una experiencia de turismo de aventura, sino también una oportunidad para aprender sobre la fauna local y las historias detrás de cada lugar. Él se preocupa por brindar a sus clientes una experiencia única y personalizada que nunca olvidarán.                            
                        </p>
                       

                    </div>

                </div>
        </div>
        <br></br>
        <br></br>
    <WhatsappButtonScreen/>
    <FooterScreen/>

        


    </>

  )
}
