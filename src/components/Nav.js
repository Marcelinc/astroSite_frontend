import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../App'
import '../resources/css/Nav.css'

const Nav = () => {

    const auth = useContext(AuthContext);

    const logout = () => {
      auth.setToken('')
      localStorage.setItem('userToken','')
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