import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

export const AdminSidebar = () => {

    const {displayName} = useSelector( state => state.auth);
    console.log(displayName);

    return (
        
                <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                    <div className="sb-sidenav-menu">
                        <div className="nav">
                            <div className="sb-sidenav-menu-heading">Core</div>
                            <Link className="nav-link" to="home">
                                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                INICIO
                            </Link>
                            <div className="sb-sidenav-menu-heading">Interface</div>
                            <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#catalogo" aria-expanded="false" aria-controls="catalogo">
                                <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                                Catálogo de Tours
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </a>
                            <div className="collapse" id="catalogo" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                <nav className="sb-sidenav-menu-nested nav">
                                    <Link className="nav-link" to="add-to-catalogue">Agregar a catálogo</Link>
                                    <Link className="nav-link" to="catalogue-list">Ver catálogo</Link>
                                </nav>
                            </div>

                            <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#monthly" aria-expanded="false" aria-controls="collapseLayouts">
                                <div className="sb-nav-link-icon"><i className="fas fa-mountain"></i></div>
                                Tours mensuales
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </a>
                            <div className="collapse" id="monthly" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                <nav className="sb-sidenav-menu-nested nav">
                                    <Link className="nav-link" to="addTour">Agregar Tour</Link>
                                    <Link className="nav-link" to="monthly-tour-available">Tours Disponibles</Link>
                                    <Link className="nav-link" to="monthly-tour-list">Todos los Tours</Link>
                                    {/* <a className="nav-link" href="layout-sidenav-light.html">Listar Tours</a> */}
                                </nav>
                            </div>
                          
                            <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#passenger-tour" aria-expanded="false" aria-controls="collapseLayouts">
                                <div className="sb-nav-link-icon"><i className="fas fa-id-badge"></i></div>
                                Pasajeros en Tour
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </a>
                            <div className="collapse" id="passenger-tour" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                <nav className="sb-sidenav-menu-nested nav">
                                    <Link className="nav-link" to="passenger-available-tour">Tour con Listado</Link>
                                    <Link className="nav-link" to="monthly-tour-list">Todos los Tours</Link>
                                    <Link className="nav-link" to="monthly-tour-list">Tous Externos Solicitud</Link>
                                    {/* <a className="nav-link" href="layout-sidenav-light.html">Listar Tours</a> */}
                                </nav>
                            </div>
                            
                            <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#ventas" aria-expanded="false" aria-controls="ventas">
                                <div className="sb-nav-link-icon"><i className="far fa-money-bill-alt"></i></div>
                                Ventas
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </a>
                            <div className="collapse" id="ventas" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                <nav className="sb-sidenav-menu-nested nav">
                                    <Link className="nav-link" to="add-equipment-sell">Agregar Producto</Link>
                                    <Link className="nav-link" to="list-equipment-sell">Listar Productos</Link>
                                    
                                </nav>
                            </div>
                            <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                                <div className="sb-nav-link-icon"><i className="fas fa-retweet"></i></div>
                                Alquiler
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </a>
                            <div className="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                <nav className="sb-sidenav-menu-nested nav">
                                    <Link className="nav-link" to="add-to-rent">Agregar Producto</Link>
                                    <Link className="nav-link" to="list-to-rent">Listar Producto</Link>
                                </nav>
                            </div>

                            <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#inventory" aria-expanded="false" aria-controls="gallery">
                                <div className="sb-nav-link-icon"><i className="fas fa-warehouse"></i></div>
                                Inventario
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </a>
                            <div className="collapse" id="inventory" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                <nav className="sb-sidenav-menu-nested nav">
                                    {/* <Link className="nav-link" to="add-to-rent">Agregar Imagen</Link> */}
                                    <Link className="nav-link" to="inventario">Ver Inventario</Link>
                                    <Link className="nav-link" to="productos">Ver Productos</Link>
                                    <Link className="nav-link" to="bodegas">Ver Bodegas</Link>
                                </nav>
                            </div>

                            <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#gallery" aria-expanded="false" aria-controls="gallery">
                                <div className="sb-nav-link-icon"><i className="fas fa-image"></i></div>
                                Galería
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </a>
                            <div className="collapse" id="gallery" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                <nav className="sb-sidenav-menu-nested nav">
                                    {/* <Link className="nav-link" to="add-to-rent">Agregar Imagen</Link> */}
                                    <Link className="nav-link" to="list-gallery">Listar Imagenes</Link>
                                </nav>
                            </div>
                            
                            <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages">
                                <div className="sb-nav-link-icon"><i className="fas fa-home"></i></div>
                                Hospedaje
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </a>
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


                            <div className="sb-sidenav-menu-heading">Addons</div>
                            <a className="nav-link" href="charts.html">
                                <div className="sb-nav-link-icon"><i className="fas fa-chart-area"></i></div>
                                Charts
                            </a>
                            <a className="nav-link" href="tables.html">
                                <div className="sb-nav-link-icon"><i className="fas fa-table"></i></div>
                                Tables
                            </a>
                        </div>
                    </div>
                    <div className="sb-sidenav-footer">
                        <div className="small">Usuario:</div>
                        {displayName}
                    </div>
                </nav>
         
            
        
    )
}
