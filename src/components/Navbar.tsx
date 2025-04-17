"use client"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"
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
        <header className={`shadow-2xl bg-secondary py-8 flex items-center flex-col justify-between space-y-16 ${className} backdrop-blur-lg shadow-xl`}>

            <Image src="/images/icons/logo.png" alt="Logo" width={65} height={65} className="" />


            <nav className="flex flex-col space-y-10 ">
                {navItems.map((obj) => (
                    <Button key={obj.name} className="  hover:bg-icon border-none" variant="ghost" >
                        <Image src={obj.icon} alt={obj.name} width={30} height={30} className="rounded-3xl  hover:bg-icon " onClick={() => { router.push(obj.link) }} />
                    </Button>
                ))}
            </nav>

            <div className="flex flex-col items-center justify-center space-y-6 text-slate-300">
                <LogoutBtn />

            </div>

        </header>
    )
}

export default Navbar