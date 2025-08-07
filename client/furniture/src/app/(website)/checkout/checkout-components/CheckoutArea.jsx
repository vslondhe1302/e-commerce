"use client"
import { fetchCart } from '@/app/slice/cartSlice'
import { store } from '@/app/store/store'
import axios from 'axios'
import React, { useState } from 'react'
import { useRazorpay } from 'react-razorpay'
import { useDispatch, useSelector } from 'react-redux'

export default function CheckoutArea() {
    let [shipAddress, setShipAddress] = useState(false)
    let [paymentMethod, setPaymentMethod] = useState(1)

    let cart = useSelector((store) => store.cart.cart)
    let orderAmount = cart.reduce((total, obj) => total + (obj.price * obj.qty), 0)
    let orderQty = cart.reduce((total, obj) => total + (obj.qty), 0)

    let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL
    let token = useSelector((store) => store.login.token)

    const { Razorpay } = useRazorpay();

    let dispatch = useDispatch()

    let placeOrder = (e) => {
        e.preventDefault()

        let orderItems = cart.map((items) => {
            return {
                title: items.title,
                price: items.price,
                image: items.image,
                qty: items.qty,
                color: items.color.colorName
            }
        })

        let shippingAddress = {
            name: e.target.cname.value,
            phone: e.target.cphone.value,
            billingName: e.target.billingName.value,
            billingPhone: e.target.billingPhone.value,
            billingEmail: e.target.billingEmail.value,
            billingAddress: e.target.billingAddress.value,
            country: e.target.billingCountry.value,
            state: e.target.billingState.value,
            city: e.target.billingCity.value,
        }

        let obj = {
            shippingAddress,
            paymentMethod,
            orderItems,
            orderQty,
            orderAmount
        }

        axios.post(`${apiBaseUrl}order/order-save`, obj, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => res.data)
            .then((finalRes) => {
                if (finalRes.paymentMethod == '1') {
                    dispatch(fetchCart())
                    e.target.reset()
                    // Thank you page

                }
                else {
                    const RazorpayOrderOptions = {
                        key: "rzp_test_WAft3lA6ly3OBc",
                        amount: finalRes.orderRes.amount * 100, // Amount in paise
                        currency: "INR",
                        name: "Monsta Furniture",
                        description: "Test Transaction",
                        order_id: finalRes.orderRes.id, // Generate order_id on server
                        handler: (response) => {
                            console.log(response);
                            alert("Payment Successful!");

                            axios.post(`${apiBaseUrl}order/verify-order`, response, {
                                headers: {
                                    Authorization: `Bearer ${token}`
                                }
                            })
                                .then((res) => res.data)
                                .then((finalRes) => {
                                    dispatch(fetchCart())
                                    e.target.reset()
                                      // Thank you page

                                    
                                })
                                
                        },

                        prefill: {
                            name: e.target.cname.value,
                            email: e.target.billingEmail.value,
                            contact: e.target.cphone.value,
                        },
                        theme: {
                            color: "#F37254",
                        },
                    };

                    const razorpayInstance = new Razorpay(RazorpayOrderOptions);
                    razorpayInstance.open();
                };

            })

    }
    return (
        <div className='w-[100%]'>
            <div className='max-w-[1320px] mx-auto'>
                <div className='coupon_area lg:mb-[30px] mb-[40px]'>
                    <form onSubmit={placeOrder} className='grid lg:grid-cols-2 sm:grid-cols-2 grid-cols-1 lg:gap-[24px] gap-[14px]'>
                        <div className='checkout_left'>
                            <div className=''>
                                <h3 className='lg:px-[15px] px-[8px] py-[5px] lg:text-[16px] text-[12px] lg:leading-[37px] leading-[26px] font-[600] font-[font-playfair] text-white bg-[var(--dark_bg_color)] lg:mb-[8px] mb-[5px] uppercase'>
                                    Billing Details
                                </h3>
                                <div>
                                    <div className='grid lg:grid-cols-2 grid-cols-1 lg:gap-[24px] gap-[14px]'>
                                        <div className='lg:mb-[20px] mb-[12px]'>
                                            <label className='lg:text-[14px] text-[12px] lg:leading-[18px] leading-[16px] text-[var(--primary_text_color)] font-[500] lg:mb-[10px] mb-[6px] block'>
                                                Name *
                                            </label>
                                            <input type="text" name='cname' placeholder='Name' className='lg:text-[14px] text-[12px] lg:leading-[24px] leading-[20px] text-[var(--gray_text_color)] lg:px-[20px] px-[12px] lg:h-[45px] h-[32px] w-[100%]  border-[0.1px] border-gray-200 outline-0' />
                                            <p className='hidden lg:text-[12px] text-[9px] lg:leading-[24px] leading-[16px] text-red-500'>
                                                Name is required and cannot be empty
                                            </p>
                                        </div>
                                        <div className='lg:mb-[20px] mb-[12px]'>
                                            <label className='lg:text-[14px] text-[12px] lg:leading-[18px] leading-[16px] text-[var(--primary_text_color)] font-[500] lg:mb-[10px] mb-[6px] block'>
                                                Mobile Number *
                                            </label>
                                            <input type="text" name='cphone' placeholder='Mobile Number' className='lg:text-[14px] text-[12px] lg:leading-[24px] leading-[20px] text-[var(--gray_text_color)] lg:px-[20px] px-[12px] lg:h-[45px] h-[32px] w-[100%]  border-[0.1px] border-gray-200 outline-0' />
                                            <p className='hidden lg:text-[12px] text-[9px] lg:leading-[24px] leading-[16px] text-red-500'>
                                                Mobile Number is required and cannot be empty
                                            </p>
                                        </div>
                                    </div>
                                    <div className='grid lg:grid-cols-2 grid-cols-1 lg:gap-[24px] gap-[14px]'>
                                        <div className='lg:mb-[20px] mb-[12px]'>
                                            <label className='lg:text-[14px] text-[12px] lg:leading-[18px] leading-[16px] text-[var(--primary_text_color)] font-[500] lg:mb-[10px] mb-[6px] block'>
                                                Billing Name *
                                            </label>
                                            <input type="text" name='billingName' placeholder='Billing Name' className='lg:text-[14px] text-[12px] lg:leading-[24px] leading-[20px] text-[var(--gray_text_color)] lg:px-[20px] px-[12px] lg:h-[45px] h-[32px] w-[100%]  border-[0.1px] border-gray-200 outline-0' />
                                            <p className='hidden lg:text-[12px] text-[9px] lg:leading-[24px] leading-[16px] text-red-500'>
                                                Billing Name is required and cannot be empty
                                            </p>
                                        </div>
                                        <div className='lg:mb-[20px] mb-[12px]'>
                                            <label className='lg:text-[14px] text-[12px] lg:leading-[18px] leading-[16px] text-[var(--primary_text_color)] font-[500] lg:mb-[10px] mb-[6px] block'>
                                                Billing Mobile Number *
                                            </label>
                                            <input type="text" name='billingPhone' placeholder='Billing Mobile Number' className='lg:text-[14px] text-[12px] lg:leading-[24px] leading-[20px] text-[var(--gray_text_color)] lg:px-[20px] px-[12px] lg:h-[45px] h-[32px] w-[100%]  border-[0.1px] border-gray-200 outline-0' />
                                            <p className='hidden lg:text-[12px] text-[9px] lg:leading-[24px] leading-[16px] text-red-500'>
                                                Billing Mobile Number is required and cannot be empty
                                            </p>
                                        </div>
                                    </div>
                                    <div className='lg:mb-[20px] mb-[12px]'>
                                        <label className='lg:text-[14px] text-[12px] lg:leading-[18px] leading-[16px] text-[var(--primary_text_color)] font-[500] lg:mb-[10px] mb-[6px] block'>
                                            Billing Email *
                                        </label>
                                        <input type="email" name='billingEmail' placeholder='Billing Email' className='lg:text-[14px] text-[12px] lg:leading-[24px] leading-[20px] text-[var(--gray_text_color)] lg:px-[20px] px-[12px] lg:h-[45px] h-[32px] w-[100%]  border-[0.1px] border-gray-200 outline-0' />
                                        <p className='hidden lg:text-[12px] text-[9px] lg:leading-[24px] leading-[16px] text-red-500'>
                                            Billing Email is required and cannot be empty
                                        </p>
                                        <p className='hidden lg:text-[12px] text-[9px] lg:leading-[24px] leading-[16px] text-red-500'>
                                            Please enter a valid billing email address
                                        </p>
                                    </div>
                                    <div className='lg:mb-[20px] mb-[12px]'>
                                        <label className='lg:text-[14px] text-[12px] lg:leading-[18px] leading-[16px] text-[var(--primary_text_color)] font-[500] lg:mb-[10px] mb-[6px] block'>
                                            Billing Address *
                                        </label>
                                        <input type="text" name='billingAddress' placeholder='Billing Address' className='lg:text-[14px] text-[12px] lg:leading-[24px] leading-[20px] text-[var(--gray_text_color)] lg:px-[20px] px-[12px] lg:h-[45px] h-[32px] w-[100%]  border-[0.1px] border-gray-200 outline-0' />
                                        <p className='hidden lg:text-[12px] text-[9px] lg:leading-[24px] leading-[16px] text-red-500'>
                                            Billing Address is required and cannot be empty
                                        </p>
                                    </div>
                                    <div className='lg:mb-[20px] mb-[12px]'>
                                        <label className='lg:text-[14px] text-[12px] lg:leading-[18px] leading-[16px] text-[var(--primary_text_color)] font-[500] lg:mb-[10px] mb-[6px] block'>
                                            Country *
                                        </label>
                                        <select name="billingCountry" id="" className='lg:text-[14px] text-[12px] lg:leading-[24px] leading-[20px] text-[var(--gray_text_color)] lg:px-[20px] px-[12px] lg:h-[45px] h-[32px] w-[100%]  border-[0.1px] border-gray-200 outline-0'>
                                            <option value="select country">Select Country</option>
                                            <option value="India">India</option>
                                            <option value="Sri Lanka">Sri Lanka</option>
                                            <option value="USA">USA</option>
                                            <option value="China">China</option>
                                            <option value="Korea">Korea</option>
                                        </select>
                                    </div>
                                    <div className='grid lg:grid-cols-2 grid-cols-1 lg:gap-[24px] gap-[14px]'>
                                        <div className='lg:mb-[20px] mb-[12px]'>
                                            <label className='lg:text-[14px] text-[12px] lg:leading-[18px] leading-[16px] text-[var(--primary_text_color)] font-[500] lg:mb-[10px] mb-[6px] block'>
                                                State *
                                            </label>
                                            <input type="text" name='billingState' placeholder='State' className='lg:text-[14px] text-[12px] lg:leading-[24px] leading-[20px] text-[var(--gray_text_color)] lg:px-[20px] px-[12px] lg:h-[45px] h-[32px] w-[100%]  border-[0.1px] border-gray-200 outline-0' />
                                            <p className='hidden lg:text-[12px] text-[9px] lg:leading-[24px] leading-[16px] text-red-500'>
                                                State is required and cannot be empty
                                            </p>
                                        </div>
                                        <div className='lg:mb-[20px] mb-[12px]'>
                                            <label className='lg:text-[14px] text-[12px] lg:leading-[18px] leading-[16px] text-[var(--primary_text_color)] font-[500] lg:mb-[10px] mb-[6px] block'>
                                                City *
                                            </label>
                                            <input type="text" name='billingCity' placeholder='City' className='lg:text-[14px] text-[12px] lg:leading-[24px] leading-[20px] text-[var(--gray_text_color)] lg:px-[20px] px-[12px] lg:h-[45px] h-[32px] w-[100%]  border-[0.1px] border-gray-200 outline-0' />
                                            <p className='hidden lg:text-[12px] text-[9px] lg:leading-[24px] leading-[16px] text-red-500'>
                                                City is required and cannot be empty
                                            </p>
                                        </div>
                                    </div>
                                    <div className='lg:mb-[20px] mb-[12px] flex items-center gap-4'>
                                        <input onChange={(e) => {
                                            if (e.target.checked) {
                                                setShipAddress(true)
                                            }
                                            else {
                                                setShipAddress(false)
                                            }

                                        }} type="checkbox" className='lg:h-[20px] h-[12px] lg:w-[20px] w-[12px] cursor-pointer' />
                                        <span className='lg:px-[15px] px-[8px] py-[5px] lg:text-[15px] text-[12px] lg:leading-[24px] leading-[26px] font-[600] font-[font-playfair] text-white bg-[var(--dark_bg_color)] lg:mb-[8px] mb-[5px] capitalize cursor-pointer'>
                                            Ship to a different address?
                                        </span>
                                    </div>
                                    <div className={`${shipAddress ? 'block' : 'hidden'}`}>
                                        <div className='grid lg:grid-cols-2 grid-cols-1 lg:gap-[24px] gap-[14px]'>
                                            <div className='lg:mb-[20px] mb-[12px]'>
                                                <label className='lg:text-[14px] text-[12px] lg:leading-[18px] leading-[16px] text-[var(--primary_text_color)] font-[500] lg:mb-[10px] mb-[6px] block'>
                                                    Name *
                                                </label>
                                                <input type="text" name='name' placeholder='Name' className='lg:text-[14px] text-[12px] lg:leading-[24px] leading-[20px] text-[var(--gray_text_color)] lg:px-[20px] px-[12px] lg:h-[45px] h-[32px] w-[100%]  border-[0.1px] border-gray-200 outline-0' />
                                                <p className='hidden lg:text-[12px] text-[9px] lg:leading-[24px] leading-[16px] text-red-500'>
                                                    Name is required and cannot be empty
                                                </p>
                                            </div>
                                            <div className='lg:mb-[20px] mb-[12px]'>
                                                <label className='lg:text-[14px] text-[12px] lg:leading-[18px] leading-[16px] text-[var(--primary_text_color)] font-[500] lg:mb-[10px] mb-[6px] block'>
                                                    Mobile Number *
                                                </label>
                                                <input type="text" name='phone' placeholder='Mobile Number' className='lg:text-[14px] text-[12px] lg:leading-[24px] leading-[20px] text-[var(--gray_text_color)] lg:px-[20px] px-[12px] lg:h-[45px] h-[32px] w-[100%]  border-[0.1px] border-gray-200 outline-0' />
                                                <p className='hidden lg:text-[12px] text-[9px] lg:leading-[24px] leading-[16px] text-red-500'>
                                                    Mobile Number is required and cannot be empty
                                                </p>
                                            </div>
                                        </div>
                                        <div className='grid lg:grid-cols-2 grid-cols-1 lg:gap-[24px] gap-[14px]'>
                                            <div className='lg:mb-[20px] mb-[12px]'>
                                                <label className='lg:text-[14px] text-[12px] lg:leading-[18px] leading-[16px] text-[var(--primary_text_color)] font-[500] lg:mb-[10px] mb-[6px] block'>
                                                    Shipping Name *
                                                </label>
                                                <input type="text" name='shippingName' placeholder='Shipping Name' className='lg:text-[14px] text-[12px] lg:leading-[24px] leading-[20px] text-[var(--gray_text_color)] lg:px-[20px] px-[12px] lg:h-[45px] h-[32px] w-[100%]  border-[0.1px] border-gray-200 outline-0' />
                                                <p className='hidden lg:text-[12px] text-[9px] lg:leading-[24px] leading-[16px] text-red-500'>
                                                    Shipping Name is required and cannot be empty
                                                </p>
                                            </div>
                                            <div className='lg:mb-[20px] mb-[12px]'>
                                                <label className='lg:text-[14px] text-[12px] lg:leading-[18px] leading-[16px] text-[var(--primary_text_color)] font-[500] lg:mb-[10px] mb-[6px] block'>
                                                    Shipping Mobile Number *
                                                </label>
                                                <input type="text" name='shippingPhone' placeholder='Shipping Mobile Number' className='lg:text-[14px] text-[12px] lg:leading-[24px] leading-[20px] text-[var(--gray_text_color)] lg:px-[20px] px-[12px] lg:h-[45px] h-[32px] w-[100%]  border-[0.1px] border-gray-200 outline-0' />
                                                <p className='hidden lg:text-[12px] text-[9px] lg:leading-[24px] leading-[16px] text-red-500'>
                                                    Shipping Mobile Number is required and cannot be empty
                                                </p>
                                            </div>
                                        </div>
                                        <div className='lg:mb-[20px] mb-[12px]'>
                                            <label className='lg:text-[14px] text-[12px] lg:leading-[18px] leading-[16px] text-[var(--primary_text_color)] font-[500] lg:mb-[10px] mb-[6px] block'>
                                                Shipping Email *
                                            </label>
                                            <input type="email" name='shippingEmail' placeholder='Shipping Email' className='lg:text-[14px] text-[12px] lg:leading-[24px] leading-[20px] text-[var(--gray_text_color)] lg:px-[20px] px-[12px] lg:h-[45px] h-[32px] w-[100%]  border-[0.1px] border-gray-200 outline-0' />
                                            <p className='hidden lg:text-[12px] text-[9px] lg:leading-[24px] leading-[16px] text-red-500'>
                                                Shipping Email is required and cannot be empty
                                            </p>
                                            <p className='hidden lg:text-[12px] text-[9px] lg:leading-[24px] leading-[16px] text-red-500'>
                                                Please enter a valid Shipping email address
                                            </p>
                                        </div>
                                        <div className='lg:mb-[20px] mb-[12px]'>
                                            <label className='lg:text-[14px] text-[12px] lg:leading-[18px] leading-[16px] text-[var(--primary_text_color)] font-[500] lg:mb-[10px] mb-[6px] block'>
                                                Shipping Address *
                                            </label>
                                            <input type="text" name='shippingAddress' placeholder='Shipping Address' className='lg:text-[14px] text-[12px] lg:leading-[24px] leading-[20px] text-[var(--gray_text_color)] lg:px-[20px] px-[12px] lg:h-[45px] h-[32px] w-[100%]  border-[0.1px] border-gray-200 outline-0' />
                                            <p className='hidden lg:text-[12px] text-[9px] lg:leading-[24px] leading-[16px] text-red-500'>
                                                Shipping Address is required and cannot be empty
                                            </p>
                                        </div>
                                        <div className='lg:mb-[20px] mb-[12px]'>
                                            <label className='lg:text-[14px] text-[12px] lg:leading-[18px] leading-[16px] text-[var(--primary_text_color)] font-[500] lg:mb-[10px] mb-[6px] block'>
                                                Country *
                                            </label>
                                            <select name="country" id="" className='lg:text-[14px] text-[12px] lg:leading-[24px] leading-[20px] text-[var(--gray_text_color)] lg:px-[20px] px-[12px] lg:h-[45px] h-[32px] w-[100%]  border-[0.1px] border-gray-200 outline-0'>
                                                <option value="select country">Select Country</option>
                                                <option value="1">India</option>
                                                <option value="2">Sri Lanka</option>
                                                <option value="3">USA</option>
                                                <option value="4">China</option>
                                                <option value="5">Korea</option>
                                            </select>
                                        </div>
                                        <div className='grid lg:grid-cols-2 grid-cols-1 lg:gap-[24px] gap-[14px]'>
                                            <div className='lg:mb-[20px] mb-[12px]'>
                                                <label className='lg:text-[14px] text-[12px] lg:leading-[18px] leading-[16px] text-[var(--primary_text_color)] font-[500] lg:mb-[10px] mb-[6px] block'>
                                                    State *
                                                </label>
                                                <input type="text" name='state' placeholder='State' className='lg:text-[14px] text-[12px] lg:leading-[24px] leading-[20px] text-[var(--gray_text_color)] lg:px-[20px] px-[12px] lg:h-[45px] h-[32px] w-[100%]  border-[0.1px] border-gray-200 outline-0' />
                                                <p className='hidden lg:text-[12px] text-[9px] lg:leading-[24px] leading-[16px] text-red-500'>
                                                    State is required and cannot be empty
                                                </p>
                                            </div>
                                            <div className='lg:mb-[20px] mb-[12px]'>
                                                <label className='lg:text-[14px] text-[12px] lg:leading-[18px] leading-[16px] text-[var(--primary_text_color)] font-[500] lg:mb-[10px] mb-[6px] block'>
                                                    City *
                                                </label>
                                                <input type="text" name='city' placeholder='City' className='lg:text-[14px] text-[12px] lg:leading-[24px] leading-[20px] text-[var(--gray_text_color)] lg:px-[20px] px-[12px] lg:h-[45px] h-[32px] w-[100%]  border-[0.1px] border-gray-200 outline-0' />
                                                <p className='hidden lg:text-[12px] text-[9px] lg:leading-[24px] leading-[16px] text-red-500'>
                                                    City is required and cannot be empty
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='lg:mb-[20px] mb-[12px]'>
                                        <label className='lg:text-[14px] text-[12px] lg:leading-[18px] leading-[16px] text-[var(--primary_text_color)] font-[500] lg:mb-[10px] mb-[6px] block'>
                                            Order Notes
                                        </label>
                                        <textarea type="text" name='note' placeholder='Notes about your order, e.g. special notes for delivery.' className='lg:text-[14px] text-[12px] lg:leading-[24px] leading-[20px] text-[var(--gray_text_color)] lg:px-[20px] px-[12px] lg:h-[90px] h-[70px] w-[100%]  border-[0.1px] border-gray-200 outline-0 resize-none'></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='checkout-right'>
                            <h3 className='lg:px-[15px] px-[8px] py-[5px] lg:text-[16px] text-[12px] lg:leading-[37px] leading-[26px] font-[600] font-[font-playfair] text-white bg-[var(--dark_bg_color)] lg:mb-[8px] mb-[5px] uppercase'>
                                Your Order
                            </h3>
                            <div className=''>
                                <table className='w-[100%]'>
                                    <thead className='w-[100%]'>
                                        <tr className='border-1 border-gray-200'>
                                            <th className='w-[50%] lg:h-[50px] h-[40px] lg:px-[15px] px-[8px] py-[5px] lg:text-[15px] text-[11px] text-center lg:leading-[28px] leading-[24px] font-[600] font-[font-playfair] text-[var(--primary_text_color)] bg-gray-100 capitalize'>Product</th>
                                            <th className='w-[50%] lg:px-[15px] px-[8px] py-[5px] lg:text-[15px] text-[11px] text-center lg:leading-[28px] leading-[24px] font-[600] font-[font-playfair] text-[var(--primary_text_color)] bg-gray-100 capitalize '>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cart.map((items, index) => {
                                            return (
                                                <tr key={index} className=''>
                                                    <td className='w-[50%] lg:h-[50px] h-[40px] lg:px-[15px] px-[8px] py-[5px] lg:text-[14px] text-[11px] font-[500] lg:leading-[28px] leading-[24px] text-[var(--primary_text_color)] text-center capitalize border-1 border-gray-200'>
                                                        {items.title} × {items.qty}
                                                    </td>
                                                    <td className='w-[50%] lg:px-[15px] px-[8px] py-[5px] lg:text-[14px] text-[11px] font-[500] lg:leading-[28px] leading-[24px] text-[var(--primary_text_color)] text-center capitalize border-1 border-gray-200'>
                                                        Rs. {items.price * items.qty}
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                        <tr className=''>
                                            <td className='w-[50%] lg:h-[50px] h-[40px] lg:px-[15px] px-[8px] py-[5px] lg:text-[14px] text-[11px] font-[500] lg:leading-[28px] leading-[24px] text-[var(--primary_text_color)] text-center capitalize border-1 border-gray-200'>Cart Subtotal</td>
                                            <td className='w-[50%] lg:px-[15px] px-[8px] py-[5px] lg:text-[14px] text-[11px] font-[500] lg:leading-[28px] leading-[24px] text-[var(--primary_text_color)] text-center capitalize border-1 border-gray-200'>
                                                Rs. {cart.reduce((total, obj) => total + (obj.price * obj.qty), 0)}
                                            </td>
                                        </tr>
                                        <tr className=''>
                                            <td className='w-[50%] lg:h-[50px] h-[40px] lg:px-[15px] px-[8px] py-[5px] lg:text-[14px] text-[11px] font-[500] lg:leading-[28px] leading-[24px] text-[var(--primary_text_color)] text-center capitalize border-1 border-gray-200'>Discount (-)</td>
                                            <td className='w-[50%] lg:px-[15px] px-[8px] py-[5px] lg:text-[14px] text-[11px] font-[500] lg:leading-[28px] leading-[24px] text-[var(--primary_text_color)] text-center capitalize border-1 border-gray-200'>Rs. 0</td>
                                        </tr>
                                        <tr className='bg-gray-100'>
                                            <td className='w-[50%] lg:h-[50px] h-[40px] lg:px-[15px] px-[8px] py-[5px] lg:text-[14px] text-[11px] font-[600] lg:leading-[28px] leading-[24px] text-[var(--primary_text_color)] text-center capitalize border-1 border-gray-200'>Order Total</td>
                                            <td className='w-[50%] lg:px-[15px] px-[8px] py-[5px] lg:text-[14px] text-[11px] font-[600] lg:leading-[28px] leading-[24px] text-[var(--primary_text_color)] text-center capitalize border-1 border-gray-200'>
                                                Rs. {cart.reduce((total, obj) => total + (obj.price * obj.qty), 0)}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                <div className='lg:my-[30px] sm:my-6 my-[20px]'>
                                    <h3 className='lg:px-[15px] px-[8px] py-[5px] lg:text-[16px] text-[12px] lg:leading-[37px] leading-[26px] font-[600] font-[font-playfair] text-white bg-[var(--dark_bg_color)] capitalize'>
                                        Payment Method
                                    </h3>
                                    <div className='grid grid-cols-2 lg:px-[20px] px-[14px] bg-gray-100 py-7'>
                                        <div className='flex items-center gap-3'>
                                            <input onChange={() => setPaymentMethod(1)} type="radio" name='payment-method' checked={paymentMethod == 1} className='w-[17px] h-[17px]' />
                                            <label className='lg:text-[14px] text-[12px] lg:leading-[18px] leading-[16px] text-[var(--primary_text_color)] font-[500]'>
                                                Cash On Delivery
                                            </label>
                                        </div>
                                        <div className='flex items-center gap-3'>
                                            <input onChange={() => setPaymentMethod(2)} type="radio" name='payment-method' checked={paymentMethod == 2} className='w-[17px] h-[17px]' />
                                            <label className='lg:text-[14px] text-[12px] lg:leading-[18px] leading-[16px] text-[var(--primary_text_color)] font-[500]'>
                                                Online
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className='lg:mt-6 sm:mt-5 mt-4'>
                                    <button type='submit' className='w-full -[5px] bg-[var(--bg_color)] sm:leading-[24px] leading-[16px] font-[600] uppercase sm:text-[12px] text-[9px] text-white rounded-[4px] hover:bg-[var(--primary_text_color)] duration-300 sm:h-[36px] h-[24px] cursor-pointer'>
                                        Place Order
                                    </button>
                                </div>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
