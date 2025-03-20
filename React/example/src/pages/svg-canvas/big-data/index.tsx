import { Button } from "antd";
import * as echarts from "echarts";
import { animate } from "framer-motion";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;

const ComparisonSection = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
`;

const ChartContainer = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  width: 8000px;
  height: 600px;
`;

const Controls = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  justify-content: center;
  flex-wrap: wrap;
`;

const Stats = styled.div`
  margin: 10px 0;
  text-align: center;
  font-size: 14px;
`;

const ComparisonDemo: React.FC = () => {
	const svgChartRef = useRef<HTMLDivElement>(null);
	const canvasChartRef = useRef<HTMLDivElement>(null);
	const [dataSize, setDataSize] = useState(1000);
	const [svgRenderTime, setSvgRenderTime] = useState(0);
	const [canvasRenderTime, setCanvasRenderTime] = useState(0);
	const [svgMemory, setSvgMemory] = useState(0);
	const [canvasMemory, setCanvasMemory] = useState(0);

	// 生成散点图数据
	const generateData = (count: number) => {
		const data = [];
		for (let i = 0; i < count; i++) {
			data.push([Math.random() * 100, Math.random() * 100]);
		}
		return data;
	};

	// 初始化图表
	const initChart = (
		container: HTMLDivElement,
		renderer: "svg" | "canvas",
		data: number[][],
		onRendered?: () => void,
	) => {
		const chart = echarts.init(container, undefined, {
			renderer,
			width: 1200,
			height: 600,
		});

		const startTime = performance.now();
		const startMemory = (performance as any).memory?.usedJSHeapSize || 0;

		const option = {
			title: {
				text: `${renderer.toUpperCase()} 渲染`,
				left: "center",
			},
			tooltip: {
				trigger: "item",
				formatter: (params: any) => `x: ${params.value[0].toFixed(2)}<br/>y: ${params.value[1].toFixed(2)}`,
			},
			toolbox: {
				feature: {
					dataZoom: {
						yAxisIndex: "none",
					},
					restore: {},
					saveAsImage: {},
				},
			},
			xAxis: {
				type: "value",
				min: 0,
				max: 100,
			},
			yAxis: {
				type: "value",
				min: 0,
				max: 100,
			},
			dataZoom: [
				{
					type: "inside",
					xAxisIndex: [0],
					start: 0,
					end: 100,
				},
				{
					type: "inside",
					yAxisIndex: [0],
					start: 0,
					end: 100,
				},
			],
			series: [
				{
					type: "scatter",
					symbolSize: 5,
					data: data,
					animate: false,
				},
				// {
				// 	type: "line",
				// 	data: data.map((item) => item[0]),
				// },
			],
		};

		chart.setOption(option);

		chart.on("rendered", () => {
			const endTime = performance.now();
			const endMemory = (performance as any).memory?.usedJSHeapSize || 0;

			if (renderer === "svg") {
				setSvgRenderTime(endTime - startTime);
				setSvgMemory((endMemory - startMemory) / (1024 * 1024));
			} else {
				setCanvasRenderTime(endTime - startTime);
				setCanvasMemory((endMemory - startMemory) / (1024 * 1024));
			}

			onRendered?.();
		});

		return chart;
	};

	useEffect(() => {
		if (!svgChartRef.current || !canvasChartRef.current) return;

		const data = generateData(dataSize);
		let svgChart: echarts.ECharts | null = null;
		let canvasChart: echarts.ECharts | null = null;

		// 按顺序初始化图表，确保性能测量的准确性
		svgChart = initChart(svgChartRef.current, "svg", data, () => {
			canvasChart = initChart(canvasChartRef.current, "canvas", data);
		});

		return () => {
			svgChart?.dispose();
			canvasChart?.dispose();
		};
	}, [dataSize]);

	return (
		<Container>
			<h2>ECharts SVG vs Canvas 渲染对比</h2>

			<Controls>
				<Button onClick={() => setDataSize(1000)}>1,000 个数据点</Button>
				<Button onClick={() => setDataSize(10000)}>10,000 个数据点</Button>
				<Button onClick={() => setDataSize(50000)}>50,000 个数据点</Button>
				<Button onClick={() => setDataSize(100000)}>100,000 个数据点</Button>
			</Controls>

			<Stats>
				当前数据量：{dataSize.toLocaleString()} 个点
				<br />
				SVG 渲染时间：{svgRenderTime.toFixed(2)}ms | 内存占用：{svgMemory.toFixed(2)}MB
				<br />
				Canvas 渲染时间：{canvasRenderTime.toFixed(2)}ms | 内存占用：{canvasMemory.toFixed(2)}MB
			</Stats>

			<ComparisonSection>
				<ChartContainer ref={svgChartRef} />
				<ChartContainer ref={canvasChartRef} />
			</ComparisonSection>

			<div>
				<h3>对比说明：</h3>
				<ul>
					<li>缩放和平移：两种渲染器都支持，可以使用鼠标滚轮缩放，拖拽平移</li>
					<li>渲染性能：Canvas 在大数据量时通常表现更好</li>
					<li>内存占用：可以观察两种渲染方式的内存占用差异</li>
					<li>交互性能：在数据量较大时，SVG 的交互可能会变得卡顿</li>
				</ul>
			</div>
		</Container>
	);
};

export default ComparisonDemo;
