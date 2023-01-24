import React, { useContext, useEffect, useState } from 'react'
import '../../resources/css/Form.css'
import '../../resources/css/Input.css'
import '../../resources/css/Button.css'
import { AuthContext } from '../../App'
import { useLocation, useNavigate } from 'react-router-dom'

const LoginForm = () => {

    const auth = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()

    const [username,setLogin] = useState("")
    const [password,setPassword] = useState('')
    const [message,setMessage] = useState(location.message)

    const logIn = e => {
        e.preventDefault();
        console.log('log in: ',username,password)
        if(username && password){
            fetch(process.env.REACT_APP_SERVER+'/authenticate',{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username,password})
            })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if(res.token){
                    localStorage.setItem('userToken',res.token)
                    auth.setToken(res.token)
                    auth.setLogged(true)
                }
            })
            .catch(err => console.log(err))
        }
    }

    useEffect(() => {
        auth.logged && navigate('/dashboard')
    },[auth.logged])

  return (
    <form className='form'>
        <label className='form-label'>
            Login
            <input type='text' className='input' onChange={e => setLogin(e.target.value)}/>
        </label>
        <label className='form-label'>
            Hasło
            <input type='password' className='input' onChange={e => setPassword(e.target.value)}/>
        </label>
        <button className='button' onClick={logIn}>Zaloguj</button>
        {message && <p className='message'>{message}</p>}
    </form>
  )
}

export default LoginForm