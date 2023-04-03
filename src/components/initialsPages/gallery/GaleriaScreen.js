import React, { useEffect, useState } from 'react'
import { NavBarScreen } from '../../navBar/NavBarScreen'
import './Gallery.css'

// import { FaWindowClose } from "react-icons/fa";
import FaWindowClose from '@mui/icons-material/Close';

import axios from 'axios';
import { ApiStorage, ApiUrl } from '../../../services/ApiRest';

export const GaleriaScreen = () => {

    const [data, setdata] = useState([]);
    const [isLoading, setisLoading] = useState(true);

    const  getData =async ()=>{
        await axios.get(ApiUrl+'gallery-list')
        .then(result=>{
            result=result.data;
            setdata(result);
            console.log(result)

        })
        .catch(e=>{
            console.log(e);
        })
    }

    const [model, setmodel] = useState(false);
    const [tempimgSrc, settempimgSrc] = useState('');

    const getImg = (imgSrc) => {
        settempimgSrc(imgSrc);
        setmodel(true);
        console.log(model, tempimgSrc);
    }

    useEffect(() => {
        getData();
    }, [])


    
    
    return (
        <>
            <NavBarScreen />
            <div className="cont_img animate__animated  animate__fadeIn" >
                <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
                    <div className="carousel-inner" role="listbox">

                        <div className="banner" data-bs-interval="4000" style={{ backgroundImage: `url('./assets/images/principal/monthly-tour.jpeg')` }}>
                            <div className="pantalla_dividida" style={{ height: "45vh" }}>
                                <div className="text_cent_img_dividida animate__animated animate__fadeInRight animate__delay-0.8s">
                                    <h1 className="tit-sob-img_dividida" style={{ textShadow: '1px 1px 2px rgba(0,0,0,1.5)' }} >Descubre la belleza <br />de nuestras aventuras</h1>
                                </div>

                            </div>

                        </div>
                    </div>

                </div>
            </div>

            <br></br>
            <br></br>
            <div className={model ? "model open" : "model"} >
                <img src={tempimgSrc} />
                <FaWindowClose onClick={() => setmodel(false)} />
            </div>

            <div className='gallery'>
                {data.map((item, index) => {
                    return (
                        <div className='pics' key={index}>
                            <img  src={`${ApiStorage + item.img_1}`} style={{ width: '100%' }} onClick={() => getImg(`${ApiStorage + item.img_1}`)} />
                        </div>
                    )
                })}
            </div>
            <br></br>
            <br></br>
        </>
    )
}
