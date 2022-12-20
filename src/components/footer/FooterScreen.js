import React from 'react'
import './footer.css'

export const FooterScreen = () => {
    return (
        <footer>
            <div className='container'>
                <div className='row'>
                    <div className='col-12 col-md-4'>
                        <h5>Contactos:</h5>
                        <label><i className="fas fa-phone"></i>+593 961119670 - Darío</label><br></br>
                        <label><i className="fas fa-phone"></i>+593 997159098 - Jhon</label><br></br>
                        <label><i className="fas fa-phone"></i>+593 993786135 - Luis</label><br></br>
                    </div>
                    <div className='col-12 col-md-4'>
                        <h5>Correo:</h5>
                        <label><i className="fas fa-envelope"></i> campingchimborazo@gmail.com</label>
                        <h5>Dirección:</h5>
                        <label><i className="fas fa-map-marker-alt"></i> Esteban Marañon y Lope Antonio de Munive Riobamba - Ecuador</label>

                    </div>
                    <div className='col-12 col-md-4'>
                        <h5>Servicios:</h5>
                        <label>-Guianza</label><br></br>
                        <label>-Alquiler de Equipo de montaña</label><br></br>
                        <label>-Venta de Equipo de montaña</label><br></br>
                        <label>-Tours Privados</label><br></br>
                        <label>-Tours Personalizados</label><br></br>
                        

                    </div>
                </div>

            </div>
            
        </footer>
    )
}
