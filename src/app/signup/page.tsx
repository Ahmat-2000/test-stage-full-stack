'use client'

import { signUpAction } from "@/app/api/auth/actions";

const SignUpPage = () => {

  return (
    <form action={signUpAction} className="p-4 flex flex-col gap-4 ">
      <input className='text-black p-2 rounded-md' name='name' type="text" placeholder="Name" />
      <input className='text-black p-2 rounded-md' name='email' type="email" placeholder="Email" />
      <input className='text-black p-2 rounded-md' name='password' type="password" placeholder="Password" />
      <button type="submit" className='bg-sky-600 p-2 rounded-md'>Sign Up</button>
    </form>
  );
}

export default SignUpPage;