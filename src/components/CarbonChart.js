import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const CarbonChart = ({ startYear, endYear, size}) => {
  const svgRef = useRef();
  const [carbonData, setCarbonData] = useState([]);

  
  let width = 600;
  let height = 500;
  let font1 = "16px";
  let font2 = "12px";
  if (size=='small') {
    width = 400;
    height=200;
  } else if(size=='medium') {
    width = 500;
    height = 250;
    font1 = "16px";
    font2 = "12px";    
  }
  useEffect(() => {
    const fetchData = async () => {
      const csvData = await d3.csv("data/metricsbyyear.csv", (d) => ({
        year: parseInt(d["Year"]),
        carbon: parseFloat(d["CO2EmmPerCap"]),
      }));

      const dataList = csvData.filter(
        (d) => d.year >= startYear && d.year <= endYear
      );

      setCarbonData(dataList);
    };

    fetchData();
  }, [startYear, endYear]);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const margin = { top: 30, right: 30, bottom: 50, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = d3
      .scaleLinear()
      .domain(d3.extent(carbonData, (d) => d.year))
      .range([0, innerWidth]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(carbonData, (d) => d.carbon)])
      .nice()
      .range([innerHeight, 0]);

    const line = d3
      .line()
      .x((d) => xScale(d.year))
      .y((d) => yScale(d.carbon))
      .curve(d3.curveMonotoneX);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

      g.append("g")
      .call(d3.axisBottom(xScale).ticks(6).tickFormat(d3.format("d")))
      .attr("transform", `translate(0,${innerHeight})`);
    

    g.append("g").call(d3.axisLeft(yScale));

    g.append("path")
      .datum(carbonData)
      .attr("fill", "none")
      .attr("stroke", "grey")
      .attr("stroke-width", 2)
      .attr("d", line);

    // Tooltip
    const tooltip = d3
      .select("body")
      .append("div")
      .style("position", "absolute")
      .style("background", "rgba(255, 255, 255, 0.9)")
      .style("border", "1px solid #ccc")
      .style("padding", "8px")
      .style("border-radius", "4px")
      .style("font-size", "12px")
      .style("pointer-events", "none")
      .style("opacity", 0);

    // Add circles and tooltip functionality
    g.selectAll(".dot")
      .data(carbonData)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", (d) => xScale(d.year))
      .attr("cy", (d) => yScale(d.carbon))
      .attr("r", 3)
      .attr("fill", "grey")
      .on("mouseover", (event, d) => {
        tooltip
          .style("opacity", 1)
          .html(`Year: ${d.year}<br>Carbon: ${d.carbon.toFixed(2)} Tons`)
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY + 10}px`);
      })
      .on("mousemove", (event) => {
        tooltip
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY + 10}px`);
      })
      .on("mouseout", () => {
        tooltip.style("opacity", 0);
      });

      // Add title
    svg
    .append("text")
    .attr("x", width / 2)
    .attr("y", margin.top / 2)
    .attr("text-anchor", "middle")
    .style("font-size", font1)
    .style("font-weight", "bold")
    .text("CO2 Emmissions over Time");

    // Add x-axis label
    svg
    .append("text")
    .attr("x", width / 2 + 8)
    .attr("y", height - 15)
    .attr("text-anchor", "middle")
    .style("font-size", font2)
    .text("Year");

    // Add y-axis label
    svg
    .append("text")
    .attr("x", (-height+10) / 2)
    .attr("y", 15)
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .style("font-size", font2)
    .text("CO2 Emmissions per Capita(Tons)");
  }, [carbonData]);

  return <svg ref={svgRef} width={width} height={height}></svg>;
};

export default CarbonChart;
