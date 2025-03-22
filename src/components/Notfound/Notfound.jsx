import React, { useEffect, useState } from 'react';
import style from './Notfound.module.css';
import notFound from '../../assets/error.svg'
export default function Notfound() {

    useEffect(()=>{},[]);

    return <>
        <div className='flex justify-center items-center py-10'>
        <img src={notFound} alt="Not Fount Page"/>
        </div>
    </>
}
