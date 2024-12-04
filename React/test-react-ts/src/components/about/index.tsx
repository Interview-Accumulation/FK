import {
  useInRouterContext,
  useNavigationType,
  useResolvedPath
} from 'react-router-dom'
import React, { useEffect } from 'react'
import Konva from 'konva'

export default function Index() {
  console.log('是否处于路由的上下文环境？', useInRouterContext());
  console.log(useNavigationType());

  const resolvedPath = useResolvedPath('/about?search1=1&search2=2');
  console.log('resolvedPath', resolvedPath);//resolvedPath {pathname: '/about', search: '?search1=1&search2=2', hash: ''}

  useEffect(() => {
    const stage = new Konva.Stage({
      container: 'container',
      width: 500,
      height: 500,
    });
    const layer = new Konva.Layer();
    stage.add(layer);

    // 画一条轨迹线，要求是几条直线拼接
    const line = new Konva.Line({
      points: [0, 300, 100, 200],
      stroke: '#254b7b',
      strokeWidth: 3,
      lineCap: 'round',
      lineJoin: 'round',
    });
    layer.add(line);
    const line2 = new Konva.Line({
      points: [50, 250, 400, 290, 450, 100],
      stroke: '#254b7b',
      strokeWidth: 3,
      lineCap: 'round',
      lineJoin: 'round',
    });
    layer.add(line2);

    // 线上创建一个小点，绑定鼠标事件，移入加入动画，移出取消动画
    const circle = new Konva.Circle({
      x: 50,
      y: 250,
      radius: 5,
      fill: 'red',
      draggable: true,
    });
    layer.add(circle);

    const blueHex = new Konva.RegularPolygon({
      x: 50,
      y: stage.height() / 2,
      sides: 6,
      radius: 40,
      fill: '#00D2FF',
      stroke: 'black',
      strokeWidth: 4,
      draggable: true
    });
    layer.add(blueHex);

    const period = 2000;
    const anim = new Konva.Animation(function (frame) {
      const scale = Math.sin((frame.time * 2 * Math.PI) / period) + 0.001;
      circle.scale({ x: scale, y: scale });
      blueHex.scale({ x: scale, y: scale });

    }, layer);
    // anim.start()
    let isRunning = false;
    blueHex.on('click', function () {
      anim.start();
      isRunning = !isRunning;
    });
    blueHex.on('click', function () {
      if (isRunning) {
        anim.stop();
      }
    });

    stage.draw();
  }, []);

  return (
    <div style={{
      width: '100%',
      height: '80vh',
      background: 'linear-gradient(90deg, #141e30, #243b55)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      {/* <iframe
        src="https://campus.thingjs.com/s/p/5QnpghiJQ7h"
        title="baidu"
        width="100%"
        height="700px"
      ></iframe> */}
      <div id='container'></div>
    </div>
  )
}
