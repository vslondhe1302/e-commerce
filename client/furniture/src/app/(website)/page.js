"use client"
import React, { useEffect, useState } from 'react'
import Banner1 from './home-page/Banner1'
import Collection from './home-page/Collection'
import Featured from './home-page/Featured'
import Banner2 from './home-page/Banner2'
import BestSellingProducts from './home-page/BestSellingProducts'
import ShipingArea from './home-page/ShipingArea'
import Testimonial from './home-page/Testimonial'
import NewsLetter from './home-page/NewsLetter'
import axios from 'axios'

export default function Home() {
  let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL
  let [sliderData, setSliderData] = useState([])
  let [sliderStaticPath, setSliderStaticPath] = useState('')

  let [productType, setProductType] = useState(1)
  let [productData, setProductData] = useState([])
  let [productStaticPath, setProductStaticPath] = useState('')
  let [bestSelling, setBestSelling] = useState([])

  let [testimonialData, setTestimonialData] = useState([])
  let [testimonialStaticPath, setTestimonialStaticPath] = useState('')


  let getSliderData = ()=>{
    axios.get(`${apiBaseUrl}home/slider`)
    .then((res)=>res.data)
    .then((finalRes)=>{
      console.log(finalRes);
      if(finalRes.status){
        setSliderData(finalRes.data)
        setSliderStaticPath(finalRes.staticPath)
      }
    })
  }


  let getProductData = () =>{
    axios.get(`${apiBaseUrl}home/products`,{
      params :{
        productType
      }
    })
    .then((res)=>res.data)
    .then((finalRes)=>{
      if(finalRes.status){
      console.log(finalRes);
      setProductData(finalRes.data)
      setProductStaticPath(finalRes.staticPath)   
      }   
    })
  }
  useEffect(()=>{
    getProductData()
  },[productType])

  let getBestSellingData = () =>{
    axios.get(`${apiBaseUrl}home/best-selling`)
    .then((res)=>res.data)
    .then((finalRes)=>{
      if(finalRes.status){
        console.log(finalRes);
        setBestSelling(finalRes.data)
      }
    })
  }

  let getTestimonialData = () =>{
    axios.get(`${apiBaseUrl}home/testimonial-data`)
    .then((res)=>res.data)
    .then((finalRes)=>{
      if(finalRes.status){
        console.log(finalRes);
        setTestimonialData(finalRes.data)
        setTestimonialStaticPath(finalRes.staticPath)
        
      }
    })
  }

  useEffect(()=>{
    getSliderData();
    getBestSellingData();
    getTestimonialData();

  },[])

  return (
    <div>
      <Banner1 sliderData={sliderData} staticPath={sliderStaticPath} />
      <Collection/>
      <Featured productType={productType} setProductType={setProductType} productData={productData} staticPath={productStaticPath}  />  
      <Banner2/> 
      <BestSellingProducts bestSelling = {bestSelling} staticPath={productStaticPath}/>
      <ShipingArea/>
      <Testimonial data = {testimonialData} staticPath = {testimonialStaticPath} />
      <NewsLetter/>
    </div>
  )
}

