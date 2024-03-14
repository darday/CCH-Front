import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ApiUrl } from '../../../../services/ApiRest';

export const UsersGuideSelect = ({ userGuide, setUserGuide }) => {

  const [data, setdata] = useState([]);
  const [isMounted, setIsMounted] = useState(true);

  const dataList = async () => {
    try {
      const resp = await axios.get(ApiUrl + 'user-guide-select');
      if (isMounted) {
        // Asegurarse de que resp.data sea un array antes de actualizar el estado
        if (Array.isArray(resp.data)) {
          setdata(resp.data);
        } else {
          console.error('La respuesta no es un array:', resp.data);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setUserGuide({
      ...userGuide,
      [name]: value
    })
  }

  useEffect(() => {
    dataList();
    // Cleanup function
    return () => {
      setIsMounted(false);
    };
  }, [])
  return (
    <select className="form-select " onChange={onInputChange} required aria-label=".form-select-sm example">
      <option >Seleccione Categoría</option>
      {data.map((data) => (
        <option key={data.id} value={data.id}>{data.name} {data.last_name}</option>
      ))
      }
    </select>)
}
