import RegisterForm from '@/components/auth/RegisterPage'
import React from 'react'

const page = () => {
    return (
        <div className='h-screen w-full flex items-center justify-center flex-col '>
            <div className='shadow-2xl w-[40vw] h-[70vh] p-6 flex flex-col items-center'>
                <h1 className='font-bold text-2xl text-slate-600'>Register Form</h1>
                <RegisterForm />
            </div>
        </div>
    )
}

export default page