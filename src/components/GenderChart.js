import React, { useState, useRef, useEffect } from "react";
import * as d3 from "d3";

const GenderChart = ({ period, size, legend}) => {
  const chartRef = useRef();
  const [populationData, setPopulationData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const csvData = await d3.csv("data/gendermetrics.csv", (d) => ({
        year: d["Year"],
        female: parseInt(d["Female"]),
        male: parseInt(d["Male"]),
      }));

      const matchedData = csvData.find((row) => row.year === period);
      if (matchedData) {
        const { female, male } = matchedData;

        const data = [
          { region: "Female", count: female, color: "#FFC0CB" },
          { region: "Male", count: male, color: "#0080FE" },
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

    if (legend) {
      svgWidth = svgWidth + 225;
      iconx = iconx + 105;
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
          .attr("width", iconsize+15)
          .attr("height", iconsize+15)
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
      .text("Workforce by Gender "+period);
    } else {
      svg.append("text")
      .attr("x", svgWidth / 2)
      .attr("y", 20)
      .attr("text-anchor", "middle")
      .style("font-size", "8px")
      .style("font-weight", "bold")
      .text("Gender Distribution in "+period);      
    }
    // Add legend
    if (legend) {

      let legend = svg.append("g");
      if (size == 'medium') {
        legend.attr("transform", `translate(400, 30)`);
      } else if (size=='small') {
        legend.attr("transform", `translate(275, 30)`);
      } else {
        legend.attr("transform", `translate(450, 30)`);
      }
      
      populationData.forEach((d, i) => {
        const legendItem = legend.append("g").attr("transform", `translate(0, ${i * 25})`);
  
        legendItem
          .append("rect")
          .attr("width", 15)
          .attr("height", 15)
          .attr("fill", d.color);
  
        legendItem
          .append("text")
          .attr("x", 22)
          .attr("y", 12)
          .style("font-size", "12px")
          .text(d.region);
      });
    }
  }, [populationData]);

  return <svg ref={chartRef}></svg>;
};

export default GenderChart;
