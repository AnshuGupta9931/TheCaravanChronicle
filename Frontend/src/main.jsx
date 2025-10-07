import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from "react-router-dom"
import { Home } from './components/Landing/Home.jsx'
import AboutUs from "./components/Landing/AboutUs.jsx"
import ContactUs from './components/Landing/ContactUs.jsx'
import Layout from './components/Landing/Layout.jsx'
import { Login } from './components/Landing/Login.jsx'
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import rootReducer from "./reducers/index.jsx"
import { Toaster } from "react-hot-toast"
import "./index.css"
import Signup from './components/Landing/Signup.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path='/' element= {<Layout/>}>
      <Route path='' element = {<Home/>}/>
      <Route path='login' element={<Login />} />
      <Route path='signup' element={<Signup />} />
      <Route path="/about" element={<AboutUs/>} />
      <Route path="/contact" element={<ContactUs/>} />
    </Route>
    </>
  )
)

const store = configureStore({
  reducer: rootReducer,
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <Toaster />
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
)
