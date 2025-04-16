import React from "react";
import { ReactSketchCanvas, type ReactSketchCanvasRef } from "react-sketch-canvas";

type canvasAreaProp = {
    canvasRef: React.RefObject<ReactSketchCanvasRef  | null>,
    strokeColor: string,
    penWidth: number,
    eraserWidth: number
}

const CanvasArea = ({ canvasRef, strokeColor, penWidth, eraserWidth }: canvasAreaProp) => {
    return (
        <ReactSketchCanvas
            width="100%"
            ref={canvasRef}
            strokeColor={strokeColor}
            canvasColor="transparent"
            className="!rounded-2xl shadow-lg !border-primary z-10"
            strokeWidth={penWidth}
            eraserWidth={eraserWidth}
        />
    )
}

export default CanvasArea