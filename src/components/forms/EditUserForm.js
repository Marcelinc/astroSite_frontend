import React, { useContext, useState } from 'react'
import { AuthContext } from '../../App'

const EditUserForm = ({user,setUser,setForm}) => {

    const auth = useContext(AuthContext)

    const [login,setLogin] = useState(user.username)
    const [email,setEmail] = useState(user.email)
    const [message,setMessage] = useState('')

    const save = e => {
        e.preventDefault()
        if(login && email && login){
            if(login != user.username || email != user.email){
                setMessage('Przetwarzanie...')
                fetch(process.env.REACT_APP_SERVER+`/users/edit`,{
                    method: 'PUT',
                    headers: {
                        'Authorization':'Bearer '+auth.token,
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({username:login,email})
                })
                .then(res => res.json())
                .then(res => {
                    console.log(res)
                    if(res.message === 'Success'){
                        setUser({username:login,email,profileImg:user.profileImg})
                        auth.setToken(res.data)
                        setForm(false)
                    } else{
                        setMessage(res.message)
                    }
                })
                .catch(err => console.log('err'+err))
            } else{
                setMessage('Wprowadź zmiany')
            }
            
        } else{
            setMessage('Uzupełnij dane')
        }
    }

  return (
    <>
        <h2>Edycja konta</h2>
        <form className='form'>
            <label className='form-label'>
                Login
                <input type='text' className='input' value={login} onChange={e => setLogin(e.target.value)}/>
            </label>
            <label className='form-label'>
                Email
                <input type='email' className='input' value={email} onChange={e => setEmail(e.target.value)}/>
            </label>
            <button className='button' onClick={() => setForm(false)}>Anuluj</button>
            <button className='button' onClick={save}>Zapisz</button>
            {message && <p className='message'>{message}</p>}
        </form>
    </>
  )
}

export default EditUserForm