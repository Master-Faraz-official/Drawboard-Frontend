"use client";

import { useRef, useState } from "react";
import CanvasComponent from "@/components/CanvasComponent";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import axios from "axios";
import { toast } from "sonner";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";

const formSchema = z.object({
  context: z.string(),
});

const Page = () => {
  const canvasRef = useRef<any>(null);
  const [result, setResult] = useState("")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { context: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!canvasRef.current) return;

    const imagePath = await canvasRef.current.getImage();
    console.log(values.context)

    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/analyze`, {
      imagePath: imagePath,
      context: values.context
    }, { withCredentials: true })

    if (response.status === 200) {
      toast.success("Analyzed Successfully")
    }
    else {
      toast.error("Failed to analyze")
    }

    console.log(response.data.data)
    console.log(response.data.data.result)


    setResult("This is the output of the command")
  }

  return (
    <div className="w-full h-screen flex flex-col">
      {/* Canvas to draw  */}
      <div className="w-full">
        <CanvasComponent ref={canvasRef} />
      </div>

      {/* Form to submit the canvas and the prompt */}
      <div className="w-full h-[30vh] p-4 flex flex-1">
        <div className="bg-red-300 w-1/2 p-4">
          <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col">
              <CustomFormField
                control={form.control}
                name="context"
                label="Prompt Context"
                placeholder="Please provide the context here ( optional )"
                fieldType={FormFieldType.TEXTAREA}
              />

              {/* <Button  className=" text-white">
                Find the response
              </Button> */}
              <InteractiveHoverButton type="submit">Find the Response</InteractiveHoverButton>
            </form>
          </Form>
        </div>

        {/* Output or Result Area */}
        <div className="bg-green-300 w-1/2 p-4">
          <h1>Output</h1>
          <div className="bg-slate-400 w-full h-[20vh] p-4">
            {result}
          </div>
        </div>


      </div>
    </div>
  );
};

export default Page;
