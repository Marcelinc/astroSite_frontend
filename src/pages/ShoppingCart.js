import React,{useContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../App'
import Nav from '../components/Nav'
import '../resources/css/ShoppingCart.css'

const ShoppingCart = () => {

  const auth = useContext(AuthContext)
  const navigate = useNavigate()

  const [items,setItems] = useState([])
  const [totalCost,setTotalCost] = useState(0.00)
  const [loading,setLoading] = useState(true)
  const [submitted,setSubmitted] = useState(false)

  const removeItem = item => {
    const index = items.indexOf(item)
    //console.log('index',index)
    const updatedCart = items.splice(index,1)
    //console.log('updatedCard:', updatedCart)
    //console.log('items',items)
    if(items.length === 0){
      localStorage.removeItem("cartItems")
    } else{
      localStorage.setItem('cartItems',JSON.stringify(items))
    }

    setItems(items)

    //update cart cost
    var cost = 0
    if(updatedCart.length){
      //array of items
      items.forEach(element => {
        //console.log('element',element.price)
        cost = cost+element.price
      });
    } else{
      //single item
      cost = updatedCart.price
    } 
    setTotalCost(cost)
  }

  const submitOrder = () => {
    console.log(auth.userId)
    fetch(process.env.REACT_APP_SERVER+`/orders/create/`,{
      method:'POST',
      headers:{
        'Authorization':'Bearer '+auth.token,
        'Content-Type':'application/json'
      },
      body:JSON.stringify({order:{buyer:auth.userId,order_date:Date.now(),cost:totalCost,status:"INPROGRESS"},id_item:items.map(i => i.id_item)})
    })
    .then(res => res.json())
    .then(res => {
      //console.log(res)
      if(res.message === 'Success')
        setSubmitted(true)
    })
    .catch(err => console.log(err))
  }

  useEffect(() => {
    !auth.logged && navigate('/login')

    if(localStorage.getItem('cartItems')){
      let listItems = JSON.parse(localStorage.getItem('cartItems'))
      let cost = 0
      if(typeof listItems === 'object' && listItems.length){
        //array of items
        listItems.forEach(element => {
          //console.log('element',element)
          cost = cost+element.price
        });
        setItems(JSON.parse(localStorage.getItem('cartItems')))
      } else{
        //single item
        cost = listItems.price
       // console.log('elem',listItems)
        setItems([JSON.parse(localStorage.getItem('cartItems'))])
      } 
      setTotalCost(cost)

    }

    setLoading(false)
  },[auth.logged])

  return (
    <div className='container'>
      <Nav/>
      <main className='content'>
        <div className='cartInfo mainContent'>
          <h2 className='cartTitle'>Zamówienie</h2> 
                {loading ? <p className='cartMessage'>Wczytywanie danych</p> : items.length > 0 ? items.map((item,index) => <div className='item' key={index}>
                  <p className='itemName'>{item.name}</p>
                  <p className='itemDetail'><span className='detailName'>Cena:</span> {item.price}zł</p>
                  <button className='itemButton' onClick={() => removeItem(item)}>Usuń z koszyka</button>
                </div>) : <p className='cartMessage'>Nie dodałeś żadnego produktu</p>}
          <section className='summary'>
            <p><span className='cartValue'>Wartość koszyka:</span> {totalCost === 0 || totalCost === undefined ? '0.00' : totalCost}zł</p>
            <button disabled={items.length > 0 ? false : !submitted ? true : false} className='submitOrder' onClick={submitOrder}>Złóż zamówienie</button>
            {submitted && <p>Zamównienie złożone</p>}
          </section>
        </div>
      </main>
    </div>
  )
}

export default ShoppingCart