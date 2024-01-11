import React from 'react'

// this hook convert the number correspond at a date to words for example if the current month us 06 this correspond to June
export const useGetDateToDayMonth = (date) => {
    var months= ['ENERO','FEBRERO','MARZO','ABRIL','MAYO','JUNIO','JULIO','AGOSTO','SEPTIEMBRE','OCTUBRE','NOVIEMBRE','DICIEMBRE'];
    const arrayDate = date.split('-');
    var month =  parseInt(arrayDate[1]-1);
    var letterMonth = months[month];
    var day = arrayDate[2];
    

    return {
        letterMonth,
        day
       
    }
}

