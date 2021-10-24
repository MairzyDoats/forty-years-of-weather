import React, { useState, useEffect, useRef } from 'react';
import "../css/chart.css";

export default function Chart() {
  const hasFetchedData = useRef(false)
  const [weatherDates, setWeatherDates] = useState([])

  const API_ENDPOINT = String(process.env.REACT_APP_BACKEND_API_ENDPOINT)

  console.log(API_ENDPOINT);

  useEffect(() => {
    if (!hasFetchedData.current) {
      fetch(API_ENDPOINT)
        .then(response => response.json())
        .then(data => setWeatherDates(data))
      hasFetchedData.current = true;
    }

  }, [weatherDates])

  function convertDate(date) {
    var newDate = new Date(parseInt(date))
    console.log(newDate)
    return newDate.toUTCString()
  }

  return (
    <ul>
      {weatherDates.map(date => (
        <li key={date._id.$oid}>{convertDate(date.dt.$date.$numberLong)}: {date.main.temp.$numberDouble}</li>
      ))
      }
    </ul>
  )
};
