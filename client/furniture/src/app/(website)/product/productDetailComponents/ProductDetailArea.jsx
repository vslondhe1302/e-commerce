"use client"
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RelatedProducts from './RelatedProducts';
import UpsellingProducts from './UpsellingProducts';
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import { useSelector } from 'react-redux';
import { store } from '@/app/store/store';
import axios from 'axios';
import { useParams } from 'next/navigation';

export default function ProductDetailArea() {
    let [qty, setQty] = useState(1)
    let [staticPath, setStaticPath] = useState('')
    let [productDetails, setProductDetails] = useState(null)
    let [galleryImages, setGalleryImages] = useState({})
    let [color, setColor] = useState('')
    let [salePrice, setSalePrice] = useState('')
    let [actualPrice, setActualPrice] = useState('')
    
    let [activeIndex, setActiveIndex] = useState(0)

    // let user = useSelector((store)=>store.login.user)
    // let token = useSelector((store)=store.login.token)
    let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL
    console.log(qty);

    let sliderRef = useRef(null)

    var mainSetting = {
        dots: false,
        infinite: true,
        speed: 0,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 500,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        beforeChange : (oldIndex,newIndex) =>{
            setActiveIndex(newIndex)
        }
    };

    let handleThumbnailClick = (index) =>{
        setActiveIndex(index)
        sliderRef.current.slickGoTo(index)
    }

    // var thumbSetting = {
    //     dots: false,
    //     infinite: true,
    //     asNavFor : mainSlider.current,
    //     ref : thumbSlider,
    //     focusOnSelect : true,
    //     speed: 0,
    //     slidesToShow: 4,
    //     slidesToScroll: 1,
    //     speed: 500,
    //     nextArrow: <SampleNextArrow2 />,
    //     prevArrow: <SamplePrevArrow2 />
    // };

    let { slug } = useParams()
    console.log(slug)

    let getProductDetails = () => {
        axios.get(`${apiBaseUrl}home/single-product/${slug}`)
            .then((res) => res.data)
            .then((finalRes) => {
                console.log(finalRes);
                setProductDetails(finalRes.data)
                setStaticPath(finalRes.staticPath)
                setColor(finalRes.data.productFinish)
                setGalleryImages(finalRes.data.galleryImages)
                setSalePrice(finalRes.data.salePrice)
                setActualPrice(finalRes.data.actualPrice)
               
            })
    }

    useEffect(() => {
        getProductDetails()
    }, [])

    let galleryImagesToShow = galleryImages[color] || []

    let discountPrice = Number(actualPrice)-Number(salePrice)
    let discountPercent = ((discountPrice*100)/Number(actualPrice)).toFixed(2)

    // let [currentIndex, setCurrentIndex] = useState(0)
    
    // let handleClickImg = (idx)=>{
    //    console.log(idx);
    //    setCurrentIndex(idx)
       
    // }
    


    // let addToCart = () =>{
    //     let obj ={
    //             id : items._id,
    //             image : items.productImage,
    //             price : items.salePrice,
    //             title : items.productName,
    //             qty : 1,
    //             color,
    //         }

    //     if(user){
    //         axios.post(`${apiBaseUrl}cart/add-to-cart`,obj,{
    //             headers : {
    //                 Authorization : `Bearer ${token}`
    //             }
    //         })
    //         .then((res)=>res.data)
    //         .then((finalRes)=>{
    //             console.log(finalRes);

    //         })
    //     }
    //     else{
    //         alert("Please Login")
    //     }
    // }

    return (
        <div className='w-[100%] '>
            {productDetails &&
            <div>
                <div className='max-w-[1320px] mx-auto lg:pb-[70px] pb-[40px]'>
                    <div className='grid lg:grid-cols-2 sm:grid-cols-[60%_auto] grid-cols-1 lg:gap-[24px] gap-[14px]'>
                        <div className='' id=''>
                            <Slider {...mainSetting} ref={sliderRef}>
                                {galleryImagesToShow.map((image,index)=>(
                                <div>
                                    <div className=''>
                                        <img key={index} src={staticPath+image} className='' alt={`Main ${index}`} />
                                    </div>
                                </div>
                                ))}
                            </Slider>
                            <div className='mt-5 max-w-[100%] flex justify-center items-center'>
                                <ul className='grid grid-cols-4 gap-3'>
                                    {galleryImagesToShow.map((images,index)=>(
                                        <li className=' lg:w-[120px] w-[90px]'>
                                            <div className=''>
                                                <img onClick={()=>handleThumbnailClick(index)} key={index} src={staticPath+images} alt={`Thumb ${index}`} className={`w-[100%] border-1 ${activeIndex===index ? "border-[var(--border_color)]" : "border-gray-300"}`} />
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className='lg:mt-0 mt-6'>
                            <div className=''>
                                <h2 className='lg:text-[24px] text-[18px] text-[var(--primary_text_color)] lg:leading-[21px] leading-[18px] font-[700] font-[font-playfair] lg:mb-5 mb-3'>
                                    {productDetails.productName}
                                </h2>
                                <div className='lg:mb-[29px] mb-4'>
                                    <span className='old_price lg:mr-[10px] mb-[6px] lg:text-[16px] text-[12px] text-[rgb(140,139,139)] lg:leading-[26px] leading-[20px] font-[500] line-through block'>
                                        MRP : &#8377; {Number(productDetails.actualPrice).toLocaleString()}
                                    </span>
                                    <span className='current_price lg:mr-[10px] mr-[6px] lg:text-[20px] text-[16px] text-[var(--primary_text_color)] lg:leading-[28px] leading-[20px] font-[700] flex items-center'>
                                        Offer Price : &#8377; {Number(productDetails.salePrice).toLocaleString()}
                                        <span className=' lg:text-[15px] text-[12px] lg:ml-2 ml-2 font-[500] text-[var(--green_text_color)] lg:leading-[24px]'>
                                            {discountPercent}% OFF
                                        </span>
                                    </span>
                                </div>
                                <div className='lg:mb-[35px] mb-[25px] lg:pb-[28px] pb-[18px] border-b-1 border-b-gray-300'>
                                    <p className='lg:text-[14px] text-[11px] text-[var(--gray_text_color)] lg:leading-[26px] leading-[20px] font-[400]'>
                                        {productDetails.productDescription}
                                    </p>
                                </div>
                                <div className='lg:mb-6 mb-4'>
                                    <h3 className='lg:mb-[12px] mb-[8px] lg:text-[14px] text-[11px] text-[var(--primary_text_color)] lg:leading-[18px] leading-[16px] font-[500] block'>
                                        Color Options
                                    </h3>
                                    <div className='flex gap-4'>
                                        <div>
                                            <div onClick={()=>setColor('honey')} className={`lg:w-[95px] w-[65px] lg:h-[90px] h-[60px] lg:p-1.5 p-1 hover:border-[var(--border_color)] border-1 ${color=='honey' ? 'border-[var(--border_color)]' : 'border-gray-300'} `}>
                                                
                                                <img src={staticPath+productDetails.galleryImages.honey[0]} className='w-[100%] h-full' alt="" />
                                                
                                            </div>
                                            <span className='lg:mt-[6px] mt-[4px] lg:text-[13px] text-[10px] text-center text-[var(--primary_text_color)] lg:leading-[18px] leading-[16px] font-[400] block'>
                                                Honey Finish
                                            </span>
                                        </div>
                                        <div>
                                            <div onClick={()=>setColor('brown')} className={`lg:w-[95px] w-[65px] lg:h-[90px] h-[60px] lg:p-1.5 p-1 hover:border-[var(--border_color)] border-1 ${color=='brown' ? 'border-[var(--border_color)]' : 'border-gray-300'} `}>
                                                <img src={staticPath+productDetails.galleryImages.brown[0]} className='w-[100%] h-full' alt="" />
                                            </div>
                                            <span className='lg:mt-[6px] mt-[4px] lg:text-[13px] text-[10px] text-center text-[var(--primary_text_color)] lg:leading-[18px] leading-[16px] font-[400] block'>
                                                Brown Finish
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className='lg:mb-6 mb-4'>
                                    <span className='lg:text-[14px] text-[11px] text-[var(--primary_text_color)] lg:leading-[18px] leading-[16px] font-[500] lg:mr-4 mr-3'>
                                        Quantity
                                    </span>
                                    <input onChange={(e) => setQty(e.target.value)} type="number" max={50} min={1} value={qty} className='lg:w-[60px] w-[40px] lg:h-[30px] h-[20px] p-1.5 border-1 border-gray-300' />
                                </div>
                                <div className='mb-[27px]'>
                                    <button type='submit' className='lg:text-[16px] text-[12px] text-white lg:leading-[42px] leading-[32px] font-[400] bg-[var(--bg_color)] lg:w-[226px] w-[160px] rounded-[3px] hover:bg-[var(--dark_bg_color)] duration-300'>
                                        Add To Cart
                                    </button>
                                    <button type="submit" className='hidden'>Loading...</button>
                                </div>

                                <h4 className='lg:text-[18px] text-[14px] text-[var(--primary_text_color)] lg:leading-[21px] leading-[18px] font-[600] lg:mb-5 mb-3'>Product Details</h4>
                                <div className='mb-5'>
                                    <span className='lg:mb-[17px] mb-[12px] lg:text-[14px] text-[11px] text-[var(--primary_text_color)] lg:leading-[18px] leading-[16px] font-[500] block'>
                                        Code : {productDetails.productCode}
                                    </span>
                                    <span className='lg:mb-[17px] mb-[12px] lg:text-[14px] text-[11px] text-[var(--primary_text_color)] lg:leading-[18px] leading-[16px] font-[500] block'>
                                        Category : <Link href={'#'} className='lg:pl-2 pl-1 lg:text-[14px] text-[11px] text-[var(--gray_text_color)] lg:leading-[18px] leading-[16px] font-[500]' >
                                        {productDetails.subSubCategory.subSubCategoryName}
                                    </Link>
                                    </span>
                                    <div className='grid grid-cols-2 gap-5'>
                                        <span className='lg:mb-[17px] mb-[12px] lg:text-[14px] text-[11px] text-[var(--primary_text_color)] lg:leading-[18px] leading-[16px] font-[500] block'>
                                            Material
                                            <span className='lg:text-[14px] text-[11px] text-[var(--gray_text_color)] lg:leading-[18px] leading-[16px] font-[500] block' >
                                                {productDetails.productMaterial.map((material)=>material.materialName)}
                                            </span>
                                        </span>
                                        <span className='lg:mb-[17px] mb-[12px] lg:text-[14px] text-[11px] text-[var(--primary_text_color)] lg:leading-[18px] leading-[16px] font-[500] block'>
                                            Finish <span className='lg:text-[14px] text-[11px] text-[var(--gray_text_color)] lg:leading-[18px] leading-[16px] font-[500] block' >
                                                {productDetails.productFinish=='honey'
                                                ?
                                                'Honey Finish'
                                                :
                                                'Brown Finish'
                                                }
                                            </span>
                                        </span>
                                    </div>

                                    <div className='grid grid-cols-2 gap-5'>
                                        <span className='lg:mb-[17px] mb-[12px] lg:text-[14px] text-[11px] text-[var(--primary_text_color)] lg:leading-[18px] leading-[16px] font-[500] block'>
                                            Warranty
                                            <span className='mt-1 lg:text-[14px] text-[11px] text-[var(--gray_text_color)] lg:leading-[18px] leading-[16px] font-[500] block' >
                                               {productDetails.productWarranty}
                                            </span>
                                        </span>
                                        <span className='lg:mb-[17px] mb-[12px] lg:text-[14px] text-[11px] text-[var(--primary_text_color)] lg:leading-[18px] leading-[16px] font-[500] block'>
                                            Brand <span className='lg:text-[14px] text-[11px] text-[var(--gray_text_color)] lg:leading-[18px] leading-[16px] font-[500] block' >
                                               {productDetails.productBrand}
                                            </span>
                                        </span>
                                    </div>

                                    <div className='grid grid-cols-2 gap-5'>
                                        <span className='lg:mb-[17px] mb-[12px] lg:text-[14px] text-[11px] text-[var(--primary_text_color)] lg:leading-[18px] leading-[16px] font-[500] block'>
                                            Dimensions <span className='lg:text-[14px] text-[11px] text-[var(--gray_text_color)] lg:leading-[18px] leading-[16px] font-[500] block' >
                                                {productDetails.productDimensions}
                                            </span>
                                        </span>
                                        <span className='lg:mb-[17px] mb-[12px] lg:text-[14px] text-[11px] text-[var(--primary_text_color)] lg:leading-[18px] leading-[16px] font-[500] block'>
                                            Estimate Delivery Days <span className='lg:text-[14px] text-[11px] text-[var(--gray_text_color)] lg:leading-[18px] leading-[16px] font-[500] block' >
                                                {productDetails.productShipIn}
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='max-w-[1320px] mx-auto lg:mb-[57px] mb-[45px]'>
                    <div>
                        <div className='lg:pb-[15px] pb-3 border-b-1 border-b-gray-300'>
                            <h3 className='lg:text-[24px] text-[18px] text-[var(--secondary_text_color)] lg:leading-[26px] leading-[21px] font-[500]'>
                                Description
                            </h3>
                        </div>
                        <div className='lg:pt-[24px] pt-[16px]'>
                            <div>
                                <p className='lg:text-[14px] text-[11px] text-[var(--gray_text_color)] lg:leading-[24px] leading-[18px] font-[500]'>
                                    {productDetails.productDescription}
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
}
            <RelatedProducts />
            <UpsellingProducts />
        </div>
    )
}

function SampleNextArrow(props) {
    const { onClick } = props;
    return (
        <div
            className="absolute top-[50%] right-2 bg-[rgba(255,255,255,0.5)] w-[40px] h-[50px] translateY-[-50%] flex items-center justify-center"
            onClick={onClick}
        ><GrNext className='' /></div>
    );
}

function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
        <div
            className="absolute top-[50%] left-2 z-10 bg-[rgba(255,255,255,0.5)] w-[40px] h-[50px] translateY-[-50%] flex items-center justify-center"
            onClick={onClick}
        ><GrPrevious /></div>
    );
}
