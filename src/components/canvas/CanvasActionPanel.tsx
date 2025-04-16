import React, { useCallback, useRef, useState, type ChangeEvent, } from 'react'
import { Button } from '../ui/button';
import ToolButton from '../ToolButton';
import { ReactSketchCanvasRef } from 'react-sketch-canvas';
import { Dot, Eraser, Pen, Play, Redo, RotateCcw, Undo } from "lucide-react";
import { Slider } from "@/components/ui/slider"



type canvasActionPanelProps = {
    canvasRef: React.RefObject<ReactSketchCanvasRef | null>,
    strokeColor: string;
    setStrokeColor: (color: string) => void;
    eraseMode: boolean;
    setEraseMode: (mode: boolean) => void;
    penWidth: number;
    eraserWidth: number;
    setPenWidth: (width: number) => void;
    setEraserWidth: (width: number) => void;

}

const CanvasActionPanel = ({
    canvasRef,
    strokeColor,
    setStrokeColor,
    eraseMode,
    setEraseMode,
    penWidth,
    eraserWidth,
    setPenWidth,
    setEraserWidth


}: canvasActionPanelProps) => {

    // States 
    const colorInputRef = useRef<HTMLInputElement>(null);
    

    // Functions

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


    const handleSubmit = useCallback(async () => {
        const imagePath = await canvasRef.current?.exportImage("png");
        console.log(imagePath)
    }, []);


    return (
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
                    onClick={handleSubmit}
                    label="Clear Canvas"
                />


            </section>
        </aside>
    )
}

export default CanvasActionPanel