"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { GoChevronDown } from 'react-icons/go';
import { HiMenuAlt2 } from "react-icons/hi";
import { FaRegHeart } from 'react-icons/fa';
import { sortby } from './categoryData/SortbyData';
import axios from 'axios';

export default function ProductPage({ slug }) {
  let [sortMenu, setSortMenu] = useState(false)
  let [categoryMenu, setCategoryMenu] = useState(false)
  let [price, setPrice] = useState(100000)

  let [clickedIndex, setClickedIndex] = useState(0)
  let [clickedList, setClickedList] = useState('Sort By')
  let [hoveredIndex, setHoveredIndex] = useState(null)

  let [living, setLiving] = useState([])
  let [sofa, setSofa] = useState([])

  let [materialList, setMaterialList] = useState([])
  let [colorList, setColorList] = useState([])

  let [checkIds, setCheckIds] = useState([])
  let [checkMaterial, setCheckMaterial] = useState([])
  let [checkColor, setCheckColor] = useState([])
  let [maxPrice, setMaxPrice] = useState(null)

  let getCheckValue = (e) =>{
    if(e.target.checked && !checkIds.includes(e.target.value)){
      setCheckIds([...checkIds,e.target.value])
    }
    else{
      setCheckIds(checkIds.filter((v)=>!v.includes(e.target.value)))
    }
  }

  let getCheckMaterial = (e) =>{
    if(e.target.checked && !checkMaterial.includes(e.target.value)){
      setCheckMaterial([...checkMaterial,e.target.value])
    }
    else{
      setCheckMaterial(checkMaterial.filter((v)=>!v.includes(e.target.value)))
    }
  }
  
  let getCheckColor = (e) =>{
    if(e.target.checked && !checkColor.includes(e.target.value)){
      setCheckColor([...checkColor,e.target.value])
    }
    else{
      setCheckColor(checkColor.filter((v)=>!v.includes(e.target.value)))
    }
  }

  let handleMouseUp = () =>{
    setMaxPrice(price)
  }
  
  console.log(checkIds)
  console.log(checkMaterial);
  console.log(checkColor);
  console.log(maxPrice);
  
  

  let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL

  let getProductListing = () => {
    axios.get(`${apiBaseUrl}home/mega-menu`,)
      .then((res) => res.data)
      .then((finalRes) => {
        if (finalRes.status) {
          setLiving(finalRes.data[0].subcategories)
          setSofa(finalRes.data[1].subcategories)
        }

      })
  }

  let getMaterialList = () => {
    axios.get(`${apiBaseUrl}home/material-list`)
      .then((res) => res.data)
      .then((finalRes) => {
        if (finalRes.status) {
          setMaterialList(finalRes.data)
        }

      })
  }

  let getColorList = () => {
    axios.get(`${apiBaseUrl}home/color-list`)
      .then((res) => res.data)
      .then((finalRes) => {
        if (finalRes.status) {
          setColorList(finalRes.data)
        }

      })
  }

  useEffect(() => {
    getProductListing()
    getMaterialList()
    getColorList()
  }, [])


  return (

    <div className='w-[100%] pb-[65px]'>
      <div className='max-w-[1320px] mx-auto grid lg:grid-cols-[20%_78%] gap-[2%] '>
        <div onClick={()=>setCategoryMenu(false)} className={`${categoryMenu ? '' : 'hidden'} lg:hidden w-full h-[100vh] bg-[rgba(0,0,0,0.5)] fixed top-0 left-0 z-20`}></div>
        <div className='lg:pr-[25px] w-[100%] order-1 relative'>
          <h2 onClick={() => setCategoryMenu(!categoryMenu)} className='lg:text-[24px] lg:hidden text-[16px] leading-[32px] mb-[20px] font-[font-playfair] font-[700] text-[var(--primary_text_color)] lg:border-0 lg:px-0 px-[20px] inline-block border-[0.1px] border-gray-200'>
            Categories <HiMenuAlt2 className='lg:hidden inline-block ml-2' />
          </h2>
          <div className={`${categoryMenu ? 'left-0' : 'left-[-800px]'} lg:block lg:static fixed top-0 duration-300 z-[25] bg-white max-w-[270px] p-4 h-full`}>
            <div className='max-h-[500px] pb-[30px] mb-[20px] overflow-y-scroll w-[100%] border-b-[0.1px] border-gray-200'>
              <h2 className='lg:text-[24px] text-[16px] leading-[32px] mb-[20px] font-[font-playfair] font-[700] text-[var(--primary_text_color)] lg:border-0 lg:block lg:px-0 px-[20px] hidden border-[0.1px] border-gray-200'>
                Categories
              </h2>

              <div className='table-data '>
                {living.map((livingCategory, index) => (
                  <div key={index}>
                    <h4 className='lg:text-[18px] text-[14px] lg:leading-[44px] leading-[30px] font-[font-playfair] font-[700] text-[var(--gray_text_color)]'>
                      {livingCategory.subCategoryName}
                    </h4>

                    <ul>
                      {livingCategory.subsubcategories.map((value, idx) => (
                        <li key={idx} className='flex items-center'>
                          <input onChange={getCheckValue} //checked={ checkIds.includes(value._id) || slug==value.slug}// 
                          type="checkbox" multiple name="tableSubSubCategory" id="" value={value._id} className='lg:w-[18px] lg:h-[18px] w-[14px] h-[14px] leading-[17px] cursor-pointer' />
                          <label className='lg:text-[14px] text-[12px] lg:leading-[44px] leading-[30px] lg:pl-[24px] pl-[10px] font-[font-rubik] text-[var(--gray_text_color)]'>
                            {value.subSubCategoryName}
                          </label>
                        </li>

                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className='sofaSets-data'>
                {sofa.map((sofaCategory, index) => (
                  <div key={index}>
                    <h4 className='lg:text-[18px] text-[14px] lg:leading-[44px] leading-[30px] font-[font-playfair] font-[700] text-[var(--gray_text_color)]'>
                      {sofaCategory.subCategoryName}
                    </h4>
                    <ul>
                      {sofaCategory.subsubcategories.map((value, idx) => (
                        <li key={idx} className='flex items-center'>
                          <input onChange={getCheckValue} type="checkbox" multiple name="sofaSubSubCategory" id="" value={value._id} className='lg:w-[18px] lg:h-[18px] w-[14px] h-[14px] leading-[17px] cursor-pointer' />
                          <label htmlFor="" className='lg:text-[14px] text-[12px] lg:leading-[44px] leading-[30px] lg:pl-[24px] pl-[10px] font-[font-rubik] text-[var(--gray_text_color)]'>
                            {value.subSubCategoryName}
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className='max-h-[480px] pb-[30px] mb-[20px] overflow-y-scroll w-[100%] border-b-[0.1px] border-gray-200'>
              <div className='brands-data '>
                <h4 className='lg:text-[18px] text-[14px] lg:leading-[44px] leading-[30px] font-[font-playfair] font-[700] text-[var(--gray_text_color)]'>
                  Material
                </h4>
                <ul>
                  {materialList.map((items, index) => {
                    return (
                      <li key={index} className='flex items-center'>
                        <input onChange={getCheckMaterial} type="checkbox" multiple name="material" id="" value={items._id} className='lg:w-[18px] lg:h-[18px] w-[14px] h-[14px] leading-[17px] cursor-pointer' />
                        <label htmlFor="" className='lg:text-[14px] text-[12px] lg:leading-[44px] leading-[30px] lg:pl-[24px] pl-[10px] font-[font-rubik] text-[var(--gray_text_color)]'>
                          {items.materialName}
                        </label>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>

            <div className='max-h-[480px] overflow-y-scroll pb-[30px] mb-[20px] w-[100%] border-b-[0.1px] border-gray-200'>
              <div className='color-data '>
                <h4 className='lg:text-[18px] text-[14px] lg:leading-[44px] leading-[30px] font-[font-playfair] font-[700] text-[var(--gray_text_color)]'>
                  Color
                </h4>
                <ul>
                  {colorList.map((items, index) => (
                    <li key={index} className='flex items-center'>
                      <input onChange={getCheckColor} type="checkbox" multiple name="color" id="" value={items._id} className='lg:w-[18px] lg:h-[18px] w-[14px] h-[14px] leading-[17px] cursor-pointer' />
                      <label htmlFor="" className='lg:text-[14px] text-[12px] lg:leading-[44px] leading-[30px] lg:pl-[24px] pl-[10px] font-[font-rubik] text-[var(--gray_text_color)]'>
                        {items.colorName}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className='filter-data '>
              <form >
                <lable className='lg:text-[18px] text-[14px] lg:leading-[44px] sm:leading-[30px] leading-[26px] lg:mb-[20px] mb-3 font-[font-playfair] font-[700] text-[var(--gray_text_color)] block'>
                  Filter by price
                </lable>
                <input onChange={(e)=>setPrice(e.target.value)} onMouseUp={handleMouseUp} onTouchEnd={handleMouseUp} type="range" name="price" id="filter" value={price} min='0' step={100} max='200000' className='range lg:w-[100%] w-[50%] mx-auto py-[10px] cursor-pointer' />
                <span className='block lg:text-[14px] text-[12px] text-[var(--primary_text_color)] lg:mb-[16px] mb-[10px]'>
                  Rs. {price} - Rs. 2,00000
                </span>
                <button className='lg:px-[30px] px-[16px] leading-[24px] lg:leading-[30px] text-[14px] rounded-[4px] bg-[var(--primary_text_color)] hover:bg-[var(--bg_color)] duration-300 text-white'>Filter</button>
              </form>
            </div>
          </div>
        </div>

        <div className='w-[100%] lg:order-2 order-1'>
          <div className='shop-toolbar w-[100%] grid lg:grid-cols-[50%_auto] lg:justify-between py-[12px] lg:px-[10px] mb-[30px] border-[0.1px] lg:border-gray-200 border-gray-100 '>
            <div></div>
            <div className='flex sm:flex-row flex-col sm:justify-end items-center lg:gap-0 gap-[16px]'>
              <h3 className='text-[14px] lg:leading-[30px] lg:mr-[15px] font-[font-playfair] text-[var(--gray_text_color)]'>Sort By :</h3>
              <div onClick={() => setSortMenu(!sortMenu)} className='px-[14px] flex items-center border-[0.1px] border-gray-200 relative cursor-pointer '>
                <span className='text-[14px] lg:leading-[35px] leading-[28px] text-[var(--gray_text_color)] lg:mr-[8px]'>
                  {clickedList}
                </span>
                <span> 
                  <GoChevronDown className={`${sortMenu ? "rotate-180" : "rotate-0"} duration-300 lg:text-[13px] text-[11px] ml-[3px] `} />
                </span>

                <ul className={`${sortMenu ? 'scale-[1]' : 'scale-[0]'} absolute top-[100%] left-0 z-10 origin-top duration-200 bg-white lg:w-[210px] w-[180px] border-[0.1px] border-gray-200 rounded-[6px] mt-[4px]`}>
                  {sortby.map((items, index) => {
                    const isHovered = hoveredIndex === index;
                    const isClicked = clickedIndex === index;

                    const bgClass = hoveredIndex !== null ?
                      isHovered ? 'bg-[rgb(246,246,246)]' : ''
                      : isClicked ? 'bg-[rgb(246,246,246)]' : '';
                    return (
                      <li onClick={() => { setClickedIndex(index); setClickedList(items.list_name) }}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        key={index} className={`lg:text-[14px] text-[12px] lg:leading-[35px] leading-[26px] lg:pl-[18px] px-[16px] lg:pr-[29px] ${bgClass} ${clickedIndex == index ? 'text-[var(--primary_text_color)] font-medium' : ''} text-[var(--gray_text_color)]`}>{items.list_name}</li>
                    )
                  })}

                </ul>
              </div>
              <div className='lg:ml-[30px]'>
                <p className='text-[14px] lg:leading-[24px] text-[var(--gray_text_color)]'>Showing 1–1 of 1 results</p>
              </div>
            </div>
          </div>

          <div>

            <MainPage slug={slug} checkIds={checkIds} checkMaterial={checkMaterial} checkColor={checkColor} maxPrice={maxPrice} />

          </div>
        </div>

      </div>
    </div>
  )
}

function MainPage ({ slug,checkIds,checkMaterial,checkColor,maxPrice }) {
  let [productListing, setProductListing] = useState([])
  let [listingStaticPath, setListingStaticPath] = useState('')

  let filterObj = {
    checkColor,
    checkMaterial,
    checkIds,
    maxPrice
  }

  let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL

  let getProductList = () => {
    axios.post(`${apiBaseUrl}home/product-listing`,filterObj, {
      params: {
        slug,
      }
    })
      .then((res) => res.data)
      .then((finalRes) => {
        console.log(finalRes);
        setProductListing(finalRes.data)
        setListingStaticPath(finalRes.staticPath)
      })
  }

  useEffect(() => {
    getProductList();
  }, [slug,checkIds,checkMaterial,checkColor])

  return (
    <>
      {productListing.length!= 0 ?
        productListing.map((items,index) => (
          <div key={index} className='w-[100%] grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-[16px] gap-3 order-3'>
          <div className='max-w-[1320px] mx-auto lg:shadow-[0px_0px_35px_0px_rgba(0,0,0,0.3)] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.3)] border-[0.1px] border-gray-200 lg:pb-[30px] pb-[20px] lg:mb-[0px] mb-[16px]'>
            <Link href={`/product/${items.slug}`}>
              <img src={listingStaticPath+items.productImage} alt="" className='' />
            </Link>
            <div className='product-content w-[100%] mt-[8px]'>
              <div className='lg:mb-[10px] sm:mb-1.5 mb-1 text-center'>
                <Link href={''} className='sm:text-[13px] text-[11px] font-[500] text-[var(--gray_text_color)] lg:leading-[24px]'>
                  {items.subSubCategory.subSubCategoryName}
                </Link>
              </div>
              <h3 className='lg:pb-[15px] sm:pb-[12px] pb-[10px] sm:mb-[13px] mb-[8px] text-center relative'>
                <Link href={`/product/${items.slug}`} className='heading lg:text-[16px] sm:text-[15px] text-[13px] text-[var(--primary_text_color)] leading-[22px] font-[700] font-[font-playfair] hover:text-[var(--secondary_text_color)] duration-300'>
                  {items.productName}
                </Link>
              </h3>
              <div className='text-center'>
                <span className='mr-[5px] sm:text-[14px] text-[12px] leading-[24px] line-through text-[var(--primary_text_color)]'>
                  Rs. {Number(items.actualPrice).toLocaleString()}
                </span>
                <span className=' lg:text-[16px] sm:text-[15px] text-[12px] font-[500] text-[var(--secondary_text_color)] lg:leading-[24px]'>
                  Rs. {Number(items.salePrice).toLocaleString()}
                </span>
              </div>
              <div className='sm:mt-[16px] mt-[14px] w-[100%]'>
                <ul className='flex justify-center'>
                  <li className='sm:w-[35px] w-[30px] sm:h-[35px] h-[30px] mr-[5px] flex justify-center items-center cursor-pointer bg-[rgb(241,241,241)] hover:bg-[var(--bg_color)] duration-300 group relative '>
                    <Link href={'#'} className='sm:text-[20px] text-[16px] sm:leading-[37px] leading-[28px] group-hover:text-white'>
                      <FaRegHeart />
                    </Link>
                    <div className='absolute bottom-[-50px] right-[0px] bg-white text-[14px] py-2 text-center w-[110px] shadow-[0px_0px_10px_2px_rgba(0,0,0,0.4)] border-[0.1px] border-gray-200 opacity-0  duration-300  group-hover:opacity-[1] text-[var(--gray_text_color)]'>Add To Wishlist</div>
                  </li>
                  <li className='sm:h-[35px] h-[30px] relative bg-[rgb(241,241,241)] hover:bg-[var(--bg_color)] duration-300 flex items-center group cursor-pointer'>
                    <Link href={'#'} className='sm:text-[13px] text-[11px] font-[500] text-[var(--gray_text_color)] group-hover:text-white text-center lg:px-[18px] px-[10px]'>
                      Add To Cart
                    </Link>
                    <div className='absolute bottom-[-50px] right-[0px] bg-white text-[14px] py-2 text-center w-[100px] shadow-[0px_0px_10px_2px_rgba(0,0,0,0.4)] border-[0.1px] border-gray-200 opacity-0  duration-300  group-hover:opacity-[1] text-[var(--gray_text_color)]'>Add To Cart</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        ))
        :
        <div className='max-w-[1320px] mx-auto mb-[22px] sm:mt-[100px] mt-[60px]'>
          <div className='w-full flex flex-col justify-center items-center'>
          <span className='lg:text-[22px] sm:text-[18px] text-[14px] text-center text-[var(--primary_text_color)] font-[500] sm:mb-[40px] mb-[20px]'>
            This product is not available currently
          </span>
          <button className='relative bg-[rgb(114,75,49)] hover:bg-[rgb(136,94,65)] duration-300 flex items-center group cursor-pointer'>
            <Link href={'/'} className='sm:text-[14px] text-[12px] sm:leading-[40px] leading-[35px] font-[500] text-white text-center lg:px-[18px] px-[10px]'>
                Back To Home
            </Link>
          </button>
          </div>
        </div>
      }
    </>
  )
}

