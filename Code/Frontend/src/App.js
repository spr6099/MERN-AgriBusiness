import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Landing from './Components/Landing';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Products from './Components/Products';
import Services from './Components/Services';
import About from './Components/About';
import Team from './Components/Team';
import Feature from './Components/Feature';
import Login from './Components/Login';
import Register from './Components/Register';
import UserHome from './User/UserHome';
import SingleProduct from './User/SingleProduct';
import Carts from './User/Carts';
import MatchProduct from './User/MatchProduct';
import Payment from './User/Payment';
import Rating from './User/Rating';
import Order from './User/Order';
import Profiles from './User/Profiles';
import Addcomplaints from './User/Addcomplaints';


function App() {
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('userdata')))

  return (

    <BrowserRouter>
    <Routes>
      {auth == null ? (
        <>
          <Route path='/' element={<Landing/>}/>
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<Navigate to="/" />} />
       <Route path='/header' element={<Header/>}/>
       <Route path='/footer' element={<Footer/>}/>
       <Route path='/products' element={<Products/>}/>
       <Route path='/service' element={<Services/>}/>
       <Route path='/about' element={<About/>}/>
       <Route path='/team' element={<Team/>}/>
       <Route path='/feature' element={<Feature/>}/>
       <Route path='/register' element={<Register/>}/>
        </>
      ) : auth.userStatus === "2" ? (
        <>
        <Route path='/' element={<UserHome/>}/>
        <Route path='/service' element={<Services/>}/>
        <Route path='/singleproduct/:id' element={<SingleProduct />} />
        <Route path='/cart' element={<Carts/>}/>
        <Route path='/matchproduct/:id' element={<MatchProduct/>}/>
        <Route path='/order' element={<Order/>}/>
        <Route path='/payment' element={<Payment/>}/>
        <Route path='/rating' element={<Rating/>}/>
        <Route path='/profiles' element={<Profiles/>}/>
        <Route path='/complaint' element={<Addcomplaints/>}/>


        </>
    
      ) : (
        <>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register/>}/>

          <Route path='*' element={<Navigate to="/" />} />
        </>
      )}
    </Routes>
  </BrowserRouter>

    
  )
}

export default App