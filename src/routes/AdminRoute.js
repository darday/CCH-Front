import React from 'react'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import { AdminHomeScreen } from '../components/admin/AdminHomeScreen'
import { NavBarUserScreen } from '../components/navBar/NavBarUserScreen'
import { AdminSidebar } from '../components/sidebar/AdminSidebar'
import Cookies from 'universal-cookie/es6';
import { FooterDashboardScreen } from '../components/footer/FooterDashboardScreen'
// import { AddTour } from '../components/admin/tours/AddTour'


const cookies = new Cookies();

export const AdminRoute = () => {
    
    if(cookies.get('token') && cookies.get('uid') && cookies.get('rol')){
        console.log("Estoy en administrativo logeado!!!")
        // window.location.href="/administrativo";

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
