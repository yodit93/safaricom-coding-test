'use client'

import { Eye, EyeOff, Mail, RectangleEllipsis } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface LoginData {
    email: string,
    password: string
};

const validateEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9.-_+%]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9]{2,}$/;
    if(!email) {
        return 'Email is required';
    } else if(!regex.test(email)) {
        return 'Invalid Email format'
    } else {
        return ''
    }
}

const validatePassword = (password: string) => {
    if(!password) {
        return 'Password is required';
    } else if(password.length < 8) {
        return 'Password should be atleast 8 or more characters'
    } else if(!/[a-z]/.test(password)) {
        return 'Password should include atleast one small letter'
    } else if (!/[A-Z]/.test(password)) {
        return 'Password should include atleast one capital letter'
    } else if (!/[\d]/.test(password)) {
        return 'Password should include atleast one number'
    } else if (!/[@#$%^&*]/.test(password)) {
        return 'Password should include atleast one special character'
    } else {
        return ''
    }
}

const Login = () => {
    const router = useRouter();
    const [form, setForm] = useState<LoginData>({
        email: '',
        password: ''
    });
    const [disable, setDisable] = useState(true);

    const [errors, setErrors] = useState<LoginData>({
        email: '',
        password: ''
    });

    const [touched, setTouched] = useState({
        email: false,
        password: false
    });

    const [show, setShow] = useState(false);

    // const [first, setfirst] = useState(second)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setForm((prev) => ({
            ...prev, 
            [name]: value
        }));

        setTouched((prev) => ({
            ...prev,
            [name]: true
        }))
    }

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push('/kycForm')
    }

    useEffect(() => {
        const emailError = validateEmail(form.email);
        const passError = validatePassword(form.password);

        setErrors({
            email: emailError,
            password: passError
        })

        if(!emailError && !passError && form.email && form.password) {
            setDisable(false);
        }
    }, [form])
  return (
    <div className='bg-gray-100 h-screen w-full p-4 sm:p-16'>
         <div className='flex flex-col gap-4 p-4 g-4 w-full sm:w-[40%]'>
        <h1 className='text-2xl font-bold'>M-PESA Acquisition Portal</h1>
        <p className='text-sm'>Welcome to M-PESA world of convenience! 
            This Portal provides an efficient way to access and manage your sales.</p>
        <form action="" className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div className="relative border border-gray-300 rounded-md p-2 flex items-center gap-2">
                <label htmlFor="email" className='absolute left-3 -top-2 z-10 text-xs'>Email Address</label>
                <Mail size={16} />
                <input 
                    type="email" 
                    className='w-full outline-0 border-0'
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                />
            </div>
            {touched.email && errors.email && <span className='text-red-500 text-xs mb-2'>{errors.email}</span>}
            <div className="relative border border-gray-300 rounded-md p-2 flex items-center gap-2 w-full">
                <label htmlFor="password" className='absolute left-3 -top-2 z-10 text-xs'>Password</label>
                <RectangleEllipsis size={25} color='black'/>
                <input 
                    type={show ? "text" : "password"}
                    className='w-full outline-0 border-0'
                    id="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                />
                <button type="button" onClick={() => setShow(!show)}>
                    {show ? <Eye /> : <EyeOff />}
                </button>
            </div>
            {touched.password && errors.password && <span className='text-red-500 text-xs mb-2'>{errors.password}</span>}
            <button 
                disabled={disable}
                type="submit" 
                className={`bg-green-600 text-white py-2 rounded-md font-bold ${disable ? 'pointer-events-none opacity-50' : ''}`}
            >
                Login
            </button>
            <button type='button' className='border-0 outlne-0 text-green-600 font-bold self-end text-sm'>FORGOT PASSWORD</button>
        </form>
        </div>
    </div>
   
  )
}

export default Login
