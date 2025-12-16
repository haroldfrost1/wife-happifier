import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

interface MonthlyHistoryData {
  month: string;
  income: number;
  expense: number;
}

interface MonthlyHistoryChartProps {
  data: MonthlyHistoryData[];
}

export const MonthlyHistoryChart: React.FC<MonthlyHistoryChartProps> = ({
  data,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!data || data.length === 0) return;

    const margin = { top: 20, right: 30, bottom: 40, left: 60 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Clear previous render
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Categories (Groups): Months
    const groups = data.map((d) => d.month);
    // Subgroups: Income, Expense
    const subgroups = ["income", "expense"];

    // X Axis
    const x = d3.scaleBand().domain(groups).range([0, width]).padding(0.2);

    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-45)");

    // Y Axis
    const maxVal = d3.max(data, (d) => Math.max(d.income, d.expense)) || 0;
    const y = d3.scaleLinear().domain([0, maxVal]).range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));

    // Color palette
    const color = d3
      .scaleOrdinal()
      .domain(subgroups)
      .range(["#22c55e", "#ef4444"]); // Green for income, Red for expense

    // Show the bars
    const xSubgroup = d3
      .scaleBand()
      .domain(subgroups)
      .range([0, x.bandwidth()])
      .padding(0.05);

    svg
      .append("g")
      .selectAll("g")
      .data(data)
      .join("g")
      .attr("transform", (d) => `translate(${x(d.month)},0)`)
      .selectAll("rect")
      .data((d) =>
        subgroups.map((key) => ({
          key,
          value: d[key as keyof MonthlyHistoryData],
        }))
      )
      .join("rect")
      .attr("x", (d) => xSubgroup(d.key) || 0)
      .attr("y", (d) => y(Number(d.value)))
      .attr("width", xSubgroup.bandwidth())
      .attr("height", (d) => height - y(Number(d.value)))
      .attr("fill", (d) => color(d.key) as string)
      .attr("rx", 4) // Rounded corners
      .attr("ry", 4);

    // Legend
    const legend = svg
      .append("g")
      .attr("transform", `translate(${width - 100}, 0)`);

    subgroups.forEach((key, i) => {
      const legendRow = legend
        .append("g")
        .attr("transform", `translate(0, ${i * 20})`);

      legendRow
        .append("rect")
        .attr("width", 15)
        .attr("height", 15)
        .attr("fill", color(key) as string)
        .attr("rx", 4);

      legendRow
        .append("text")
        .attr("x", 20)
        .attr("y", 12)
        .text(key.charAt(0).toUpperCase() + key.slice(1))
        .style("font-size", "12px")
        .attr("alignment-baseline", "middle");
    });
  }, [data]);

  return <svg ref={svgRef}></svg>;
};
