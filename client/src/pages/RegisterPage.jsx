import React from 'react';
import {Link} from 'react-router-dom'

function RegisterPage() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl sm:text-4xl text-center my-6 font-bold'>Register</h1>
      <form action="#" className='flex flex-col gap-3'>
        <input 
          type="text" placeholder='Username' id='username'
          className='p-3 border rounded-md focus:outline-none' 
        />
        <input 
          type="email" placeholder='Email' id='email'
          className='p-3 border rounded-md focus:outline-none' 
        />
        <input 
          type="password" placeholder='Password'
          className='p-3 border rounded-md focus:outline-none' 
        />

        <button className='bg-emerald-600 text-white rounded-md uppercase p-3 font-semibold hover:opacity-90 disabled:opacity-75'>Register</button>
      </form>

      <div className='flex gap-2 mt-3'>
        <p>Already have an account?</p>
        <Link to='login' className='text-blue-900 font-semibold hover:underline'>Login</Link>
      </div>
    </div>
  )
}

export default RegisterPage