import { createChart, ColorType, IChartApi, LineData } from "lightweight-charts"
import React, { useEffect, useRef } from "react"

interface PopulationData {
	year: number
	value: number
}

interface PopulationChartProps {
	data: PopulationData[]
	colors?: {
		backgroundColor?: string
		lineColor?: string
		textColor?: string
		areaTopColor?: string
		areaBottomColor?: string
	}
}

const PopulationChart: React.FC<PopulationChartProps> = ({
	data,
	colors: {
		backgroundColor = "#0a0a0a",
		lineColor = "#2962FF",
		textColor = "white",
		areaTopColor = "#2962FF",
		areaBottomColor = "rgba(41, 98, 255, 0.28)",
	} = {},
}) => {
	const chartContainerRef = useRef<HTMLDivElement>(null)
	const chartRef = useRef<IChartApi | null>(null)

	useEffect(() => {
		const handleResize = () => {
			if (chartRef.current && chartContainerRef.current) {
				chartRef.current.applyOptions({
					width: chartContainerRef.current.clientWidth,
					height: chartContainerRef.current.clientHeight,
				})
			}
		}

		const chart = createChart(chartContainerRef.current!, {
			layout: {
				background: { type: ColorType.Solid, color: backgroundColor },
				textColor,
			},
			width: chartContainerRef.current!.clientWidth,
			height: chartContainerRef.current!.clientHeight,
		})
		chartRef.current = chart

		chart.timeScale().fitContent()

		const newSeries = chart.addLineSeries({
			color: lineColor,
			lineWidth: 2,
		})

		const lineData: LineData[] = data.map((datum) => ({
			time: `${datum.year}-01-01`,
			value: datum.value,
		}))

		newSeries.setData(lineData)

		window.addEventListener("resize", handleResize)

		return () => {
			window.removeEventListener("resize", handleResize)
			chart.remove()
		}
	}, [
		data,
		backgroundColor,
		lineColor,
		textColor,
		areaTopColor,
		areaBottomColor,
	])

	return (
		<div
			ref={chartContainerRef}
			className="w-[300px] h-[150px] md:h-[200px] md:w-[400px] lg:h-[400px] lg:w-[800px]"
		/>
	)
}

export default PopulationChart
