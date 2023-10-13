import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ApiUrl } from '../../../../services/ApiRest';

export const SupplierSelect = ( {supplier,setsupplier}) => {

    const [data, setdata] = useState([]);

    const dataList = async () => {
        await axios.get(ApiUrl + 'supplier-list')
            .then(resp => {
                resp = resp.data;
                setdata(resp);
             
            })
            .catch(e => {
                console.log(e);
            })
    }

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setsupplier({
            ...supplier,
            [name]: value
        })
    }

    useEffect(() => {
        dataList();
    }, [])
    return (
        <select className="form-select " onChange={onInputChange} required aria-label=".form-select-sm example">
            <option>Seleccione Proveedor</option>
            {data.map((data) => (
                <option key={data.suppliers_id} value={data.suppliers_id}>{data.name_store}</option>

            ))
            }

        </select>
    )
}
