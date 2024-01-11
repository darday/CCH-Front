import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { ApiUrl } from '../../../services/ApiRest';

export const RequestProductsSelect = ({ requestProductSelect, setrequestProductSelect, resetValue, onDataListUpdate, reload  }) => {
    const [data, setdata] = useState([]);


    const dataList = async () => {
        try {
            const response = await axios.get(ApiUrl + 'request-products');
            const responseData = response.data;
            addNewData(responseData);
            console.log("hola");
        } catch (error) {
            console.log(error);
        }
    };

    const addNewData = (oldData) => {
        const newFormatData = oldData.map(item => ({
            label: item.product + ' (' + item.quantity + ')' + '-' + item.description_products + '',
            value: {
                product_warehouses_id: item.product_warehouses_id,
                category_id: item.category_id,
            },
        }));
        setdata(newFormatData);
    };

    useEffect(() => {
        dataList();
    }, []);

    useEffect(() => {
        dataList();          
    }, [reload])
    
    useEffect(() => {
        // Aquí detectamos cambios en resetValue y reseteamos el valor del Select
        if (resetValue) {
            setrequestProductSelect(null);
        }
    }, [resetValue]);

    const handleSelectChange = (selectedOption) => {
        setrequestProductSelect(selectedOption);

        // Llama a onDataListUpdate para actualizar los datos en WarehouseRequestProducts.js
        onDataListUpdate();
    };

    return (
        <Select
        value={requestProductSelect}
        onChange={handleSelectChange} 
        options={data}
        placeholder="Selecciona un producto"
        />
    );
};