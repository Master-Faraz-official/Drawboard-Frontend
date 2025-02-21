"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import axios from "axios"
import { toast } from "sonner"


import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useRouter } from "next/navigation"



const formSchema = z.object({
    email: z.string().email("Please Enter a valid Email Id"),
    password: z.string().min(6, { message: "Password must be atleast 6 characters long" })
})


const page = () => {
    const [responseMessage, setResponseMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter()


    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })



    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setLoading(true);
        setResponseMessage(null);

        try {
            const response = await axios.post("http://localhost:8000/api/users/login", data);
            // setResponseMessage("User  successfully!");
            toast.success("Logged in Successfully")


            setTimeout(() => {
                router.replace("/drawboard")
            }, 800); // 1 second delay

        } catch (error: any) {
            setResponseMessage(error.response?.data?.message || "Something went wrong");
        }

        setLoading(false);
    };



    return (
        <main>
            <div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="abc@gmail.com" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is your public display name.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />



                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Password" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is your Password
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <Button type="submit" disabled={loading}>
                            {loading ? "Submitting..." : "Submit"}
                        </Button>

                        {responseMessage && (
                            <p className="text-center text-sm text-gray-500 mt-2">{responseMessage}</p>
                        )}

                    </form>
                </Form>



            </div>
        </main>
    )
}

export default page