"use client"

import { useEffect, useState } from "react"
import { Button } from "./ui/button"





const LoginForm = () => {
  const [num, setNum] = useState(0)
 

  useEffect(() => {
    console.log("THis is Empty array")
  }, [])

  useEffect(() => {
    console.log("THis is without array")
  })

  useEffect(() => {
    console.log("Dependency")
  }, [num])


  return (

    <div className=" flex flex-col space-y-4">
      <h1>THis is num <span className="bg-orange-500 px-2 py-1 rounded-xl text-black">{num}</span></h1>
      <div className="flex space-x-4">
        <Button className="bg-green-500 text-black font-bold" onClick={() => { setNum(num + 1) }} >Increase Count</Button>
        <Button className="bg-red-500 text-black font-bold" onClick={() => { setNum(num - 1) }} >Decrease Count</Button>
      </div>
    </div>
  )
}

export default LoginForm