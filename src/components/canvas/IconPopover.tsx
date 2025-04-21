import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import PromptForm from "./PromptForm";
import { UseFormReturn } from "react-hook-form";
import { ReactSketchCanvasRef } from "react-sketch-canvas";
import { ResultType } from "@/app/page";
import ResultForm from "./ResultForm";
import { Sparkles, Lightbulb } from "lucide-react";

interface IconPopoverProps {
    form?: UseFormReturn<{ prompt: string; }>
    canvasRef: React.RefObject<ReactSketchCanvasRef | null>,
    type: "prompt" | "result",
    result: ResultType[];
    setResult: React.Dispatch<React.SetStateAction<ResultType[]>>
    setLoading: (vlaue: boolean) => void;

}

const IconPopover = ({ setLoading , form, type, canvasRef, result, setResult }: IconPopoverProps) => {

    return (
        <Popover>
            <PopoverTrigger>
                {
                    (type === "prompt"
                        ? <Sparkles />
                        : (Array.isArray(result) && result.length > 0
                        ? <Lightbulb className="text-yellow-400 animate-pulse" style={{ filter: "drop-shadow(0 0 6px #facc15)" }} />
                        : <Lightbulb />)
                    )
                }
                {/* <Icon /> */}
            </PopoverTrigger>

            <PopoverContent className="flex flex-col items-center justify-center w-[400px] rounded-3xl mb-4 bg-secondary border-none" >

                <section className="w-full">
                    {type === "prompt" ? (
                        <PromptForm form={form!} canvasRef={canvasRef} setResult={setResult} setLoading={setLoading} />) : (<ResultForm result={result} />
                    )}
                </section>

            </PopoverContent>
        </Popover>
    )
}
export default IconPopover;
