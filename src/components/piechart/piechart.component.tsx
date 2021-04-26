import React, {useCallback, useRef, useEffect} from 'react'
import * as d3 from 'd3'
import "./piechart.styles.scss"

import {DataItem} from "../../pages/letters/letters.page"

type Props = {
    data: DataItem[]
}


const Piechart: React.FC<Props> = ({data}) => {

    const ref = useRef<SVGSVGElement|null>(null)

    const renderingFunction = useCallback(
        () => {
            const svg = d3.select(ref.current);

            const svgHeight = 500;
            const svgWidth = 800;

            // svg.attr("viewBox", [-svgWidth/2, -svgHeight/2, svgWidth, svgHeight])
            svg.attr('width', svgWidth);
            svg.attr('height', svgHeight);

            const margin = {
                top: 30,
                right: 30,
                bottom: 30,
                left: 30
            };

            const colorScale = d3.scaleOrdinal()
                                .domain(data.map(d => d.key))
                                .range(d3.quantize(t => d3.interpolateSpectral(t*0.8), data.length));

            const pie = d3.pie<DataItem>()
													.value(d => d.value)
													.startAngle(0)
													.endAngle(2*Math.PI)
													.sort((a,b)=>{
														return 1;
													})
													.padAngle(1.6*Math.PI/180)
													

            const arcs = pie(data);
						// console.log({arcs})

            const arcGenerator = d3.arc<d3.PieArcDatum<DataItem>>()
																		.innerRadius(100)
																		.outerRadius(200)
																		.cornerRadius(5)
						
            svg.select(".pie-area")
								.attr('transform', d => `translate(${svgWidth/2}, ${svgHeight/2})`)
                .selectAll('path')
                .data(arcs)
                .join('path')
									.attr('stroke', 'brown')
									.attr('stroke-width', 2)
									.attr('fill', d => colorScale(d.data.key) as string)
									.transition()
									.duration(1000)
									.attr('d', arcGenerator )
									.attr('title', d => `${d.data.key} : ${d.data.value}`)
									

						
						// svg.select(".pie-labels")
						// 		.attr('transform', d => `translate(${svgWidth/2}, ${svgHeight/2})`)
						// 		.selectAll('text')
						// 		.data(arcs)
						// 		.join('text')
						// 			.text('haha')
						
						

						// svg.select('.pie-legend')
						// 		.attr('transform', `translate(${svgWidth*(4/5)}, 20)`)
						// 		.selectAll('g')
						// 			.data(arcs)
						// 			.enter()
						// 			.append('g')
						// 			.attr('class', 'legend-item')
						// 			.attr('transform', (d,i) => `translate(0, ${i*17})`)
						// 			.append('text')
						// 			.attr('fill', d => colorScale(d.data.key) as string)
						// 			.text(d => `${d.data.key} : ${d.data.value}`)
						const legendGroups = svg.select('.pie-legend')
																		.attr('transform', `translate(${svgWidth*(4/5)}, 20)`)
																		.selectAll('g')
																		.data(arcs)
																		.join('g')
																		.attr('class', 'legend-item')
																		.attr('transform', (d,i)=> `translate(0, ${i*17})`)
						
						console.log({legendGroups})
						const rectBoxes = legendGroups.selectAll('.legend-item')
																					.append('rect')
																					.attr("class", 'item-color-box')
																					.attr('fill', 'steelblue')
																					.attr('width', 10)
																					.attr('height', 10)
																					

						const legendLabels = svg.selectAll('.legend-item')
																							.append('text')
																							.attr('class', 'legend-item-label')
																							.text('some thing is here')
                

            
        },
        [data],
    )

    useEffect(()=>{

        renderingFunction();

    }, [data]);

    return (
        <div className="pie-chart">
            <h2>Pie chart</h2>
            <svg ref={ref}>
                <g className="pie-area"></g>
								{/* <g className="pie-labels"></g> */}
								<g className="pie-legend"></g>
            </svg>
        </div>
    )
}

export default Piechart
