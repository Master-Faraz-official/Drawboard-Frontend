
import { Sparkles, Lightbulb } from "lucide-react";
import { Dock, DockIcon } from '@/components/magicui/dock';
import IconPopover from "./IconPopover";
import { UseFormReturn } from "react-hook-form";
import { ReactSketchCanvasRef } from "react-sketch-canvas";

interface propType {
    form: UseFormReturn<{ prompt: string; }>
    canvasRef: React.RefObject<ReactSketchCanvasRef | null>,
    result: object;
    setResult: (res: object) => void
}

const iconstyle = " hover:bg-icon hover:text-black"

const CanvasDock = ({ form, canvasRef, result, setResult }: propType) => {

    return (
        <Dock direction="bottom" iconMagnification={60} className='border-none z-20 bg-secondary absolute bottom-5 right-[48%]  text-slate-400'>
            <DockIcon className={iconstyle}>
                <IconPopover icon={Sparkles} form={form} canvasRef={canvasRef} type="prompt" setResult={setResult} result={result} />
            </DockIcon>


            <DockIcon className={iconstyle}>

                {/* <Lightbulb /> */}
                <Lightbulb className=" text-yellow-400 animate-pulse" style={{ filter: "drop-shadow(0 0 6px #facc15)" }} />

            </DockIcon>
        </Dock>

    )
}

export default CanvasDock