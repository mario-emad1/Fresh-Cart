import React, { useContext, useEffect, useState } from 'react';
import style from './Checkout.module.css';
import { useFormik } from 'formik'
import { Link } from 'react-router-dom';
import * as yup from 'yup'
import { CartContext } from '../../context/CartContext';


export default function Checkout() {
    let { checkOut, getLoggedUserCart } = useContext(CartContext)
    const [userCartId, setUserCartId] = useState('')
    const [isLoading, setIsLoading] = useState(false); // loading flag
    // Validation Schema |==> Validation template 
    let validationSchema = yup.object().shape({
        details: yup.string().required('Details is required'),
        phone: yup.string().matches(/(010|011|012|015)\d{8}$/, 'Phone number must be egyptian number').required('Phone is required'),
        city: yup.string().required('City is required')
    })

    async function handleCheckOut(cartId, url) {
        setIsLoading(true)
        let { data } = await checkOut(cartId, url, checkOutSession.values);
        if (data?.status === 'success') {
            setIsLoading(false)
            window.location.href = data.session.url;
        }
    }

    let checkOutSession = useFormik({
        initialValues: {
            details: "",
            phone: "",
            city: ""
        },
        validationSchema,
        onSubmit: () => handleCheckOut(userCartId, 'https://fresh-cart-flax-nine.vercel.app')
    })

    async function getCartId() {
        let { data } = await getLoggedUserCart()
        setUserCartId(data.cartId)
    }

    useEffect(() => { getCartId() }, [])
    return <>
        <div className="contianer mx-5 md:w-[80%] md:mx-auto my-5">
            <h1 className='text-3xl font-semibold text-green-500'>Check Out :</h1>
            <form className='my-5' onSubmit={checkOutSession.handleSubmit}>
                {/* Details Input */}
                <div className="relative z-0 w-full mb-5 group">
                    <input type="text" value={checkOutSession.values.details} onChange={checkOutSession.handleChange} onBlur={checkOutSession.handleBlur} name="details" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                    <label htmlFor="details" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Details :</label>
                </div>
                {/* Details error msg */}
                {checkOutSession.errors.details && checkOutSession.touched.details ? <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span className="sr-only">Info</span>
                    <div>
                        <span className="font-medium">{checkOutSession.errors.details}</span>
                    </div>
                </div> : null}
                {/* Phone Input */}
                <div className="relative z-0 w-full mb-5 group">
                    <input type="tel" value={checkOutSession.values.phone} onChange={checkOutSession.handleChange} onBlur={checkOutSession.handleBlur} name="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                    <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone :</label>
                </div>
                {/* Phone error msg */}
                {checkOutSession.errors.phone && checkOutSession.touched.phone ? <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span className="sr-only">Info</span>
                    <div>
                        <span className="font-medium">{checkOutSession.errors.phone}</span>
                    </div>
                </div> : null}
                {/* City Input */}
                <div className="relative z-0 w-full mb-5 group">
                    <input type="text" value={checkOutSession.values.city} onChange={checkOutSession.handleChange} onBlur={checkOutSession.handleBlur} name="city" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                    <label htmlFor="city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">City :</label>
                </div>
                {/* City error msg */}
                {checkOutSession.errors.city && checkOutSession.touched.city ? <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span className="sr-only">Info</span>
                    <div>
                        <span className="font-medium">{checkOutSession.errors.city}</span>
                    </div>
                </div> : null}
                {/* Submit Btn */}
                <div className='flex justify-end'>
                    <button type="submit" className="mt-2 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                        {isLoading ? <i className="fas fa-spinner fa-spin text-xl"></i> : 'Pay Now'}
                    </button>
                </div>
            </form>
        </div>
    </>
}
