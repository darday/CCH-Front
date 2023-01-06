import React from 'react'

export const useGetDate = () => {
    var date = new Date();
    var month = date.getMonth();
    var months= ['ENERO','FEBRERO','MARZO','ABRIL','MAYO','JUNIO','JULIO','AGOSTO','SEPTIEMBRE','OCTUBRE','NOVIEMBRE','DICIEMBRE'];
    var printMonth = months[month];
    var printNextMonth = months[month+1];
    // console.log(printMonth);

    return {
        printMonth,
        printNextMonth,
        date
    }
}

