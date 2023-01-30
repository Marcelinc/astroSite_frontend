import React, { useState } from 'react'
import BinocularsItems from '../components/BinocularsItems'
import FilterItems from '../components/FilterItems'
import LensItems from '../components/LensItems'
import Nav from '../components/Nav'
import PopularItems from '../components/PopularItems'
import TelescopeItems from '../components/TelescopeItems'
import '../resources/css/Shop.css'

const Shop = () => {

  const [content,setContent] = useState('started')

  return (
    <div className="container">
      <Nav/>
      <main className='content'>
        <section className='itemFilter'>
          <span className='filter' onClick={() => setContent('started')}>Popularne</span>
          <span className='filter' onClick={() => setContent('teleskop')}>Teleskopy</span>
          <span className='filter' onClick={() => setContent('okular')}>Okulary</span>
          <span className='filter' onClick={() => setContent('filtr')}>Filtry</span>
          <span className='filter' onClick={() => setContent('lornetka')}>Lornetki</span>
        </section>
        <section className='itemList'>
          {
            content === 'started' ? <h2 className='listHeader'>Najczęściej kupowane</h2>
            : content === 'teleskop' ? <h2 className='listHeader'>Teleskopy</h2>
            : content === 'okular' ? <h2 className='listHeader'>Okulary</h2>
            : content === 'filtr' ? <h2 className='listHeader'>Filtry</h2>
            : content === 'lornetka' ? <h2 className='listHeader'>Lornetki</h2> : ''
          }
          {
            content === 'started' ? <PopularItems/>
            : content === 'teleskop' ? <TelescopeItems/>
            : content === 'okular' ? <LensItems/>
            : content === 'filtr' ? <FilterItems/>
            : content === 'lornetka' ? <BinocularsItems/> : ''
          }
          
        </section>
      </main>
    </div>
  )
}

export default Shop