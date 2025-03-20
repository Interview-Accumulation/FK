import * as echarts from "echarts";
import type React from "react";
import { useEffect, useRef } from "react";
import res0 from "./data.json";
import res1 from "./life-expectancy-table.json";

const ROOT_PATH = "https://echarts.apache.org/examples";
const CDN_PATH = "https://echarts.apache.org/zh/js/vendors/";

const countryColors: { [key: string]: string } = {
	Australia: "#00008b",
	Canada: "#f00",
	China: "#ffde00",
	Cuba: "#002a8f",
	Finland: "#003580",
	France: "#ed2939",
	Germany: "#000",
	Iceland: "#003897",
	India: "#f93",
	Japan: "#bc002d",
	"North Korea": "#024fa2",
	"South Korea": "#000",
	"New Zealand": "#00247d",
	Norway: "#ef2b2d",
	Poland: "#dc143c",
	Russia: "#d52b1e",
	Turkey: "#e30a17",
	"United Kingdom": "#00247d",
	"United States": "#b22234",
};

const updateFrequency = 2000;
const dimension = 0;

const EChartsComponent: React.FC = () => {
	const chartRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!chartRef.current) {
			return;
		}

		const chartDom = chartRef.current;
		const myChart = echarts.init(chartDom);
		let option: echarts.EChartsOption;

		const fetchData = async () => {
			// const [res0, res1] = await Promise.all([
			// 	fetch(CDN_PATH + "emoji-flags@1.3.0/data.json").then((res) => res.json()),
			// 	fetch(ROOT_PATH + "/data/asset/data/life-expectancy-table.json").then((res) => res.json()),
			// ]);

			const flags = res0;
			const data = res1;
			const years: number[] = [];
			for (let i = 0; i < data.length; ++i) {
				if (years.length === 0 || years[years.length - 1] !== data[i][4]) {
					years.push(data[i][4]);
				}
			}

			function getFlag(countryName: string): string {
				if (!countryName) {
					return "";
				}
				return (flags.find((item: { name: string; emoji: string }) => item.name === countryName) || {}).emoji || "";
			}

			const startIndex = 10;
			const startYear = years[startIndex];
			option = {
				grid: {
					top: 10,
					bottom: 30,
					left: 150,
					right: 80,
				},
				xAxis: {
					max: "dataMax",
					axisLabel: {
						formatter: (n: number) => Math.round(n) + "",
					},
				},
				dataset: {
					source: data.slice(1).filter((d: any) => d[4] === startYear),
				},
				yAxis: {
					type: "category",
					inverse: true,
					max: 10,
					axisLabel: {
						show: true,
						fontSize: 14,
						formatter: (value: string) => value + "{flag|" + getFlag(value) + "}",
						rich: {
							flag: {
								fontSize: 25,
								padding: 5,
							},
						},
					},
					animationDuration: 300,
					animationDurationUpdate: 300,
				},
				series: [
					{
						realtimeSort: true,
						seriesLayoutBy: "column",
						type: "bar",
						itemStyle: {
							color: (param: any) => countryColors[param.value[3]] || "#5470c6",
						},
						encode: {
							x: dimension,
							y: 3,
						},
						label: {
							show: true,
							precision: 1,
							position: "right",
							valueAnimation: true,
							fontFamily: "monospace",
						},
					},
				],
				animationDuration: 0,
				animationDurationUpdate: updateFrequency,
				animationEasing: "linear",
				animationEasingUpdate: "linear",
				graphic: {
					elements: [
						{
							type: "text",
							right: 160,
							bottom: 60,
							style: {
								text: startYear,
								font: "bolder 80px monospace",
								fill: "rgba(100, 100, 100, 0.25)",
							},
							z: 100,
						},
					],
				},
			};

			myChart.setOption(option);

			function updateYear(year: number) {
				const source = data.slice(1).filter((d: any) => d[4] === year);
				option.series[0].data = source;
				option.graphic.elements[0].style.text = year;
				myChart.setOption(option);
			}

			for (let i = startIndex; i < years.length - 1; ++i) {
				((i) => {
					setTimeout(
						() => {
							updateYear(years[i + 1]);
						},
						(i - startIndex) * updateFrequency,
					);
				})(i);
			}

			option && myChart.setOption(option);
		};

		fetchData();
	}, []);

	return (
		<div>
			<div
				ref={chartRef}
				style={{
					width: "100%",
					height: 700,
				}}
			/>
		</div>
	);
};

export default EChartsComponent;
