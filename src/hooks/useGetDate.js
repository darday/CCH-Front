import React from 'react'

export const useGetDate = () => {
    var date = new Date();
    var month = date.getMonth();
    var months= ['ENERO','FEBRERO','MARZO','ABRIL','MAYO','JUNIO','JULIO','AGOSTO','SEPTIEMBRE','OCTUBRE','NOVIEMBRE','DICIEMBRE'];
    var printMonth = months[month];
    console.log(printMonth);

    return {
        printMonth,
        date
    }
}
