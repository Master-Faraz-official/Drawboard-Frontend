"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import axios from "axios"
import { toast } from "sonner"

import { Form } from "@/components/ui/form"
import { useRouter } from "next/navigation"
import CustomFormField, { FormFieldType } from "@/components/CustomFormField"
import Link from "next/link"

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
        <main className="flex flex-col items-center justify-center w-[40vw] h-[60vh] p-6 ">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full  ">
                    <div>

                    </div>

                    
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="email"
                        label="Email"
                        placeholder="Please enter your email"
                        iconSrc="/images/icons/email.svg"
                        iconAlt="email"
                    />

                    <CustomFormField
                        fieldType={FormFieldType.PASSWORD}
                        control={form.control}
                        name="password"
                        label="Password"
                        placeholder=""
                        iconSrc="/images/icons/password.svg"
                        iconAlt="Password"
                    />



                    <Button type="submit" disabled={loading} className="w-full" >
                        {loading ? "Logging in..." : "Login"}
                    </Button>
                </form>
            </Form>

            <div className="flex flex-col items-center justify-center space-y-2 mt-4 text-slate-500">
                <h1 className="text-sm">OR</h1>
                <p>
                    You don't have an account yet? <Link href="/register" className="text-cyan-500">Sign up</Link>
                </p>
            </div>
        </main>
    )
}

export default LoginPage
