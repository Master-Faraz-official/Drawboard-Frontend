"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { toast } from "sonner"



const formSchema = z.object({
    username: z.string().min(1, { message: "Please enter a valid username" }),
    email: z.string().email("Please Enter a valid Email Id"),
    password: z.string().min(6, { message: "Password must be atleast 6 characters long" })
})




const RegisterForm = () => {


    const [loading, setLoading] = useState(false);
    const router = useRouter();


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            password: ""
        },
    })



    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setLoading(true);

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/register`, data);
            if (response.status >= 200 && response.status < 300) {
                toast.error("Internal Server Error");
            }

            toast.success("User Registered Successfully");

            await new Promise(resolve => setTimeout(resolve, 800)); // Delay before navigation
            router.replace("/login");
        } catch (error: any) {
            if (error.response) {
                toast.error(`User Registration Failed: ${error.response.data?.message || "Server responded with an error"}`);
            } else if (error.request) {
                toast.error("User Registration Failed: No response from the server. Please try again.");
            } else {
                toast.error(`User Registration Failed: ${error.message || "An unexpected error occurred"}`);
            }
        }
        finally {
            setLoading(false);
        }

    };


    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="jhon" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="abc@gmail.com" type="email" {...field} />
                                </FormControl>

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
                                    <Input placeholder="Password" type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    
                    <Button type="submit" disabled={loading} className={loading ? "opacity-50 cursor-not-allowed" : ""}> {loading ? "Submitting..." : "Submit"}</Button>


                </form>
            </Form>



        </div>
    )
}

export default RegisterForm