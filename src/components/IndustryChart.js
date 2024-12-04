import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

const IndustryChart = ({ startYear, endYear, size, animated }) => {
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

      const filteredData = csvData.filter(
        (d) =>
          parseInt(d.decade) >= startYear && parseInt(d.decade) <= endYear
      );

      const processedData = filteredData.map((d) => {
        const totalAmount =
          d.agriculture + d.manufacture + d.service;
        return {
          ...d,
          agriculturePercent: d.agriculture / totalAmount,
          manufacturePercent: d.manufacture / totalAmount,
          servicePercent: d.service / totalAmount,
        };
      });

      setIndustryData(processedData);
    };

    fetchData();
  }, [startYear, endYear]);

  useEffect(() => {
    if (!industryData || industryData.length === 0) return;
  
    let margin = { top: 30, right: 95, bottom: 50, left: 95 };
    let width = 900 - margin.left - margin.right;
    let height = 500 - margin.top - margin.bottom;
    let axisFont = "16px";
    let xOffset = 0;
    let yOffset = 0;
  
    if (size === "small") {
      margin = { top: 30, right: 97, bottom: 50, left: 60 };
      width = 800 - margin.left - margin.right;
      height = 250 - margin.top - margin.bottom;
      axisFont = "12px";
      xOffset = -10;
      yOffset = 15;
    }
  
    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);
  
    svg.selectAll("*").remove(); // Clear previous content
  
    const chartGroup = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
  
    const xScale = d3
      .scaleLinear()
      .domain(d3.extent(industryData, (d) => d.decade))
      .range([0, width]);
  
    const yScale = d3.scaleLinear().range([height, 0]);
  
    const colorScale = d3
      .scaleOrdinal()
      .domain(["agriculture", "manufacture", "service"])
      .range(["#2ca02c", "#ff7f0e", "#1f77b4"]);
  
    const stack = d3
      .stack()
      .keys(["agriculture", "manufacture", "service"])
      .order(d3.stackOrderNone)
      .offset(d3.stackOffsetNone);
  
    // Precompute stacked data for all points
    const stackedData = stack(industryData);
  
    // Compute the fixed Y scale based on the complete dataset
    const maxY = d3.max(stackedData, (layer) =>
      d3.max(layer, (d) => d[1])
    );
    yScale.domain([0, maxY]);
  
    const areaGenerator = d3
      .area()
      .x((d) => xScale(d.data.decade))
      .y0((d) => yScale(d[0]))
      .y1((d) => yScale(d[1]))
      .curve(d3.curveBasis);
  
    const animateLayer = (layerData, layerIndex, onComplete) => {
      const totalPoints = layerData.length;
  
      // Add the path for the current layer
      const path = chartGroup
        .append("path")
        .datum(layerData)
        .attr("class", "layer")
        .attr("fill", colorScale(layerData.key))
        .attr("stroke", "black")
        .attr("stroke-width", 0.5)
        .attr("d", areaGenerator(layerData.slice(0, 1))); // Start with the first point
  
      // Animate point-by-point for the current layer
      const animatePoints = (index) => {
        if (index >= totalPoints) {
          if (onComplete) onComplete();
          return;
        }
  
        path
          .transition()
          .duration(300) // Adjust duration for smoother animation
          .attr("d", areaGenerator(layerData.slice(0, index + 1)))
          .on("end", () => {
            setTimeout(() => animatePoints(index + 1), 200); // Delay between points
          });
      };
  
      animatePoints(1); // Start animation from the second point
    };
  
    const animateSequentially = (currentLayer = 0) => {
      if (currentLayer >= stackedData.length) return;
  
      animateLayer(stackedData[currentLayer], currentLayer, () => {
        animateSequentially(currentLayer + 1); // Trigger the next layer
      });
    };
  
    if (animated) {
      animateSequentially(); // Start the animation
    } else {
      // Static rendering for non-animated mode
      chartGroup
        .selectAll(".layer")
        .data(stackedData)
        .join("path")
        .attr("class", "layer")
        .attr("d", areaGenerator)
        .attr("fill", (d) => {
          const color = d3.color(colorScale(d.key));
          color.opacity = 0.8;
          return color.toString();
        })
        .attr("stroke", "black")
        .attr("stroke-width", 0.5);
    }
  
    chartGroup
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xScale).tickFormat(d3.format("d")));
  
    chartGroup.append("g").call(d3.axisLeft(yScale));
  
    chartGroup
      .append("text")
      .attr("x", width / 2)
      .attr("y", -10)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("font-weight", "bold")
      .text("Industry Employment Rate per Decade");
  
    chartGroup
      .append("text")
      .attr("x", width / 2)
      .attr("y", height + 40 + xOffset)
      .attr("text-anchor", "middle")
      .style("font-size", axisFont)
      .text("Year");
  
    chartGroup
      .append("text")
      .attr("x", -height / 2)
      .attr("y", -45 + yOffset)
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .style("font-size", axisFont)
      .text("Number of People Employed (Millions)");
  
    const legendGroup = svg
      .append("g")
      .attr("transform", `translate(${width + margin.left + 5}, ${margin.top})`);
  
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
  }, [industryData, animated]);
  

  return <svg ref={svgRef}></svg>;
};

export default IndustryChart;
