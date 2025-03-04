"use client"

import CanvasComponent from "@/components/CanvasComponent"
// Importing form component
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
  prompt: z.string(),
})

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"


const page = () => {

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="w-full">
        <CanvasComponent />
      </div>
      <div className="w-full h-[20vh] ">

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prompt context</FormLabel>
                  <FormControl>
                    <Input placeholder="Please give the context here" {...field}  />
                  </FormControl>
                  {/* <FormDescription>
                    Please enter the prompt here
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <Button type="submit">Submit</Button> */}
          </form>
        </Form>
      </div>
    </div>
  )
}

export default page