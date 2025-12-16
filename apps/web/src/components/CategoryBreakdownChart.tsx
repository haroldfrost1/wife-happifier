import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

interface CategoryBreakdownData {
  category: string;
  amount: number;
}

interface CategoryBreakdownChartProps {
  data: CategoryBreakdownData[];
}

export const CategoryBreakdownChart: React.FC<CategoryBreakdownChartProps> = ({
  data,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!data || data.length === 0) return;

    const width = 450;
    const height = 450;
    const margin = 40;

    const radius = Math.min(width, height) / 2 - margin;

    // Clear previous
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    // Color palette
    const color = d3
      .scaleOrdinal()
      .domain(data.map((d) => d.category))
      .range(d3.schemeSet2);

    // Compute the position of each group on the pie:
    const pie = d3
      .pie<CategoryBreakdownData>()
      .value((d) => d.amount)
      .sort(null); // Do not sort if we want to keep order, or sort by size?

    const data_ready = pie(data);

    // Shape helper to build arcs:
    const arc = d3
      .arc<d3.PieArcDatum<CategoryBreakdownData>>()
      .innerRadius(radius * 0.5) // Donut hole
      .outerRadius(radius * 0.8);

    const outerArc = d3
      .arc<d3.PieArcDatum<CategoryBreakdownData>>()
      .innerRadius(radius * 0.9)
      .outerRadius(radius * 0.9);

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg
      .selectAll("allSlices")
      .data(data_ready)
      .join("path")
      .attr("d", arc)
      .attr("fill", (d) => color(d.data.category) as string)
      .attr("stroke", "white")
      .style("stroke-width", "2px")
      .style("opacity", 0.7);

    // Add polylines between chart and labels:
    svg
      .selectAll("allPolylines")
      .data(data_ready)
      .join("polyline")
      .attr("stroke", "black")
      .style("fill", "none")
      .attr("stroke-width", 1)
      .attr("points", (d) => {
        const posA = arc.centroid(d); // line insertion in the slice
        const posB = outerArc.centroid(d); // line break: we use the other arc generator that has been built only for that
        const posC = outerArc.centroid(d); // Label position = almost the same as posB
        const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2; // we need the angle to see if the X position will be at the extreme right or extreme left
        posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
        return [posA, posB, posC].map((p) => p.join(",")).join(" ");
      });

    // Add the polylines labels:
    svg
      .selectAll("allLabels")
      .data(data_ready)
      .join("text")
      .text((d) => d.data.category)
      .attr("transform", (d) => {
        const pos = outerArc.centroid(d);
        const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
        return `translate(${pos})`;
      })
      .style("text-anchor", (d) => {
        const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        return midangle < Math.PI ? "start" : "end";
      })
      .style("font-size", "12px");
  }, [data]);

  return <svg ref={svgRef}></svg>;
};
