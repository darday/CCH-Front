import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css';

export const NavBarScreen = () => {
    return (
        <nav className="navbar navbar-expand-md navbar-light bg-light navbar-fondo fixed-top  animate__animated animate__fadeInDown">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img src={`./assets/images/logos/camping-logo.png`}  alt="" width="auto" height="50vh"/>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item ">
                        <Link className="nav-link active" aria-current="page" to="/">Inicio</Link>
                    </li>
                    
                
                    <li className="nav-item">
                        <Link className="nav-link"  to="/contabilidad">Tour Mensual</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link"  to="/contabilidad">Aventuras</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link"  to="/contabilidad">Equipo</Link>
                    </li>
                    
                    <li className="nav-item">
                        <Link className="nav-link"  to="/contabilidad">Hospedaje </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="#">Planificar Viajes</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="#">Acerca de Nosotros</Link>
                    </li>
                </ul>
                <form className="d-flex">
                    <div style={{paddingRigth:'0.2vh'}}>
                        <Link className="" to="/iniciar-sesion"><button className="btn btn-success btn-sm" type="submit">Iniciar Sesión</button></Link>
                    </div>
                    <div style={{paddingLeft:'0.2vh'}}>
                        <Link className="" to="/registrar"><button className="btn btn-outline-dark btn-sm " type="submit">Crear Cuenta</button></Link>
                    </div>

                    
                    
                </form>
                </div>
            </div>
        </nav>
    )
}
