import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface CategoryBreakdownData {
  category: string;
  amount: number;
}

interface CategoryBreakdownChartProps {
  data: CategoryBreakdownData[];
}

export const CategoryBreakdownChart: React.FC<CategoryBreakdownChartProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!data || data.length === 0) return;

    const width = 450;
    const height = 450;
    const margin = 150;

    const radius = Math.min(width, height) / 2 - margin;

    // Clear previous
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    // Color palette
    const color = d3
      .scaleOrdinal()
      .domain(data.map(d => d.category))
      .range(d3.schemeSet2);

    // Compute the position of each group on the pie:
    const pie = d3
      .pie<CategoryBreakdownData>()
      .value(d => d.amount)
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
      .selectAll('allSlices')
      .data(data_ready)
      .join('path')
      .attr('d', arc)
      .attr('fill', d => color(d.data.category) as string)
      .attr('stroke', 'white')
      .style('stroke-width', '2px')
      .style('opacity', 0.7);

    // Compute label positions and resolve collisions
    const labelHeight = 14;
    const labels = data_ready.map(d => {
      const posA = arc.centroid(d);
      const posB = outerArc.centroid(d);
      const posC = outerArc.centroid(d);
      const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;

      // Determine side: right (1) or left (-1)
      const isRight = midangle < Math.PI;
      posC[0] = radius * 0.95 * (isRight ? 1 : -1);

      return {
        d,
        posA,
        posB,
        posC,
        isRight,
        textAnchor: isRight ? 'start' : ('end' as 'start' | 'end'),
      };
    });

    // Resolve collisions (simple relaxation)
    const resolveCollisions = (items: typeof labels) => {
      // Sort by Y position
      items.sort((a, b) => a.posC[1] - b.posC[1]);

      let iter = 0;
      const maxIter = 10;

      while (iter < maxIter) {
        let moved = false;
        for (let i = 0; i < items.length - 1; i++) {
          const a = items[i];
          const b = items[i + 1];

          const dist = b.posC[1] - a.posC[1];
          if (dist < labelHeight) {
            const overlap = labelHeight - dist;
            // Move both away from each other
            a.posC[1] -= overlap / 2;
            b.posC[1] += overlap / 2;
            moved = true;
          }
        }
        if (!moved) break;
        iter++;
      }
    };

    // Process left and right sides separately
    const rightLabels = labels.filter(l => l.isRight);
    const leftLabels = labels.filter(l => !l.isRight);

    resolveCollisions(rightLabels);
    resolveCollisions(leftLabels);

    // Draw Polylines
    svg
      .selectAll('allPolylines')
      .data(labels) // use processed labels
      .join('polyline')
      .attr('stroke', 'black')
      .style('fill', 'none')
      .attr('stroke-width', 1)
      .attr('points', l => {
        return [l.posA, l.posB, l.posC].map(p => p.join(',')).join(' ');
      });

    // Draw Label Text
    svg
      .selectAll('allLabels')
      .data(labels)
      .join('text')
      .text(l => l.d.data.category)
      .attr('transform', l => `translate(${l.posC})`)
      .style('text-anchor', l => l.textAnchor)
      .style('font-size', '12px')
      .attr('dx', l => (l.isRight ? 5 : -5)) // Add padding
      .attr('dy', 4); // Center vertically
  }, [data]);

  return <svg ref={svgRef}></svg>;
};
