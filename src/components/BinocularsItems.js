import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../App'

const BinocularsItems = () => {

    const auth = useContext(AuthContext)
    const navigate = useNavigate()
    const [items,setItems] = useState([])

    const addToCart = (item) => {
        !auth.logged && navigate('/login')

        if(item.available){
            var currentCart = JSON.parse(localStorage.getItem('cartItems')) 
            console.log(typeof currentCart)
            console.log(currentCart)
            if(currentCart !== null){
                //add new item to cart
                if(currentCart.length){
                    //cart has array of items
                    const updatedCart = [item,...currentCart]
                    localStorage.setItem('cartItems',JSON.stringify(updatedCart))
                } else{
                    //cart has only 1 item
                    const updatedCart = [item,currentCart]
                    localStorage.setItem('cartItems',JSON.stringify(updatedCart))
                }
            }
            else{
                //create new localStorage variable with item
                localStorage.setItem('cartItems',JSON.stringify(item))
            }
        }
    }

  useEffect(() => {
      fetch(process.env.REACT_APP_SERVER+`/items/getBinoculars`)
      .then(res => res.json())
      .then(res => {
          console.log(res)
          if(res.message === 'Success'){
              setItems(res.data)
          }

      })
      .catch(err => console.log(err))
  },[])

  return (
    <div className='items'>
    {items.length > 0 ? items.map(item => <div className='item' key={item.id_item}>
              <p className='itemName'>{item.name}</p>
              <p className='itemDetail'><span className='detailName'>Cena:</span> {item.price}zł</p>
              <p className='itemDetail'><span className='detailName'>Ilość sprzedanych:</span> {item.soldCount}</p>
              <p className='itemDetail'><span className='detailName'>Status:</span> {item.available ? 'Dostępny' : 'Niedostępny'}</p>
              <button className='itemButton' onClick={() => addToCart(item)} disabled={!item.available}>Dodaj do koszyka</button>
    </div>) : <p>Brak filtrów w sklepie</p>}
</div>
  )
}

export default BinocularsItems