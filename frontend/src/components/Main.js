import React, { useState, useEffect, useRef } from 'react';
import Chart from './Chart';
import Comment from './Comment';

export default function Main() {

  const hasFetchedData = useRef(false)
  const [weatherDates, setWeatherDates] = useState([])

  useEffect(() => {
    if (!hasFetchedData.current) {
      fetch(process.env.REACT_APP_BACKEND_API_ENDPOINT)
        .then(response => response.json())
        .then(data => setWeatherDates(data))
      hasFetchedData.current = true;
    }
  }, [])

  return (
    <main className="main">
      <Chart 
      data={weatherDates}
      />
      <Comment />
    </main>
  )
}
