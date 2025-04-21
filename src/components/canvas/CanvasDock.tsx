
import { Dock, DockIcon } from '@/components/magicui/dock';
import IconPopover from "./IconPopover";
import { UseFormReturn } from "react-hook-form";
import { ReactSketchCanvasRef } from "react-sketch-canvas";
import { ResultType } from "@/app/page";

interface propType {
    form: UseFormReturn<{ prompt: string; }>
    canvasRef: React.RefObject<ReactSketchCanvasRef | null>,
    result: ResultType[];
    setResult: React.Dispatch<React.SetStateAction<ResultType[]>>,
    setLoading: (vlaue: boolean) => void;

}

const iconstyle = " hover:bg-icon hover:text-black"

const CanvasDock = ({ form, canvasRef, result, setResult, setLoading }: propType) => {

    return (
        <Dock direction="bottom" iconMagnification={60} className='border-none z-20 bg-secondary absolute bottom-5 right-[48%]  text-slate-400'>

            <DockIcon className={iconstyle}>
                <IconPopover  form={form} canvasRef={canvasRef} type="prompt" setResult={setResult} result={result} setLoading={setLoading} />
            </DockIcon>


            <DockIcon className={iconstyle}>
                <IconPopover form={form} canvasRef={canvasRef} type="result" setResult={setResult} result={result} setLoading={setLoading}/>
            </DockIcon>
        </Dock>

    )
}

export default CanvasDock