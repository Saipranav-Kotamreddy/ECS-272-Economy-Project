import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

const IncomeChart = ({ startYear, endYear, size }) => {
  const svgRef = useRef();
  let width = 800;
  let height = 500;
  let yoffset=0;

  if (size=='small') {
    width=450;
    height=190;
  } else if (size=='medium') {
    width=600;
    height=250;
    yoffset=0;
  }
  const [incomeData, setIncomeData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const csvData = await d3.csv("data/metricsbyyear.csv", (d) => ({
        year: d["Year"],
        topten: parseFloat(d["Top10IncomeShare"]),
        topfive: parseFloat(d["Top5IncomeShare"]),
        topone: parseFloat(d["Top1IncomeShare"]),
        total: parseFloat(d["All10IncomeShare"]),
      }));

      let dataList = [];
      for (let row in csvData) {
        if (
          parseInt(csvData[row].year) >= startYear &&
          parseInt(csvData[row].year) <= endYear
        ) {
          dataList.push({
            year: csvData[row].year,
            topten: csvData[row].topten,
            topfive: csvData[row].topfive,
            topone: csvData[row].topone,
            total: csvData[row].total,
          });
        }
      }
      setIncomeData(dataList);
    };

    fetchData();
  }, [startYear, endYear]);

  useEffect(() => {
    const svg = d3.select(svgRef.current).attr("width", width).attr("height", height);

    let margin = { top: 25, right: 120, bottom: 35, left: 60 }; // Adjusted margins for labels
    if (size=='small') {
      margin = { top: 25, right: 100, bottom: 35, left: 60 };
    }
    else if (size=='medium') {
      margin = { top: 25, right: 120, bottom: 50, left: 60 }; // Adjusted margins for labels
    }
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const xScale = d3
      .scaleBand()
      .domain(incomeData.map((d) => d.year))
      .range([0, chartWidth])
      .padding(0.2);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(incomeData, (d) => d.total)])
      .nice()
      .range([chartHeight, 0]);

    const colorScale = d3
      .scaleOrdinal()
      .domain(["topten", "topfive", "topone"])
      .range(["#1f77b4", "#ff7f0e", "#2ca02c"]);

    const stackGenerator = d3.stack().keys(["topten", "topfive", "topone"]);
    const layers = stackGenerator(incomeData);

    svg.selectAll("*").remove();

    const chartGroup = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Add tooltips
    const tooltip = d3
      .select("body")
      .append("div")
      .style("position", "absolute")
      .style("background", "white")
      .style("border", "1px solid #ccc")
      .style("padding", "10px")
      .style("display", "none")
      .style("pointer-events", "none");

    // Render bars
    chartGroup
      .selectAll(".layer")
      .data(layers)
      .join("g")
      .attr("class", "layer")
      .attr("fill", (d) => colorScale(d.key))
      .selectAll("rect")
      .data((d) => d)
      .join("rect")
      .attr("x", (d) => xScale(d.data.year))
      .attr("y", (d) => yScale(d[1]))
      .attr("height", (d) => yScale(d[0]) - yScale(d[1]))
      .attr("width", xScale.bandwidth())
      .on("mouseover", (event, d) => {
        tooltip
          .style("display", "block")
          .html(
            `<strong>Year:</strong> ${d.data.year}<br>
            <strong>Top 1%:</strong> ${d.data.topone}<br>
            <strong>Top 1-5%:</strong> ${d.data.topfive}<br>
            <strong>Top 5-10%:</strong> ${d.data.topten}<br>`
          );
      })
      .on("mousemove", (event) => {
        tooltip
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 20 + "px");
      })
      .on("mouseout", () => {
        tooltip.style("display", "none");
      });

    // Render y-axis
    chartGroup.append("g").call(d3.axisLeft(yScale)).attr("class", "y-axis");

    // Render x-axis (only years divisible by 10)
    const xAxisGroup = chartGroup
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${chartHeight})`);

    xAxisGroup
      .call(
        d3.axisBottom(xScale).tickValues(
          incomeData
            .map((d) => d.year)
            .filter((year) => year % 10 === 0)
        )
      )
      .selectAll("text")
      .style("font-size", "12px")
      .attr("text-anchor", "middle");

    // Add legend
    const legendGroup = svg.append("g").attr("transform", `translate(${width - 90}, 20)`);

    legendGroup
      .selectAll("rect")
      .data(colorScale.domain().reverse())
      .join("rect")
      .attr("x", 0)
      .attr("y", (_, i) => i * 20)
      .attr("width", 15)
      .attr("height", 15)
      .attr("fill", (d) => colorScale(d));

    const legendLabels = ["Top 5-10%", "Top 1-5%", "Top 1%"];

    legendGroup
      .selectAll("text")
      .data(legendLabels.reverse())
      .join("text")
      .attr("x", 20)
      .attr("y", (_, i) => i * 20 + 12)
      .text((d) => d)
      .style("font-size", "12px")
      .attr("alignment-baseline", "middle");
  

    // Add chart title
    svg
      .append("text")
      .attr("x", (width-margin.left+15) / 2)
      .attr("y", 15)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .style("font-weight", "bold")
      .text("Income Share Distribution Over Time");

    // Add x-axis label
    let xoffset=2;
    if (size=='medium') {
      xoffset = 15
    }
    
    
    svg
      .append("text")
      .attr("x", width / 2 -20)
      .attr("y", height-xoffset)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .text("Year");

    // Add y-axis label
    svg
      .append("text")
      .attr("x", -(height / 2 + -15))
      .attr("y", 15+yoffset)
      .attr("transform", "rotate(-90)")
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .text("Income Share (%)");
  }, [incomeData, width, height]);

  return <svg ref={svgRef}></svg>;
};

export default IncomeChart;
