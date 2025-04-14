import {
  useRef,
  useState,
  type ChangeEvent,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from "react";
import {
  ReactSketchCanvas,
  type ReactSketchCanvasRef,
} from "react-sketch-canvas";
import { Button } from "@/components/ui/button";
import { Eraser, Pen, Redo, RotateCcw, Undo } from "lucide-react";
import ToolButton from "./ToolButton";

const CanvasComponent = forwardRef((_, ref) => {
  const colorInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<ReactSketchCanvasRef>(null);
  const [strokeColor, setStrokeColor] = useState("#12ded7");
  const [eraseMode, setEraseMode] = useState(false);

  const [penWidth, setPenWidth] = useState(5);
  const [eraserWidth, setEraserWidth] = useState(10);


  const handlePenWidthChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPenWidth(+event.target.value);
  };

  const handleEraserWidthChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEraserWidth(+event.target.value);
  };

  const handleStrokeColorChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newColor = event.target.value;
    setStrokeColor(newColor);
    setEraseMode(false);
    canvasRef.current?.eraseMode(false);
  };

  const handleEraserClick = useCallback(() => {
    setEraseMode(true);
    canvasRef.current?.eraseMode(true);
  }, []);

  const handlePenClick = useCallback(() => {
    setEraseMode(false);
    canvasRef.current?.eraseMode(false);
  }, []);

  const handleUndoClick = useCallback(() => {
    canvasRef.current?.undo();
  }, []);

  const handleRedoClick = useCallback(() => {
    canvasRef.current?.redo();
  }, []);

  const handleClearClick = useCallback(() => {
    canvasRef.current?.clearCanvas();
  }, []);

  // Expose canvas methods to parent
  useImperativeHandle(ref, () => ({
    async getImage() {
      return await canvasRef.current?.exportImage("png");
    },
  }));

  // Reusable tool button
  

  return (
    <div className="flex h-screen w-full gap-4 relative bg-primary">
      <ReactSketchCanvas
        width="100%"
        ref={canvasRef}
        strokeColor={strokeColor}
        canvasColor="transparent"
        className="!rounded-2xl shadow-lg !border-primary z-10"
      />

      {/* Brush sidebar */}
      <aside className="w-12 sm:w-16 lg:w-[3vw] bg-icon rounded-3xl h-[70vh] absolute z-20 right-2 top-[15vh] flex flex-col items-center overflow-y-auto py-6 gap-6 divide-y divide-cyan-400">
        <Button
          size="icon"
          className="mb-4"
          type="button"
          aria-label="Pick stroke color"
          onClick={() => colorInputRef.current?.click()}
          style={{ backgroundColor: strokeColor }}
        >
          <input
            type="color"
            ref={colorInputRef}
            className="sr-only"
            value={strokeColor}
            onChange={handleStrokeColorChange}
          />
        </Button>

        <section className="flex flex-col gap-3 pt-2">
          <ToolButton
            icon={<Pen size={16} />}
            onClick={handlePenClick}
            disabled={!eraseMode}
            label="Pen Tool"
          />
          <ToolButton
            icon={<Eraser size={16} />}
            onClick={handleEraserClick}
            disabled={eraseMode}
            label="Eraser Tool"
          />
        </section>



        <div className="flex flex-col items-center gap-2">
          <label className="text-sm text-white">
            {eraseMode ? "Eraser Width" : "Brush Width"}
          </label>


          {eraseMode ? (
            <input
              // disabled={eraseMode}
              type="range"
              className="form-range"
              min="1"
              max="50"
              step="1"
              id="strokeWidth"
              value={penWidth}
              onChange={handlePenWidthChange}
            />) :
            (
              <input
                // disabled={!eraseMode}
                type="range"
                className="form-range"
                min="1"
                max="50"
                step="1"
                id="eraserWidth"
                value={eraserWidth}
                onChange={handleEraserWidthChange}
              />
            )
          }

          {/* <input
            type="range"
            min="1"
            max="50"
            step="1"
            value={eraseMode ? eraserWidth : penWidth}
            onChange={(e) => {
              const newSize = +e.target.value;
              if (eraseMode) {
                setEraserWidth(newSize);
              } else {
                setPenWidth(newSize);
              }
            }}
          /> */}
          <span className="text-white text-xs">
            {eraseMode ? eraserWidth : penWidth}px
          </span>
        </div>



        <section className="flex flex-col gap-3 pt-6">
          <ToolButton
            icon={<Undo size={16} />}
            onClick={handleUndoClick}
            label="Undo"
          />
          <ToolButton
            icon={<Redo size={16} />}
            onClick={handleRedoClick}
            label="Redo"
          />
          <ToolButton
            icon={<RotateCcw size={16} />}
            onClick={handleClearClick}
            label="Clear Canvas"
          />


        </section>
      </aside>
    </div>
  );
});

CanvasComponent.displayName = "CanvasComponent";
export default CanvasComponent;
