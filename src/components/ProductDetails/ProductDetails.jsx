import React, { useContext, useEffect, useState } from 'react';
import style from './ProductDetails.module.css';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Slider from "react-slick";
import { CartContext } from '../../context/CartContext';
import toast from 'react-hot-toast';

export default function ProductDetails() {
    const [isLoading, setIsLoading] = useState(false)
    const [currentProduct, setCurrentProduct] = useState(null)
    const [relatedProducts, setRelatedProducts] = useState([])
    let { id, category } = useParams()


    let { addProductToCart } = useContext(CartContext);
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


    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{
                    ...style,
                    display: "block",
                    background: "gray",
                    width: "18.5px",
                    height: "18.5px",
                    borderTopLeftRadius: "13px",
                    borderTopRightRadius: "12px",
                    borderBottomLeftRadius: "13px",
                    borderBottomRightRadius: "12px",
                }}
                onClick={onClick}
            />
        );
    }
    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{
                    ...style,
                    display: "block",
                    background: "gray",
                    width: "18.5px",
                    height: "18.5px",
                    borderTopLeftRadius: "13px",
                    borderTopRightRadius: "12px",
                    borderBottomLeftRadius: "13px",
                    borderBottomRightRadius: "12px",
                }}
                onClick={onClick}
            />
        );
    }

    function MultipleItems() {
        const settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 6,
            slidesToScroll: 6,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />,
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
        return (
            <div className="slider-container">
                <Slider {...settings}>
                    {relatedProducts.map((product) => <div key={product.id} className="">
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
                                <Link className="text-white w-full bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Add to cart</Link>
                            </div>
                        </div>
                    </div>)}
                </Slider>
            </div>
        );
    }



    function getProductDetails(id) {
        setIsLoading(true);
        axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
            .then((apiResponse) => {
                setIsLoading(false);
                setCurrentProduct(apiResponse.data.data);
            })
            .catch((error) => {
                setIsLoading(false);
            })
    }
    function getRelatedProducts(category) {
        setIsLoading(true);
        axios.get(`https://ecommerce.routemisr.com/api/v1/products/`)
            .then((apiResponse) => {
                setIsLoading(false);
                let allProducts = apiResponse.data.data;
                let related = allProducts.filter((product) => product.category.name === category);
                setRelatedProducts(related);
            })
            .catch((error) => {
                setIsLoading(false);
            })
    }
    useEffect(() => {
        getProductDetails(id);
        getRelatedProducts(category);
    }, [id, category]);

    return <>
        {isLoading ?
            <div className="w-full flex justify-center items-center">
                <i className="fas fa-spinner fa-spin text-7xl text-[#08AC0A]"></i>
            </div> : <>
                <div className="flex flex-col items-center md:flex-row md:gap-4 mb-7">
                    <div className="w-full md:w-1/4">
                        <Slider {...settings} className='mb-7'>
                            {currentProduct?.images.map((src, index) => <img key={index} src={src} alt={currentProduct?.title} />)}
                        </Slider>
                    </div>
                    <div className="w-full md:w-3/4">
                        <h1 className='font-medium mt-5 mb-1 text-lg'>{currentProduct?.title}</h1>
                        <p className='text-gray-600 ms-2 font-light'>{currentProduct?.description}</p>
                        <div className=" my-4">
                            <span className='text-gray-950'>{currentProduct?.category.name}</span>
                            <div className="flex justify-between mt-1">
                                <span className='text-gray-950'>{currentProduct?.price} EGP</span>
                                <div className="flex items-center">
                                    <svg className="w-4 me-1 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                    </svg>
                                    <span className='text-gray-900'>{currentProduct?.ratingsAverage}</span>
                                </div>
                            </div>
                        </div>
                        <button onClick={() => addToCart(id)} className="text-white w-full bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Add to cart</button>
                    </div>
                </div>
                <div className="relatedProducts">
                    <h2 className='font-semibold text-3xl mb-4'>Related Products</h2>
                    {MultipleItems()}
                </div>
            </>
        }
    </>
}
