import React from 'react'
import { NavBarScreen } from '../navBar/NavBarScreen';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { ApiUrl } from '../../services/ApiRest';

export const ShopkeeperHomeScreen = () => {
    const toastId = React.useRef(null);

  function handleUpload(){
    axios.request({
      method: "get", 
      url: ApiUrl+"catalogue-list", 
      onUploadProgress: p => {
        const progress = p.loaded / p.total;

        // check if we already displayed a toast
        if (toastId.current === null) {
          toastId.current = toast('Upload in Progress', { progress });
        } else {
          toast.update(toastId.current, { progress });
        }
      }
    }).then(data => {
      // Upload is done! 
      // The remaining progress bar will be filled up
      // The toast will be closed when the transition end
      toast.done(toastId.current);
    })
  }

  return (
    <div>
      <button onClick={handleUpload}>Upload something Shopkeeper</button>
      <ToastContainer theme="colored" />

    </div>
  )
}
