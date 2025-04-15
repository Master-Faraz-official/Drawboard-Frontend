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
import { Dot, Eraser, Pen, Play, Redo, RotateCcw, Undo } from "lucide-react";
import ToolButton from "./ToolButton";
import { Slider } from "@/components/ui/slider"


const CanvasComponent = forwardRef((_, ref) => {
  const colorInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<ReactSketchCanvasRef>(null);
  const [strokeColor, setStrokeColor] = useState("#12ded7");
  const [eraseMode, setEraseMode] = useState(false);

  const [penWidth, setPenWidth] = useState(5);
  const [eraserWidth, setEraserWidth] = useState(10);
  // const [strokeSize, setStrokeSize] = useState("")

  // For eraser and pen size change

  const handleStrokeChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (eraseMode) {
      setEraserWidth(+event.target.value);
    }
    else {
      setPenWidth(+event.target.value);
    }
  }

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


  return (
    <div className="flex h-screen w-full gap-4 relative bg-primary">
      <ReactSketchCanvas
        width="100%"
        ref={canvasRef}
        strokeColor={strokeColor}
        canvasColor="transparent"
        className="!rounded-2xl shadow-lg !border-primary z-10"
        strokeWidth={penWidth}
        eraserWidth={eraserWidth}
      />

      {/* Brush sidebar */}
      {/* bg-[#363738]  */}
      <aside className="w-12 sm:w-16 lg:w-[3vw] rounded-3xl bg-secondary h-[80vh] absolute z-20 right-2 top-[10vh] flex flex-col items-center overflow-y-auto py-6 gap-6 divide-y divide-cyan-400">
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

        <section className="flex flex-col items-center gap-2 w-[2vw] pt-2">

          <Dot className="w-[30px] rounded-full h-[30px]" size={16} strokeWidth={eraseMode ? eraserWidth : penWidth} color={eraseMode ? "#ffffff" : strokeColor} />

          <Slider
            value={[eraseMode ? eraserWidth : penWidth]}
            min={1}
            max={20}
            step={1}
            onValueChange={(value) => {
              if (eraseMode) {
                setEraserWidth(value[0]);
              } else {
                setPenWidth(value[0]);
              }
            }}
            className="w-[2vw] mt-1"
          />


          <span className="text-white text-xs pt-1">
            {eraseMode ? eraserWidth : penWidth}px
          </span>
        </section>

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
          <ToolButton
            icon={<Play size={16} />}
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
