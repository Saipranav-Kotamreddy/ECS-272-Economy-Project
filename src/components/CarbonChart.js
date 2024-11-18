import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const CarbonChart = ({ startYear, endYear }) => {
  const svgRef = useRef();
  const [carbonData, setCarbonData] = useState([]);

  const width = 600;
  const height = 500;

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

    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
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
      .call(d3.axisBottom(xScale).ticks(6))
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
  }, [carbonData]);

  return <svg ref={svgRef} width={width} height={height}></svg>;
};

export default CarbonChart;
