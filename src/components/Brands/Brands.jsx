import React, { useEffect, useState } from 'react';
import style from './Brands.module.css';
import axios from 'axios';

export default function Brands() {
    const [brands, setBrands] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    function getAllBrands() {
        setIsLoading(true)
        axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
            .then((apiResponse) => {
                setBrands(apiResponse.data.data)
                setIsLoading(false)
            })
            .catch((error) => {
                setIsLoading(false)
                console.log(error)
            })
    }

    useEffect(() => {
        getAllBrands()
    }, []);

    return <>
        {isLoading ? <div className="w-full flex justify-center items-center">
            <i className="fas fa-spinner fa-spin text-7xl text-[#08AC0A]"></i>
        </div> : <>
            <div className="main-categories-container">
                <h1 className='text-3xl font-semibold text-green-500 my-4'>Our Brands</h1>
                <div className='cat-container flex flex-col md:flex-row md:flex-wrap'>
                    {brands?.map((brand) => <div key={brand._id} className="cats md:w-1/4 p-2">
                        <img className='w-full h-[300px] object-contain' src={brand.image} alt={brand.name} />
                        <h3 className='font-semibold text-xl my-2'>{brand.name}</h3>
                    </div>
                    )}
                </div>
            </div>
        </>
        }
    </>
}
