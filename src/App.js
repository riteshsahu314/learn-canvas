import "./App.css";
import { fabric } from "fabric";
import { useEffect } from "react";

const defaultOptions = {
  fill: "white",
  width: 500,
  height: 281,
}

const margin = 10

function App() {
  // const canvasEl = useRef(null);
  useEffect(() => {
    
    var canvas = new fabric.Canvas("canvas", {
      width: getContainerSize().width,
      height: getContainerSize().height,
      backgroundColor: "yellow",
      preserveObjectStacking: true,
      fireRightClick: true,
      controlsAboveOverlay: true,
    });

    var c1 = new fabric.Circle({
      top: 100,
      left: 100,
      fill: "green",
      radius: 50,
    });

    var c2 = new fabric.Circle({
      top: 200,
      left: 200,
      fill: "red",
      radius: 50,
    });

    var g1 = new fabric.Group([c1, c2], {});

    var frame = new fabric.Rect({
      width: 500,
      height: 281,
      fill: "white",
      // absolutePositioned: true,
      evented: false,
      selectable: false,
      stroke: "blue",
      strokeWidth: 10,
      strokeDashArray: [8,8],
      // paintFirst: 'fill',
      // strokeUniform: true
      // originX: 'center',
      // originY: 'center'
    });

    canvas.add(frame);
    // canvas.add(g1);
    // frame.center();
    // g1.center();

    function onResize(e) {
    
      // const ratio = canvas.getWidth() / canvas.getHeight();
      // const containerWidth   = window.innerWidth;
      // const containerHeight  = window.innerHeight;
  
      // const scale = containerWidth / canvas.getWidth();
      // const zoom  = canvas.getZoom() * scale;
      // canvas.setDimensions({width: containerWidth, height: containerWidth / ratio});
      // canvas.setViewportTransform([zoom, 0, 0, zoom, 0, 0]);
      // canvas.renderAll();

      const ratio = canvas.getHeight() / canvas.getWidth();
      const containerWidth   = getContainerSize().width;
      const containerHeight  = getContainerSize().height;
  
      const scale = canvas.getHeight() / (frame.height);
      const zoom  = scale;
      console.log(zoom, "zoom")
      // const zoom  = canvas.getZoom() * scale;
      canvas.setDimensions({width: containerWidth, height: containerHeight});
      canvas.setViewportTransform([zoom, 0, 0, zoom, 0, 0]);
      const frameScale = containerHeight / frame.height;
      canvas.renderAll();
    }

    window.addEventListener("resize", onResize);
    // canvas.setViewportTransform([1, 0, 0, 1, 0, 0])

    // canvas.renderAll();
    onResize();

    // make the fabric.Canvas instance available to your app
    // updateCanvasContext(canvas);
    return () => {
      // updateCanvasContext(null);
      canvas.dispose();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  function getContainerSize() {
    const root = document.getElementById('root')
    return root.getBoundingClientRect()
  }


  return <canvas width="300" height="300" id="canvas" />;
}

export default App;