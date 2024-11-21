import React, { useState, useRef, useEffect } from "react";
import * as d3 from "d3";

const GenderChart = ({ period }) => {
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
    const svgWidth = 600;
    const svgHeight = 500;
    const rowSpacing = 30;
    const colSpacing = 30;
    const maxPerRow = 10;

    const svg = d3
      .select(chartRef.current)
      .attr("width", svgWidth)
      .attr("height", svgHeight);

    svg.selectAll("*").remove();

    let x = 0,
      y = 0;

    const personIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="20" height="20"><path fill="currentColor" d="M32 2a14 14 0 1014 14A14 14 0 0032 2zm12 36H20a12 12 0 00-12 12v8a4 4 0 004 4h48a4 4 0 004-4v-8a12 12 0 00-12-12z"/></svg>`;

    populationData.forEach((d) => {
      for (let i = 0; i < d.count; i++) {
        svg
          .append("foreignObject")
          .attr("x", x * colSpacing + 150)
          .attr("y", y * rowSpacing + 40)
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
    svg
      .append("text")
      .attr("x", svgWidth / 2)
      .attr("y", 20)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("font-weight", "bold")
      .text("Gender Distribution in "+period);

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

export default GenderChart;
