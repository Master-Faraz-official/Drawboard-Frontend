import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { LucideIcon } from "lucide-react";
import PromptForm from "./PromptForm";
import { UseFormReturn } from "react-hook-form";

interface IconPopoverProps {
    icon: LucideIcon;
    form?: UseFormReturn<{ prompt: string; }>
}


const IconPopover = ({ icon, form }: IconPopoverProps) => {
    const Icon = icon;

    return (
        <Popover>
            <PopoverTrigger><Icon /></PopoverTrigger>

            <PopoverContent className="flex flex-col items-center justify-center w-[30vw] bg-red-400 mb-5" >
                <h1 className="font-bold text-xl">Please provide more information...</h1>

                <section className="w-full">
                    <PromptForm form={form!} />
                </section>


            </PopoverContent>
        </Popover>
    )
}
export default IconPopover;
