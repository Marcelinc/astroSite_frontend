import './resources/css/App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Shop from './pages/Shop';
import { createContext, useEffect, useState } from 'react';
import ErrorPage from './pages/ErrorPage';
import Welcome from './pages/Welcome';
import ShoppingCart from './pages/ShoppingCart';

export const AuthContext = createContext();

function App() {

  const [token,setToken] = useState(localStorage.getItem('userToken'));
  const [userId,setId] = useState('');
  const [logged,setLogged] = useState(false);

  useEffect(() => {
    if(token)
      setLogged(true)
    //console.log(logged)
   // console.log(token)
  },[])

  return (
   <Router>
    <AuthContext.Provider value={{token,setToken,userId,setId,logged,setLogged}}>
      <Routes>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/' element={<Welcome/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>  
        <Route path='/shop' element={<Shop/>}/>
        <Route path='/shop/myCart' element={<ShoppingCart/>}/>
        <Route path='*' element={<ErrorPage/>}/>
      </Routes>
    </AuthContext.Provider>
   </Router>
  );
}

export default App;
