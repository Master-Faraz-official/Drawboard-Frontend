// Dynamic routing

const page = ({ params }: { params: { id: string } }) => {
    return (
        <div >Hello This is  <span className='text-orange-500'>{params.id}</span></div>
    )
}

export default page