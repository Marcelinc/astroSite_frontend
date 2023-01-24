import React from 'react'
import '../resources/css/Popup.css'

const Popup = ({children}) => {
  return (
    <div className='popup'>
        <div className='popupContent'>{children}</div>
    </div>
  )
}

export default Popup