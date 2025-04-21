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
import LoadingSpinner from "@/components/LoadingSpinner";

export const formSchema = z.object({
  prompt: z.string(),
});

export type ResultType = {
  expr: string;
  result: number | Record<string, number>; // can be a simple number or an object like { x: 3.5, "2x": 7 }
  assign?: boolean; // optional because not all results will have this
};


const Page = () => {
  const canvasRef = useRef<ReactSketchCanvasRef>(null);

  const [strokeColor, setStrokeColor] = useState("#12ded7");
  const [eraseMode, setEraseMode] = useState(false);
  const [penWidth, setPenWidth] = useState(5);
  const [eraserWidth, setEraserWidth] = useState(10);

  const [result, setResult] = useState<ResultType[]>([]);
  const [loading, setLoading] = useState(false)


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
          form={form}
          // result={result}
          setResult={setResult}
          setLoading ={setLoading}


        />

        <CanvasDock
          form={form}
          canvasRef={canvasRef}
          result={result}
          setResult={setResult}
          setLoading ={setLoading}
          
        />
      </div>

      {loading && <LoadingSpinner />}

    </div>
  );
};

export default Page;
