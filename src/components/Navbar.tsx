"use client"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"
import LogoutBtn from "./LogoutBtn"


const navItems = [
    { name: "Demo ", link: "https://www.youtube.com/watch?v=Y1glVhCWxGo", icon: "/images/icons/youtube.svg" },
    { name: "Github ", link: "https://github.com/Master-Faraz-official/Ai-Drawboard-Backend", icon: "/images/icons/github.svg" },
    { name: "Linkedin", link: "https://www.linkedin.com/in/master-faraz/", icon: "/images/icons/linkedin.svg" }
]

interface NavbarProps {
    className: string
}


const Navbar = ({ className }: NavbarProps) => {
    const router = useRouter()


    return (
        <header className={`shadow-2xl bg-cyan-300 py-8 flex items-center flex-col justify-between space-y-16 ${className} backdrop-blur-lg bg-opacity-30 border border-white/20 shadow-xl`}>
            {/* <header className={`shadow-2xl bg-cyan-300 py-8 flex items-center flex-col justify-between space-y-16 ${className}`}> */}


            <div className="flex flex-col items-center justify-center space-y-2">
                <Avatar className="w-12 h-12">
                    <AvatarImage className="w-full h-full" src="https://github.com/shadcn.png" />
                    <AvatarFallback>Pred</AvatarFallback>
                </Avatar>

                <span className="text-slate-600 text-sm">Apex Predator</span>
            </div>

            <nav className="flex flex-col space-y-10 text-sm">
                {navItems.map((obj) => (
                    <div key={obj.name}>
                        <Button variant="ghost" onClick={() => { router.push(obj.link) }}>
                            <div className="flex space-x-2 items-center justify-center">
                                <Image src={obj.icon} alt={obj.name} width={24} height={24} className="mb-0.5" />
                                {obj.name}
                            </div>
                        </Button>
                    </div>
                ))}
            </nav>

            <LogoutBtn />

        </header>
    )
}

export default Navbar