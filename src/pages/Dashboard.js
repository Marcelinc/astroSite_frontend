import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../App'
import AddItemForm from '../components/forms/AddItemForm'
import EditUserForm from '../components/forms/EditUserForm'
import Nav from '../components/Nav'
import OrdersList from '../components/OrdersList'
import Popup from '../components/Popup'
import '../resources/css/Dashboard.css'
import { img } from '../resources/images/imgList'
import ItemsList from './ItemsList'

const Dashboard = () => {

  const auth = useContext(AuthContext)
  const navigate = useNavigate()

  const [user,setUser] = useState('')
  const [addItemForm,setAddForm] = useState(false)
  const [editUserForm,setEditForm] = useState(false)

  const [content,setContent] = useState('orders')
  const [items,setItems] = useState([])


  useEffect(() => {
    !auth.logged && navigate('/login')
  },[auth])

  useEffect(() => {
    fetch(process.env.REACT_APP_SERVER+`/users/getUser`,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + auth.token
      }
    })
    .then(res => res.json())
    .then(res => {
      console.log('userData:',res)
      if(res.username){
        setUser(res)
        auth.setId(res.id)
      }
    })
    .catch(err => console.log(err))
  },[])

  return (
    <div className='container'>
        <Nav/>
        <main className='content'>
            <section className='userInfo mainContent'>
              <div className='profileImage'>
                <img src={img[user.profileImg]} alt='ProfileImage'></img>
              </div>
              <div className='userDetails'>
                <p className='userDetail'><span>Username: </span> {user.username}</p>
                <p className='userDetail'><span>Email: </span> {user.email}</p>
                <div className='options'>
                <p className='cart' onClick={() => navigate('/shop/myCart')}>Mój koszyk</p>
                <p id='user-buttons'>
                  <button className='button' onClick={() => setEditForm(true)}>Edytuj dane</button>
                  <button className='button' onClick={() => setAddForm(true)}>Dodaj produkt</button>
                </p>
                <p className='myitems'>
                  <span className='cart' onClick={() => setContent('orders')}>Moje zamówienia</span>
                  <span className='cart' onClick={() => setContent('items')}>Moje produkty</span>
                </p>
              </div>
              </div>
            </section>
            {content === 'orders' ? <OrdersList/> : <ItemsList items={items} setItems={setItems}/>}
            
            {editUserForm && <Popup><EditUserForm user={user} setUser={setUser} setForm={setEditForm}/></Popup>}
            {addItemForm && <Popup><AddItemForm setForm={setAddForm} setItems={setItems} items={items}/></Popup>}
        </main>
    </div>
  )
}

export default Dashboard