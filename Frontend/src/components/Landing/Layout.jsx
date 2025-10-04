import React from "react";
import Header from "../Header/Header.jsx";
import { Outlet } from "react-router-dom";
 
export default function Layout(){
    return(
        <>
         <Header/>
         <Outlet/>
        </>
    )
}