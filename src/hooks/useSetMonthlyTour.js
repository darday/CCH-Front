import React from 'react'
import { useGetDate } from './useGetDate';

export const useSetMonthlyTour = (tours = {}) => {
  var monthlyTour = [];
  var nextMonthlyTour = [];
  var availableTour=[];
  const { printMonth, date } = useGetDate();

  const currentMonth = ((date.getMonth()) + 1);
  const currentYear = date.getFullYear();
  const currentDay =date.getDate();


  tours.forEach(element => {
    const depeartureDate = element.departure_date;
    const arrayDepeartureDate = depeartureDate.split('-');
    console.log(arrayDepeartureDate);
    if (arrayDepeartureDate[0] == currentYear && (arrayDepeartureDate[1] == currentMonth)) {
      monthlyTour.push(element);
      if(arrayDepeartureDate[2] > currentDay){
        availableTour.push(element);
      }
    } else {
      if (arrayDepeartureDate[0] == currentYear && arrayDepeartureDate[1] == (currentMonth + 1)) {
        nextMonthlyTour.push(element);
        availableTour.push(element);

      }
    }
  });

  return (
    {
      monthlyTour,
      nextMonthlyTour,
      availableTour
    }
  )
}
