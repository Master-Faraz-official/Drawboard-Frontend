"use client"
import Link from 'next/link'
import React, { useEffect } from 'react'

const arr = [
    { name: "dashboard", route: "/dashboard" },
    { name: "user", route: "/dashboard/user" },
    { name: "user1", route: "/dashboard/user/1" },
    { name: "home", route: "/" }
]

interface arrObj {
    name: string,
    route: string
}

const Navbar = () => {

    useEffect(() => {
        console.log("THis is Empty array")
    }, [])

    useEffect(() => {
        console.log("THis is without array")
    })
    return (
        <div>
            {arr.map((obj: arrObj) => (
                <ul key={obj.name}>
                    <Link href={obj.route}>{obj.name}</Link>
                </ul>
            ))}
        </div>
    )
}

export default Navbar