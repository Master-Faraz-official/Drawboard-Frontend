import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { ReactSketchCanvasRef } from "react-sketch-canvas";
import { formSchema } from "@/app/(drawboard)/drawboard/page";
import handleSubmitForm from "@/utils/handleSubmitForm";
import { ResultType } from "@/app/page";

interface propType {
    form: UseFormReturn<{ prompt: string; }>,
    canvasRef: React.RefObject<ReactSketchCanvasRef | null>,
    setResult: React.Dispatch<React.SetStateAction<ResultType[]>>
    setLoading: (vlaue: boolean) => void;

}

const PromptForm = ({ setLoading, form, canvasRef, setResult }: propType) => {

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true)
        const prompt = values.prompt
        await handleSubmitForm({ prompt, canvasRef, setResult })
        setLoading(false)

    }

    return (
        <div className="w-full h-[220px] flex flex-1 ">
            <div className="w-full p-4">
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col">
                        <CustomFormField
                            control={form.control}
                            name="prompt"
                            label="Describe Your Drawing (Optional)"
                            placeholder="Describe your drawing or ask a related question"
                            fieldType={FormFieldType.TEXTAREA}
                        />

                        <InteractiveHoverButton type="submit" className="border-none">Submit</InteractiveHoverButton>
                    </form>
                </Form>
            </div>

        </div>
    )
}

export default PromptForm