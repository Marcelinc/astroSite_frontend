import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const RegisterForm = () => {

  const [email,setEmail] = useState('')
  const [username,setLogin] = useState('')
  const [password,setPassword] = useState('')

  const [message,setMessage] = useState('')

  const navigate = useNavigate()

    const register = e => {
        e.preventDefault();
        console.log('register: ',username,password)
        if(username && password && email){
            fetch(process.env.REACT_APP_SERVER+'/register',{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username,password,email})
            })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if(res.message === 'Success'){
                    navigate('/login',{message: 'Konto utworzone'})
                } else if(res.message){
                    setMessage(res.message)
                }
            })
            .catch(err => console.log(err))
        }
    }

  return (
    <form className='form'>
       <label className='form-label'>
            Email
            <input type='email' className='input' onChange={e => setEmail(e.target.value)}/>
        </label>
        <label className='form-label'>
            Login
            <input type='text' className='input' onChange={e => setLogin(e.target.value)}/>
        </label>
        <label className='form-label'>
            Hasło
            <input type='password' className='input' onChange={e => setPassword(e.target.value)}/>
        </label>
        <button className='button' onClick={register}>Zarejestruj</button>
        {message && <p className='message'>{message}</p>}
    </form>
  )
}

export default RegisterForm