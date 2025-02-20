import Link from "next/link"

const navItems = [
    { name: "Home", link: "/" },
    { name: "Register", link: "/register" },
    { name: "Login", link: "/login" },
    { name: "Try now", link: "/drawboard" },
]


const Navbar = () => {
    return (
        <header className="bg-emerald-500 p-2 flex items-center justify-center">
            <nav className="flex space-x-16">
                {navItems.map((obj) => (
                    <div key={obj.name}>
                        <Link href={obj.link}>{obj.name}</Link>
                    </div>
                ))}
            </nav>
        </header>
    )
}

export default Navbar