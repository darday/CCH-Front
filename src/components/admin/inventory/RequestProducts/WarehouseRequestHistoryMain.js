import React, { useState } from 'react';
import { WarehouseRequestHistoryAdm } from './WarehouseRequestHistoryAdm';
import { WarehouseRequestHistoryShop } from '../../../shopkeeper/warehouses/WarehouseRequestHistoryShop';

const WarehouseRequestHistoryMain = () => {
    const [disabledButtons, setDisabledButtons] = useState({
        ready: false,
        withdraw: false,
        reject: false,
    });

    const handleButtonClick = (action) => {
        // Actualizar el estado cuando un botón se hace clic
        setDisabledButtons((prevButtons) => ({
            ...prevButtons,
            [action]: true,
        }));
    };

    return (
        <div>
            <WarehouseRequestHistoryAdm
                disabledButtons={disabledButtons}
                onButtonClick={(action) => handleButtonClick(action)}
            />
            <WarehouseRequestHistoryShop
                disabledButtons={disabledButtons}
                onButtonClick={(action) => handleButtonClick(action)}
            />
        </div>
    );
};

export default WarehouseRequestHistoryMain;