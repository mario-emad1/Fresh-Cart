import React, { useEffect, useState } from 'react';
import style from './CategorySlider.module.css';
import Slider from "react-slick";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export default function CategorySlider() {

    function getCategories() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    }
    let { data, isLoading } = useQuery({
        queryKey: ['getCategories'],
        queryFn: getCategories,
        select: (data) => data.data.data
    })
    function displayCategorySlider() {
        const settings = {
            dots: false,
            infinite: true,
            arrows: false,
            speed: 500,
            slidesToShow: 6,
            slidesToScroll: 2,
            autoplay: true,
            speed: 2000,
            autoplaySpeed: 3400,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        initialSlide: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };
        if (isLoading) {
            return null
        }
        else {
            return <div className='my-4 '>
                <h3 className='text-2xl py-3'>Shop Popular Categories</h3>
                <div className="slider-container">
                    <Slider {...settings}>
                        {data?.map((cat) => <div key={cat._id} className='px-1'>
                            <img className='h-[200px] object-cover w-full' src={cat?.image} alt="" />
                            <h2 className='font-semibold'>{cat?.name}</h2>
                        </div>)}
                    </Slider>
                </div>
            </div>
        }

    }

    return <>
        {displayCategorySlider()}
    </>
}
