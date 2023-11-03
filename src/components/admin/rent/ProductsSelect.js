import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Select from 'react-select';
import { ApiUrl } from '../../../services/ApiRest';


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
        await axios.get(ApiUrl + 'productsInWarehouse/1')
            .then(resp => {
                resp = resp.data;
                // console.log("respSelected1")
                // console.log(resp)
                addNewData(resp)
                // console.log("respSelected2")
            })
            .catch(e => {
                console.log(e);
            })
    }

    const addNewData = (oldData) => {
        const newFormatData = oldData.map(item => ({
            label: item.product+' -- '+item.status+' -- '+item.name_store,
            value: item.inventories_id
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
