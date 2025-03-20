import { set } from "nprogress";
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
`;

const RenderContainer = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  width: 400px;
  height: 400px;
  position: relative;
  overflow: hidden;
`;

const Controls = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  justify-content: center;
  flex-wrap: wrap;
`;

const Stats = styled.div`
  position: absolute;
  top: 40px;
  left: 10px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px;
  font-size: 12px;
`;

interface Point {
	x: number;
	y: number;
	color: string;
	size?: number;
}

const ComparisonDemo: React.FC = () => {
	const [scale, setScale] = useState(1);
	const [points, setPoints] = useState<Point[]>([]);
	const [canvasPoints, setCanvasPoints] = useState<Point[]>([]);
	const [isSvgAnimating, setIsSvgAnimating] = useState(false);
	const [isCanvasAnimating, setIsCanvasAnimating] = useState(false);
	const [showComplexShapes, setShowComplexShapes] = useState(false);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const canvasRef2 = useRef<HTMLCanvasElement>(null);
	const [svgFps, setSvgFps] = useState(0);
	const [canvasFps, setCanvasFps] = useState(0);

	// 生成随机数据点
	const generatePoints = (count: number) => {
		const newPoints: Point[] = [];
		for (let i = 0; i < count; i++) {
			newPoints.push({
				x: Math.random() * 380 + 10,
				y: Math.random() * 380 + 10,
				color: `hsl(${Math.random() * 360}, 70%, 50%)`,
				size: showComplexShapes ? Math.random() * 10 + 5 : 3,
			});
		}
		setPoints(newPoints);
		setCanvasPoints(newPoints);
	};

	// 渲染 Canvas
	const renderCanvas = (points: Point[]) => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.save();
		// ctx.scale(scale, scale);

		points.forEach((point) => {
			ctx.beginPath();
			ctx.fillStyle = point.color;

			if (showComplexShapes) {
				// 绘制五角星
				const size = point.size || 3;
				const spikes = 5;
				const outerRadius = size;
				const innerRadius = size / 2;

				let rot = (Math.PI / 2) * 3;
				let x = point.x;
				let y = point.y;
				const step = Math.PI / spikes;

				ctx.beginPath();
				ctx.moveTo(x, y - outerRadius);

				for (let i = 0; i < spikes; i++) {
					x = point.x + Math.cos(rot) * outerRadius;
					y = point.y + Math.sin(rot) * outerRadius;
					ctx.lineTo(x, y);
					rot += step;

					x = point.x + Math.cos(rot) * innerRadius;
					y = point.y + Math.sin(rot) * innerRadius;
					ctx.lineTo(x, y);
					rot += step;
				}

				ctx.lineTo(point.x, point.y - outerRadius);
				ctx.closePath();
				ctx.fill();
			} else {
				ctx.arc(point.x, point.y, point.size || 3, 0, Math.PI * 2);
				ctx.fill();
			}
		});

		ctx.restore();
	};

	// SVG 动画
	useEffect(() => {
		let animationFrame: number;
		let frameCount = 0;
		let lastFpsUpdate = performance.now();

		const animateSvg = () => {
			if (!isSvgAnimating) return;

			const now = performance.now();
			frameCount++;

			if (now - lastFpsUpdate >= 1000) {
				setSvgFps(Math.round((frameCount * 1000) / (now - lastFpsUpdate)));
				frameCount = 0;
				lastFpsUpdate = now;
			}

			setPoints((prevPoints) =>
				prevPoints.map((point) => ({
					...point,
					x: point.x + (Math.random() - 0.5) * 2,
					y: point.y + (Math.random() - 0.5) * 2,
				})),
			);

			animationFrame = requestAnimationFrame(animateSvg);
		};

		if (isSvgAnimating) {
			animateSvg();
		}

		return () => {
			cancelAnimationFrame(animationFrame);
		};
	}, [isSvgAnimating]);

	// Canvas 动画
	useEffect(() => {
		let animationFrame: number;
		let frameCount = 0;
		let lastFpsUpdate = performance.now();
		let animatedPoints = [...canvasPoints];

		const animateCanvas = () => {
			if (!isCanvasAnimating) return;

			const now = performance.now();
			frameCount++;

			if (now - lastFpsUpdate >= 1000) {
				setCanvasFps(Math.round((frameCount * 1000) / (now - lastFpsUpdate)));
				frameCount = 0;
				lastFpsUpdate = now;
			}

			animatedPoints = animatedPoints.map((point) => ({
				...point,
				x: point.x + (Math.random() - 0.5) * 2,
				y: point.y + (Math.random() - 0.5) * 2,
			}));

			renderCanvas(animatedPoints);
			animationFrame = requestAnimationFrame(animateCanvas);
		};

		if (isCanvasAnimating) {
			console.log("animatedPoints:", isCanvasAnimating);
			animateCanvas();
		}

		return () => {
			cancelAnimationFrame(animationFrame);
		};
	}, [isCanvasAnimating, canvasPoints]);

	// 初始渲染 Canvas
	useEffect(() => {
		if (canvasPoints.length) {
			renderCanvas(points);
		}
	}, [canvasPoints, showComplexShapes]);
	useEffect(() => {
		// 渲染 Canvas 圆
		const canvas = canvasRef2.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		ctx.beginPath();
		ctx.arc(200, 200, 150, 0, Math.PI * 2);
		ctx.fillStyle = "#fff";
		ctx.fill();
	}, []);

	return (
		<Container>
			<h2>SVG vs Canvas 性能对比</h2>

			<Controls>
				<button onClick={() => generatePoints(1000)}>生成1000个点</button>
				<button onClick={() => generatePoints(10000)}>生成10000个点</button>
				<button onClick={() => setShowComplexShapes(!showComplexShapes)}>
					{showComplexShapes ? "使用简单图形" : "使用复杂图形"}
				</button>
				<input
					type="range"
					min="0.5"
					max="20"
					step="0.1"
					value={scale}
					onChange={(e) => setScale(Number(e.target.value))}
				/>
				缩放: {scale.toFixed(1)}x
			</Controls>

			<ComparisonSection>
				<RenderContainer>
					<h3>SVG 渲染</h3>
					<button onClick={() => setIsSvgAnimating(!isSvgAnimating)}>
						{isSvgAnimating ? "停止 SVG 动画" : "开始 SVG 动画"}
					</button>
					{isSvgAnimating && <Stats>FPS: {svgFps}</Stats>}
					<svg width="400" height="400">
						{points.map((point, index) =>
							showComplexShapes ? (
								<path
									key={index}
									d={(() => {
										const size = point.size || 3;
										const spikes = 5;
										const outerRadius = size;
										const innerRadius = size / 2;
										let path = "";
										let rot = (Math.PI / 2) * 3;
										let x = point.x;
										let y = point.y;
										const step = Math.PI / spikes;

										for (let i = 0; i <= spikes; i++) {
											x = point.x + Math.cos(rot) * outerRadius;
											y = point.y + Math.sin(rot) * outerRadius;
											path += (i === 0 ? "M" : "L") + x + "," + y;
											rot += step;

											x = point.x + Math.cos(rot) * innerRadius;
											y = point.y + Math.sin(rot) * innerRadius;
											path += "L" + x + "," + y;
											rot += step;
										}
										path += "Z";
										return path;
									})()}
									fill={point.color}
								/>
							) : (
								<circle key={index} cx={point.x} cy={point.y} r={point.size || 3} fill={point.color} />
							),
						)}
					</svg>
				</RenderContainer>

				<RenderContainer>
					<h3>Canvas 渲染</h3>
					<button onClick={() => setIsCanvasAnimating(!isCanvasAnimating)}>
						{isCanvasAnimating ? "停止 Canvas 动画" : "开始 Canvas 动画"}
					</button>
					{isCanvasAnimating && <Stats>FPS: {canvasFps}</Stats>}
					<canvas ref={canvasRef} width={400} height={400} />
				</RenderContainer>
			</ComparisonSection>

			<ComparisonSection>
				<RenderContainer>
					<h3>SVG 圆</h3>
					<svg width="400" height="400" style={{ transform: `scale(${scale})`, transformOrigin: "100px 100px" }}>
						<circle cx="200" cy="200" r="150" fill="#fff" />
					</svg>
				</RenderContainer>
				<RenderContainer>
					<h3>Canvas 圆</h3>
					<canvas
						ref={canvasRef2}
						width={400}
						height={400}
						style={{ transform: `scale(${scale})`, transformOrigin: "100px 100px" }}
					/>
				</RenderContainer>
			</ComparisonSection>

			<div>
				<h3>对比说明：</h3>
				<ul>
					<li>缩放效果：SVG 保持清晰度，Canvas 可能出现像素化</li>
					<li>大数据渲染：Canvas 在大量数据时性能更好，尤其是在动画场景</li>
					<li>复杂图形：使用复杂图形（五角星）时，SVG 和 Canvas 的性能差异更加明显</li>
					<li>动画性能：现在可以分别控制 SVG 和 Canvas 动画，并显示各自的 FPS</li>
				</ul>
			</div>
		</Container>
	);
};

export default ComparisonDemo;
