import React from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie/es6';
import { useGetDate } from '../../hooks/useGetDate';
import './Navbar.css';

const cookies = new Cookies();
export const NavBarScreen = (props) => {
    console.log(props.var)
    const token = cookies.get('token');
    const { printMonth } = useGetDate();

    // mantener pintada opción seleccionada
    const menuSeleccionado = (opcion) => {
        switch (opcion) {
            case 1:
                console.log("click click")
                localStorage.removeItem("menu");
                window.localStorage.setItem("menu", 1);
                break;
            case 2:
                localStorage.removeItem("menu");
                window.localStorage.setItem("menu", 2);
                break;

            case 3:
                localStorage.removeItem("menu");
                window.localStorage.setItem("menu", 3);
                break;

            case 4:
                localStorage.removeItem("menu");
                window.localStorage.setItem("menu", 4);
                break;

            case 5:
                localStorage.removeItem("menu");
                window.localStorage.setItem("menu", 5);
                break;
            case 6:
                localStorage.removeItem("menu");
                window.localStorage.setItem("menu", 6);
                break;
            case 7:
                localStorage.removeItem("menu");
                window.localStorage.setItem("menu", 7);
                break;

            default:
                break;
        }
    }


    return (
        <nav className="navbar navbar-expand-md navbar-light bg-light navbar-fondo fixed-top  animate__animated animate__fadeInDown">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    {(props.var) ?
                        <img src={`../assets/images/logos/camping-logo.png`} alt="" width="auto" height="60vh" />
                        :
                        <img src={`./assets/images/logos/camping-logo.png`} alt="" width="auto" height="60vh" />
                    }
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse text-center" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 text-center">
                        <li className="nav-item ">
                            <a className={`nav-link selection-word ${(localStorage.getItem("menu") == 1) && 'color-selected'}`}
                                aria-current="page"
                                href="/"
                                onClick={() => menuSeleccionado(1)}
                            >
                                <i className="fas fa-home"></i>
                            </a>
                        </li>


                        <li className="nav-item">
                            <a className={`nav-link selection-word ${(localStorage.getItem("menu") == 2) && 'color-selected'}`}
                                href="/tour-mensual"
                                onClick={() => menuSeleccionado(2)}

                            >
                                Próximas Salidas
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link selection-word ${(localStorage.getItem("menu") == 3) && 'color-selected'}`}
                                href="/tour-disponibles"
                                onClick={() => menuSeleccionado(3)}
                            >
                                Nuestros Tours
                            </a>
                        </li>

                        {/* <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Aventuras
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><Link className="dropdown-item" to="/tour-mensual">Próximas Salidas</Link></li>
                                <li><Link className="dropdown-item" to="/tour-camping">Camping</Link></li>
                                <li><Link className="dropdown-item" to="/tour-fullday">Full Day</Link></li>
                                <li><Link className="dropdown-item" to="/tour-disponibles">Todos los Tours</Link></li>
                               

                            </ul>
                        </li> */}

                        <li className="nav-item dropdown">
                            <a className={`nav-link dropdown-toggle selection-word ${(localStorage.getItem("menu") == 5 || localStorage.getItem("menu") == 6) && 'color-selected'}`}
                                href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"

                            >
                                Equipo de Camping
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li>
                                    <a className={`dropdown-item selection-word ${(localStorage.getItem("menu") == 5) && 'color-selected'}`}
                                        href="/equipo-alquiler"
                                        onClick={() => menuSeleccionado(5)}

                                    >
                                        Alquiler
                                    </a>
                                </li>
                                <li>
                                    <a className={`dropdown-item selection-word ${(localStorage.getItem("menu") == 6) && 'color-selected'}`}
                                        href="/equipo-venta"
                                        onClick={() => menuSeleccionado(6)}

                                    >
                                        Venta
                                    </a>
                                </li>
                            </ul>
                        </li>

                        {/* <li className="nav-item">
                            <Link className="nav-link" to="#">Planificar Viajes</Link>
                        </li>


                        <li className="nav-item">
                            <Link className="nav-link"  to="/contabilidad">Hospedaje </Link>
                        </li> */}



                        <li className="nav-item">
                            <a className={`nav-link selection-word ${(localStorage.getItem("menu") == 7) && 'color-selected'}`}
                                href="/nosotros"
                                onClick={() => menuSeleccionado(7)}

                            >
                                Nosotros
                            </a>
                        </li>

                        {/* <li className="nav-item">
                            <a  className={`nav-link selection-word ${(localStorage.getItem("menu")== 7) && 'color-selected'}`} 
                                href="/nosotros"
                                onClick={()=>menuSeleccionado(7)}

                            >
                                Recomendaciones
                            </a>
                        </li> */}
                    </ul>
                    {
                        (token) ?
                            <form className="d-flex">
                                <div style={{ paddingRigth: '0.2vh' }}>
                                    <Link className="" to="/administrativo"><button className="btn btn-success btn-md" type="submit">Ver mi cuenta</button></Link>
                                </div>

                            </form>
                            :
                            <form className="d-flex">
                                <div style={{ paddingRigth: '0.2vh' }}>
                                    <Link className="" to="/iniciar-sesion"><button className="btn btn-success btn-sm" type="submit">Iniciar Sesión</button></Link>
                                </div>
                                <div style={{ paddingLeft: '0.2vh' }}>
                                    <Link className="" to="/registrar"><button className="btn btn-outline-dark btn-sm " type="submit">Crear Cuenta</button></Link>
                                </div>
                            </form>
                    }

                </div>
            </div>
        </nav>
    )
}
