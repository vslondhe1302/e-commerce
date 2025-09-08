"use client"
import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Banner1({ sliderData, staticPath }) {
    var settings = {
        dots: true,
        infinite: true,
        speed: 900,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        autoplay:true,
        autoplaySpeed: 3000,
        cssEase: "linear"
    };
    return (
        <>
        {sliderData.length>=1
        ?
        <div id='banner1Slider' className='mb-[35px]'>
            <Slider {...settings}>
                {sliderData.map((items, index) => {
                    return (
                        <div>
                            <div key={index} className=''>
                                <img src={staticPath + items.sliderImage} className='' alt="" />
                            </div>
                        </div>
                    )
                })
                }
            </Slider>
        </div>
        :
        <div className='max-w-full text-center my-[50px]'>Loading.....</div>
        }
        </>
    );
}