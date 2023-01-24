import React from 'react'
import LoginForm from '../components/forms/LoginForm'
import Nav from '../components/Nav'


const Login = () => {
  return (
    <div className='container'>
        <Nav/>
        <main className='content'>
            <LoginForm/>
        </main>
    </div>
  )
}

export default Login