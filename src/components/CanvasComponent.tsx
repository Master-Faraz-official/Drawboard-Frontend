import {
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";

import { type ReactSketchCanvasRef } from "react-sketch-canvas";

import CanvasArea from "./canvas/CanvasArea";
import CanvasActionPanel from "./canvas/CanvasActionPanel";


const CanvasComponent = forwardRef((_, ref) => {
  const canvasRef = useRef<ReactSketchCanvasRef>(null);
  const [strokeColor, setStrokeColor] = useState("#12ded7");
  const [eraseMode, setEraseMode] = useState(false);

  const [penWidth, setPenWidth] = useState(5);
  const [eraserWidth, setEraserWidth] = useState(10);


  // Expose canvas methods to parent
  useImperativeHandle(ref, () => ({
    async getImage() {
      return await canvasRef.current?.exportImage("png");
    },
    
  }));


  return (
    <div className="flex h-screen w-full gap-4 relative bg-primary">

      <CanvasArea canvasRef={canvasRef} eraserWidth={eraserWidth} penWidth={penWidth} strokeColor={strokeColor} />

      <CanvasActionPanel
        canvasRef={canvasRef}
        eraseMode={eraseMode}
        eraserWidth={eraserWidth}
        penWidth={penWidth}
        setEraseMode={setEraseMode}
        setEraserWidth={setEraserWidth}
        setPenWidth={setPenWidth}
        setStrokeColor={setStrokeColor}
        strokeColor={strokeColor} />


    </div>
  );
});

CanvasComponent.displayName = "CanvasComponent";
export default CanvasComponent;
