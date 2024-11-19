import React, { useState, useRef, useEffect } from "react";
import * as d3 from "d3";

const UrbanChart = ({ period }) => {
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
    svg
  .append("text")
  .attr("x", svgWidth / 2)
  .attr("y", 20)
  .attr("text-anchor", "middle")
  .style("font-size", "16px")
  .style("font-weight", "bold")
  .text("Urban vs Rural Percentages Per Period");
  }, [populationData]);

  return <svg ref={chartRef}></svg>;
};

export default UrbanChart;
