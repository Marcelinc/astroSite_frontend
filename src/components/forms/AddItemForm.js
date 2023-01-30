import React, { useContext, useState } from 'react'
import { AuthContext } from '../../App'

const AddItemForm = ({setForm,items,setItems}) => {

    const auth = useContext(AuthContext)

    const [name,setName] = useState('')
    const [price,setPrice] = useState(0)
    const [message,setMessage] = useState('')
    const [typeList,setTypeList] = useState([{id:1,name:'Teleskop',value:'TELESCOPE'},{id:2,name:'Okular',value:'LENS'},{id:3,name:'Filtr',value:'FILTER'},
        {id:4,name:'Lornetka',value:'BINOCULARS'}])
    const [type,setType] = useState(typeList[0].value)
    const [disableButton,setDisable] = useState(false)

    const save = e => {
        e.preventDefault();
        console.log(type)
        if(name && price > 0){
            setMessage('Dodawanie produktu..')
            fetch(process.env.REACT_APP_SERVER+'/items/addItem',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + auth.token
                },
                body: JSON.stringify({name,price,owner:auth.userId,type})
            })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if(res.message === 'Success'){
                    setDisable(true)
                    setItems([res.data,...items])
                    setMessage('Dodano produkt')
                } else
                    setMessage(res.message)
            })
            .catch(err => console.log(err))
        } else {
            setMessage('Wprowadź poprawne dane')
        }
    }

  return (
    <>
        <h2>Dodawanie produktu</h2>
        <form className='form'>
            <label className='form-label'>
                Nazwa
                <input type='text' className='input' placeholder='Nazwa produktu' value={name} onChange={e => setName(e.target.value)}/>
            </label>
            <label className='form-label'>
                Cena
                <input type='text' className='input' value={price} onChange={e => setPrice(e.target.value)}/>
            </label>
            <label className='form-label'>
                Typ produktu
                <select className='input' value={type} onChange={e => setType(e.target.value)}>
                    {typeList.map(t => <option key={t.id} value={t.value}>{t.name}</option>)}
                </select>
            </label>
            <button className='button' onClick={() => setForm(false)}>Wróć</button>
            <button className='button' disabled={disableButton} onClick={save}>Dodaj</button>
            {message && <p className='message'>{message}</p>}
        </form>
    </>
  )
}

export default AddItemForm