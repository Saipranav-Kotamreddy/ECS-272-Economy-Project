import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const ImmigrationChart = ({ startYear, endYear }) => {
  const svgRef = useRef();
  const [immigrantData, setImmigrantData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const csvData = await d3.csv("data/metricsbydecade.csv", (d) => ({
        decade: d["Decade"],
        immigrant: parseFloat(d["PercPopGrowthImm"]),
      }));

      let dataList = [];
      for (let row in csvData) {
        if (
          parseInt(csvData[row].decade) >= startYear &&
          parseInt(csvData[row].decade) <= endYear
        ) {
          dataList.push({
            decade: csvData[row].decade,
            immigrant: csvData[row].immigrant,
          });
        }
      }
      setImmigrantData(dataList);
    };

    fetchData();
  }, [startYear, endYear]);

  useEffect(() => {
    const width = 750;
    const height = 450;
    const margin = { top: 25, right: 100, bottom: 50, left: 50 };

    // Clear the SVG
    d3.select(svgRef.current).selectAll("*").remove();

    // Define the scales
    const xScale = d3
      .scaleBand()
      .domain(immigrantData.map((d) => d.decade))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, 100])
      .range([height - margin.bottom, margin.top]);

    // Define the line
    const line = d3
      .line()
      .x((d) => xScale(d.decade) + xScale.bandwidth() / 2)
      .y((d) => yScale(d.immigrant));

    // Define the areas
    const areaBelow = d3
      .area()
      .x((d) => xScale(d.decade) + xScale.bandwidth() / 2)
      .y0(height - margin.bottom)
      .y1((d) => yScale(d.immigrant));

    const areaAbove = d3
      .area()
      .x((d) => xScale(d.decade) + xScale.bandwidth() / 2)
      .y0(margin.top)
      .y1((d) => yScale(d.immigrant));

    // Append SVG
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    // Append area below
    svg
      .append("path")
      .datum(immigrantData)
      .attr("fill", "lightgreen")
      .attr("d", areaBelow);

    // Append area above
    svg
      .append("path")
      .datum(immigrantData)
      .attr("fill", "lavender")
      .attr("d", areaAbove);

    // Append line
    svg
      .append("path")
      .datum(immigrantData)
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 2)
      .attr("d", line);

    // Add x-axis
    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    // Add y-axis
    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale));

    // Add title
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", margin.top / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("font-weight", "bold")
      .text("Immigrants vs Native Born in the United States");

    // Add x-axis label
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height - 10)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .text("Year");

    // Add y-axis label
    svg
      .append("text")
      .attr("x", -height / 2)
      .attr("y", 20)
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .style("font-size", "12px")
      .text("Percentage(%)");

    // Add legend
    const legend = svg.append("g").attr("transform", `translate(${width-margin.right}, ${margin.top})`);

    const legendData = [
      { label: "Native Born", color: "lavender" },
      { label: "Immigrants", color: "lightgreen" },
    ];

    legendData.forEach((d, i) => {
      const legendRow = legend
        .append("g")
        .attr("transform", `translate(0, ${i * 20})`);

      legendRow
        .append("rect")
        .attr("width", 15)
        .attr("height", 15)
        .attr("fill", d.color);

      legendRow
        .append("text")
        .attr("x", 20)
        .attr("y", 12)
        .style("font-size", "12px")
        .text(d.label);
    });
  }, [immigrantData]);

  return <svg ref={svgRef}></svg>;
};

export default ImmigrationChart;
