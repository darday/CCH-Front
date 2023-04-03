import axios from 'axios';
import React, { useEffect, useState } from 'react'

import { ToastContainer, toast } from 'react-toastify'
import { ApiStorage, ApiUrl } from '../../../services/ApiRest';

export const ListGallery = () => {

  const [sending, setsending] = useState(false);
  const [selectedImg, setSelectedImg] = useState([]);
  const [img, setimg] = useState();
  const [fData, setFormData] = useState({  //Es un hook = useState
    name: ''
  });
  const [data, setdata] = useState([]);

  const getData = async () => {
    await axios.get(ApiUrl + 'gallery-list')
      .then(result => {
        result = result.data;
        setdata(result);

      })
      .catch(e => {
        console.log(e);
      })
  }

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormData({
      ...fData,
      [name]: value
    })
  }

  const updateImg = (e) => {
    setimg(e);
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    setsending(true);
    notify();


    const form = new FormData();
    form.append("name", fData.name);
    form.append("img_1", img[0]);

    console.log(Object.fromEntries(form));

    await axios.post(ApiUrl + 'gallery-add', form)
      .then(resp => {
        setsending(false)
        const data = resp.data;
        console.log(data);
        if (data.success == true) {
          success(data.messagge);
          getData();

        } else {
          error(data.messagge);
          setsending(false)
        }
      })
      .catch(err => {
        error('Error de Servidor, Contactese con soporte');
        console.log(err);
        setsending(false)

      })




  }

  const deleteImage = async () => {
    await axios.post(ApiUrl + 'gallery-delete/' + selectedImg.gallery_id)
      .then(resp => {
        toast.success("Equipo eliminado exitosamente", { position: toast.POSITION.BOTTOM_RIGHT });
        getData()
      })
      .catch(e => {
        console.log(e);
      })
  }

  const selectImage = (data) => {
    setSelectedImg(data);
    console.log(data);
  }

  const toastId = React.useRef(null);
  const notify = () => toastId.current = toast("Enviando Datos...", { autoClose: false, type: toast.TYPE.INFO, position: toast.POSITION.BOTTOM_RIGHT });
  const success = (messagge) => toast.update(toastId.current, { render: messagge, type: toast.TYPE.SUCCESS, position: toast.POSITION.BOTTOM_RIGHT, autoClose: 5000 });
  const error = (messagge) => toast.update(toastId.current, { render: messagge, type: toast.TYPE.ERROR, position: toast.POSITION.BOTTOM_RIGHT, autoClose: 5000 });

  useEffect(() => {
    getData();
  }, [])

  return (
    <div>
      <div className='' style={{ textAlign: 'left', paddingBottom: '1vh' }}>
        <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#AddModal" >Agregar Imagen</button>
      </div>
      <div className='row'>
        <div className='col-12 '>
          <div className="card">
            <div className="card-header">
              LISTA DE IMAGENES DE GALERIA
            </div>
            <div className="card-body">
              <div className="row row-cols-2 row-cols-sm-3 row-cols-md-6 g-6">

                {data.map((item, index) =>
                  <div className="col" key={index} >
                    <div className="card h-100" style={{ border: '0' }}>
                      <button type="button" className="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => selectImage(item)} >
                        <img src={`${ApiStorage + item.img_1}`} style={{ width: '100%' }} className="card-img-top" alt="..."></img>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="AddModal" aria-labelledby="AddModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <form onSubmit={onSubmit}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="AddModalLabel">Agregar Foto</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className='row'>
                  <div className='col-12 col-sm-12'>
                    <div className="form-group">
                      <label >Descripción <small> (No es obligatorio)</small></label>
                      <input type="text" name='name' className="form-control" placeholder='Ej: Carpa' value={fData.name} onChange={onInputChange} ></input>
                    </div>
                  </div>
                  <div className='col-12 col-sm-12'>
                    <div className="form-group">
                      <label >Imagen</label>
                      <input name="img_1" className="form-control form-control-sm" id="formFileSm" type="file" accept="image/png, image/gif, image/jpeg" onChange={(e) => updateImg(e.target.files)} required></input>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal"  >Guardar</button>
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"  >Cancelar</button>
              </div>
            </div>
          </form>
        </div>
      </div>



      <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Eliminar Imagen</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              Está seguro que desea eliminar <b>{selectedImg.name} ?</b>
              <div className='text-center'>
                {
                  (selectedImg.img_1)? 
                    <img src={`${ApiStorage + selectedImg.img_1}`} style={{ width: '70%' }} className="card-img-top" alt="..."></img>  
                  :
                    <img></img>
                }
                
              </div>

            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={() => deleteImage()} data-bs-dismiss="modal"  >Eliminar</button>
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"  >Cancelar</button>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer theme="colored" />

    </div>
  )
}
