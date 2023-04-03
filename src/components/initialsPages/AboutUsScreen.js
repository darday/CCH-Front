import React from 'react'
import { Link } from 'react-router-dom';
import { useGetDate } from '../../hooks/useGetDate'
import { FooterScreen } from '../footer/FooterScreen';
import { NavBarScreen } from '../navBar/NavBarScreen'

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
                            <Link className="" to="/tour-mensual">
                                <button type="button" style={{width:"40%",margin:"5px"}} className="btn btn-success">TOURS DE {printMonth}</button>
                            </Link>
                            <button type="button" style={{width:"40%",margin:"5px"}} className="btn btn-outline-secondary">RUTAS DISPONIBLES</button>
                        </div>
                    </div>
                    
                    <div className="col-md-5"  style={{margin:"10px"}}>
                        <img src={`./assets/images/principal/machay1.jpg`} className="rounded img-fluid img-thumbnail"  alt="" width="100%" height="auto"/>

                    </div>
                </div>
        </div>

        <div className="container ">
                <br></br>
                <h1 className="camping-letters text-center">EQUIPO CAMPING CHIMBORAZO</h1>
                <hr></hr>
                <div className='row'>
                    <div className='col-12 col-sm-12 col-md-6 text-center'>
                        <img src={`./assets/images/nosotros/luis.jpg`}  alt="" width="70%" height="auto"/>

                    </div>
                    <div className='col-12 col-sm-12 col-md-6'>
                        <h3 className="card-title camping-letters"  >Luis Yumiseba  (Luchito)</h3>
                        <p>Aqui va descripcion</p>

                    </div>

                </div>
                <br></br>
                <br></br>

                <div className='row'>
                    <div className='col-12 col-sm-12 col-md-6 text-center'>
                        <img src={`./assets/images/nosotros/jhon.jpg`}  alt="" width="70%" height="auto"/>

                    </div>
                    <div className='col-12 col-sm-12 col-md-6'>
                        <h3 className="card-title camping-letters"  >Jhon Santos  (Jhonson)</h3>
                        <p>Aqui va descripcion</p>

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
                        <p style={{textAlign:'justify'}}>Soy una persona que le gusta compartir con la naturaleza pues en ella he encontrado la paz y tranquilidad que tanto buscaba, me guta compartir este sentir con muchas personas
                            que para que disfruten de la bondad y pureza que solo se puede apreciar en las montañas.                            
                        </p>
                        <p style={{textAlign:'justify'}}>
                            Comencé estas aventuras a los 18 años actualmente tengo 28 años y en estos 10 años de viajes he logrado tener muchas experiencias las cuales me han ayudado a mejorar en cada ruta que hago
                            
                        </p>
                        <p>
                            Redes Sociales:                            
                        </p>

                    </div>

                </div>
        </div>
        <br></br>
        <br></br>
    <FooterScreen/>

        


    </>

  )
}
