import React from 'react'
import RegisterForm from '../components/forms/RegisterForm'
import Nav from '../components/Nav'

const Register = () => {
  return (
    <div className='container'>
        <Nav/>
        <main className='content'>
            <RegisterForm/>
        </main>
    </div>
  )
}

export default Register