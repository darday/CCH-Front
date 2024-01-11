import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ApiUrl } from '../../../../services/ApiRest';

export const StatusSelect = ({ status, setstatus }) => {
    const [data, setdata] = useState([]);

    const dataList = async () => {
        await axios.get(ApiUrl + 'status-list')
            .then(resp => {
                resp = resp.data;
                setdata(resp);

            })
            .catch(e => {
                console.log(e);
            })
    }

    const message = `El estado actual es: ${status}`;
    console.log(message);
    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setstatus({
            ...status,
            [name]: value
        })
    }

    useEffect(() => {
        dataList();
    }, [])
    return (
        <select className="form-select " onChange={onInputChange} required aria-label=".form-select-sm example">
            <option value="">Seleccione Estado</option>
            {data.map((data) => (
                <option key={data.status_id} value={data.status_id}>{data.description}</option>
            ))
            }

        </select>
    )
}
