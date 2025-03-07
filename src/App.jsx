import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './components/common/Home';
import Shop from './components/common/Shop';
import './assets/css/style.scss';
import Product from './components/Product';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Login from './components/admin/Login';
import { ToastContainer, toast } from 'react-toastify';
import Dashboard from './components/admin/Dashboard';
import { AdminRequireAuth } from './components/admin/AdminRequireAuth';
import { AdminAuthProvider } from "./components/context/AdminAuth"; 


function App() {


  return (
    <>
    <AdminAuthProvider>
   <BrowserRouter>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />

        <Route path="/admin/login" element={<Login />} />

        <Route path="/admin/dashboard" element={
          <AdminRequireAuth>
          <Dashboard />
          </AdminRequireAuth>
         
          } />
        
    </Routes>
   </BrowserRouter>
   <ToastContainer />
   </AdminAuthProvider>
  
    </>
  )
}

export default App
