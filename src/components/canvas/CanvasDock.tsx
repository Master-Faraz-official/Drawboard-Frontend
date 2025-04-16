
import {  Sparkles, Lightbulb } from "lucide-react";
import { Dock, DockIcon } from '@/components/magicui/dock';
import IconPopover from "./IconPopover";
import { UseFormReturn } from "react-hook-form";

interface propType{
    form : UseFormReturn<{ prompt: string; }>
}

const iconstyle = " hover:bg-icon hover:text-black"

const CanvasDock = ({form}:propType) => {

    return (
        <Dock direction="bottom" iconMagnification={60} className='border-none z-20 bg-secondary absolute bottom-5 right-[48%]  text-slate-400'>
            <DockIcon className={iconstyle}>
                <IconPopover icon={Sparkles} form= {form} />
            </DockIcon>

         
            <DockIcon className={iconstyle}>
                {/* <Lightbulb /> */}
                <Lightbulb className=" text-yellow-400 animate-pulse" style={{ filter: "drop-shadow(0 0 6px #facc15)" }} />

            </DockIcon>
        </Dock>

    )
}

export default CanvasDock