import axios from 'axios'
import React, { createContext } from 'react'

export let WishListContext = createContext();

export default function WishListContextProvider(props) {
    let headers = {
        token: localStorage.getItem('userToken')
    }
    function addProductToWishList(productId) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist/`,
            {
                productId: productId
            },
            {
                headers: headers
            })
            .then((apiResponse) => apiResponse)
            .catch((error) => console.log(error))
    }
    function removeProductFromWishList(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
            {
                headers: headers
            }
        )
            .then((apiResponse) => apiResponse)
            .catch((error) => error)
    }
    function getLoggedUserWishList() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,
            {
                headers: headers
            }
        )
            .then((apiResponse) => apiResponse)
            .catch((error) => error)
    }
    return <WishListContext.Provider value={{ addProductToWishList, removeProductFromWishList, getLoggedUserWishList }}>
        {props.children}
    </WishListContext.Provider>
}
