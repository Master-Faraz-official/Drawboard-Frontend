import LoginPage from "@/components/auth/LoginPage"

const page = () => {
    return (
        <div className='h-screen w-full flex items-center justify-center flex-col '>
            <div className='shadow-2xl w-[40vw] h-[70vh] p-6 flex flex-col items-center'>
            <h1 className='font-bold text-2xl text-slate-600 pt-6'>Login Form</h1>
                <LoginPage />
            </div>
        </div>
    )
}

export default page