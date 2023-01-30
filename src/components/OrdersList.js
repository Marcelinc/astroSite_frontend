import React, {useContext, useEffect, useState} from 'react'
import { AuthContext } from '../App'

const OrdersList = () => {

    const auth = useContext(AuthContext)

    const [orders,setOrders] = useState([])

    useEffect(() => {
        fetch(process.env.REACT_APP_SERVER+`/orders/getOrders`,{
            headers:{
                'Authorization':'Bearer '+auth.token
            }
        })
        .then(res => res.json())
        .then(res => {
           // console.log(res)
            if(res.message === 'Success'){
                setOrders(res.data)
            }
        })
        .catch(err => console.log(err))
    },[])

  return (
    <section className='orders mainContent'>
              <h2>Moje zamówienia</h2>
              <div className='orderList'>
                {orders.length > 0 ? orders.map(order => <div className='order' key={order.id_order}>
                  <span>Numer zamówienia: {order.id_order}</span>
                  <span>Status: {order.status === 'INPROGRESS' ? 'W realizacji' : 'Zrealizowano'}</span>
                  <div>
                    <span>Zakupiono</span>
                    <div className='orderedItems'>
                      {/*<p>ID: 12 | Okular 67zł</p>
                      <p>Item1</p>
  <p>Item1</p>*/}
                    </div>
                  </div>
                  <span>Koszt całkowity: {order.cost}zł</span>
                </div>) : <p>Nie złożono zamówień</p> }
              </div>
            </section>
  )
}

export default OrdersList