import React from 'react'

export const AddTour = () => {
    return (
        <div>
            <div className='row'>
                <div className='col-12 '>
                    <div className="card">
                        <div className="card-header">
                            AGREGAR TOURS
                        </div>
                        <div className="card-body">
                            <form>
                                <div className='row'>
                                    <div className='col-12 col-sm-6'>
                                        <div className="form-group">
                                            <label >Nombre del Tour</label>
                                            <input type="text" className="form-control" id="exampleInputEmail1" placeholder='Ej: Camping Sobre las Nubes' ></input>
                                        </div>
                                    </div>
                                    <div className='col-12 col-sm-6'>
                                        <div className="form-group">
                                            <label >Destino</label>
                                            <input type="text" className="form-control text-uppercase" id="exampleInputEmail1" placeholder='Ej: Puñay'></input>
                                        </div>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-12 col-sm-6'>
                                        <div className="form-group">
                                            <label >Fecha de Salida:</label>
                                            <input type="date" className="form-control" id="exampleInputEmail1"  ></input>
                                        </div>
                                    </div>
                                    <div className='col-12 col-sm-6'>
                                        <div className="form-group">
                                            <label >Costo</label>
                                            <input type="text" className="form-control" id="exampleInputEmail1" placeholder='Ej: Uno de los lugares más hermosos te espera acompañanos a...'></input>
                                        </div>
                                    </div>
                                </div>

                                <div className='row'>
                                    
                                    <div className='col-12 col-sm-12'>
                                        <div className="form-group">
                                            <label >Descripción</label>
                                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                                        </div>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-12 col-sm-6'>
                                        <div className="form-group">
                                            <label >Dificultad:</label>
                                            <input type="date" className="form-control" id="exampleInputEmail1"  ></input>
                                        </div>
                                    </div>
                                    <div className='col-12 col-sm-6'>
                                        <div className="form-group">
                                            <label >Costo</label>
                                            <input type="text" className="form-control" id="exampleInputEmail1" placeholder='Ej: Uno de los lugares más hermosos te espera acompañanos a...'></input>
                                        </div>
                                    </div>
                                </div>
                               
                                
                               
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
