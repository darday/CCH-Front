import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useGetDate } from '../../hooks/useGetDate'
import { ApiStorage, ApiUrl } from '../../services/ApiRest';
import { FooterScreen } from '../footer/FooterScreen';
import { NavBarScreen } from '../navBar/NavBarScreen'

export const RentEquipmentScreen = () => {

    localStorage.removeItem("menu");
    window.localStorage.setItem("menu", 5);

    const { printMonth } = useGetDate();
    console.log(printMonth)

    const [data, setdata] = useState([]);
    const [selectedData, setselectedData] = useState([]);

    const getData = async () => {
        await axios.get(ApiUrl+ 'equipment-rent-list')
            .then(res => {
                res = res.data;
                setdata(res);
                console.log(res)
            })
            .catch(e => {
                console.log(e);
            })
    }

    useEffect(() => {
        getData();
    }, [])

    const selectData = (data) => {
        setselectedData(data);
    }

    return (
        <>
            <NavBarScreen />

            <div className="cont_img animate__animated  animate__fadeIn" >
                <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
                    <div className="carousel-inner" role="listbox">

                        <div className="banner" data-bs-interval="4000" style={{ backgroundImage: `url('./assets/images/principal/tours/alqui.jpeg')` }}>
                            <div className="pantaresp.messaggella_dividida" style={{ height: "45vh" }}>
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
                    {data.map((equipment, index) => (
                        <div className='col-6 col-sm-12 col-md-3' style={{ paddingTop: '1rem' }}>
                            <div className="card h-100" >
                                <img src={`${ApiStorage + equipment.img_1}`} style={{ width: '100%' }} className="card-img-top" alt="..."></img>

                                <div className="card-body sell-equipment-card-body">
                                    {/* <div className='row'> */}
                                    {/* <div className='col-12 col-sm-6 col-md-8' > */}
                                    <h6 className="card-title camping-letters text-center">{equipment.name}</h6>
                                    {/* </div> */}
                                    {/* <div className='col-12 col-sm-6 col-md-4 text-right'>
                                            9.99
                                        </div> */}
                                    {/* </div> */}
                                    <p className="card-text camping-letters text-center">Precio: ${equipment.cost} </p>
                                </div>
                                <div className="card-footer text-center">
                                    {/* <a href="#" className="btn btn-success">Alquilar</a> */}
                                    <a href={`https://api.whatsapp.com/send?phone=+593${equipment.contact_phone}&text=${equipment.messagge_for_contact}`} target="_blank" style={{ padding: '0px' }}>
                                        <button type="button" className="btn btn-success" style={{ margin: '0vh' }}> Alquilar </button >
                                    </a>
                                    <button type="button" className="btn btn-info" style={{ margin: '1vh' }} data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => selectData(equipment)}  >
                                        Detalles
                                    </button>
                                </div>
                            </div>
                            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title camping-letters" id="exampleModalLabel">{selectedData.name}</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <h5 className="card-text camping-letters ">Precio: ${selectedData.cost} </h5>
                                            <textarea class="form-control" placeholder="Leave a comment here" value={selectedData.description} rows="10" style={{ color: 'black' }} onlyread disabled ></textarea>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                            <a href={`https://api.whatsapp.com/send?phone=+593${equipment.contact_phone}&text=${equipment.messagge_for_contact}`} target="_blank" style={{ padding: '0px' }}>
                                                <button type="button" className="btn btn-success" style={{ margin: '0vh' }}> Alquilar </button >
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    ))}

                </div>
            </div>

            <br></br>
            <br></br>
            <FooterScreen />


        </>

    )
}
