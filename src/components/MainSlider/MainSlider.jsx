import React, { useEffect, useState } from 'react';
import style from './MainSlider.module.css';
import Slider from 'react-slick';
import mainBanner1 from '../../assets/mainBanner1.png'
import mainBanner2 from '../../assets/mainBanner2.jpeg'
import mainBanner3 from '../../assets/mainBanner3.jpeg'
import subBanner1 from '../../assets/subBanner1.jpeg'
import subBanner2 from '../../assets/subBanner2.jpeg'
import subBanner3 from '../../assets/subBanner3.jpeg'

export default function MainSlider() {
    const [first, setfirst] = useState(0)
    useEffect(() => { }, []);

    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 500,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 3400,
        
    };


    return <>
        {/* {SimpleSlider()} */}
        <div className="flex flex-col lg:flex-row">
            <div className='w-full lg:w-3/4'>
                <Slider className='' {...settings}>
                    <div>
                        <img className='w-full lg:h-[310px]' src={mainBanner1} alt="" />
                    </div>
                    <div>
                        <img className='w-full lg:h-[310px] ' src={mainBanner2} alt="" />
                    </div>
                    <div>
                        <img className='w-full lg:h-[310px] ' src={mainBanner3} alt="" />
                    </div>
                </Slider>
            </div>
            <div className='flex w-full flex-col lg:w-1/4 justify-between'>
                <div className='lg:h-1/2'>
                    <Slider className=' ' {...settings}>
                        <div>
                            <img className='w-full rounded-none lg:h-[150px] object-fill' src={subBanner1} alt="" />
                        </div>
                        <div>
                            <img className='w-full rounded-none lg:h-[150px] object-fill' src={subBanner2} alt="" />
                        </div>
                        <div>
                            <img className='w-full rounded-none lg:h-[150px] object-fill' src={subBanner3} alt="" />
                        </div>
                    </Slider>
                </div>
                <div className='lg:h-1/2'>
                    <Slider className='' {...settings}>
                        <div>
                            <img className='w-full rounded-none lg:h-[150px] object-cover' src={subBanner2} alt="" />
                        </div>
                        <div>
                            <img className='w-full rounded-none lg:h-[150px] object-cover' src={subBanner3} alt="" />
                        </div>
                        <div>
                            <img className='w-full rounded-none lg:h-[150px] object-cover' src={subBanner1} alt="" />
                        </div>
                    </Slider>
                </div>
            </div>
        </div>

    </>
}
