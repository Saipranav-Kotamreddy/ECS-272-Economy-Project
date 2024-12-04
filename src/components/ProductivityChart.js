import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const ProductivityChart = ({startYear, endYear, size}) => {
  const svgRef = useRef();
  const [productivityData, setProductivityData] = useState([]);
  const [wageData, setWageData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const csvData = await d3.csv("data/metricsbyyear.csv", (d) => ({
        year: d["Year"],
        productivity: parseFloat(d["PercGrowtProd"]),
        wage: parseFloat(d["PercGrowthWage"]),
      }));


      let dataList = [];
      let dataList2=[];
      let totalProd=100
      let totalWage=100
      for (let row in csvData) {
        if (
          parseInt(csvData[row].year) >= startYear &&
          parseInt(csvData[row].year) <= endYear
        ) {
            totalProd=totalProd*(1+csvData[row].productivity/100)
            totalWage=totalWage*(1+csvData[row].wage/100)
          dataList.push({
            year: csvData[row].year,
            percent: csvData[row].productivity*100,
          });
          dataList2.push({
            year: csvData[row].year,
            percent: csvData[row].wage*100,
          });
        }
      }
      console.log(dataList, dataList2)

      setProductivityData(dataList);
      setWageData(dataList2)
    };

    fetchData();
  }, [startYear, endYear]);

  useEffect(() => {

    // Set dimensions and margins
    let width = 400;
    let height = 400;
    if (size=='small') {
      width = 450;
      height=200;
    } else if (size=='medium') {
      width = 650;
      height = 250;    
    }

    
    let margin = { top: 50, right: 190, bottom: 50, left: 50 };

    if(size=='small') {
      margin = { top: 50, right: 100, bottom: 50, left: 50 };
    }

    if (size=='medium') {
      margin = { top: 50, right: 175, bottom: 50, left:50 };
    }

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    // Clear previous content
    svg.selectAll("*").remove();

    // Create scales
    const xScale = d3
      .scaleLinear()
      .domain([startYear, endYear])
      .range([margin.left, width - margin.right]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max([...productivityData, ...wageData], (d) => d.percent)])
      .range([height - margin.bottom, margin.top]);

    // Create and add axes
    const xAxis = d3.axisBottom(xScale).ticks(5);
    const yAxis = d3.axisLeft(yScale).ticks(5);

    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(xAxis);

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(yAxis);

      svg
      .append("g")
      .attr("class", "grid")
      .attr("transform", `translate(${margin.left},0)`)
      .call(
        d3
          .axisLeft(yScale)
          .tickSize(-width + margin.left + margin.right)
          .tickFormat("")
      )
      .selectAll("line")
      .attr("stroke", "#ddd")
      .attr("stroke-dasharray", "3,3");

    // Add lines
    const lineGenerator = d3
      .line()
      .x((d) => xScale(d.year))
      .y((d) => yScale(d.percent));

    svg
      .append("path")
      .datum(productivityData)
      .attr("fill", "none")
      .attr("stroke", "blue")
      .attr("stroke-width", 2)
      .attr("d", lineGenerator);

    svg
      .append("path")
      .datum(wageData)
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-width", 2)
      .attr("d", lineGenerator);

    // Add labels
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", margin.top / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("font-weight", "bold")
      .text("Productivity vs Wage Increases over Time");

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height - margin.bottom / 4)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .text("Year");

    svg
      .append("text")
      .attr("x", -height / 2)
      .attr("y", margin.left / 4)
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .style("font-size", "12px")
      .text("Percentage");

    // Add legend
    const legend = svg.append("g").attr("transform", `translate(${width - 80},${margin.top})`);

    legend
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", 12)
      .attr("height", 12)
      .attr("fill", "blue");

    legend
      .append("text")
      .attr("x", 20)
      .attr("y", 10)
      .attr("text-anchor", "start")
      .style("font-size", "12px")
      .text("Productivity");

    legend
      .append("rect")
      .attr("x", 0)
      .attr("y", 20)
      .attr("width", 12)
      .attr("height", 12)
      .attr("fill", "red");

    legend
      .append("text")
      .attr("x", 20)
      .attr("y", 30)
      .attr("text-anchor", "start")
      .style("font-size", "12px")
      .text("Wages");

    
  }, [productivityData, wageData]);

  return <svg ref={svgRef}></svg>;
};

export default ProductivityChart;
