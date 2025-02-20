import axios from "axios"

const page = async () => {

  const data = await axios.get("http://localhost:8000/api/data")
    .then((resData) => {
      console.log(resData.data)
      return resData.data
    })
    .catch((error) => {
      console.log("error in data :: " + error)
    })


  return (
    <div>
      {data.map((obj: { name: string, age: string }) => (

        <div key={obj.name}>
          <h1>{obj.name}   {obj.age}</h1>
        </div>
      ))}
    </div>
  )
}

export default page
