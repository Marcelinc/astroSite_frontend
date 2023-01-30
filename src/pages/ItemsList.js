import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../App'
import '../resources/css/ItemList.css'

const ItemsList = ({items,setItems}) => {

    const auth = useContext(AuthContext)

    const withdraw = (item) => {
        console.log(item.id_item)
        fetch(process.env.REACT_APP_SERVER+`/items/withdrawItem/${item.id_item}`,{
            method:"PUT",
            headers: {
                'Authorization':'Bearer '+auth.token,
            }
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            if(res.message === 'Success'){
                //itemIndex = items.findIndex(item => item.id_item = item.id_item)
                //updateItems = 
                //item.available=false
                //console.log(item)
            }
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        fetch(process.env.REACT_APP_SERVER+`/items/getUserItems/${auth.userId}`,{
            headers: {
                'Authorization':'Bearer '+auth.token,
            }
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            if(res.message === 'Success'){
                setItems(res.data)
            }
        })
        .catch(err => console.log(err))
    },[auth.userId,auth.token])

  return (
    <section className='items mainContent'>
        <h2>Moje przedmioty</h2>
              <div className='itemList'>
                {items.length > 0 ? items.map(item => <div className='item' key={item.id_item}>
                  <p className='itemName'>{item.name}</p>
                  <p className='itemDetail'><span className='detailName'>Cena:</span> {item.price}zł</p>
                  <p className='itemDetail'><span className='detailName'>Ilość sprzedanych:</span> {item.soldCount}</p>
                  <p className='itemDetail'><span className='detailName'>Status:</span> {item.available ? 'Dostępny' : 'Niedostępny'}</p>
                  <button className='itemButton' onClick={() => withdraw(item)}>Wycofaj produkt</button>
                </div>) : <p>Nie dodałeś żadnego produktu</p>}
              </div>
    </section>
  )
}

export default ItemsList