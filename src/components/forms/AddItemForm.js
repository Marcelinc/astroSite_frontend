import React, { useContext, useState } from 'react'
import { AuthContext } from '../../App'

const AddItemForm = ({setForm}) => {

    const auth = useContext(AuthContext)

    const [name,setName] = useState('')
    const [price,setPrice] = useState(0)
    const [message,setMessage] = useState('')
    const [typeList,setTypeList] = useState(['Teleskop','Okular','Filtr','Lornetka'])
    const [type,setType] = useState('')

    const save = e => {
        e.preventDefault();
        fetch(process.env.REACT_APP_SERVER+'/items/addItem',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + auth.token
            },
            body: JSON.stringify({name,price,user_id:auth.id})
        })
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }

  return (
    <>
        <h2>Dodawanie produktu</h2>
        <form className='form'>
            <label className='form-label'>
                Nazwa
                <input type='text' className='input' value={name} onChange={e => setName(e.target.value)}/>
            </label>
            <label className='form-label'>
                Cena
                <input type='text' className='input' value={price} onChange={e => setPrice(e.target.value)}/>
            </label>
            <label className='form-label'>
                Typ produktu
                <select className='input'>
                    {typeList.map(t => <option value={t}>{t}</option>)}
                </select>
            </label>
            <button className='button' onClick={() => setForm(false)}>Anuluj</button>
            <button className='button' onClick={save}>Dodaj</button>
            {message && <p className='message'>{message}</p>}
        </form>
    </>
  )
}

export default AddItemForm