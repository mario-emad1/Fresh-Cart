import axios from "axios";
import { createContext, useState } from "react";


export let CartContext = createContext();

export default function CartContextProvider(props) {

    let headers = {
        token: localStorage.getItem('userToken')
    }

    function getLoggedUserCart() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
            headers: headers
        })
            .then((apiResponse) => {return apiResponse })
            .catch((error) => error)
    }

    function addProductToCart(productId) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
            {
                productId: productId
            },
            {
                headers: headers
            }
        )
            .then((apiResponse) => apiResponse)
            .catch((error) => error)
    }
    function changeProductCount(productId, count) {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            {
                count: count
            },
            {
                headers: headers
            }
        )
            .then((apiResponse) => apiResponse)
            .catch((error) => error)
    }

    function removeSpecificCartItem(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            {
                headers: headers
            }
        )
            .then((apiResponse) => apiResponse)
            .catch((error) => error)
    }

    function checkOut(cartId, url, formValues) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
            {
                shippingAddress: formValues
            },
            {
                headers: headers
            }
        )
            .then((apiResponse) => apiResponse)
            .catch((error) => error)
    }


    return <CartContext.Provider value={{ getLoggedUserCart, addProductToCart, changeProductCount, removeSpecificCartItem, checkOut }}>
        {props.children}
    </CartContext.Provider>
}