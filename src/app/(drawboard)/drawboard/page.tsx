"use client";

import { useRef } from "react";
import CanvasComponent from "@/components/CanvasComponent";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  prompt: z.string().min(1, "Prompt is required"),
});

const Page = () => {
  const canvasRef = useRef<any>(null);

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
  }

  return (
    <div className="w-full h-screen flex flex-col">
      
      <div className="w-full">
        <CanvasComponent ref={canvasRef} />
      </div>

      <div className="w-full h-[30vh] p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prompt Context</FormLabel>
                  <FormControl>
                    <Input placeholder="Please give the context here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="bg-blue-500 text-white">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Page;
