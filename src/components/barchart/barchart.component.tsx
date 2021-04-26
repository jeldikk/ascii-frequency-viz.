import React, {useCallback, useEffect} from 'react'
import * as d3 from 'd3'
import "./barchart.styles.scss"
import {DataItem} from '../../pages/letters/letters.page' 

// interface DataPropType {
//     [key: string]: number;
// }

type Props = {
    data: DataItem[];
}


const Barchart: React.FC<Props> = ({data}) => {


    const ref = React.useRef<SVGSVGElement | null>(null);

    const renderingFunction = useCallback(
        () => {
            // console.log({data, ref});
            
        
            // console.log(Object.keys(data))
            const svg = d3.select(ref.current);

            const svgHeight = 500;
            const svgWidth = 800;
            svg.attr("width", svgWidth);
            svg.attr('height', svgHeight);
            const margin = {
                top: 40,
                right: 20,
                bottom: 20,
                left: 40
            };

            const xScale = d3.scaleBand()
                        .domain(data.map((item) => item.key))
                        .rangeRound([margin.left, svgWidth - margin.right])
                        .paddingInner(0.3);

            const minVal = d3.min(data, (d) => d.value)!;
            const maxVal = d3.max(data, (d) => d.value)!;

            const yScale = d3.scaleLinear()
                            .domain([0, maxVal])
                            .range([svgHeight-margin.bottom, margin.top])

            const colorScale = d3.scaleOrdinal<string>()
                                .domain(xScale.domain())
                                .range(d3.quantize(t => d3.interpolateSpectral(t*0.8), data.length))


            // console.log(colorScale.domain());
            // console.log(colorScale.range())
            // console.log(colorScale('a'));
            // console.log(colorScale('b'))
            
            const bottomAxis = (g: any )=> {
                const _axes = d3.axisBottom<string>(xScale)
                                .tickValues(xScale.domain())
                                .tickFormat((d) => d.toUpperCase())
                                .tickSizeOuter(0);

                _axes(g);
            }
            
            const leftAxis = (g: any) => {
                const _axes = d3.axisLeft<number>(yScale)
                                // .tickValues(d3.ticks(0, 10, 20))
                                .tickValues(d3.ticks(0, maxVal , 10))

                _axes(g)
            }

            const xAxis = (g: ReturnType<typeof d3.select>) => {

                return g.attr('transform', `translate(0, ${svgHeight - margin.bottom})`)
            } 

            const yAxis = (g: ReturnType<typeof d3.select>) => {
                return g.attr("transform",`translate(${margin.left}, 0)`)
                        // .style("fill", 'steelblue')
                        
            }

            const removeVerticalAxisLine = (g: d3.Selection<d3.BaseType, unknown, null, undefined>) => {
                return g.select(".domain").remove();
            }

            // if(data.length !== 0){

            svg.select(".x-axis")
            .call(xAxis)
            .transition()
            .duration(1000)
            .call(bottomAxis);

            svg.select('.y-axis')
                .call(yAxis)
                .transition()
                .duration(1000)
                .call(leftAxis)
                // .call(removeVerticalAxisLine);

            svg.select(".plot-area")
                .selectAll('.bar')
                .data(data)
                .join('rect')
                .attr('class', 'bar')
                .attr('stroke', 'brown')
                .attr('stroke-width', 2)
                .attr("x", (d) => `${xScale(d.key)!}`)
                .attr('y', (d) => yScale(d.value))
                .attr('fill', d => colorScale(d.key))
                .transition()
                .duration(1000)
                .attr('width', xScale.bandwidth())
                .attr('height', (d)=> yScale(0) - yScale(d.value))
            // }
        },
        [data],
    )


    useEffect(()=>{
        renderingFunction()
    }, [data])

    return (
        <div className="bar-chart">
            <h2>Bar chart</h2>
            <svg ref={ref} className="svg">
                <g className="plot-area"></g>
                <g className="x-axis"></g>
                <g className="y-axis"></g>
            </svg>
        </div>
    )
}

export default Barchart
