import Link from 'next/link'
import React from 'react'

const arr = [
  { name: "Luffy", id: "1" },
  { name: "Zoro", id: "2" },
  { name: "Nami", id: "3" },
  { name: "Usopp", id: "4" },
  { name: "Sanji", id: "5" },
];

const page = () => {
  return (
    <div>
      {
        arr.map((obj: { name: string, id: string }) => (
          <div key={obj.id}>
            <Link href={`/dashboard/user/${obj.name}`}>Profile link of {obj.name}</Link>
          </div>
        ))
      }
    </div >
  )
}

export default page