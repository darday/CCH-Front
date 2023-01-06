import React from 'react'
import { useGetDate } from './useGetDate';

export const useSetMonthlyTour = (tours = {}) => {
  var monthlyTour = [];
  var nextMonthlyTour = [];
  const { printMonth, date } = useGetDate();

  const currentMonth = ((date.getMonth()) + 1);
  const currentYear = date.getFullYear();

  tours.forEach(element => {
    const depeartureDate = element.departure_date;
    const arrayDepeartureDate = depeartureDate.split('-');

    if (arrayDepeartureDate[0] == currentYear && (arrayDepeartureDate[1] == currentMonth)) {
      monthlyTour.push(element);
    } else {
      if (arrayDepeartureDate[0] == currentYear && arrayDepeartureDate[1] == (currentMonth + 1)) {
        nextMonthlyTour.push(element);
      }
    }
  });

  return (
    {
      monthlyTour,
      nextMonthlyTour
    }
  )
}
