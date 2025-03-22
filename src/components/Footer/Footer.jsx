import React, { useEffect, useState } from 'react';
import style from './Footer.module.css';
import amazonPay from '../../assets/amazonpay-logo-rgb-clr.svg'
import americanEx from '../../assets/American-Express-Emblema.png'
import masterCard from '../../assets/MasterCard logo.png'
import payPal from '../../assets/pp_fc_hl.svg'
import appelStore from '../../assets/app-store-logo.png'
import googlePlay from '../../assets/google-play-logo.svg'
export default function Footer() {

    useEffect(() => { }, []);

    return <>
        <div className="py-4 bg-[#F0F3F2]">
            <div className='contianer mx-5 md:w-[80%] md:mx-auto my-5'>
                <div>
                    <h3 className='text-2xl'>Get the FreshCart app</h3>
                    <span className='text-gray-500'>We will send you a link, open it on your phone to download the app</span>
                </div>
                {/* Need Edit in Mid screens */}
                <div>
                    <div className='border-b border-gray-300 py-3 flex flex-col gap-2 md:flex-row'>
                        <input type="email" placeholder='Email ..' className="placeholder:text-base block w-full md:w-[80%] p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        <button type="button" className="text-white bg-[#08AC0A] rounded-lg px-9 md:w-[20%] py-2.5">Share App Link</button>
                    </div>
                </div>
                <div className='flex flex-col gap-2 lg:flex-row lg:justify-between py-3 border-b border-gray-300'>
                    <div className='flex gap-2'>
                        <span>Payment Partners</span>
                        <div className="partners flex gap-3">
                            <img src={amazonPay} alt="Amazon Pay" className='w-[75px]' />
                            <img src={americanEx} alt="American Express" className='w-[50px]' />
                            <img src={masterCard} alt="Master Card" className='w-[50px]' />
                            <img src={payPal} alt="PayPal" className='w-[70px]' />
                        </div>
                    </div>
                    <div className='flex gap-2'>
                        <span>Get deliveries with FreshCart</span>
                        <div className="platforms flex gap-2">
                            <img src={appelStore} alt="Available on IOS" className='w-[85px]' />
                            <img src={googlePlay} alt="Available on Android" className='w-[100px]' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}
