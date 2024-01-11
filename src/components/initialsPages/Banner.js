import React from 'react';
import './initial.css';


export const Banner = () => {
  return (


    <div className="cont_img animate__animated  animate__fadeIn" >
      <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner" role="listbox">
          <div className="carousel-item active" data-bs-interval="4000" style={{ backgroundImage: `url('./assets/images/banner/banner4.jpg')` }}>
            <div >
              <div className="text_cent_img camping-letters animate__animated animate__fadeInLeft "><h1 className="tit-sob-img"  >CAMPING CHIMBORAZO</h1></div>
              <div className="text_cent_img2 animate__animated animate__fadeInRight "><p className="tit-sob-img2" style={{ color: "white", textShadow: '1px 1px 2px rgba(0,0,0,1.5)' }}>La aventura está en el camino</p></div>
            </div>

            {/* <div className="btn-carousel">
          <div className="text-center ">
              <button type="button" style={{width:"40%",margin:"5px"}} className="btn btn-success">TOUR MENSUAL</button>
              <button type="button" style={{width:"40%",margin:"5px"}} className="btn btn-outline-secondary">RUTAS DISPONIBLES</button>
          </div>
        </div> */}
            <div style={{ paddingTop: "60vh" }}>
              <div className='row'>
                <div className='  '>
                  <a className='btn-rs animate__animated animate__fadeInDownBig' href="https://www.facebook.com/profile.php?id=100063764119037" target="_blank" style={{ textDecoration: 'none', padding: '6px' }}>
                    <i className="fab fa-facebook   animate__animated animate__fadeInDownBig "  ></i>
                  </a>
                  <a className='btn-rs' href="https://www.instagram.com/campingchimborazo/?hl=es" target="_blank" style={{ textDecoration: 'none', padding: '6px' }}>
                    <i className="fab fa-instagram  animate__animated animate__fadeInUpBig"  ></i>
                  </a>
                  <a className='btn-rs  animate__animated animate__fadeInDownBig' href="https://www.tiktok.com/@campingchimborazo360" target="_blank" style={{ textDecoration: 'none', padding: '6px' }}>
                    <i className="fab fa-tiktok   animate__animated animate__fadeInDownBig"  ></i>
                  </a>
                </div>

              </div>

            </div>


          </div>

          <div className="carousel-item " data-bs-interval="4000" style={{ backgroundImage: `url('./assets/images/banner/1.jpg')` }}>
            <div className="pantalla_dividida" style={{ height: "100vh" }}>
              <div className="text_cent_img_dividida animate__animated animate__zoomInDown"><h1 className="tit-sob-img_dividida" style={{ textShadow: '1px 1px 2px rgba(0,0,0,1.5)' }} >
                EL MEJOR <br />EQUIPO DE CAMPING PARA TUS RUTAS</h1>
              </div>

            </div>

            <div style={{ paddingTop: "80vh" }}>
              <div className='row'>
                <div className='col-6 '>
                  <a className='btn-rs ' href="https://www.facebook.com/profile.php?id=100063764119037" target="_blank" style={{ textDecoration: 'none', padding: '6px' }}>
                    <i className="fab fa-facebook  "  ></i>

                  </a>
                  <a className='btn-rs' href="https://www.instagram.com/campingchimborazo/?hl=es" target="_blank" style={{ textDecoration: 'none', padding: '6px' }}>
                    <i className="fab fa-instagram "  ></i>

                  </a>
                  <a className='btn-rs' href="https://www.tiktok.com/@campingchimborazo360" target="_blank" style={{ textDecoration: 'none', padding: '6px' }}>
                    <i className="fab fa-tiktok "  ></i>

                  </a>
                </div>
                <div className='col-6'>
                </div>
              </div>

            </div>

          </div>

          <div className="carousel-item " data-bs-interval="4000" style={{ backgroundImage: `url('./assets/images/banner/banner6.jpg')` }}>
            <div className="pantalla_dividida" style={{ height: "100vh" }}>
              <div className="text_cent_img_dividida animate__animated animate__fadeInRight animate__delay-0.8s"><h1 className="tit-sob-img_dividida" style={{ textShadow: '1px 1px 2px rgba(0,0,0,1.5)' }} >DISFRUTA <br />HAY MUCHO POR CONOCER</h1></div>

            </div>

            <div style={{ paddingTop: "80vh" }}>
              <div className='row'>
                <div className='col-6 '>
                  <a className='btn-rs' href="https://www.facebook.com/profile.php?id=100063764119037" target="_blank" style={{ textDecoration: 'none', padding: '6px' }}>
                    <i className="fab fa-facebook "  ></i>

                  </a>
                  <a className='btn-rs' href="https://www.instagram.com/campingchimborazo/?hl=es" target="_blank" style={{ textDecoration: 'none', padding: '6px' }}>
                    <i className="fab fa-instagram "  ></i>

                  </a>
                  <a className='btn-rs' href="https://www.tiktok.com/@campingchimborazo360" target="_blank" style={{ textDecoration: 'none', padding: '6px' }}>
                    <i className="fab fa-tiktok "  ></i>

                  </a>

                </div>
                <div className='col-6'>

                </div>
              </div>

            </div>

          </div>


        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>





  )
}
