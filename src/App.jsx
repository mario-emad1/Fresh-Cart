import { useContext, useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Products from './components/Products/Products'
import Brands from './components/Brands/Brands'
import Categories from './components/Categories/Categories'
import Cart from './components/Cart/Cart'
import Notfound from './components/Notfound/Notfound'
import Home from './components/Home/Home'
import UserContextProvider from './context/UserContext'
import ProtectedRouting from './components/ProtectedRouting/ProtectedRouting'
import ProductDetails from './components/ProductDetails/ProductDetails'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import CartContextProvider from './context/CartContext'
import { Toaster } from 'react-hot-toast'
import WishList from './components/WishList/WishList'
import ForgotPassword from './components/ForgotPassword/ForgotPassword'
import WishListContextProvider from './context/WishListContext'
import Checkout from './components/Checkout/Checkout'
let queryClient = new QueryClient();

let routing = createBrowserRouter([
  {
    path: '', element: <Layout />, children: [
      { index: true, element: <ProtectedRouting> <Home /> </ProtectedRouting> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'forgotpassword', element: <ForgotPassword /> },
      { path: 'products', element: <ProtectedRouting> <Products /> </ProtectedRouting> },
      { path: 'productdetails/:id/:category', element: <ProtectedRouting> <ProductDetails /> </ProtectedRouting> },
      { path: 'brands', element: <ProtectedRouting> <Brands /> </ProtectedRouting> },
      { path: 'categories', element: <ProtectedRouting> <Categories /> </ProtectedRouting> },
      { path: 'cart', element: <ProtectedRouting> <Cart /> </ProtectedRouting> },
      { path: '//allorders', element: <Navigate to="/" replace /> },
      { path: 'checkout', element: <ProtectedRouting> <Checkout /> </ProtectedRouting> },
      { path: 'wishlist', element: <ProtectedRouting> <WishList /> </ProtectedRouting> },
      { path: '*', element: <ProtectedRouting> <Notfound /> </ProtectedRouting> },
    ]
  }
])


function App() {

  return <QueryClientProvider client={queryClient}>
    <UserContextProvider>
      <CartContextProvider>
        <WishListContextProvider>
          <RouterProvider router={routing}></RouterProvider>
          <Toaster />
          <ReactQueryDevtools />
        </WishListContextProvider>
      </CartContextProvider>
    </UserContextProvider>
  </QueryClientProvider>
}

export default App
