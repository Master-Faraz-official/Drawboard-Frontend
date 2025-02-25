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
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, data);

            if (!response || response.status !== 200) {
                throw new Error("Internal Server Error");
            }

            toast.success("Logged in Successfully");

            // setTimeout(() => {
            //     router.replace("/drawboard");
            // }, 800); // 800ms delay

        }
        catch (error: any) {
            console.log(error);

            const message = error.response?.data?.message || error.message || "An unexpected error occurred";
            toast.error(`Login Failed: ${message}`);
        }
        finally {
            setLoading(false);
        }
    };




    return (
        <main>
            <div className="flex items-center justify-center h-screen ">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                        <section>
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="abc@gmail.com" {...field} />
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
                                            <Input type="password" placeholder="Password" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            This is your Password
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                        </section>

                        <section>
                            <Button type="submit" disabled={loading} className="cursor-not-allowed">
                                {loading ? "Submitting..." : "Submit"}
                            </Button>
                        </section>



                    </form>
                </Form>



            </div>
        </main>
    )
}

export default page