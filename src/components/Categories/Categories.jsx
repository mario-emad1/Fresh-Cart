import React, { useEffect, useState } from 'react';
import style from './Categories.module.css';
import axios from 'axios';

export default function Categories() {
    const [mainCategories, setMainCategories] = useState([])
    const [subCategories, setSubCategories] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    function getAllMainCategories() {
        setIsLoading(true)
        axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
            .then((apiResponse) => {
                setMainCategories(apiResponse.data.data)
                setIsLoading(false)
            })
            .catch((error) => {
                setIsLoading(false)
                console.log(error)
            })
    }
    function getAllSubCategories() {
        setIsLoading(true)
        axios.get(`https://ecommerce.routemisr.com/api/v1/subcategories`)
            .then((apiResponse) => {
                setSubCategories(apiResponse.data.data)
                setIsLoading(false)
            })
            .catch((error) => {
                setIsLoading(false)
                console.log(error)
            })
    }
    useEffect(() => {
        getAllMainCategories()
        getAllSubCategories()
    }, []);

    return <>
        {isLoading ? <div className="w-full flex justify-center items-center">
            <i className="fas fa-spinner fa-spin text-7xl text-[#08AC0A]"></i>
        </div> : <>
            <div className="main-categories-container">
                <h1 className='text-3xl font-semibold text-green-500 my-4'>Our Main Categories</h1>
                {/* Display Main Categories */}
                <div className='cat-container flex flex-col md:flex-row md:flex-wrap'>
                    {mainCategories?.map((mainCat) => <div key={mainCat._id} className="cats md:w-1/4 p-2">
                        <img className='w-full h-[300px] object-contain' src={mainCat.image} alt={mainCat.name} />
                        <h3 className='font-semibold text-xl my-2'>{mainCat.name}</h3>
                    </div>
                    )}
                </div>
            </div>
            <div className="sub-categories-container">
                {/* Display Sub Categories */}
                <h1 className='text-3xl font-semibold text-green-500 my-4'>Our Sub Categories</h1>
                <div className='cat-container flex flex-col md:flex-row md:flex-wrap'>
                    {subCategories?.map((subCat) => <div key={subCat._id} className="cats md:w-1/4 p-2">
                        {/* <img className='w-full h-[300px] object-contain' src={subCat.image} alt={subCat.name} /> */}
                        <h3 className='font-semibold text-xl my-2'>{subCat.name}</h3>
                    </div>
                    )}
                </div>
            </div>
        </>
        }
    </>
}
