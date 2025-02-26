"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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
import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"


const formSchema = z.object({
    username: z.string().min(1, { message: "Please enter a valid username" }),
    email: z.string().email("Please Enter a valid Email Id"),
    password: z.string().min(6, { message: "Password must be atleast 6 characters long" })
})




const RegisterForm = () => {


    const [loading, setLoading] = useState(false);


    // 1. Define your form.
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
        // setResponseMessage(null);

        try {
            const response = await axios.post("http://localhost:8000/api/users/register", data);
            // setResponseMessage("User registered successfully!");
        } catch (error: any) {
            // setResponseMessage(error.response?.data?.message || "Something went wrong");
        }

        setLoading(false);
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
                                <FormLabel>username</FormLabel>
                                <FormControl>
                                    <Input placeholder="jhon" {...field} />
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

                </form>
            </Form>



        </div>
    )
}

export default RegisterForm