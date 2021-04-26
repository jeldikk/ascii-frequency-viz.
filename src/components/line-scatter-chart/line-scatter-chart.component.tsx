import React, {useRef, useEffect, useCallback} from 'react'
import * as d3 from 'd3'


import "./line-scatter-chart.styles.scss"
import { DataItem } from '../../pages/letters/letters.page';

type PropTypes = {
    data: DataItem[];
}

const LineScatterchart: React.FC<PropTypes> = ({data}) => {

    const ref = useRef<SVGSVGElement>(null);

    const renderingFunction = useCallback(
        () => {
            // here goes what should be rendered
            const svg = d3.select(ref.current);

            const svgHeight = 600;
            const svgWidth = 800;
            svg.attr('width', svgWidth);
            svg.attr('height', svgHeight);

            const margins = {
                top: 20,
                right: 20,
                bottom: 20,
                left: 20
            };

            const xScale = d3.scaleBand<string>()
                                .domain(data.map(d => d.key))
                                .rangeRound([margins.left, svgWidth - margins.right])
                                .paddingInner(0.3)

            const yScale = d3.scaleLinear<number, number>()
                                .domain(data.map(d => d.value))
                                .range([svgHeight-margins.bottom, margins.top])
            
            const colorScale = d3.scaleOrdinal<string>()
                                .domain(xScale.domain())
                                .range(d3.quantize(t => d3.interpolateSpectral(t*0.8), data.length))

            
            const bottomAxis = (g: any) => {
                const _axes = d3.axisBottom<string>(xScale)
                                .tickValues(xScale.domain())
                                .tickFormat(d => d.toUpperCase())
                                .tickSizeInner(0);

                _axes(g);
            }

            const leftAxis = (g: any) => {
                const _axes = d3.axisLeft<number>(yScale)
                                // .tickValues(d3.ticks(0, d3.max(data, d => d.value), 10))
                
                _axes(g);
            }


        },
        [data],
    )

    useEffect(()=>{
        renderingFunction()
    }, [data])

    return (
        <div className="line-scatter-chart">
            <h2>Line Scatter plot</h2>
            <svg ref={ref}>
                <g className="plot-area"></g>
                <g className="x-axis"></g>
                <g className="y-axis"></g>
            </svg>
        </div>
    )
}

export default LineScatterchart
