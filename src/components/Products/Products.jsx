import React, { useContext, useEffect, useState } from 'react';
import style from './Products.module.css';
import useGetAllProducts from '../../Hooks/useGetAllProducts';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import toast from 'react-hot-toast';
import { WishListContext } from '../../context/WishListContext';

export default function Products() {
    const [userWishList, setUserWishList] = useState([])
    let { addProductToCart } = useContext(CartContext);
    let { addProductToWishList, getLoggedUserWishList, removeProductFromWishList } = useContext(WishListContext);

    function heartToggleClicking(productId) {
        if (userWishList.includes(productId)) {
            removeFromWishList(productId)
        }
        else {
            addToWishList(productId)
        }
    }
    // get the wishlist products IDs and spread it in the userWishlist
    async function getUserWishList() {
        let response = await getLoggedUserWishList();
        let wishlistIDs = [];
        for (let i = 0; i < response.data.data.length; i++) {
            wishlistIDs.push(response.data.data[i].id)
        }
        setUserWishList([...wishlistIDs])
    }
    // Add to wishlist
    async function addToWishList(productId) {
        let response = await addProductToWishList(productId);
        setUserWishList(response?.data?.data)
        if (response.data.status === "success") {
            toast.success(response.data.message, {
                duration: 2000,
                position:'bottom-right'
            });
        }
        else {
            toast.error(response.data.message, {
                duration: 2000,
                position:'bottom-right'
            });
        }
    }
    // remove from wishList
    async function removeFromWishList(productId) {
        let response = await removeProductFromWishList(productId);
        setUserWishList(response?.data?.data)
        console.log(response);
        if (response.data.status === "success") {
            toast.success(response.data.message, {
                duration: 2000,
                position:'bottom-right'
            });
        }
        else {
            toast.error(response.data.message, {
                duration: 2000,
                position:'bottom-right'
            });
        }
    }

    // Add to cart
    async function addToCart(productId) {
        let response = await addProductToCart(productId);
        console.log(response);
        if (response.data.status === "success") {
            toast.success(response.data.message, {
                duration: 2000,
                position:'bottom-right'
            });
        }
        else {
            toast.error(response.data.message, {
                duration: 2000,
                position:'bottom-right'
            });
        }
    }

    let { data, isLoading } = useGetAllProducts();
    useEffect(() => { getUserWishList() }, [userWishList]);
    return <>
        <div className="flex flex-wrap">
            {isLoading ? <div className="w-full flex justify-center items-center">
                <i className="fas fa-spinner fa-spin text-7xl text-[#08AC0A]"></i>
            </div> : <>
                {data?.map((product) => <div key={product.id} className="product-card w-full md:w-1/4 lg:w-1/6 relative overflow-hidden">
                    <span onClick={() => { heartToggleClicking(product.id); }} className='heart-icon cursor-pointer bg-gray-100 py-1 px-[7px] rounded-md absolute'>
                        {userWishList?.includes(product.id) ? <i className="fa-solid text-red-600 fa-heart"></i> : <i className="fa-regular text-black fa-heart"></i>}
                    </span>
                    <Link to={`/productdetails/${product.id}/${product.category.name}`}>
                        <img className="p-8 w-full rounded-t-lg" src={product.imageCover} alt={product.title} />
                    </Link>
                    <div className="px-5 pb-5">
                        <Link to={`/productdetails/${product.id}/${product.category.name}`}>
                            <h5 className="text-base font-semibold tracking-tight text-[#08AC0A]">{product.category.name}</h5>
                        </Link>
                        <Link to={`/productdetails/${product.id}/${product.category.name}`}>
                            <h5 className="text-base font-normal tracking-tight text-gray-900">{product.title.split(' ').slice(0, 2).join(' ')}</h5>
                        </Link>
                        <div className="flex justify-between items-center mt-2.5 mb-5">
                            <span className="text-base py-2 font-normal text-gray-900">{product.price} EGP</span>
                            <div className="flex items-center space-x-1 rtl:space-x-reverse">
                                <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <span className="text-sm text-gray-400 font-normal py-0.5 rounded-sm ms-1">{product.ratingsAverage}</span>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-between">
                            <button onClick={() => addToCart(product.id)} className="text-white w-full bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Add to cart</button>
                        </div>
                    </div>
                </div>)}
            </>}
        </div>
    </>
}
