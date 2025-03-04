"use client"
import axios from "axios"
import Link from "next/link"
import { toast } from "sonner"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


const navItems = [
    { name: "Home", link: "/" },
    { name: "Register", link: "/register" },
    { name: "Login", link: "/login" },
    { name: "Try now", link: "/drawboard" },
]

interface NavbarProps {
    className: string
}


const Navbar = ({ className }: NavbarProps) => {
    const router = useRouter()
    return (
        <header className={`shadow-xl bg-emerald-300  p-2 flex items-center flex-col justify-between space-y-16 ${className}`}>

            <Avatar className="w-16 h-16">
                <AvatarImage className="w-full h-full" src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>


            {/* <nav className="flex space-x-16">
                {navItems.map((obj) => (
                    <div key={obj.name}>
                        <Button variant="ghost" onClick={() => { router.push(obj.link) }}>{obj.name}</Button>
                    </div>
                ))}
            </nav> */}

            <Button variant="ghost" onClick={async () => {
                try {
                    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/logout`, {}, { withCredentials: true });

                    if (response.status !== 200) {
                        toast.error("Internal Server Error");

                    }

                    toast.success("Logged out successfully");


                    await new Promise(resolve => setTimeout(resolve, 800)); // Delay before navigation
                    router.replace("/");
                } catch (error: any) {
                    toast.error(`Logout Failed: ${error?.message || "An unexpected error occurred while logging out"}`);
                }

            }} >Logout</Button>

        </header>
    )
}

export default Navbar