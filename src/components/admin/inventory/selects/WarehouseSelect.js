import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ApiUrl } from '../../../../services/ApiRest';

export const WarehouseSelect = ( {warehouse,setwarehouse}) => {

    const [data, setdata] = useState([]);

    const dataList = async () => {
        await axios.get(ApiUrl + 'warehouse-list')
            .then(resp => {
                resp = resp.data;
                console.log(resp);
                setdata(resp);
                //cargamos los datos nuevos
              
            })
            .catch(e => {
                console.log(e);
            })
    }

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setwarehouse({
            ...warehouse,
            [name]: value
        })
    }

    useEffect(() => {
        dataList();
    }, [])
    return (
        <select className="form-select" onChange={onInputChange} required  aria-label=".form-select-sm example">
            <option value="">Seleccione Bodega  </option>
            {data.map((data) => (
                <option key={data.warehouse_id} value={data.warehouse_id}>{data.description}</option>

            ))
            }

        </select>
    )
}
