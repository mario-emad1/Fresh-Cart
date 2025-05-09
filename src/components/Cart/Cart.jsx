import React, { useContext, useEffect, useState } from 'react';
import style from './Cart.module.css';
import { CartContext } from '../../context/CartContext';
import { Link } from 'react-router-dom';

export default function Cart() {
    const [cartDetails, setCartDetails] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    let { getLoggedUserCart, changeProductCount, removeSpecificCartItem } = useContext(CartContext);

    async function getCartItems() {
        let responseDetails = await getLoggedUserCart()
        // re-Render
        setCartDetails(responseDetails?.data?.data)        
        if (responseDetails) {
            setIsLoading(false)
        }
    }
    async function updateProductCount(productId, count) {
        let responseDetails = await changeProductCount(productId, count)
        // re-Render
        setCartDetails(responseDetails?.data?.data)
    }
    async function removeProduct(productId) {
        let responseDetails = await removeSpecificCartItem(productId)
        // re-Render
        setCartDetails(responseDetails?.data?.data)
    }
    useEffect(() => {
        getCartItems()
    }, [cartDetails]);

    return <>
        {isLoading ? <div className="w-full flex justify-center items-center">
            <i className="fas fa-spinner fa-spin text-7xl text-[#08AC0A]"></i>
        </div> : <>
            <div className='flex justify-between py-5'>
                <h2 className='text-green-500 text-3xl font-semibold'>Shopping Cart</h2>
                <span className='text-xl font-semibold'>Total Price: {cartDetails?.totalCartPrice} </span>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-16 py-3">
                                <span className="sr-only">Image</span>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Product
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Qty
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartDetails?.products.map((product) =>
                            <tr key={product.product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="p-4">
                                    <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={product.product.title} />
                                </td>
                                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                    {product.product.title}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <button onClick={() => updateProductCount(product.product.id, product.count - 1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                                            <span className="sr-only">{product.count}</span>
                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                                            </svg>
                                        </button>
                                        <div>
                                            <span className='border py-1 px-4 rounded-md border-gray-300'>{product.count}</span>
                                        </div>
                                        <button onClick={() => updateProductCount(product.product.id, product.count + 1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                                            <span className="sr-only">Quantity button</span>
                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                    {product.price} EGP
                                </td>
                                <td className="px-6 py-4">
                                    <span onClick={() => removeProduct(product.product.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer">Remove</span>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className='md:flex md:justify-end py-3 '>
                <Link to='/checkout'>
                    <button className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                        {isLoading ? <i className="fas fa-spinner fa-spin text-xl"></i> : 'Checkout Now'}
                    </button>
                </Link>
            </div>
        </>}
    </>
}
