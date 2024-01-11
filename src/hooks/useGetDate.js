import React from 'react'

// this hook convert the number correspond at a date to words for example if the current month us 06 this correspond to June
export const useGetDate = () => {
    var date = new Date();
    var month = date.getMonth();
    var months= ['ENERO','FEBRERO','MARZO','ABRIL','MAYO','JUNIO','JULIO','AGOSTO','SEPTIEMBRE','OCTUBRE','NOVIEMBRE','DICIEMBRE','ENERO'];
    var printMonth = months[month];
    var printNextMonth = months[month+1];
    var year = date.getFullYear();
    var day = date.getDate();


    return {
        printMonth,
        printNextMonth,
        date,
        year,
        month,
        day
    }
}

