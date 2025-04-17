import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { LucideIcon } from "lucide-react";
import PromptForm from "./PromptForm";
import { UseFormReturn } from "react-hook-form";
import { ReactSketchCanvasRef } from "react-sketch-canvas";

interface IconPopoverProps {
    icon: LucideIcon;
    form?: UseFormReturn<{ prompt: string; }>
    canvasRef: React.RefObject<ReactSketchCanvasRef | null>,
    type: "prompt" | "result"
}

const IconPopover = ({ icon, form, type, canvasRef }: IconPopoverProps) => {
    const Icon = icon;

    return (
        <Popover>
            <PopoverTrigger><Icon /></PopoverTrigger>

            <PopoverContent className="flex flex-col items-center justify-center w-[400px] rounded-3xl mb-4 bg-icon border-none" >

                <section className="w-full">
                    {type === "prompt" ? (<PromptForm form={form!} canvasRef={canvasRef} />) : (
                        type === "result" ?
                            ("")
                            : (""))}
                </section>

            </PopoverContent>
        </Popover>
    )
}
export default IconPopover;
