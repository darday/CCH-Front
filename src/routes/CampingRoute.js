import React, { useEffect, useState } from 'react'
import { RegisterScreen } from '../components/auth/RegisterScreen'
import { LoginScreen } from '../components/auth/LoginScreen'
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
  
} from "react-router-dom";
import { IndexScreen } from '../components/initialsPages/IndexScreen';
import { FooterScreen } from '../components/footer/FooterScreen';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'universal-cookie/es6';
import axios from 'axios';
import { ApiUrl } from '../services/ApiRest';
import { HomeScreen } from '../components/user/HomeScreen';
import { AdminRoute } from './AdminRoute';
import { PrivateRoute } from './PrivateRoute';
import { UserRouteScreen } from './UserRouteScreen';
import { MonthlyTourScreen } from '../components/initialsPages/MonthlyTourScreen';
import { CheckingAuthentication } from '../components/ui/CheckingAuthentication';
import { AdminHomeScreen } from '../components/admin/AdminHomeScreen';
import { AddMonthlyTour } from '../components/admin/tours/AddMonthlyTour';
import { CampingTour, CampingTourScreen } from '../components/initialsPages/CampingTourScreen';
import { FullDaysScreen } from '../components/initialsPages/FullDaysScreen';
import { AllToursScreen } from '../components/initialsPages/AllToursScreen';
import { RentEquipmentScreen } from '../components/initialsPages/RentEquipmentScreen';
import { SellEquipmentScreen } from '../components/initialsPages/SellEquipmentScreen';
import { AboutUsScreen } from '../components/initialsPages/AboutUsScreen';
import { AddToCatalogue } from '../components/admin/catalogue/AddToCatalogue';
import { CatalogueList } from '../components/admin/catalogue/CatalogueList';
import { GeneralTourScreen } from '../components/initialsPages/GeneralTourScreen';
import { AddToEquipmentSell } from '../components/admin/equipment/AddToEquipmentSell';
import { ListEquipmentSell } from '../components/admin/equipment/ListEquipmentSell';
import { AddToRent } from '../components/admin/rent/AddToRent';
import { ListToRent } from '../components/admin/rent/ListToRent';
import { MonthlyTourList } from '../components/admin/tours/MonthlyTourList';
import { MonthlyTourSingleScreen } from '../components/initialsPages/MonthlyTourSingleScreen';
import { EditCatalogue } from '../components/admin/catalogue/EditCatalogue';
import { EditMonthlyTour } from '../components/admin/tours/EditMonthlyTour';
import { EditEquipment } from '../components/admin/equipment/EditEquipment';
import { EditEquipmentRent } from '../components/admin/rent/EditEquipmentRent';
import { GaleriaScreen } from '../components/initialsPages/gallery/GaleriaScreen';
import { ListGallery } from '../components/admin/gallery/ListGallery';
import { ListAvailablePassengerTours } from '../components/admin/passengerInTour/ListAvailablePassengerTours';
import { ListAvailableMonthlyTour } from '../components/admin/tours/ListAvailableMonthlyTour';
import { SingleListPassenger } from '../components/admin/passengerInTour/SingleListPassenger';
import { InventoryList } from '../components/admin/inventory/InventoryList';
import { ListProduct } from '../components/admin/inventory/ListProduct';
import { WarehouseList } from '../components/admin/inventory/WarehouseList';
import { GuideRoute } from './GuideRoute';
import { GuideHomeScreen } from '../components/guide/GuideHomeScreen';
import { WarehouseProductsList } from '../components/guide/warehouse/WarehouseProductsList';
import { WarehouseRequestProducts } from '../components/guide/warehouse/WarehouseRequestProducts';
import { WarehouseRequestHistory } from '../components/guide/warehouse/WarehouseRequestHistory';
import { WarehouseRequestProductsAdm } from '../components/admin/inventory/RequestProducts/WarehouseRequestProductsAdm';
import { WarehouseRequestHistoryAdm } from '../components/admin/inventory/RequestProducts/WarehouseRequestHistoryAdm';
import { WarehouseRequestsHistoriesAdm } from '../components/admin/inventory/RequestProducts/WarehouseRequestsHistoriesAdm';
import { ShopkeeperRoute } from './ShopkeeperRoute';
import { ShopkeeperHomeScreen } from '../components/shopkeeper/ShopkeeperHomeScreen';
import { WarehouseRequestsHistories } from '../components/shopkeeper/warehouses/WarehouseRequestsHistories';
import { WarehouseRequestHistoryShop } from '../components/shopkeeper/warehouses/WarehouseRequestHistoryShop';
import { GuideWarehouseList } from '../components/guide/GuideWarehouseList';


