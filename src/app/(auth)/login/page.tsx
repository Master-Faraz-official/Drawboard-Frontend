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
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useRouter } from "next/navigation"
import CustomFormField, { FormFieldType } from "@/components/CustomFormField"

const formSchema = z.object({
    email: z.string().email("Please enter a valid email."),
    password: z.string().min(6, { message: "Password must be at least 6 characters long." })
})


const LoginPage = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    const handleLoginError = (error: any) => {
        if (error.response) {
            toast.error(`Login Failed: ${error.response.data?.message || "Server responded with an error"}`);
        } else if (error.request) {
            toast.error("Login Failed: No response from the server. Please try again.");
        } else {
            toast.error(`Login Failed: ${error.message || "An unexpected error occurred"}`);
        }
    }

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setLoading(true);
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, data, { withCredentials: true });

            console.log(response)

            // if (response.status !== 200) throw new Error("Internal Server Error");
            if (response.status !== 200) {
                toast.error("Internal Server Error");

            }

            toast.success("Logged in successfully");

            await new Promise(resolve => setTimeout(resolve, 800)); // Delay before navigation
            router.replace("/drawboard");

        } catch (error: any) {
            handleLoginError(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex items-center justify-center h-screen">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full max-w-md">

                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="email"
                        label="Email"
                        placeholder="john@gmail.com"
                        iconSrc="/images/icons/email.svg"
                        iconAlt="email"
                    />

                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="password"
                        label="Password"
                        placeholder=""
                        iconSrc="/images/icons/password.svg"
                        iconAlt="Password"
                    />



                    <Button type="submit" disabled={loading} className="w-full" >
                        {loading ? "Submitting..." : "Submit"}
                    </Button>
                </form>
            </Form>
        </main>
    )
}

export default LoginPage
