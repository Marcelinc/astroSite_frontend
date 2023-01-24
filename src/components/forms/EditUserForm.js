import React, { useState } from 'react'

const EditUserForm = ({user,setForm}) => {

    const [login,setLogin] = useState(user.username)
    const [email,setEmail] = useState(user.email)
    const [message,setMessage] = useState('')

    const save = () => {

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