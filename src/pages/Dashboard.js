import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../App'
import AddItemForm from '../components/forms/AddItemForm'
import EditUserForm from '../components/forms/EditUserForm'
import Nav from '../components/Nav'
import Popup from '../components/Popup'
import '../resources/css/Dashboard.css'
import { img } from '../resources/images/imgList'

const Dashboard = () => {

  const auth = useContext(AuthContext)
  const navigate = useNavigate()

  const [user,setUser] = useState('')
  const [addItemForm,setAddForm] = useState(false)
  const [editUserForm,setEditForm] = useState(false)


  useEffect(() => {
    !auth.logged && navigate('/login')
  },[auth])

  useEffect(() => {
    fetch(process.env.REACT_APP_SERVER+`/users/getUser/lama`,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + auth.token
      }
    })
    .then(res => res.json())
    .then(res => {
      console.log(res)
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
                <p id='cart' onClick={() => navigate('/shop/myCart')}>Mój koszyk</p>
                <p id='user-buttons'>
                  <button className='button' onClick={() => setEditForm(true)}>Edytuj dane</button>
                  <button className='button' onClick={() => setAddForm(true)}>Dodaj produkt</button>
                </p>
              </div>
              </div>
            </section>
            <section className='orders mainContent'>
              <h2>Moje zamówienia</h2>
              <div className='orderList'>
                <div className='order'>
                  <span>Numer zamówienia: 352356346435</span>
                  <span>Status: Zrealizowano</span>
                  <div>
                    <span>Zakupiono</span>
                    <div className='orderedItems'>
                      <p>ID: 12 | Okular 67zł</p>
                      <p>Item1</p>
                      <p>Item1</p>
                    </div>
                  </div>
                  <span>Koszt całkowity: 100zł</span>
                </div>
                <div className='order'>
                <span>Numer zamówienia: 352356346435</span>
                  <span>Status: Zrealizowano</span>
                  <div>
                    <span>Zakupiono</span>
                    <div className='orderedItems'>
                      <p>ID: 12 | Okular 67zł</p>
                      <p>Item1</p>
                      <p>Item1</p>
                    </div>
                  </div>
                  <span>Koszt całkowity: 100zł</span>
                </div>
              </div>
            </section>
            {editUserForm && <Popup><EditUserForm user={user} setForm={setEditForm}/></Popup>}
            {addItemForm && <Popup><AddItemForm setForm={setAddForm}/></Popup>}
        </main>
    </div>
  )
}

export default Dashboard