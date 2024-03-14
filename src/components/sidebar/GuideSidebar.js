import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

export const GuideSidebar = () => {

    const {displayName} = useSelector( state => state.auth);
    console.log(displayName);

    return (
        
                <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                    <div className="sb-sidenav-menu">
                        <div className="nav">
                            <div className="sb-sidenav-menu-heading">Core</div>
                            <Link className="nav-link" to="home">
                                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                INICIO GUIA
                            </Link>
                            <div className="sb-sidenav-menu-heading">Interface</div>                          
                            

                            <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#inventory" aria-expanded="false" aria-controls="gallery">
                                <div className="sb-nav-link-icon"><i className="fas fa-warehouse"></i></div>
                                Bodega Alimentos
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </a>
                            <div className="collapse" id="inventory" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                <nav className="sb-sidenav-menu-nested nav">
                                    {/* <Link className="nav-link" to="bodegas">Ver Bodegas</Link> */}
                                    <Link className="nav-link" to="lista-productos">Lista de productos</Link>
                                    <Link className="nav-link" to="solicitar-productos">Solicitar productos</Link>
                                    <Link className="nav-link" to="Historial-solicitud-productos">Historial de solicitud de productos</Link>
                                </nav>
                            </div>
                            
                            <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#equipment" aria-expanded="false" aria-controls="gallery">
                                <div className="sb-nav-link-icon"><i className="fas fa-campground"></i></div>
                                Bodega Equipos
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </a>
                            <div className="collapse" id="equipment" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                <nav className="sb-sidenav-menu-nested nav">
                                    {/* <Link className="nav-link" to="bodegas">Ver Bodegas</Link> */}
                                    <Link className="nav-link" to="bodegas">Ver Bodega</Link>
                                    {/* <Link className="nav-link" to="solicitar-productos">Solicitar productos</Link>
                                    <Link className="nav-link" to="Historial-solicitud-productos">Historial de solicitud de productos</Link> */}
                                </nav>
                            </div>

                            <div className="collapse" id="collapsePages" aria-labelledby="headingTwo" data-bs-parent="#sidenavAccordion">
                                <nav className="sb-sidenav-menu-nested nav accordion" id="sidenavAccordionPages">
                                    <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#pagesCollapseAuth" aria-expanded="false" aria-controls="pagesCollapseAuth">
                                        Authentication
                                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                    </a>
                                    <div className="collapse" id="pagesCollapseAuth" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordionPages">
                                        <nav className="sb-sidenav-menu-nested nav">
                                            <a className="nav-link" href="login.html">Login</a>
                                            <a className="nav-link" href="register.html">Register</a>
                                            <a className="nav-link" href="password.html">Forgot Password</a>
                                        </nav>
                                    </div>
                                    <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#pagesCollapseError" aria-expanded="false" aria-controls="pagesCollapseError">
                                        Error
                                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                    </a>
                                    <div className="collapse" id="pagesCollapseError" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordionPages">
                                        <nav className="sb-sidenav-menu-nested nav">
                                            <a className="nav-link" href="401.html">401 Page</a>
                                            <a className="nav-link" href="404.html">404 Page</a>
                                            <a className="nav-link" href="500.html">500 Page</a>
                                        </nav>
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div className="sb-sidenav-footer">
                        <div className="small">Usuario:</div>
                        {displayName}
                    </div>
                </nav>
         
            
        
    )
}
