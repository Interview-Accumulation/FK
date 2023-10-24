import React, {useRef, useState, useEffect} from 'react'
import Konva from 'konva'
import logo from './logo192.png'


export default function KonvaCom() {
  const konvaRef = useRef(null);

  const getOffset = (e) => {
    const getClientRects = e.currentTarget.attrs.container.getClientRects()[0];

    const offsetX = e?.evt?.clientX - getClientRects.x;
    const offsetY = e.evt.clientY - getClientRects.y;
    return [offsetX, offsetY];
  };

  useEffect(() => {
    const img = new window.Image();
    img.src = logo;
    img.onload = function (e) {
      if(!e.target) return;
      
      if(!konvaRef.current) return;
      const stage = new Konva.Stage({
        container: konvaRef.current,
        width: 400,
        height: 400,
      });
      stage.on('contextmenu', (e) => {
        e.evt.preventDefault();
      })

      const imgLayer = new Konva.Layer();
      stage.add(imgLayer);
      const image = new Konva.Image({
        x: 0,
        y: 0,
        image: e.target,
        width: 400,
        height: 400,
      });
      imgLayer.add(image);

      const layer = new Konva.Layer();
      stage.add(layer);
      let rect;
      let originalRectPosition = {x: 0, y: 0};
      let rect1 = new Konva.Rect({
        x: 100,
        y: 100,
        width: 100,
        height: 100,
        opacity: 0.8,
        stroke: "red",
      });
      layer.add(rect1);
      
      stage.on("touchstart pointerdown", function (e) {
        console.log(111, e);
        rect = new Konva.Rect({
          x: getOffset(e)[0], //e.evt.touches[0].clientX,
          y: getOffset(e)[1], //e.evt.touches[0].clientY,
          width: 0,
          height: 0,
          opacity: 0.8,
          stroke: "red",
          strokeWidth: 4,
          draggable: true,
        });
        originalRectPosition = {
          x: getOffset(e)[0], // e.evt.touches[0].clientX,
          y: getOffset(e)[1], //e.evt.touches[0].clientY,
        };

        rect.on("touchstart pointerdown", (e) => {
          e.cancelBubble = true;
        });
        rect.on("dbltap", (e) => {
          e.target?.destroy();
        });
        let dragStartPosition;
        rect.on("dragstart", (e) => {
          e.cancelBubble = true;
          dragStartPosition = {
            x: e.evt?.clientX,
            y: e.evt?.clientY,
          };
        });
        rect.on("dragmove", (e) => {
          dragStartPosition = {
            x: e.evt.clientX,
            y: e.evt.clientY,
          };
          e.target.move({
            x: e.evt.clientX - dragStartPosition.x,
            y: e.evt.clientY - dragStartPosition.y,
          });
          layer.batchDraw();
        });
        // rect.on('dragend', e=>{
        //     dragStartPosition = null;
        // })
        layer.add(rect);
      });

      stage.on("touchmove pointermove", function (e) {
        if (!rect) {
          return;
        }
        if (!originalRectPosition) return;
        const x = Math.min(getOffset(e)[0], originalRectPosition.x);
        const y = Math.min(getOffset(e)[1], originalRectPosition.y);
        const width = Math.abs(getOffset(e)[0] - originalRectPosition.x);
        const height = Math.abs(getOffset(e)[1] - originalRectPosition.y);
        rect.setAttrs({
          x: x,
          y: y,
          width: width,
          height: height,
        });
        layer.batchDraw();
      });

      stage.on("touchend pointerleave", function (e) {
        console.log(e);
        rect = null;
      });
    }


  }, [])


  return (
    <div>
      <div style={{
        width: '400px',
        height: '400px',
      }}>
        <div ref={konvaRef} style={{width: '100%'}}></div>
      </div>
    </div>
  )
}
