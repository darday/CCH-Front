import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ApiUrl } from '../../../../services/ApiRest';

export const SupplierSelect = ( {supplier =0,setsupplier=0,reload, setreload}) => {

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

    if(reload === true){
        setreload(false)
        dataList();
        console.log("RecargaSupplier")
        
    }

    useEffect(() => {
        dataList();
    }, [])
    return (
        <select className="form-select " onChange={onInputChange} required aria-label=".form-select-sm example">
            {/* <option>Seleccione Proveedor</option> */}
            <option value={supplier.supplier_id} >{supplier.supplier}</option>

            {data.map((data) => (
                <option key={data.suppliers_id} value={data.suppliers_id}>{data.name_store}</option>

            ))
            }
        </select>
    )
}
