"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
} from "@/components/ui/form"
import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import CustomFormField, { FormFieldType } from "../CustomFormField"
import Link from "next/link"



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
        <div className=" w-[40vw] h-[60vh] p-6">
            <Form {...form}>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col" >

                    {/* <Avatar className="w-16 h-16">
                        <AvatarImage className="w-full h-full" src="https://github.com/shadcn.png" />
                        <AvatarFallback>Pred</AvatarFallback>
                    </Avatar> */}

                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="username"
                        label="Username"
                        placeholder="Jhon Doe"
                        iconSrc="/images/icons/user.svg"
                        iconAlt="user"
                    />

                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="email"
                        label="Email"
                        placeholder="jhondoe123@gmail.com"
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



                    <Button type="submit" disabled={loading} className={loading ? "opacity-50 cursor-not-allowed" : ""}> {loading ? "Registering the user..." : "Register"}</Button>


                </form>
            </Form>

            <div className="flex flex-col items-center justify-center space-y-2 mt-4 text-slate-500">
                <h1 className="text-sm">OR</h1>
                <p>
                    Already have an account  <Link href="/login" className="text-cyan-500">Login</Link>
                </p>
            </div>

        </div>
    )
}

export default RegisterForm