export const CampingRoute = () => {
    
    const cookies = new Cookies();
    const id = cookies.get('uid');
    const token = cookies.get('token');


    const dispatch = useDispatch();
    
    
    const {status} = useSelector(state=>state.auth);


    return (
        <>
            {/* <div style={{margin:'0',minHeight:'100vh',display:'grid', gridTemplateRows:'1fr '  }}> */}
            <div >
                    <Routes>
                        <Route path="administrativo" element={<AdminRoute/>}>
                            <Route path="home" element={<AdminHomeScreen/>} /> 
                            
                            <Route path="addTour" element={<AddMonthlyTour/>} />   
                            <Route path='monthly-tour-available' element={<ListAvailableMonthlyTour/>}/>
                            <Route path='monthly-tour-list' element={<MonthlyTourList/>}/>
                            <Route path='monthly-tour-edit/:tourId' element={<EditMonthlyTour/>}/>

                            <Route path='passenger-available-tour' element={<ListAvailablePassengerTours/>}/>
                            <Route path='passengerList-single-tour/:tourId' element={<SingleListPassenger/>}/>
                            
                            <Route path="add-to-catalogue" element={<AddToCatalogue/>} /> 
                            <Route path="catalogue-list" element={<CatalogueList/>} /> 
                            <Route path="edit-catalogue/:tourId" element={<EditCatalogue />}></Route>

                            <Route path="add-equipment-sell" element={<AddToEquipmentSell/>} />                             
                            <Route path="list-equipment-sell" element={<ListEquipmentSell/>} /> 
                            <Route path="edit-equipment/:equipmentId" element={<EditEquipment/>} /> 

                            <Route path="add-to-rent" element={<AddToRent/>}/>
                            <Route path="list-to-rent" element={<ListToRent/>}/>
                            <Route path="edit-equipment-rent/:equipmentId" element={<EditEquipmentRent/>} /> 

                            <Route path="list-gallery" element={<ListGallery/>}/>

                            <Route path="inventario" element={<InventoryList/>}/>
                            <Route path="productos" element={<ListProduct/>}/>
                            <Route path="bodegas" element={<WarehouseList/>}/>
                            <Route path="crear-solicitud" element={<WarehouseRequestProductsAdm/>}/>
                            <Route path="Administrar-solicitud-productos" element={<WarehouseRequestHistoryAdm/>}/>
                            <Route path="Historial-solicitudes" element={<WarehouseRequestsHistoriesAdm/>}/>
                        </Route>


                        <Route path="guide" element={<GuideRoute/>}>
                            <Route path="home" element={<GuideHomeScreen/>} />                            

                            <Route path="bodegas" element={<GuideWarehouseList/>}/>
                            <Route path="lista-productos" element={<WarehouseProductsList/>}/>
                            <Route path="solicitar-productos" element={<WarehouseRequestProducts/>}/>
                            <Route path="Historial-solicitud-productos" element={<WarehouseRequestHistory/>}/>                            
                        </Route>


                        <Route path="bodeguero" element={<ShopkeeperRoute/>}>
                            <Route path="home" element={<ShopkeeperHomeScreen/>} />
                            <Route path="Administrar-solicitud-productos" element={<WarehouseRequestHistoryShop/>}/>
                            <Route path="Historial-solicitudes" element={<WarehouseRequestsHistories/>}/>

                        </Route>


                        <Route path="/iniciar-sesion" element={<LoginScreen/>}></Route>
                        <Route path="/registrar" element={<RegisterScreen />}></Route>
                        <Route path="/" element={<IndexScreen />}></Route>

                        <Route path="/tour-mensual" element={<MonthlyTourScreen />}></Route>
                        <Route path="/tour-mensual/:tourId" element={<MonthlyTourSingleScreen />}></Route>
                        <Route path="/tour-camping" element={<CampingTourScreen/>}></Route>
                        <Route path="/tour-fullday" element={<FullDaysScreen />}></Route>
                        <Route path="/tour-disponibles" element={<AllToursScreen />}></Route>
                        <Route path="/tour-disponibles/:tourId" element={<GeneralTourScreen />}></Route>


                        <Route path="/equipo-alquiler" element={<RentEquipmentScreen />}></Route>
                        <Route path="/equipo-venta" element={<SellEquipmentScreen />}></Route>
                        
                        <Route path="/galeria" element={<GaleriaScreen />}></Route>
                        <Route path="/nosotros" element={<AboutUsScreen />}></Route>

                        <Route path="user-home" element={<UserRouteScreen/>}></Route>
                        {/* <Route path="/*" element={
                            <PrivateRoute>
                                <AdminRoute/>
                            </PrivateRoute>
                        }/> */}
                        {/* <Route path="/home" element={<HomeScreen/>}></Route> */}
                    </Routes>
                {/* <FooterScreen/> */}
            </div>
        </>
    )
}
