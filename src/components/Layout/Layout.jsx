import React, { useEffect, useState } from 'react';
import style from './Layout.module.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';


export default function Layout() {

    return <>
        <Navbar />
        <div className="contianer mx-5 md:w-[80%] md:mx-auto my-5">
            <Outlet></Outlet>
        </div>
        <Footer />
    </>
}
