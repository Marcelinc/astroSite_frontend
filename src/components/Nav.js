import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../App'
import '../resources/css/Nav.css'

const Nav = () => {

    const auth = useContext(AuthContext);
    const navigate = useNavigate()

    const logout = () => {
      auth.setToken('')
      localStorage.setItem('usetToken','')
      auth.setLogged(false)
    }

  return (
    <nav className='nav'>
        {auth.logged ? <div className='logged-links links'>
            <Link to='/dashboard'>Profil</Link>
            <Link to='/shop'>Sklep</Link>
            <Link onClick={logout}>Wyloguj</Link>
        </div> : <div className='notLogged-links links'>
            <Link to='/'>CosmicSite</Link>
            <Link to='/login'>Zaloguj się</Link>
            <Link to='/register'>Rejestracja</Link>
        </div>}
    </nav>
  )
}

export default Nav