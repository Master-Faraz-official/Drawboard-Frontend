"use client";

import {
  useRef,
  useState,
} from "react";
import { type ReactSketchCanvasRef } from "react-sketch-canvas";
import CanvasArea from "@/components/canvas/CanvasArea";
import CanvasActionPanel from "@/components/canvas/CanvasActionPanel";
import CanvasDock from "@/components/canvas/CanvasDock";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const formSchema = z.object({
  prompt: z.string(),
});

const Page = () => {
  const canvasRef = useRef<ReactSketchCanvasRef>(null);

  const [strokeColor, setStrokeColor] = useState("#12ded7");
  const [eraseMode, setEraseMode] = useState(false);
  const [penWidth, setPenWidth] = useState(5);
  const [eraserWidth, setEraserWidth] = useState(10);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { prompt: "" },
  });
  

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="flex flex-1 w-full gap-4 relative bg-primary">
        <CanvasArea
          canvasRef={canvasRef}
          eraserWidth={eraserWidth}
          penWidth={penWidth}
          strokeColor={strokeColor}
        />

        <CanvasActionPanel
          canvasRef={canvasRef}
          eraseMode={eraseMode}
          eraserWidth={eraserWidth}
          penWidth={penWidth}
          setEraseMode={setEraseMode}
          setEraserWidth={setEraserWidth}
          setPenWidth={setPenWidth}
          setStrokeColor={setStrokeColor}
          strokeColor={strokeColor}
          form = {form}
          
        />

        <CanvasDock form={form} canvasRef={canvasRef} />
      </div>


    </div>
  );
};

export default Page;
