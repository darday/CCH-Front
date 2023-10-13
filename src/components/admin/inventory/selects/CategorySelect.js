import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ApiUrl } from '../../../../services/ApiRest';

export const CategorySelect = ({ category, setcategory }) => {

    const [data, setdata] = useState([]);

    const dataList = async () => {
        await axios.get(ApiUrl + 'category-list')
            .then(resp => {
                resp = resp.data;
                // console.log(resp.data);
                setdata(resp);

            })
            .catch(e => {
                console.log(e);
            })
    }

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setcategory({
            ...category,
            [name]: value
        })
    }

    useEffect(() => {
        dataList();
    }, [])
    return (
        <select className="form-select " onChange={onInputChange} required aria-label=".form-select-sm example">
            <option >Seleccione Categoría</option>
            {data.map((data) => (
                <option key={data.categories_id} value={data.categories_id}>{data.Description}</option>
            ))
            }
        </select>)
}
