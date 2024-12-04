import React, { useState, useRef, useEffect } from "react";
import * as d3 from "d3";

const UrbanChart = ({ period, size }) => {
  const chartRef = useRef();
  const [populationData, setPopulationData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const csvData = await d3.csv("data/urbanmetrics.csv", (d) => ({
        year: d["Year"],
        urban: parseInt(d["Urban"]),
        rural: parseInt(d["Rural"]),
      }));

      const matchedData = csvData.find((row) => row.year === period);
      if (matchedData) {
        const { urban, rural } = matchedData;

        const data = [
          { region: "Urban", count: urban, color: "#9B59B6" },
          { region: "Rural", count: rural, color: "#F39C12" },
        ];
        setPopulationData(data);
      }
    };

    fetchData();
  }, [period]);

  useEffect(() => {
    let svgWidth = 350;
    let svgHeight = 350;
    let rowSpacing = 30;
    let colSpacing = 30;
    let maxPerRow = 10;
    let iconsize = 20;
    let iconx = 30;
    let icony = 40;

    if (size=='small') {
      svgWidth = 200;
      svgHeight = 150; 
      iconsize = 5;  
      rowSpacing = 12;
      colSpacing = 12;
      maxPerRow = 10; 
      iconsize = 10;  
      icony = 20;
      iconx = 35;
    } else if(size=='medium') {
      svgWidth = 300;
      svgHeight = 230; 
      rowSpacing = 20;
      colSpacing = 20;
      maxPerRow = 10; 
      iconsize = 10;  
      icony = 20;
      iconx = 55;      
    }

    const svg = d3
      .select(chartRef.current)
      .attr("width", svgWidth)
      .attr("height", svgHeight);

    svg.selectAll("*").remove();

    let x = 0,
      y = 0;

    const personIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="${iconsize}" height="${iconsize}"><path fill="currentColor" d="M32 2a14 14 0 1014 14A14 14 0 0032 2zm12 36H20a12 12 0 00-12 12v8a4 4 0 004 4h48a4 4 0 004-4v-8a12 12 0 00-12-12z"/></svg>`;

    populationData.forEach((d) => {
      for (let i = 0; i < d.count; i++) {
        svg
          .append("foreignObject")
          .attr("x", x * colSpacing + iconx)
          .attr("y", y * rowSpacing + icony)
          .attr("width", 20)
          .attr("height", 20)
          .html(personIcon)
          .style("color", d.color);

        x++;
        if (x >= maxPerRow) {
          x = 0;
          y++;
        }
      }
    });

    // Add title
    if (size != 'small') {
      svg
      .append("text")
      .attr("x", svgWidth / 2)
      .attr("y", 20)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("font-weight", "bold")
      .text("Urban vs Rural Percentages In " + period);
    } else {
      svg
      .append("text")
      .attr("x", svgWidth / 2)
      .attr("y", 20)
      .attr("text-anchor", "middle")
      .style("font-size", "8px")
      .style("font-weight", "bold")
      .text("Urban vs Rural Percentages In " + period);      
    }


    // Add legend
    const legend = svg.append("g").attr("transform", `translate(500, 50)`);

    populationData.forEach((d, i) => {
      const legendItem = legend.append("g").attr("transform", `translate(0, ${i * 25})`);

      legendItem
        .append("rect")
        .attr("width", 20)
        .attr("height", 20)
        .attr("fill", d.color);

      legendItem
        .append("text")
        .attr("x", 30)
        .attr("y", 15)
        .style("font-size", "14px")
        .text(d.region);
    });
  }, [populationData]);

  return <svg ref={chartRef}></svg>;
};

export default UrbanChart;
