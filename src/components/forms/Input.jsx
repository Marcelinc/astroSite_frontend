import React from 'react'

const Input = ({placeholder}) => {
  return (
    <input placeholder={placeholder} style={styles}/>
  )
}

export default Input

const styles = {
    'border-radius': '5px',
    'border': '0',
    padding: '15px'
}