import { mat4 } from "gl-matrix";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    justify-content: space-around;
    padding: 20px;
    background-color: #f5f5f5;
`;

const DemoSection = styled.div`
    text-align: center;
    position: relative;

    canvas {
        border: 1px solid #ccc;
        background-color: black;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        margin-top: 10px;
    }

    h2 {
        color: #333;
        margin-bottom: 15px;
    }
`;

const FPSCounter = styled.div`
    position: absolute;
    top: 50px;
    right: 10px;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 5px 10px;
    border-radius: 4px;
    font-family: monospace;
`;

const Controls = styled.div`
    margin-top: 10px;
    
    input {
        margin: 0 10px;
    }
`;

// 立方体顶点数据
const CUBE_VERTICES = new Float32Array([
	// 前面
	-1, -1, 1, 0, 0, 1, 1, -1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, -1, 1, 1, 0, 0, 1,
	// 后面
	-1, -1, -1, 0, 0, -1, 1, -1, -1, 0, 0, -1, 1, 1, -1, 0, 0, -1, -1, 1, -1, 0, 0, -1,
	// 顶面
	-1, 1, -1, 0, 1, 0, 1, 1, -1, 0, 1, 0, 1, 1, 1, 0, 1, 0, -1, 1, 1, 0, 1, 0,
	// 底面
	-1, -1, -1, 0, -1, 0, 1, -1, -1, 0, -1, 0, 1, -1, 1, 0, -1, 0, -1, -1, 1, 0, -1, 0,
	// 右面
	1, -1, -1, 1, 0, 0, 1, 1, -1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, -1, 1, 1, 0, 0,
	// 左面
	-1, -1, -1, -1, 0, 0, -1, 1, -1, -1, 0, 0, -1, 1, 1, -1, 0, 0, -1, -1, 1, -1, 0, 0,
]);

const CUBE_INDICES = new Uint16Array([
	0,
	1,
	2,
	0,
	2,
	3, // 前面
	4,
	5,
	6,
	4,
	6,
	7, // 后面
	8,
	9,
	10,
	8,
	10,
	11, // 顶面
	12,
	13,
	14,
	12,
	14,
	15, // 底面
	16,
	17,
	18,
	16,
	18,
	19, // 右面
	20,
	21,
	22,
	20,
	22,
	23, // 左面
]);

const WebGLWebGPUDemo: React.FC = () => {
	const webglCanvasRef = useRef<HTMLCanvasElement>(null);
	const webgpuCanvasRef = useRef<HTMLCanvasElement>(null);
	const [cubeCount, setCubeCount] = useState(1000);
	const [webglFPS, setWebglFPS] = useState(0);
	const [webgpuFPS, setWebgpuFPS] = useState(0);

	// WebGL 初始化和渲染
	const initWebGL = (canvas: HTMLCanvasElement) => {
		const gl = canvas.getContext("webgl")!;
		if (!gl) return;

		// 顶点着色器
		const vertexShader = gl.createShader(gl.VERTEX_SHADER)!;
		const vertexShaderSource = `
            attribute vec3 position;
            attribute vec3 normal;
            uniform mat4 modelViewMatrix;
            uniform mat4 projectionMatrix;
            varying vec3 vNormal;
            
            void main() {
                vNormal = normal;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position * 0.1, 1.0);
            }
        `;
		gl.shaderSource(vertexShader, vertexShaderSource);
		gl.compileShader(vertexShader);

		// 片元着色器
		const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!;
		const fragmentShaderSource = `
            precision mediump float;
            varying vec3 vNormal;
            
            void main() {
                vec3 light = normalize(vec3(1.0, 1.0, 1.0));
                float intensity = max(dot(vNormal, light), 0.0);
                vec3 color = vec3(1.0, 0.0, 0.0);
                gl_FragColor = vec4(color * intensity, 1.0);
            }
        `;
		gl.shaderSource(fragmentShader, fragmentShaderSource);
		gl.compileShader(fragmentShader);

		// 创建程序
		const program = gl.createProgram()!;
		gl.attachShader(program, vertexShader);
		gl.attachShader(program, fragmentShader);
		gl.linkProgram(program);
		gl.useProgram(program);

		// 创建缓冲
		const vertexBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, CUBE_VERTICES, gl.STATIC_DRAW);

		const indexBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, CUBE_INDICES, gl.STATIC_DRAW);

		// 获取属性位置
		const positionLoc = gl.getAttribLocation(program, "position");
		const normalLoc = gl.getAttribLocation(program, "normal");
		const modelViewMatrixLoc = gl.getUniformLocation(program, "modelViewMatrix");
		const projectionMatrixLoc = gl.getUniformLocation(program, "projectionMatrix");

		// 设置顶点属性
		gl.enableVertexAttribArray(positionLoc);
		gl.enableVertexAttribArray(normalLoc);
		gl.vertexAttribPointer(positionLoc, 3, gl.FLOAT, false, 24, 0);
		gl.vertexAttribPointer(normalLoc, 3, gl.FLOAT, false, 24, 12);

		// 设置深度测试
		gl.enable(gl.DEPTH_TEST);

		// 创建矩阵
		const projectionMatrix = mat4.create();
		mat4.perspective(projectionMatrix, Math.PI / 4, canvas.width / canvas.height, 0.1, 100.0);
		gl.uniformMatrix4fv(projectionMatrixLoc, false, projectionMatrix);

		let lastTime = 0;
		let frameCount = 0;
		let lastFPSUpdate = 0;

		// 渲染循环
		const render = (time: number) => {
			time *= 0.001; // 转换为秒
			const deltaTime = time - lastTime;
			lastTime = time;

			// 更新FPS
			frameCount++;
			if (time - lastFPSUpdate >= 1.0) {
				setWebglFPS(Math.round(frameCount / (time - lastFPSUpdate)));
				frameCount = 0;
				lastFPSUpdate = time;
			}

			gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

			// 渲染多个立方体
			for (let i = 0; i < cubeCount; i++) {
				const modelViewMatrix = mat4.create();
				const x = ((i % 10) - 5) * 2;
				const y = (Math.floor(i / 100) - 5) * 2;
				const z = (Math.floor((i % 100) / 10) - 5) * 2;

				mat4.translate(modelViewMatrix, modelViewMatrix, [x, y, -20 + z]);
				mat4.rotate(modelViewMatrix, modelViewMatrix, time + i * 0.1, [1, 1, 0]);

				gl.uniformMatrix4fv(modelViewMatrixLoc, false, modelViewMatrix);
				gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);
			}

			requestAnimationFrame(render);
		};

		requestAnimationFrame(render);
	};

	// WebGPU 初始化和渲染
	const initWebGPU = async (canvas: HTMLCanvasElement) => {
		if (!navigator.gpu) return;
		const adapter = await navigator.gpu.requestAdapter();
		console.log("adapter:", adapter);
		if (!adapter) return;

		const device = await adapter.requestDevice();
		const context = canvas.getContext("webgpu")!;
		const format = navigator.gpu.getPreferredCanvasFormat();
		console.log("format:", format, context, device);

		context.configure({
			device,
			format,
			alphaMode: "premultiplied",
		});

		// 创建着色器
		const shader = device.createShaderModule({
			code: `
                struct Uniforms {
                    modelViewMatrix: mat4x4f,
                    projectionMatrix: mat4x4f,
                };

                @group(0) @binding(0) var<uniform> uniforms: Uniforms;

                struct VertexOutput {
                    @builtin(position) position: vec4f,
                    @location(0) normal: vec3f,
                };

                @vertex
                fn vertexMain(
                    @location(0) position: vec3f,
                    @location(1) normal: vec3f,
                ) -> VertexOutput {
                    var output: VertexOutput;
                    output.position = uniforms.projectionMatrix * uniforms.modelViewMatrix * vec4f(position * 0.1, 1.0);
                    output.normal = normal;
                    return output;
                }

                @fragment
                fn fragmentMain(@location(0) normal: vec3f) -> @location(0) vec4f {
                    let light = normalize(vec3f(1.0, 1.0, 1.0));
                    let intensity = max(dot(normal, light), 0.0);
                    let color = vec3f(0.0, 0.0, 1.0);
                    return vec4f(color * intensity, 1.0);
                }
            `,
		});

		// 创建渲染管线
		const pipeline = device.createRenderPipeline({
			layout: "auto",
			vertex: {
				module: shader,
				entryPoint: "vertexMain",
				buffers: [
					{
						arrayStride: 24,
						attributes: [
							{
								format: "float32x3",
								offset: 0,
								shaderLocation: 0,
							},
							{
								format: "float32x3",
								offset: 12,
								shaderLocation: 1,
							},
						],
					},
				],
			},
			fragment: {
				module: shader,
				entryPoint: "fragmentMain",
				targets: [
					{
						format,
					},
				],
			},
			primitive: {
				topology: "triangle-list",
				cullMode: "back",
			},
			depthStencil: {
				depthWriteEnabled: true,
				depthCompare: "less",
				format: "depth24plus",
			},
		});

		// 创建顶点缓冲
		const vertexBuffer = device.createBuffer({
			size: CUBE_VERTICES.byteLength,
			usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
		});
		device.queue.writeBuffer(vertexBuffer, 0, CUBE_VERTICES);

		const indexBuffer = device.createBuffer({
			size: CUBE_INDICES.byteLength,
			usage: GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST,
		});
		device.queue.writeBuffer(indexBuffer, 0, CUBE_INDICES);

		// 创建uniform缓冲
		const uniformBufferSize = 2 * 16 * 4; // 两个4x4矩阵
		const uniformBuffer = device.createBuffer({
			size: uniformBufferSize,
			usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
		});

		// 创建绑定组
		const bindGroup = device.createBindGroup({
			layout: pipeline.getBindGroupLayout(0),
			entries: [
				{
					binding: 0,
					resource: {
						buffer: uniformBuffer,
					},
				},
			],
		});

		// 创建深度纹理
		const depthTexture = device.createTexture({
			size: [canvas.width, canvas.height],
			format: "depth24plus",
			usage: GPUTextureUsage.RENDER_ATTACHMENT,
		});

		// 创建投影矩阵
		const projectionMatrix = mat4.create();
		mat4.perspective(projectionMatrix, Math.PI / 4, canvas.width / canvas.height, 0.1, 100.0);

		let lastTime = 0;
		let frameCount = 0;
		let lastFPSUpdate = 0;

		// 渲染循环
		const render = async (time: number) => {
			time *= 0.001;
			const deltaTime = time - lastTime;
			lastTime = time;

			// 更新FPS
			frameCount++;
			if (time - lastFPSUpdate >= 1.0) {
				setWebgpuFPS(Math.round(frameCount / (time - lastFPSUpdate)));
				frameCount = 0;
				lastFPSUpdate = time;
			}

			const commandEncoder = device.createCommandEncoder();
			const textureView = context.getCurrentTexture().createView();

			const renderPass = commandEncoder.beginRenderPass({
				colorAttachments: [
					{
						view: textureView,
						clearValue: { r: 0, g: 0, b: 0, a: 1.0 },
						loadOp: "clear",
						storeOp: "store",
					},
				],
				depthStencilAttachment: {
					view: depthTexture.createView(),
					depthClearValue: 1.0,
					depthLoadOp: "clear",
					depthStoreOp: "store",
				},
			});

			renderPass.setPipeline(pipeline);
			renderPass.setVertexBuffer(0, vertexBuffer);
			renderPass.setIndexBuffer(indexBuffer, "uint16");

			// 渲染多个立方体
			for (let i = 0; i < cubeCount; i++) {
				const modelViewMatrix = mat4.create();
				const x = ((i % 10) - 5) * 2;
				const y = (Math.floor(i / 100) - 5) * 2;
				const z = (Math.floor((i % 100) / 10) - 5) * 2;

				mat4.translate(modelViewMatrix, modelViewMatrix, [x, y, -20 + z]);
				mat4.rotate(modelViewMatrix, modelViewMatrix, time + i * 0.1, [1, 1, 0]);

				const uniformData = new Float32Array(32);
				uniformData.set(modelViewMatrix, 0);
				uniformData.set(projectionMatrix, 16);
				device.queue.writeBuffer(uniformBuffer, 0, uniformData);

				renderPass.setBindGroup(0, bindGroup);
				renderPass.drawIndexed(36, 1, 0, 0, 0);
			}

			renderPass.end();
			device.queue.submit([commandEncoder.finish()]);

			requestAnimationFrame(render);
		};

		requestAnimationFrame(render);
	};

	useEffect(() => {
		if (webglCanvasRef.current) {
			initWebGL(webglCanvasRef.current);
		}
		if (webgpuCanvasRef.current) {
			console.log("webgpuCanvasRef.current:", webgpuCanvasRef.current);
			initWebGPU(webgpuCanvasRef.current);
		}
	}, []);

	return (
		<Container>
			<DemoSection>
				<h2>WebGL 渲染</h2>
				{/* <canvas ref={webglCanvasRef} width={400} height={400} /> */}
				<FPSCounter>FPS: {webglFPS}</FPSCounter>
			</DemoSection>
			<DemoSection>
				<h2>WebGPU 渲染</h2>
				<canvas ref={webgpuCanvasRef} width={400} height={400} />
				<FPSCounter>FPS: {webgpuFPS}</FPSCounter>
			</DemoSection>
			<Controls>
				<label>
					立方体数量：
					<input
						type="range"
						min="100"
						max="10000"
						value={cubeCount}
						onChange={(e) => setCubeCount(Number.parseInt(e.target.value))}
					/>
					{cubeCount}
				</label>
			</Controls>
		</Container>
	);
};

export default WebGLWebGPUDemo;
