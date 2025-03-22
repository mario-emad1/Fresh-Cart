import React, { useContext, useEffect, useState } from 'react';
import style from './WishList.module.css';
import axios from 'axios';
import { WishListContext } from '../../context/WishListContext';

export default function WishList() {
    const [isLoading, setIsLoading] = useState(true)
    const [wishListItems, setWishListItems] = useState([])
    let { removeProductFromWishList, getLoggedUserWishList } = useContext(WishListContext)

    async function removeFromWishList(productId) {
        let response = await removeProductFromWishList(productId);
    }

    async function getWishListItems() {
        let response = await getLoggedUserWishList()
        setWishListItems(response?.data.data)
        setIsLoading(false)
    }

    useEffect(() => { getWishListItems() }, [wishListItems]);

    return <>
        {isLoading ? <div className="w-full flex justify-center items-center">
            <i className="fas fa-spinner fa-spin text-7xl text-[#08AC0A]"></i>
        </div> : <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
                            Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {wishListItems?.map((item) => <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="p-4">
                            <img src={item.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={item.title} />
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            {item.title}
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            {item.price} EGP
                        </td>
                        <td className="px-6 py-4">
                            <span onClick={() => removeFromWishList(item.id)} className="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline">Remove</span>
                        </td>
                    </tr>)}
                </tbody>
            </table>
        </div>}
    </>
}
