'use client'
import React from 'react'
import { loginAction } from '../api/auth/actions';

const LoginPage = () => {
  return (
    <form action={loginAction} className="p-4 flex flex-col gap-4 ">
      <input className='text-black p-2 rounded-md' name='email' type="email" placeholder="Email" />
      <input className='text-black p-2 rounded-md' name='password' type="password" placeholder="Password" />
      <button type="submit" className='bg-sky-600 p-2 rounded-md'>Login</button>
    </form>
)
}

export default LoginPage;