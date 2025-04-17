import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { ReactSketchCanvasRef } from "react-sketch-canvas";
import { formSchema } from "@/app/(drawboard)/drawboard/page";
import handleSubmitForm from "@/utils/handleSubmitForm";

interface propType {
    form: UseFormReturn<{ prompt: string; }>,
    canvasRef: React.RefObject<ReactSketchCanvasRef | null>,
}

const PromptForm = ({ form,canvasRef }: propType) => {

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const prompt = values.prompt
       handleSubmitForm({prompt,canvasRef})

    }

    return (
        <div className="w-full h-[220px] flex flex-1 ">
            <div className="w-full p-4">
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col">
                        <CustomFormField
                            control={form.control}
                            name="prompt"
                            label="Drawing Prompt"
                            placeholder="Please provide the context here ( optional )"
                            fieldType={FormFieldType.TEXTAREA}
                        />

                        <InteractiveHoverButton type="submit" className="border-none">submit</InteractiveHoverButton>
                    </form>
                </Form>
            </div>

        </div>
    )
}

export default PromptForm