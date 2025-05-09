import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

export default function useGetAllProducts() {

    function getRecentProducts() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
    }

    let queryResponse = useQuery({
        queryKey: ['recentProducts'],
        queryFn: getRecentProducts,
        select:(data)=> data.data.data
    })
    return queryResponse;
}
