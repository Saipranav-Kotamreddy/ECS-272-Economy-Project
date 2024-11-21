import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

const IndustryChart = ({ startYear, endYear }) => {
  const svgRef = useRef();
  const [industryData, setIndustryData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const csvData = await d3.csv("data/metricsbydecade.csv", (d) => ({
        decade: d["Decade"],
        agriculture: parseInt(d["TotalAgriculture"]) / 1000000,
        manufacture: parseInt(d["TotalManufacturing"]) / 1000000,
        service: parseInt(d["TotalService"]) / 1000000,
      }));

      let dataList = [];
      for (let row in csvData) {
        if (
          parseInt(csvData[row].decade) >= startYear &&
          parseInt(csvData[row].decade) <= endYear
        ) {
          let totalAmount =
            csvData[row].agriculture +
            csvData[row].manufacture +
            csvData[row].service;
          dataList.push({
            decade: csvData[row].decade,
            agriculture: csvData[row].agriculture,
            manufacture: csvData[row].manufacture,
            service: csvData[row].service,
            agriculturePercent: csvData[row].agriculture / totalAmount,
            manufacturePercent: csvData[row].manufacture / totalAmount,
            servicePercent: csvData[row].service / totalAmount,
          });
        }
      }
      setIndustryData(dataList);
    };

    fetchData();
  }, [startYear, endYear]);

  useEffect(() => {
    if (!industryData || industryData.length === 0) return;

    const margin = { top: 30, right: 180, bottom: 50, left: 60 };
    const width = 900 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Prepare SVG
    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);

    svg.selectAll("*").remove(); // Clear previous content

    const chartGroup = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Create scales
    const xScale = d3
      .scaleLinear()
      .domain(d3.extent(industryData, (d) => d.decade))
      .range([0, width]);

    const yScale = d3.scaleLinear().range([height, 0]);

    const colorScale = d3
      .scaleOrdinal()
      .domain(["agriculture", "manufacture", "service"])
      .range(["#2ca02c", "#ff7f0e", "#1f77b4"]);

    // Stack generator
    const stack = d3
      .stack()
      .keys(["agriculture", "manufacture", "service"])
      .order(d3.stackOrderNone)
      .offset(d3.stackOffsetNone);

    const stackedData = stack(industryData);

    // Update yScale based on stacked data
    const maxY = d3.max(stackedData, (layer) =>
      d3.max(layer, (d) => d[1])
    );
    yScale.domain([0, maxY]);

    // Area generator
    const area = d3
      .area()
      .x((d) => xScale(d.data.decade))
      .y0((d) => yScale(d[0]))
      .y1((d) => yScale(d[1]))
      .curve(d3.curveBasis);

      chartGroup
      .selectAll(".layer")
      .data(stackedData)
      .join("path")
      .attr("class", "layer")
      .attr("d", area)
      .attr("fill", (d) => {
        const color = d3.color(colorScale(d.key));
        color.opacity = 0.8;
        return color.toString();
      })
      .attr("stroke", "black")
      .attr("stroke-width", 0.5);
    

    // Add X Axis
    chartGroup
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xScale).tickFormat(d3.format("d")));

    // Add Y Axis
    chartGroup.append("g").call(d3.axisLeft(yScale));

    // Add title
    chartGroup
      .append("text")
      .attr("x", width / 2)
      .attr("y", -10)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("font-weight", "bold")
      .text("Industry Employment Rate per Decade");

    // Add x-axis label
    chartGroup
      .append("text")
      .attr("x", width / 2)
      .attr("y", height + 40)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .text("Year");

    // Add y-axis label
    chartGroup
      .append("text")
      .attr("x", -height / 2)
      .attr("y", -50)
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .style("font-size", "12px")
      .text("Number of People Employed (Millions)");

    // Add legend
    const legendGroup = svg
      .append("g")
      .attr("transform", `translate(${width + margin.left+5}, ${margin.top})`);

    const legendItems = ["service", "manufacture", "agriculture"];

    legendItems.forEach((key, index) => {
      const legendRow = legendGroup
        .append("g")
        .attr("transform", `translate(0, ${index * 25})`);

      legendRow
        .append("rect")
        .attr("width", 20)
        .attr("height", 20)
        .attr("fill", colorScale(key));

      legendRow
        .append("text")
        .attr("x", 25)
        .attr("y", 15)
        .style("font-size", "12px")
        .text(key.charAt(0).toUpperCase() + key.slice(1));
    });
  }, [industryData]);

  return <svg ref={svgRef}></svg>;
};

export default IndustryChart;
