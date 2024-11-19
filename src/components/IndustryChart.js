import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

const IndustryChart = ({ startYear, endYear }) => {
  const svgRef = useRef();
  const [industryData, setIndustryData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const csvData = await d3.csv("data/metricsbydecade.csv", (d) => ({
        decade: d["Decade"],
        agriculture: parseInt(d["TotalAgriculture"])/1000000,
        manufacture: parseInt(d["TotalManufacturing"])/1000000,
        service: parseInt(d["TotalService"])/1000000
      }));

      let dataList=[]
      for(let row in csvData){
        if(parseInt(csvData[row].decade)>=startYear && parseInt(csvData[row].decade)<=endYear){
            let totalAmount=csvData[row].agriculture+csvData[row].manufacture+csvData[row].service
            dataList.push({"decade":csvData[row].decade,"agriculture": csvData[row].agriculture,"manufacture": csvData[row].manufacture,"service": csvData[row].service, "agriculturePercent": csvData[row].agriculture/totalAmount,"manufacturePercent": csvData[row].manufacture/totalAmount,"servicePercent": csvData[row].service/totalAmount})
        }
      }
      setIndustryData(dataList);
    };

    fetchData();
  }, [startYear, endYear]);

  useEffect(() => {
    if (!industryData || industryData.length === 0) return;
  
    console.log(industryData)
    const margin = { top: 20, right: 30, bottom: 50, left: 100 };
    const width = 900 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
  
    // Prepare SVG
    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
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
      .offset(d3.stackOffsetNone); // Align layers to the bottom
  
    const stackedData = stack(industryData);
  
    // Update yScale based on stacked data
    const maxY = d3.max(stackedData, (layer) =>
      d3.max(layer, (d) => d[1])
    );
    yScale.domain([0, maxY]);

    console.log("Y Scale Domain:", yScale.domain());
    console.log("Y Axis Ticks:", yScale.ticks());
    // Area generator
    const area = d3
      .area()
      .x((d) => xScale(d.data.decade))
      .y0((d) => yScale(d[0]))
      .y1((d) => yScale(d[1]))
      .curve(d3.curveBasis);
  
    // Draw layers
    svg
      .selectAll(".layer")
      .data(stackedData)
      .join("path")
      .attr("class", "layer")
      .attr("d", area)
      .attr("fill", (d) => colorScale(d.key))
      .attr("stroke", "black")
      .attr("stroke-width", 0.5)
      
  
    // Add X Axis
    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xScale).tickFormat(d3.format("d")));
  
    // Add Y Axis
    svg.append("g").call(d3.axisLeft(yScale));

    svg.append("g").call(
        d3.axisLeft(yScale).tickFormat(d3.format(",.0f")) // Format as integer with commas
      );

      // Add title
  svg
  .append("text")
  .attr("x", width / 2)
  .attr("y", margin.top / 2)
  .attr("text-anchor", "middle")
  .style("font-size", "16px")
  .style("font-weight", "bold")
  .text("Industry Employment Rate per Decade");

// Add x-axis label
svg
  .append("text")
  .attr("x", width / 2)
  .attr("y", height + 30)
  .attr("text-anchor", "middle")
  .style("font-size", "12px")
  .text("Decade");

// Add y-axis label
svg
  .append("text")
  .attr("x", -height / 2)
  .attr("y", -40)
  .attr("text-anchor", "middle")
  .attr("transform", "rotate(-90)")
  .style("font-size", "12px")
  .text("Number of People Employed(Millions of People)");
    // Cleanup on component unmount
    return () => {
      svg.selectAll("*").remove();
    };
  }, [industryData]);

  return <svg ref={svgRef}></svg>;
};

export default IndustryChart;
