import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useGetDate } from '../../hooks/useGetDate'
import { ApiStorage, ApiUrl } from '../../services/ApiRest';
import { FooterScreen } from '../footer/FooterScreen';
import { NavBarScreen } from '../navBar/NavBarScreen'
import { WhatsappButtonScreen } from './whatsappButton/WhatsappButtonScreen';

export const SellEquipmentScreen = () => {
    // var date = new Date();
    // var mes = date.getMonth();
    // var meses= ['ENERO','FEBRERO','MARZO','ABRIL','MAYO','JUNIO','JULIO','AGOSTO','SEPTIEMBRE','OCTUBRE','NOVIEMBRE','DICIEMBRE'];
    // var mesImprimir = meses[mes];
    // console.log(mesImprimir);

    const [data, setdata] = useState([]);
    const [selectedData, setselectedData] = useState([]);

    const getData = async () => {
        await axios.get(ApiUrl + 'equipment-list')
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


    const { printMonth } = useGetDate();
    return (
        <>
            <NavBarScreen />

            <div className="cont_img animate__animated  animate__fadeIn" >
                <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
                    <div className="carousel-inner" role="listbox">

                        <div className="banner" data-bs-interval="4000" style={{ backgroundImage: `url('./assets/images/principal/tours/venta3.jpg')` }}>
                            <div className="pantalla_dividida" style={{ height: "45vh" }}>
                                <div className="text_cent_img_dividida animate__animated animate__fadeInRight animate__delay-0.8s">
                                    <h1 className="tit-sob-img_dividida" style={{textShadow:'1px 1px 2px rgba(0,0,0,1.5)'}} ><br />Empieza con tu equipo propio</h1>
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
                <h1 className="camping-letters text-center" >COMPRA TU EQUIPO DE CAMPING</h1>
                <h5 className="text-center" style={{ textAlign: 'center' }}>¿Te gusta la aventura y las actividades en la naturaleza? </h5>
                <h5 className='text-center'>Si?... Pues entonces es momento que te prepares con el mejor equipo de monta;a para que puedas vivir todas esas mágicas experiencias que solamente en las montañas puedes encontrar.</h5>

            </div>
            <br></br>
            <br></br>

            <div className='container'>
                <div className='row'>
                    {data.map((equipment, index) => (
                        <div className='col-6 col-sm-12 col-md-3' style={{paddingTop:'1rem'}}>
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
                                    {/* <a href="#" className="btn btn-success">Comprar</a> */}
                                    <a href={`https://api.whatsapp.com/send?phone=+593${equipment.contact_phone}&text=${equipment.messagge_for_contact}`} target="_blank" style={{ padding: '0px' }}>
                                        <button type="button" className="btn btn-success" style={{ margin: '0vh' }}> Comprar </button >
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
                                            <textarea class="form-control" placeholder="Leave a comment here" value={selectedData.description} rows="10"  style={{ color: 'black' }} onlyread disabled ></textarea>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                            <a href={`https://api.whatsapp.com/send?phone=+593${equipment.contact_phone}&text=${equipment.messagge_for_contact}`} target="_blank" style={{ padding: '0px' }}>
                                                <button type="button" className="btn btn-success" style={{ margin: '0vh' }}> Comprar </button >
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
            <WhatsappButtonScreen/>
            <FooterScreen />

        </>

    )
}
