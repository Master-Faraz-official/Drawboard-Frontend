import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import axios from "axios";
import { toast } from "sonner";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";

interface propType {
    form: UseFormReturn<{ prompt: string; }>

}

const PromptForm = ({ form }: propType) => {

    const formSchema = z.object({
        prompt: z.string(),
    });


    async function onSubmit(values: z.infer<typeof formSchema>) {
        // if (!canvasRef.current) return;

        // const imagePath = await canvasRef.current.getImage();
        // console.log(imagePath)

        // const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/analyze`, {
        //     imagePath: imagePath,
        //     context: values.context
        // }, { withCredentials: true })

        // if (response.status === 200) {
        //     toast.success("Analyzed Successfully")
        // }
        // else {
        //     toast.error("Failed to analyze")
        // }

        // console.log(response.data.data)
        // console.log(response.data.data.result)
        console.log("Form created successfully")
        form.setValue("prompt", values.prompt);
        console.log(values.prompt)

    }

    return (
        <div className="w-full h-[30vh] p-4 flex flex-1">
            <div className="w-full p-4">
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col">
                        <CustomFormField
                            control={form.control}
                            name="prompt"
                            // label="Prompt Context"
                            placeholder="Please provide the context here ( optional )"
                            fieldType={FormFieldType.TEXTAREA}
                        />

                        <InteractiveHoverButton type="submit" className=""> submit</InteractiveHoverButton>
                    </form>
                </Form>
            </div>

            {/* Output or Result Area */}
            {/* <div className="bg-green-300 w-1/2 p-4">
          <h1>Output</h1>
          <div className="bg-slate-400 w-full h-[20vh] p-4">
            {result}
          </div>
        </div> */}


        </div>
    )
}

export default PromptForm