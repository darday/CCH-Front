import React from 'react'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import { AdminHomeScreen } from '../components/admin/AdminHomeScreen'
import { NavBarUserScreen } from '../components/navBar/NavBarUserScreen'
import { AdminSidebar } from '../components/sidebar/AdminSidebar'
import Cookies from 'universal-cookie/es6';
import { FooterDashboardScreen } from '../components/footer/FooterDashboardScreen'
import axios from 'axios'
import { ApiUrl } from '../services/ApiRest'
import { loadUser } from '../store/auth/thunks'
import { useDispatch } from 'react-redux'
import { startLoadingTourCatalogue } from '../store/tour_catalogue/thunks'
// import { AddTour } from '../components/admin/tours/AddTour'


const cookies = new Cookies();

export const AdminRoute = () => {

    const dispatch = useDispatch();

    
    if(cookies.get('token') && cookies.get('uid') && cookies.get('rol')){
        dispatch(loadUser(cookies.get('uid')));
        dispatch(startLoadingTourCatalogue());
        // console.log("Estoy en administrativo logeado!!!")
        
        
    }else{
        console.log('no está logeado')
        //setisLiggedIn(false);
        window.location.href="/iniciar-sesion";
    }

    

    return (
        <>         
        <NavBarUserScreen/>
        <div id="layoutSidenav">
            <div id="layoutSidenav_nav">
                <AdminSidebar/>
            </div>
            <div id="layoutSidenav_content">
                <main>
                    <div className="container-fluid px-3 py-4">
                        <Outlet />

                    {/* <Routes>
                        <Route path="administrativo/home" element={<AdminHomeScreen/>} > </Route>
                        <Route path="administrativo/addTour" element={<AddTour/>} > </Route>
                    </Routes>                         */}
                    </div>
                </main>
                
                <FooterDashboardScreen/>
            </div>
        </div>
        

        
                {/* <Outlet /> */}
        </>
    )
}
