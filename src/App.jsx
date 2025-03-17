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

import {default as ShowCategories} from './components/admin/category/Show';
import {default as CreateCategories} from './components/admin/category/Create';
import {default as EditCategories} from './components/admin/category/Edit';

import {default as ShowBrands} from './components/admin/brand/Show';
import {default as CreateBrands} from './components/admin/brand/Create';
import {default as EditBrands} from './components/admin/brand/Edit';

import {default as ShowProduct} from './components/admin/product/Show';
import {default as CreateProduct} from './components/admin/product/Create';
import {default as EditProduct} from './components/admin/product/Edit';


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

        <Route path="/admin/categories" element={
          <AdminRequireAuth>
             <ShowCategories/>
          </AdminRequireAuth>
          } />
        <Route path="/admin/categories/create" element={
          <AdminRequireAuth>
             <CreateCategories/>
          </AdminRequireAuth>
          } />
        <Route path="/admin/categories/edit/:id" element={
          <AdminRequireAuth>
             <EditCategories/>
          </AdminRequireAuth>
          } />

         
        <Route path="/admin/brands" element={
          <AdminRequireAuth>
             <ShowBrands/>
          </AdminRequireAuth>
          } />
        <Route path="/admin/brands/create" element={
          <AdminRequireAuth>
             <CreateBrands/>
          </AdminRequireAuth>
          } />
        <Route path="/admin/brands/edit/:id" element={
          <AdminRequireAuth>
             <EditBrands/>
          </AdminRequireAuth>
          } />


       <Route path="/admin/products" element={
          <AdminRequireAuth>
             <ShowProduct/>
          </AdminRequireAuth>
          } />
        <Route path="/admin/products/create" element={
          <AdminRequireAuth>
             <CreateProduct/>
          </AdminRequireAuth>
          } />
        <Route path="/admin/products/edit/:id" element={
          <AdminRequireAuth>
             <EditProduct/>
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
