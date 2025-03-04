import { useRef, useState, type ChangeEvent, forwardRef, useImperativeHandle } from "react";
import { ReactSketchCanvas, type ReactSketchCanvasRef } from "react-sketch-canvas";
import { Button } from "@/components/ui/button";
import { Eraser, Pen, Redo, RotateCcw, Undo } from "lucide-react";

// Forward ref to allow parent to access canvasRef
const CanvasComponent = forwardRef((_, ref) => {
  const colorInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<ReactSketchCanvasRef>(null);
  const [strokeColor, setStrokeColor] = useState("#a855f7");
  const [eraseMode, setEraseMode] = useState(false);

  function handleStrokeColorChange(event: ChangeEvent<HTMLInputElement>) {
    setStrokeColor(event.target.value);
  }

  function handleEraserClick() {
    setEraseMode(true);
    canvasRef.current?.eraseMode(true);
  }

  function handlePenClick() {
    setEraseMode(false);
    canvasRef.current?.eraseMode(false);
  }

  function handleUndoClick() {
    canvasRef.current?.undo();
  }

  function handleRedoClick() {
    canvasRef.current?.redo();
  }

  function handleClearClick() {
    canvasRef.current?.clearCanvas();
  }

  // Expose canvas functions to parent using ref
  useImperativeHandle(ref, () => ({
    async getImage() {
      return await canvasRef.current?.exportImage("png");
    },
  }));

  return (
    <div className="flex h-[70vh] gap-4 p-5">
      <ReactSketchCanvas
        width="100%"
        ref={canvasRef}
        strokeColor={strokeColor}
        canvasColor="transparent"
        className="!rounded-2xl shadow-lg !border-slate-300"
      />
      <div className="flex flex-col items-center gap-y-6 divide-y divide-purple-200 py-4 dark:divide-purple-900">
        <Button size="icon" type="button" onClick={() => colorInputRef.current?.click()} style={{ backgroundColor: strokeColor }}>
          <input type="color" ref={colorInputRef} className="sr-only" value={strokeColor} onChange={handleStrokeColorChange} />
        </Button>
        <div className="flex flex-col gap-3 pt-6">
          <Button size="icon" type="button" variant="outline" disabled={!eraseMode} onClick={handlePenClick}>
            <Pen size={16} />
          </Button>
          <Button size="icon" type="button" variant="outline" disabled={eraseMode} onClick={handleEraserClick}>
            <Eraser size={16} />
          </Button>
        </div>
        <div className="flex flex-col gap-3 pt-6">
          <Button size="icon" type="button" variant="outline" onClick={handleUndoClick}>
            <Undo size={16} />
          </Button>
          <Button size="icon" type="button" variant="outline" onClick={handleRedoClick}>
            <Redo size={16} />
          </Button>
          <Button size="icon" type="button" variant="outline" onClick={handleClearClick}>
            <RotateCcw size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
});

CanvasComponent.displayName = "CanvasComponent";
export default CanvasComponent;
