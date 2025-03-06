import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './components/common/Home';
import Shop from './components/common/Shop';
import './assets/css/style.scss';
import Product from './components/Product';
import Cart from './components/Cart';


function App() {


  return (
    <>
   <BrowserRouter>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
    </Routes>
   </BrowserRouter>
  
    </>
  )
}

export default App
