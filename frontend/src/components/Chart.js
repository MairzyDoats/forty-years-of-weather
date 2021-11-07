import React, { useEffect, useRef } from 'react';
import * as d3 from "d3";
import "../css/chart.css";

export default function Chart({ data }) {
  const d3LineChart = useRef();
  console.log(data)


  useEffect(() => {
    var temperaturesByDate = []
    var temperatures = []
    var parseTime = d3.timeParse("%d-%b-%y");
    data.forEach((item) => {
      if (item) {
        var date = parseInt(item.dt.$numberInt) * 1000 || parseInt(item.dt.$numberDouble) * 1000 || parseInt(item.dt.$date.$numberLong)
        var temp = parseFloat(item.main.temp.$numberDouble)
        if (!item.main.temp.$numberDouble)
          temp = parseFloat(item.main.temp.$numberInt)
        temperatures.push(temp)
        temperaturesByDate.push({ date: date, temperature: temp })
      }
    })

    console.log(temperaturesByDate);

    const margin = { top: 20, right: 30, bottom: 30, left: 30 };
    const width = parseInt(d3.select("#d3demo").style("width"));
    const height = parseInt(d3.select("#d3demo").style("height"));

    // create svg element:
    const svg = d3.select(d3LineChart.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom + 40)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

    const x = d3.scaleTime()
      .domain(d3.extent(temperaturesByDate, function (d) { return d.date }))
      .range([0, width]);

    svg.append('g')
      .attr('class', 'chart__axes')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x)
        .tickFormat(d3.timeFormat("%Y")));

    // Default max and min temperatures with the option to 
    const minTemp = Math.min(0, Math.floor(d3.min(temperatures)));
    const maxTemp = Math.max(35, Math.ceil(d3.max(temperatures)));

    // y axis scale 
    const y = d3.scaleLinear()
      .domain([minTemp, maxTemp])
      .range([height, 0]);

    svg.append('g')
      .attr('class', 'chart__axes')
      .call(d3.axisLeft(y));

    // x axis label
    svg.append("text")
      .attr("class", "chart__label")
      .attr("text-anchor", "end")
      .attr("x", width)
      .attr("y", height - 6)
      .text("Years");

    // y axis label
    svg.append("text")
      .attr("class", "chart__label")
      .attr("x", - 15)
      .attr("y", - 5)
      .text("°C");

    svg.append('path')
      .datum(temperaturesByDate)
      .attr('class', 'chart__line')
      .attr('d', d3.line()
        .x(function (d) { return x(d.date) })
        .y(function (d) { return y(d.temperature) }));

    var node = svg.selectAll('.chart__node')
      .data(temperaturesByDate)
      .enter().append('g')
      .attr('class', 'chart__node')
      .call(d3.forceSimulation)

    node.append('circle')
      .attr('r', 3.5)
      .attr('cx', d => x(d.date))
      .attr('cy', d => y(d.temperature))

    node.append("text")
      .attr('class', 'chart__node__text')
      .attr('x', d => x(d.date))
      .attr('y', d => y(d.temperature))
      .text(d => (d.temperature + "°C"))
  }, [data]);


  return (
    <div id="d3demo">
      <svg
        ref={d3LineChart}
      ></svg>
    </div>
  )
};
