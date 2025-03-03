"use client"
import axios from "axios"
import Link from "next/link"
import { toast } from "sonner"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"

const navItems = [
    { name: "Home", link: "/" },
    { name: "Register", link: "/register" },
    { name: "Login", link: "/login" },
    { name: "Try now", link: "/drawboard" },
]


const Navbar = () => {
    const router = useRouter()
    return (
        <header className="bg-emerald-500 p-2 flex items-center justify-center space-x-16">
            <nav className="flex space-x-16">
                {navItems.map((obj) => (
                    <div key={obj.name}>
                        <Button variant="ghost" onClick={() => { router.push(obj.link) }}>{obj.name}</Button>
                        {/* <Link href={obj.link}>{obj.name}</Link> */}
                    </div>
                ))}
            </nav>
            
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