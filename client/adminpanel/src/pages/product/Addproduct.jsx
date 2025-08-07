import React, { useEffect, useRef, useState } from 'react'
import TextEditor from './TextEditor';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';

export default function Addproduct() {

    let [parentCategory, setParentCategory] = useState([])
    let [subCategory, setSubCategory] = useState([])
    let [subSubCategory, setsubSubCategory] = useState([])
    let [colorList, setColorList] = useState([])
    let [materialList, setMaterialList] = useState([])

    let preview = '/images/360_F_597479556_7bbQ7t4Z8k3xbAloHFHVdZIizWK1PdOo.jpg'
    let [preview1, setPreview1] = useState(preview)
    let [preview2, setPreview2] = useState(preview)
    let [preview3, setPreview3] = useState([preview])
    let [preview4, setPreview4] = useState([preview])

    let [staticPath, setStaticPath] = useState('')
    let [selectMaterial, setSelectMaterial] = useState([])
    let [selectColor, setSelectColor] = useState([])


    let navigate = useNavigate()
    let { id } = useParams()

    let [formData, setFormData] = useState({
        productImage: '',
        backImage: '',
        galleryImages: { honey: [], brown: [] },
        productName: '',
        parentCategory: '',
        parentCategoryId: '',
        subCategory: '',
        subCategoryId: '',
        subSubCategory: '',
        subSubCategoryId: '',
        productColor: '',
        productMaterial: '',
        productType: '',
        isBestSelling: '',
        isTopRated: '',
        isUpsell: '',
        productDimensions: '',
        productBrand: '',
        productFinish: '',
        productWarranty: '',
        actualPrice: '',
        salePrice: '',
        totalStock: '',
        productOrder: '',
        productDescription: ''
    })


    let apiBaseUrl = import.meta.env.VITE_APIBASEURL
    console.log(apiBaseUrl);
    

    let getParentCategory = () => {
        axios.get(`${apiBaseUrl}product/parent-category`)
            .then((res) => res.data)
            .then((finalRes) => {
                setParentCategory(finalRes.data);

            })
    }

    let getSubCategory = (id) => {
        axios.get(`${apiBaseUrl}product/sub-category/${id}`)
            .then((res) => res.data)
            .then((finalRes) => {
                setSubCategory(finalRes.data);
            })
    }

    let getsubSubcategory = (id) => {
        axios.get(`${apiBaseUrl}product/sub-sub-category/${id}`)
            .then((res) => res.data)
            .then((finalRes) => {
                setsubSubCategory(finalRes.data);
            })
    }

    let getMaterialList = () => {
        axios.get(`${apiBaseUrl}product/material-list`)
            .then((res) => res.data)
            .then((finalRes) => {
                setMaterialList(finalRes.data);
            })
    }
    let getColorList = () => {
        axios.get(`${apiBaseUrl}product/color-list`)
            .then((res) => res.data)
            .then((finalRes) => {
                setColorList(finalRes.data);
            })
    }

    useState(() => {
        getParentCategory()
        getMaterialList()
        getColorList()
    })

    let editorRef = useRef()

    let productCode = 'jodh00'+Math.floor(Math.random()*1000000).toString().slice(0,3)
    console.log(productCode);

    let saveProduct = (e) => {
        e.preventDefault()
        let slugify = (name)=>{
            return name.toLowerCase().trim().replace(/[^a-z0-9\s]/g,'').replace(/\s+/g,'-')
        }
    
       let cleanSlug = slugify(e.target.productName.value)
       console.log(cleanSlug);
       
        let description = editorRef.current.getContent()
        let formValue = new FormData(e.target)

        formValue.append('productDescription', description)
        formValue.append('productStatus', true)
        formValue.append('productCode', productCode)

        if (id) {
            axios.put(`${apiBaseUrl}product/update/${id}`, formValue)
                .then((res) => res.data)
                .then((finalRes) => {
                    console.log(finalRes);
                    if (finalRes.status) {
                        setPreview1(preview)
                        setPreview2(preview)
                        setPreview3(preview)
                        setTimeout(() => {
                            navigate('/product/view')
                        }, [2000])
                        toast.success(finalRes.msg)
                        e.target.reset()
                    }
                    else {
                        toast.error(finalRes.msg)
                    }

                })
        }
        else {
            axios.post(`${apiBaseUrl}product/add/${cleanSlug}`, formValue)
                .then((res) => res.data)
                .then((finalRes) => {
                    if (finalRes.status) {
                        console.log(finalRes);
                        setPreview1(preview)
                        setPreview2(preview)
                        setPreview3(preview)
                        setTimeout(() => {
                            navigate('/product/view')
                        }, [2000])
                        toast.success(finalRes.msg)
                        e.target.reset()
                    }
                    else {
                        toast.error(finalRes.msg)
                    }

                })
        }
    }

    useEffect(() => {
        setFormData({
            productImage: '',
            backImage: '',
            galleryImages: { honey: [], brown: [] },
            productName: '',
            parentCategory: '',
            parentCategoryId: '',
            subCategory: '',
            subCategoryId: '',
            subSubCategory: '',
            subSubCategoryId: '',
            productColor: '',
            productMaterial: '',
            productType: '',
            isBestSelling: '',
            isTopRated: '',
            isUpsell: '',
            productDimensions: '',
            productBrand: '',
            productFinish: '',
            productWarranty: '',
            actualPrice: '',
            salePrice: '',
            totalStock: '',
            productOrder: '',
            productDescription: ''
        })

        if (id) {
            axios.get(`${apiBaseUrl}product/view/${id}`)
                .then((res) => res.data)
                .then((finalRes) => {
                    getSubCategory(finalRes.data.parentCategory._id)
                    getsubSubcategory(finalRes.data.subCategory._id)
                    setFormData({
                        productImage: finalRes.data.productImage,
                        backImage: finalRes.data.backImage,
                        galleryImages: finalRes.data.galleryImages,
                        productName: finalRes.data.productName,
                        parentCategory: finalRes.data.parentCategory.categoryName,
                        parentCategoryId: finalRes.data.parentCategory._id,
                        subCategory: finalRes.data.subCategory.subCategoryName,
                        subCategoryId: finalRes.data.subCategory._id,
                        subSubCategory: finalRes.data.subSubCategory.subSubCategoryName,
                        subSubCategoryId: finalRes.data.subSubCategory._id,
                        productColor: finalRes.data.productColor,
                        productMaterial: finalRes.data.productMaterial,
                        productType: finalRes.data.productType,
                        isBestSelling: finalRes.data.isBestSelling,
                        isTopRated: finalRes.data.isTopRated,
                        isUpsell: finalRes.data.isUpsell,
                        productDimensions: finalRes.data.productDimensions,
                        productBrand: finalRes.data.productBrand,
                        productFinish: finalRes.data.productFinish,
                        productWarranty: finalRes.data.productWarranty,
                        actualPrice: finalRes.data.actualPrice,
                        salePrice: finalRes.data.salePrice,
                        totalStock: finalRes.data.totalStock,
                        productOrder: finalRes.data.productOrder,
                        productDescription: finalRes.data.productDescription
                    })

                    setSelectMaterial(finalRes.data.productMaterial)
                    setSelectColor(finalRes.data.productColor)
                    setPreview1(finalRes.staticPath + finalRes.data.productImage)
                    setPreview2(finalRes.staticPath + finalRes.data.backImage)
                    // setPreview3(finalRes.data.galleryImages)
                    setStaticPath(finalRes.staticPath)

                })
        }

    }, [id])

    return (
        <div>
            <ToastContainer />
            <div className='flex px-[20px] py-[12px] border-b-[2.2px] border-b-gray-200'>
                <div className='font-medium text-gray-600'>Home <span className='text-gray-600'>/ Product /</span>
                    <span className='text-gray-800'> Product Detail</span>
                </div>
            </div>
            <div className='px-[20px] py-[20px]'>
                <form onSubmit={saveProduct}>
                    <div className='grid grid-cols-[35%_auto] gap-[20px] rounded-[5px]'>
                        <div className='mb-[20px]'>
                            <div className='mb-4'>
                                <label htmlFor="" className='pb-[6px] block font-medium'>Product Image</label>
                                <div className='border-2 border-gray-200 rounded-[6px] overflow-hidden'>
                                    <img src={preview1} alt="preview" className='w-full h-[260px]' />
                                    <input onChange={(e) => { setPreview1(URL.createObjectURL(e.target.files[0])) }} type="file" name='productImage' className="p-2" />
                                </div>
                            </div>
                            <div className='mb-4'>
                                <label htmlFor="" className='pb-[6px] block font-medium'>Back Image</label>
                                <div className='border-2 border-gray-200 rounded-[6px] overflow-hidden'>
                                    <img src={preview2} alt="preview" className='w-full h-[260px]' />
                                    <input onChange={(e) => { setPreview2(URL.createObjectURL(e.target.files[0])) }} type="file" name='backImage' className="p-2" />
                                </div>
                            </div>
                            <div className='mb-4'>
                                <label htmlFor="" className='pb-[6px] block font-medium'>Gallery Images</label>
                                <div className='border-2 border-gray-200 rounded-[6px] overflow-hidden'>
                                    <div className='grid grid-cols-2 p-2 gap-3 mb-2'>
                                        <div>
                                            {
                                                preview3.map((img, index) => {
                                                    return (
                                                        <div key={index} className=''>
                                                            <img src={staticPath + img} alt={`Gallery ${index + 1}`} className='w-[140px] h-[120px] mx-auto mb-1' />
                                                        </div>
                                                    )
                                                })
                                            }
                                            <div className='overflow-hidden'>
                                                <label htmlFor="" className='pb-[6px] pl-2 block font-medium text-center'>Honey Finish</label>
                                                <input onChange={(e) => {
                                                    const files = Array.from(e.target.files)
                                                    const previewFiles = files.map(file => URL.createObjectURL(file))
                                                    setPreview3([...previewFiles])

                                                }}
                                                    type="file" multiple name='honey' alt='preview' className="p-2" />
                                            </div>
                                        </div>
                                        <div>
                                            {
                                                preview4.map((img, index) => {
                                                    return (
                                                        <div key={index} className=''>
                                                            <img src={staticPath + img} alt={`Gallery ${index + 1}`} className='w-[140px] h-[120px] mx-auto mb-1' />
                                                        </div>
                                                    )
                                                })
                                            }
                                            <div className='overflow-hidden'>
                                                <label htmlFor="" className='pb-[6px] pl-2 block font-medium text-center'>Brown Finish</label>
                                                <input onChange={(e) => {
                                                    const files = Array.from(e.target.files)
                                                    const previewFiles = files.map(file => URL.createObjectURL(file))
                                                    setPreview4([...previewFiles])

                                                }}
                                                    type="file" multiple name='brown' alt='preview' className="p-2" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='grid grid-cols-2 gap-[20px]'>
                                <div className='mb-[20px]'>
                                    <label htmlFor="" className='pb-[6px] block font-medium'>Product Name</label>
                                    <input onChange={(e) => {
                                        let obj = { ...formData }
                                        obj['productName'] = e.target.value
                                        setFormData(obj)
                                    }} type="text" name='productName' value={formData.productName} placeholder='Category Name' className='px-[12px] w-[100%] h-[45px] rounded-[6px] text-gray-800 border-2 border-gray-300' />
                                </div>
                                <div className='mb-[20px]'>
                                    <label htmlFor="" className='pb-[6px] block font-medium'>Select Parent Category </label>
                                    <select onChange={(e) => getSubCategory(e.target.value)} name="parentCategory" className='px-[12px] w-[100%] h-[45px] rounded-[6px] text-gray-800 border-2 border-gray-300'>
                                        <option value="Nothing Selected">Nothing Selected</option>

                                        {parentCategory.map((items, index) => <option key={index} selected={formData.parentCategoryId == items._id} value={items._id}>{items.categoryName}</option>)}

                                    </select>
                                </div>
                            </div>
                            <div className='grid grid-cols-2 gap-[20px]'>
                                <div className='mb-[20px]'>
                                    <label htmlFor="" className='pb-[6px] block font-medium'>Select Sub Category </label>
                                    <select onChange={(e) => getsubSubcategory(e.target.value)} name="subCategory" id="" className='px-[12px] w-[100%] h-[45px] rounded-[6px] text-gray-800 border-2 border-gray-300'>
                                        <option value="Nothing Selected">Nothing Selected</option>

                                        {subCategory.map((items, index) => {

                                            return (
                                                <option key={index} selected={formData.subCategoryId == items._id} value={items._id}>{items.subCategoryName}</option>)
                                        }
                                        )}

                                    </select>
                                </div>
                                <div className='mb-[20px]'>
                                    <label htmlFor="" className='pb-[6px] block font-medium'>Select Sub Sub Category</label>
                                    <select name="subSubCategory" id="" className='px-[12px] w-[100%] h-[45px] rounded-[6px] text-gray-800 border-2 border-gray-300'>
                                        <option value="Nothing Selected">Nothing Selected</option>

                                        {
                                            subSubCategory.map((items, index) => <option key={index} selected={formData.subSubCategoryId == items._id} value={items._id}>
                                                {items.subSubCategoryName}
                                            </option>
                                            )
                                        }

                                    </select>
                                </div>
                            </div>
                            <div className='grid grid-cols-2 gap-[20px]'>
                                <div className='mb-[20px]'>
                                    <label htmlFor="" className='pb-[6px] block font-medium'>Select Material </label>
                                    <select name="productMaterial[]" multiple id="" className='px-[12px] w-[100%] rounded-[6px] text-gray-800 border-2 border-gray-300'>
                                        <option value="Select Category">Nothing Selected</option>
                                        {materialList.map((items, index) => {
                                            let select = selectMaterial.map((v) => v._id)

                                            return (
                                                <option key={index} selected={id && select.includes(items._id)} value={items._id}>{items.materialName}</option>
                                            )

                                        }
                                        )}

                                    </select>
                                </div>
                                <div className='mb-[20px]'>
                                    <label htmlFor="" className='pb-[6px] block font-medium'>Select Color </label>
                                    <select name="productColor[]" multiple id="" className='px-[12px] w-[100%] rounded-[6px] text-gray-800 border-2 border-gray-300'>
                                        <option value="Nothing Selected">Nothing Selected</option>
                                        {colorList.map((items, index) => {
                                            let select = selectColor.map((v) => v._id)
                                            return (
                                                <option key={index} selected={id && select.includes(items._id)} value={items._id}>{items.colorName}</option>
                                            )
                                        })}

                                    </select>
                                </div>
                            </div>
                            <div className='grid grid-cols-2 gap-[20px]'>
                                <div className='mb-[20px]'>
                                    <label htmlFor="" className='pb-[6px] block font-medium'>Select Product Type </label>
                                    <select name="productType" id="" className='px-[12px] w-[100%] h-[45px] rounded-[6px] text-gray-800 border-2 border-gray-300'>
                                        <option value="Select Category">Nothing Selected</option>
                                        <option selected={formData.productType == '1'} value="1">Featured</option>
                                        <option selected={formData.productType == '2'} value="2">New Arrival</option>
                                        <option selected={formData.productType == '3'} value="3">Onsale</option>
                                    </select>
                                </div>
                                <div className='mb-[20px]'>
                                    <label htmlFor="" className='pb-[6px] block font-medium'>Is Best Selling</label>
                                    <select onChange={(e) => {
                                        let obj = { ...formData }
                                        obj["isBestSelling"] = e.target.value
                                        setFormData(obj)
                                    }} name="isBestSelling" id="" className='px-[12px] w-[100%] h-[45px] rounded-[6px] text-gray-800 border-2 border-gray-300'>
                                        <option value="Nothing Selected">Nothing Selected</option>
                                        <option selected={formData.isBestSelling == true} value="yes">Yes</option>
                                        <option selected={formData.isBestSelling == false ? false : ''} value="no">No</option>
                                    </select>
                                </div>
                            </div>
                            <div className='grid grid-cols-2 gap-[20px]'>
                                <div className='mb-[20px]'>
                                    <label htmlFor="" className='pb-[6px] block font-medium'>Is Top Rated </label>
                                    <select onChange={(e) => {
                                        let obj = { ...formData }
                                        obj['isTopRated'] = e.target.value
                                        setFormData(obj)
                                    }} name="isTopRated" id="" className='px-[12px] w-[100%] h-[45px] rounded-[6px] text-gray-800 border-2 border-gray-300'>
                                        <option value="Nothing Selected">Nothing Selected</option>
                                        <option selected={formData.isTopRated == true} value="yes">Yes</option>
                                        <option selected={formData.isTopRated == false ? false : ''} value="no">No</option>
                                    </select>
                                </div>
                                <div className='mb-[20px]'>
                                    <label htmlFor="" className='pb-[6px] block font-medium'>Is Upsell </label>
                                    <select onChange={(e) => {
                                        let obj = { ...formData }
                                        obj['isUpsell'] = e.target.value
                                        setFormData(obj)
                                    }} name="isUpsell" id="" className='px-[12px] w-[100%] h-[45px] rounded-[6px] text-gray-800 border-2 border-gray-300'>
                                        <option value="Nothing Selected">Nothing Selected</option>
                                        <option selected={formData.isUpsell == true} value="yes">Yes</option>
                                        <option selected={formData.isUpsell == false ? false : ''} value="no">No</option>
                                    </select>
                                </div>
                            </div>
                            <div className='grid grid-cols-2 gap-[20px]'>
                                <div className='mb-[20px]'>
                                    <label htmlFor="" className='pb-[6px] block font-medium'>Finish </label>
                                    <select onChange={(e) => {
                                        let obj = { ...formData }
                                        obj['productFinish'] = e.target.value
                                        setFormData(obj)
                                    }} name="productFinish" multiple id="" className='px-[12px] w-[100%] h-[45px] rounded-[6px] text-gray-800 border-2 border-gray-300'>
                                        <option value="Nothing Selected">Nothing Selected</option>
                                        <option selected={formData.productFinish == 'brown'} value="brown">Brown Finish</option>
                                        <option selected={formData.productFinish == 'honey'} value="honey">Honey Finish</option>
                                    </select>
                                </div>

                                <div className='mb-[20px]'>
                                    <label htmlFor="" className='pb-[6px] block font-medium'>Brand</label>
                                    <input type="text" value="Jodhpuri Furniture" readOnly name='productBrand' placeholder='Jodhpuri Furniture' className='px-[12px] w-[100%] h-[45px] rounded-[6px] text-gray-800 border-2 border-gray-300' />
                                </div>
                            </div>

                            <div className='grid grid-cols-2 gap-[20px]'>
                                <div className='mb-[20px]'>
                                    <label htmlFor="" className='pb-[6px] block font-medium'>Dimensions</label>
                                    <input onChange={(e) => {
                                        let obj = { ...formData }
                                        obj['productDimensions'] = e.target.value
                                        setFormData(obj)
                                    }}
                                        type="text" value={formData.productDimensions} name='productDimensions' placeholder='Dimensions' className='px-[12px] w-[100%] h-[45px] rounded-[6px] text-gray-800 border-2 border-gray-300' />
                                </div>

                                <div className='mb-[20px]'>
                                    <label htmlFor="" className='pb-[6px] block font-medium'>Warranty </label>
                                    <select onChange={(e) => {
                                        let obj = { ...formData }
                                        obj['productWarranty'] = e.target.value
                                        setFormData(obj)
                                    }} name="productWarranty" id="" className='px-[12px] w-[100%] h-[45px] rounded-[6px] text-gray-800 border-2 border-gray-300'>
                                        <option value="Nothing Selected">Nothing Selected</option>
                                        <option selected={formData.productWarranty == "12 months"} value="12 months">12 Months</option>
                                        <option selected={formData.productWarranty == "24 months"} value="24 months">24 Months</option>
                                        <option selected={formData.productWarranty == "36 months"} value="36 months">36 Months</option>
                                    </select>
                                </div>
                            </div>

                            <div className='grid grid-cols-2 gap-[20px]'>
                                <div className='mb-[20px]'>
                                    <label htmlFor="" className='pb-[6px] block font-medium'>Ships In </label>
                                    <select onChange={(e) => {
                                        let obj = { ...formData }
                                        obj['productShipIn'] = e.target.value
                                        setFormData(obj)
                                    }} name="productShipIn" id="" className='px-[12px] w-[100%] h-[45px] rounded-[6px] text-gray-800 border-2 border-gray-300'>
                                        <option value="Nothing Selected">Nothing Selected</option>
                                        <option selected={formData.productShipIn == "5-10 Days"} value="5-10 Days">5 - 10 Days</option>
                                        <option selected={formData.productShipIn == "10-15 Days"} value="10-15 Days">10 - 15 Days</option>
                                        <option selected={formData.productShipIn == "15-20 Days"} value="15-20 Days">15 - 20 Days</option>
                                        <option selected={formData.productShipIn == "20-30 Days"} value="20-30 Days">20 - 30 Days</option>
                                        <option selected={formData.productShipIn == "30-40 Days"} value="30-40 Days">30 - 40 Days</option>
                                    </select>
                                </div>
                                {/* <div className='mb-[20px]'>
                                    <label htmlFor="" className='pb-[6px] block font-medium'>Discount</label>
                                    <input onChange={(e)=>{
                                        let obj = {...formData}
                                        obj['productDiscount'] = e.target.value
                                        setFormData(obj)
                                    }}
                                     type="text" value={formData.productDiscount} name='productDiscount' placeholder='Discount' className='px-[12px] w-[100%] h-[45px] rounded-[6px] text-gray-800 border-2 border-gray-300' />
                                </div> */}
                            </div>

                            <div className='grid grid-cols-2 gap-[20px]'>
                                <div className='mb-[20px]'>
                                    <label htmlFor="" className='pb-[6px] block font-medium'>Actual Price</label>
                                    <input onChange={(e) => {
                                        let obj = { ...formData }
                                        obj['actualPrice'] = e.target.value
                                        setFormData(obj)
                                    }}
                                        type="text" value={formData.actualPrice} name='actualPrice' placeholder='Actual Price' className='px-[12px] w-[100%] h-[45px] rounded-[6px] text-gray-800 border-2 border-gray-300' />
                                </div>
                                <div className='mb-[20px]'>
                                    <label htmlFor="" className='pb-[6px] block font-medium'>Sale Price</label>
                                    <input onChange={(e) => {
                                        let obj = { ...formData }
                                        obj['salePrice'] = e.target.value
                                        setFormData(obj)
                                    }}
                                        type="text" value={formData.salePrice} name='salePrice' placeholder='Sale Price' className='px-[12px] w-[100%] h-[45px] rounded-[6px] text-gray-800 border-2 border-gray-300' />
                                </div>
                            </div>

                            <div className='grid grid-cols-2 gap-[20px]'>
                                <div className='mb-[20px]'>
                                    <label htmlFor="" className='pb-[6px] block font-medium'>Total In Stocks</label>
                                    <input onChange={(e) => {
                                        let obj = { ...formData }
                                        obj['totalStock'] = e.target.value
                                        setFormData(obj)
                                    }}
                                        type="text" value={formData.totalStock} name='totalStock' placeholder='Total In Stocks' className='px-[12px] w-[100%] h-[45px] rounded-[6px] text-gray-800 border-2 border-gray-300' />
                                </div>
                                <div className='mb-[20px]'>
                                    <label htmlFor="" className='pb-[6px] block font-medium'>Order</label>
                                    <input onChange={(e) => {
                                        let obj = { ...formData }
                                        obj['productOrder'] = e.target.value
                                        setFormData(obj)
                                    }}
                                        type="text" value={formData.productOrder} name='productOrder' placeholder='Order' className='px-[12px] w-[100%] h-[45px] rounded-[6px] text-gray-800 border-2 border-gray-300' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=''>
                        <div className=''>
                            <label htmlFor="" className='pb-[6px] block font-medium'>Description</label>
                            <div className='h-[250px] w-[100%]'>
                                <TextEditor value={formData.productDescription} ref={editorRef} />
                            </div>
                        </div>
                        <div className='my-[20px]'>
                            <button type='submit' className='bg-linear-to-tl from-violet-500 from-80% to-fuchsia-500 text-white font-medium h-[40px] px-[12px] rounded-[10px]'>Create Product</button>
                        </div>
                    </div>
                </form>
            </div>

        </div>
    )
}
