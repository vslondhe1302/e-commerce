import React, { useEffect, useState } from 'react'
import { RiDeleteBin6Line } from "react-icons/ri";
import { PiNotePencilFill } from "react-icons/pi";
import axios from 'axios';
import { Link } from 'react-router';

export default function Viewproduct() {
    let [productList, setProductList] = useState([])
    let [staticPath, setStaticPath] = useState('')
    let [model, setModel] = useState(false)
    let [productDetail, setProductDetail] = useState(false)
    let [id, setId] = useState([])

    let [showFull, setShowFull] = useState(false)
    let [selectColor, setSelectColor] = useState()
    

    let apiBaseUrl = import.meta.env.VITE_APIBASEURL

    let getProducts = () => {
        axios.get(`${apiBaseUrl}product/view`)
            .then((res) => res.data)
            .then((finalRes) => {
                setProductList(finalRes.data);
                setStaticPath(finalRes.staticPath)
            })
    }

    useEffect(() => {
        getProducts()
    }, [])

    let getSingleProduct = (id) => {
        axios.get(`${apiBaseUrl}product/view/${id}`)
            .then((res) => res.data)
            .then((finalRes) => {
                if (finalRes.status) {                    
                    setProductDetail(finalRes.data);
                    setSelectColor(finalRes.data.productFinish)
                    setModel(true)
                }
            })
    }

    let deleteProduct = () =>{
        axios.post(`${apiBaseUrl}product/delete`,{id})
        .then((res)=>res.data)
        .then((finalRes)=>{
            getProducts()
            
        })
    }


    return (
        // Product Detail page 
        <div>
            {model &&

                <section className={`w-[100%] h-[100%] bg-[rgba(0,0,0,0.8)] fixed left-0 top-0 z-[9999] ${model ? "block" : "hidden"}`}>
                    <div className='w-[1100px] bg-white rounded-[5px] absolute top-[50%] left-[50%] translate-[-50%] py-2'>
                        <div className='w-[100%] flex justify-between items-center border-b-[1px] border-b-gray-400 px-[20px] pb-[15px] mb-[10px]'>
                            <div className='text-[23px] font-medium text-gray-800'>
                                Product Detail Page
                            </div>
                            <div onClick={() => setModel(false)} className='text-[34px] h-[45px] w-[45px] bg-gray-200 flex justify-center items-center cursor-pointer'>&times;</div>
                        </div>
                        <div className='w-[100%] grid grid-cols-[62%_auto] items-start gap-4 px-[10px]'>
                            <div className=''>
                                <h2 className='pb-2 text-[18px] font-medium'>Product Images</h2>
                                <div className='grid grid-cols-2 gap-4 mb-4 '>
                                    <div className='w-full rounded-[6px] border-[0.1px] border-gray-300 p-2 shadow-lg'>
                                        <h3 className='pb-2'>Product Image</h3>
                                        <div className='h-[270px]'>
                                            <img src={staticPath + productDetail.productImage} alt="" className='w-full h-[100%] border-[0.1px] border-gray-300 rounded-[6px]' />
                                        </div>
                                    </div>
                                    <div className='w-full rounded-[6px] border-[0.1px] border-gray-300 p-2 shadow-lg'>
                                        <h3 className='pb-2'>Back Image</h3>
                                        <div className='h-[270px]'>
                                            <img src={staticPath + productDetail.backImage} alt="" className='w-full h-[100%] border-[0.1px] border-gray-300 rounded-[6px] ' />
                                        </div>
                                    </div>
                                </div>
                                <div className=''>
                                    <h2 className='pb-2 font-medium'>Gallery Images</h2>
                                    <div className='grid grid-cols-4 gap-3'>
                                        {productDetail.galleryImages.honey.map((item, index) =>
                                            <div className='border-1 border-gray-300 shadow-lg h-[100px] rounded-[4px]'>
                                                <img key={index} src={staticPath + item} alt="" className='w-full h-full rounded-[4px]' />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className=' '>
                                <h3 className='pb-2 font-medium text-[18px]'>Product Details</h3>
                                <div className='p-2 border-[0.1px] border-gray-300 shadow-xl rounded-[5px] px-3 py-2'>
                                    <div className='grid grid-cols-[40%_auto] gap-4 mb-2'>
                                        <h3>Product Name :</h3>
                                        <span>{productDetail.productName}</span>
                                    </div>
                                    <div className='grid grid-cols-[40%_auto] gap-4 mb-2'>
                                        <h3>Product Finish :</h3>
                                        {productDetail.productFinish =='brown' ?
                                        <span> Brown Finish</span>
                                        : 
                                        <span> Honey Finish</span>}
                                    </div>
                                    <div className='grid grid-cols-[40%_auto] gap-4 mb-2'>
                                        <h3>Category :</h3>
                                        <span>{productDetail.parentCategory.categoryName}</span>
                                    </div>
                                    <div className='grid grid-cols-[40%_auto] gap-4 mb-2'>
                                        <h3>Sub Category :</h3>
                                        <span>{productDetail.subCategory.subCategoryName}</span>
                                    </div>
                                    <div className='grid grid-cols-[40%_auto] gap-4 mb-2'>
                                        <h3>Sub Sub Category :</h3>
                                        <span>{productDetail.subSubCategory.subSubCategoryName}</span>
                                    </div>
                                    <div className='grid grid-cols-[40%_auto] gap-4 mb-2'>
                                        <h3>Product Type :</h3>
                                        {productDetail.productType == '1'
                                            ?
                                            <span>Featured</span>
                                            :
                                            productDetail.productType == '2'
                                                ?
                                                <span>New Arrival</span>
                                                :
                                                <span>OnSale</span>

                                        }
                                    </div>
                                    <div className='grid grid-cols-[40%_auto] gap-4  mb-2'>
                                        <h3>Materials :</h3>
                                        <div className='flex gap-3'>
                                            {productDetail.productMaterial.map((item, index) =>
                                                <span key={index} className='border-1 border-gray-200 rounded-[2px] px-1'>{item.materialName}</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-[40%_auto] gap-4 items-center mb-2'>
                                        <h3>Colors :</h3>
                                        <div className='flex gap-1'>
                                            {productDetail.productColor.map((item, index) =>
                                                <span key={index} className={`border-1 border-gray-200 p-0.5`}>
                                                    {item.colorName}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-[40%_auto] gap-4  mb-2'>
                                        <h3>Price :</h3>
                                        <span>&#8377; {productDetail.actualPrice}</span>
                                    </div>
                                    <div className='grid grid-cols-[40%_auto] gap-4  mb-2'>
                                        <h3>Sale Price :</h3>
                                        <span>&#8377; {productDetail.salePrice}</span>
                                    </div>
                                    <div className='grid grid-cols-[40%_auto] gap-4  mb-2'>
                                        <h3>Total In Stocks :</h3>
                                        <span>{productDetail.totalStock}</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            }
    {/* Product Detail page end */}

           {productList ?
           <div>
                 <div className='flex px-[20px] py-[12px] border-b-[2.2px] border-b-gray-200'>
                <div className='font-medium'>
                    <Link to={'/'} className='text-gray-600'>Home /</Link>
                    <Link to={'/product/add'} className='text-gray-600'>
                     Product /
                    </Link>
                    <span className='text-gray-800'> Product Items</span>
                </div>
            </div>
            <div className='px-[20px] py-[20px]'>
                <div className=' border-[0.1px] border-gray-300 rounded-[8px]'>
                    <div className='flex justify-between border-b-[0.1px] py-[12px] px-[20px] border-b-gray-300 '>
                        <h2 className='text-[26px] font-medium'>Product Items</h2>
                    </div>
                    <div className=' rounded-[10px]'>
                        <div className='w-[100%] grid grid-cols-12 justify-between items-center  p-[15px] rounded-[10px_10px_0px_0px] uppercase text-gray-700 font-medium text-[16px] text-left border-b-1 border-b-gray-200 bg-gray-100'>
                            <h3 className=' col-span-1'>delete</h3>
                            <h2 className=' col-span-1'>sr. no </h2>
                            <h2 className=' col-span-2'>product name </h2>
                            <h2 className=' col-span-2 pl-4'>description </h2>
                            <h2 className=' col-span-2'>product detail </h2>
                            <h2 className=' col-span-2'>thumbnails</h2>
                            <h2 className=' col-span-1'>action</h2>
                            <h2 className=' col-span-1 text-center'>status</h2>
                        </div>

                        {productList.length >= 1
                            ?
                            productList.map((items, index) => {
                                return (
                                    <div key={index} className='w-[100%] grid grid-cols-12 justify-between items-center  p-[20px] rounded-[10px_10px_0px_0px] text-gray-700 font-medium text-[14px] text-left'>
                                        <div className='col-span-1'>
                                            <input onChange={(e) => setId(e.target.value)} value={items._id} type="checkbox" className='scale-140' />
                                        </div>
                                        <span className=' col-span-1'>{index + 1}</span>
                                        <h2 className=' col-span-2'>{items.productName}</h2>
                                        <div className=' col-span-2 pr-10 pl-4'>
                                            <p className={`${showFull ? showFull : "truncate"}`}>{items.productDescription}</p>
                                            <span onClick={()=>setShowFull(!showFull)} className='text-blue-500 text-[13px] cursor-pointer'>
                                                {showFull ? "Show Less" : "Show More"}
                                            </span>
                                        </div>
                                        <div onClick={() => getSingleProduct(items._id)} className='col-span-2 text-blue-500 cursor-pointer'>View</div>
                                        <div className='col-span-2'>
                                            <img src={staticPath+items.productImage} alt="preview" className='w-[55px] h-[55px] rounded-[4px]' />
                                        </div>
                                        <div className='col-span-1 flex gap-2'>
                                            <RiDeleteBin6Line onClick={deleteProduct} className='text-[20px] text-red-500' /> |
                                            <Link to={`/product/edit/${items._id}`}>
                                            <PiNotePencilFill className='text-[20px] text-yellow-300' />
                                            </Link>
                                        </div>
                                        <div className='col-span-1 text-gray-600 font-medium text-center'>Active</div>
                                    </div>
                                )
                            })

                            :

                            <div className='text-gray-800 px-5 py-4'>
                                No Product List Found
                            </div>
                        }
                    </div>
                </div>
            </div>
           </div>
           :
           <div className='flex items-center justify-center'>Loading....</div>
            }
        </div>
    )
}
