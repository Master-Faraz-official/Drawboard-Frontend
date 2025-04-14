"use client"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"
import Image from "next/image"
import LogoutBtn from "./LogoutBtn"
// #1C1C24 -> Primary
// #252734 -> Secontary
// #596575 -> Icons


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

            <div>
                <Image src="/images/icons/logo.png"  alt="Logo" width={45} height={45} />
            </div>


            <nav className="flex flex-col space-y-10 text-sm ">
                {navItems.map((obj) => (
                    <div key={obj.name}>
                        <Button className="hover:bg-slate-400" variant="ghost" onClick={() => { router.push(obj.link) }}>
                            <Image src={obj.icon} alt={obj.name} width={24} height={24} />
                        </Button>
                    </div>
                ))}
            </nav>

            <LogoutBtn />
           
            <Image src="/images/icons/settings.svg" className="hover:text-red-500" alt="Logo" width={24} height={24} />

        </header>
    )
}

export default Navbar