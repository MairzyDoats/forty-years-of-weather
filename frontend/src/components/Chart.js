import React, { useEffect, useRef } from 'react';
import * as d3 from "d3";
import "../css/chart.css";

export default function Chart({ data }) {
  const d3LineChart = useRef()
  console.log(data);

  useEffect(() => {
    const temperaturesByDate = []
    data.forEach((item) => {
      if (item === null) {
        return
      }
      var dt = new Date(parseInt(item.dt.$date.$numberLong))
      var temp = parseFloat(item.main.temp.$numberDouble)
      if (!item.main.temp.$numberDouble)
        temp = parseFloat(item.main.temp.$numberInt)
      
      temperaturesByDate.push({date: dt, temperature: temp})
    })
    console.log(temperaturesByDate);

    const margin = {top: 20, right: 30, bottom: 30, left: 30}
    const width = parseInt(d3.select('#d3demo').style('width'))
    const height = parseInt(d3.select('#d3demo').style('height'))

    // create svg element:
    const svg = d3.select(d3LineChart.current)
    .attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom)
    .append('g')
      .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

    const x = d3.scaleTime()
    .domain(d3.extent(temperaturesByDate, function(d){return d.date}))
    .range([0,width])

    svg.append('g')
    .attr('class', 'chart__axes')
    .attr('transform', 'translate(0,' + height + ')')
    .call(d3.axisBottom(x))

    // Get the max value of counts
    const max = d3.max(temperaturesByDate, function(d){return d.temperature})

    // y axis scale 
    const y = d3.scaleLinear()
          .domain([0, max])
          .range([height,0])
  
    svg.append('g')
      .attr('class', 'chart__axes')
      .call(d3.axisLeft(y))
  
    // Add the path using this helper function
    svg.append('path')
      .datum(temperaturesByDate)
      .attr('class', 'chart__stroke')
      .attr('d', d3.line()
                          .x(function(d) { return x(d.date) })
                          .y(function(d) { return y(d.temperature) }));
  }, [data])


  return (
    <div id="d3demo">
      <svg 
        ref={d3LineChart}
        ></svg>
    </div>
  )
};
