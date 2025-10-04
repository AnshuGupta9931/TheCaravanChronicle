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
import Layout from './components/Landing/Layout.jsx'
import "./index.css"

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path='/' element= {<Layout/>}>
      <Route path='' element = {<Home/>}/>
    </Route>
    </>
  )
)
createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router}/>
  </StrictMode>,
)
