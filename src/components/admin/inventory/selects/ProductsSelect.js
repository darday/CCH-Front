import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ApiUrl } from '../../../../services/ApiRest';
import Select from 'react-select';


export const ProductsSelect = ({productSelect,setproductSelect}) => {
    // const data = [
    //     { value: 'chocolate', label: 'Chocolate' },
    //     { value: 'strawberry', label: 'Strawberry' },
    //     { value: 'vanilla', label: 'Vanilla' },
    //     { value: 'Valy', label: 'Valy' },
    // ];

    const [data, setdata] = useState([]);
    const [newData, setnewData] = useState([]);


    // const [selectedOption, setSelectedOption] = useState(null);

    const dataList = async () => {
        await axios.get(ApiUrl + 'product-list')
            .then(resp => {
                resp = resp.data;
                addNewData(resp)
            })
            .catch(e => {
                console.log(e);
            })
    }

    const addNewData = (oldData) => {
        const newFormatData = oldData.map(item => ({
            label: item.description,
            value: item.product_id
        }));

        setdata(newFormatData)
    }


    useEffect(() => {
        dataList();
    }, [])

    
    return (
        <Select 
            defaultValue={productSelect}
            onChange={setproductSelect}
            options={data}
            placeholder="Selecciona un producto"

        />

    )
}
