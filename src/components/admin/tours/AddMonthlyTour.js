import React from 'react'

export const AddMonthlyTour = () => {
    return (
        <div>
            <div className='row'>
                <div className='col-12 '>
                    <div className="card">
                        <div className="card-header">
                            AGREGAR TOUR MENSUAL
                        </div>
                        <div className="card-body">
                            <form>
                                <div className='row'>
                                    <div className='col-12 col-sm-6'>
                                        <div className="form-group">
                                            <label >Nombre del Tour</label>
                                            <input type="text" className="form-control" placeholder='Ej: Camping Sobre las Nubes' ></input>
                                        </div>
                                    </div>
                                    <div className='col-12 col-sm-6'>
                                        <div className="form-group">
                                            <label >Destino</label>
                                            <input type="text" className="form-control text-uppercase" placeholder='Ej: Puñay'></input>
                                        </div>
                                    </div>
                                </div>


                                <div className='row'>

                                    <div className='col-12 col-sm-12'>
                                        <div className="form-group">
                                            <label >Descripción</label>
                                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="2"></textarea>
                                        </div>
                                    </div>

                                    <div className='col-12 col-sm-12'>
                                        <div className="form-group">
                                            <label >Incluye</label>
                                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="2"></textarea>
                                        </div>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-12 col-sm-6 col-md-3'>
                                        <div className="form-group">
                                            <label >Estado</label>
                                            <select class="form-select" aria-label="Default select example">
                                                <option selected>Seleccione una opcion</option>
                                                <option value="1">Activo</option>
                                                <option value="0">Inactivo</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className='col-12 col-sm-6 col-md-3'>
                                        <div className="form-group">
                                            <label >Tipo</label>
                                            <select class="form-select" aria-label="Default select example">
                                                <option selected>Seleccione una opcion</option>
                                                <option value="Full Day">Full Day</option>
                                                <option value="Camping">Camping</option>
                                                <option value="Intento de Cumbre">Intento de Cumbre</option>
                                                <option value="Cumbre">Cumbre</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className='col-12 col-sm-6 col-md-3'>
                                        <div className="form-group">
                                            <label >Costo por Persona</label>
                                            <input type="text" className="form-control" placeholder='Ej: 39.49'></input>
                                        </div>
                                    </div>
                                    <div className='col-12 col-sm-6 col-md-3'>
                                        <div className="form-group">
                                            <label >Costo Grupo +4 personas</label>
                                            <input type="text" className="form-control" placeholder='Ej: 39.49'></input>
                                        </div>

                                    </div>
                                </div>


                                <div className='row'>
                                    <div className='col-12 col-sm-3'>
                                        <div className="form-group">
                                            <label >Dificultad</label>
                                            <select class="form-select" aria-label="Default select example">
                                                <option selected>Seleccione una opcion</option>
                                                <option value="activo">Facil</option>
                                                <option value="inactivo">Moderada - Facil</option>
                                                <option value="inactivo">Moderada</option>
                                                <option value="inactivo">Moderada - Alta</option>
                                                <option value="inactivo">Alta</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className='col-12 col-sm-3'>
                                        <div className="form-group">
                                            <label >Porcentaje Descuento</label>
                                            <input type="text" className="form-control" placeholder='Ej: 39.49'></input>
                                        </div>
                                    </div>
                                    <div className='col-12 col-sm-3'>
                                        <div className="form-group">
                                            <label >Fecha de Salida:</label>
                                            <input type="date" className="form-control" id="exampleInputEmail1"  ></input>
                                        </div>
                                    </div>
                                    <div className='col-12 col-sm-3'>
                                        <div className="form-group">
                                            <label >Fecha de Regreso:</label>
                                            <input type="date" className="form-control" id="exampleInputEmail1"  ></input>
                                        </div>
                                    </div>
                                    <div className='col-12 col-sm-6'>
                                        <div className="form-group">
                                            <label >Imagen Promocional</label>
                                            <input class="form-control form-control-sm" id="formFileSm" type="file" accept="image/png, image/gif, image/jpeg"></input>
                                        </div>
                                    </div>
                                    <div className='col-12 col-sm-6'>
                                        <div className="form-group">
                                            <label >Imagen de ruta</label>
                                            <input class="form-control form-control-sm" id="formFileSm" type="file" accept="image/png, image/gif, image/jpeg"></input>
                                        </div>


                                    </div>
                                </div>

                                <div className='row'>
                                    <small>Estos campos llenar al final de la ruta. Cuando se haya realizado el reporte de ruta</small>
                                    <div className='col-12 col-sm-4'>
                                        <div className="form-group">
                                            <label >Ingreso</label>
                                            <input type="text" className="form-control" placeholder='Ej: 39.49'></input>
                                        </div>
                                    </div>
                                    <div className='col-12 col-sm-3'>
                                        <div className="form-group">
                                            <label >Egreso</label>
                                            <input type="date" className="form-control" id="exampleInputEmail1"  ></input>
                                        </div>
                                    </div>
                                    <div className='col-12 col-sm-3'>
                                        <div className="form-group">
                                            <label >Fecha de Regreso:</label>
                                            <input type="date" className="form-control" id="exampleInputEmail1"  ></input>
                                        </div>
                                    </div>
                                    <div className='col-12 col-sm-6'>
                                        <div className="form-group">
                                            <label >Imagen Promocional</label>
                                            <input class="form-control form-control-sm" id="formFileSm" type="file" accept="image/png, image/gif, image/jpeg"></input>
                                        </div>
                                    </div>
                                    <div className='col-12 col-sm-6'>
                                        <div className="form-group">
                                            <label >Imagen de ruta</label>
                                            <input class="form-control form-control-sm" id="formFileSm" type="file" accept="image/png, image/gif, image/jpeg"></input>
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
