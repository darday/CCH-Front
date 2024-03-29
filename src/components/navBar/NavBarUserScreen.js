import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'universal-cookie/es6';
import { logoutSesion } from '../../store/auth/thunks';
import { LoginScreen } from '../auth/LoginScreen';
import './Navbar.css';

const cookies = new Cookies();


export const NavBarUserScreen = () => {

    const token = cookies.get('token');

    // const {accessToken} = useSelector(state=>state.auth);

    const dispatch = useDispatch();

    const handleLogout =()=>{
        // dispatch(startLogout(accessToken));
        dispatch(logoutSesion(token));

        return (
            <LoginScreen/>
        )
        
    }

    return (
        <nav className="sb-topnav navbar navbar-user navbar-expand navbar-dark bg-dark">
            <a className="navbar-brand ps-5" href="/">
                <img src={`../assets/images/logos/camping-logo.png`}  alt="" width="auto" height="50vh"/>
            </a>
            
            <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i className="fas fa-bars"></i></button>
            <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                <div className="input-group">
                    <input className="form-control" type="text" placeholder="Search for..." aria-label="Search for..." aria-describedby="btnNavbarSearch" />
                    <button className="btn btn-primary" id="btnNavbarSearch" type="button"><i className="fas fa-search"></i></button>
                </div>
            </form>
            <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-user fa-fw"></i></a>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                        <li><a className="dropdown-item" href="#!">Settings</a></li>
                        <li><a className="dropdown-item" href="#!">Activity Log</a></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><a className="dropdown-item" onClick={handleLogout} >Logout</a></li>
                    </ul>
                </li>
            </ul>
        </nav>
        
    )
}
