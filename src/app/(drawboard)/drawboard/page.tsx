"use client";

import { useRef, useState } from "react";
import CanvasComponent from "@/components/CanvasComponent";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustomFormField, { FormFieldType } from "@/components/CustomFormField";

const formSchema = z.object({
  prompt: z.string().min(1, "Prompt is required"),
});

const Page = () => {
  const canvasRef = useRef<any>(null);
  const [result, setResult] = useState("")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { prompt: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!canvasRef.current) return;

    const imageUrl = await canvasRef.current.getImage();
    console.log("Submitting:", { prompt: values.prompt, imageUrl });
    console.log(values)
    console.log(values.prompt)
    console.log(imageUrl)

    // const response = await fetch("/api/submit", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ prompt: values.prompt, imageUrl }),
    // });

    // if (response.ok) {
    //   console.log("Successfully submitted!");
    // } else {
    //   console.error("Submission failed!");
    // }

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
                name="prompt"
                label="Prompt Context"
                placeholder="Please provide the context here ( optional )"
                fieldType={FormFieldType.TEXTAREA}
              />

              <Button type="submit" className=" text-white">
                Find the response
              </Button>
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
