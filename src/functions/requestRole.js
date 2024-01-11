import axios from 'axios';
import React from 'react'
import { ApiUrl } from '../services/ApiRest';

export const requestRole = async (idUser) => {
    console.log("idUser"+idUser)
    var result='';
    await axios.get(ApiUrl + 'user_info/' + idUser)
    .then(resp => {
        console.log("esperame");
        console.log(resp.data.rol);
        result = resp.data.rol;
        
    })
    .catch(e => {
        console.log(e);
        result=e;
    }) 
  return ( result )
}
