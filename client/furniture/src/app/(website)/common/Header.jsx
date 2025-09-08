"use client"
import Link from 'next/link'
import { IoSearch } from "react-icons/io5";
import { PiHeartStraightFill } from "react-icons/pi";
import { IoMdCart } from "react-icons/io";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { LuMenu } from "react-icons/lu";
import { HiXMark } from "react-icons/hi2";
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/app/slice/userSlice';
import { store } from '@/app/store/store';
import { fetchCart } from '@/app/slice/cartSlice';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import CartSideBar from './header/headerComponents/CartSideBar';

export default function Header() {
    let [resMenu, setResMenu] = useState(false)
    let [shownav, setShowNav] = useState(false)

    let [showSubCat, setshowSubCat] = useState(null)
    let [showSubsubCat, setshowSubsubCat] = useState(null)

    let [cartSideBar, setCartSideBar] = useState(0)

    let [megaMenu, setMegaMenu] = useState([])
    let [isMobile, setIsMobile] = useState(false)

    let menuRef = useRef()
    let router = useRouter()

    let [myAccount, setMyAccount] = useState(false)

    let user = useSelector((store) => store.login.user)
    let cart = useSelector((store) => store.cart.cart)
    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCart())
    }, [user])
    console.log('hello', cart);


    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 178) {
                setShowNav(true)
            } else {
                setShowNav(false)
            }
        }
        let handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                    setResMenu(resMenu===true ?? false)
                    setCartSideBar(0)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)

    }, [])

    let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL

    let getSearchProduct = (e) => {
        e.preventDefault()
        let query = e.target.searchProduct.value;
        axios.get(`${apiBaseUrl}home/products?search=${query}`)
            .then((res) => res.data)
            .then((finalRes) => {
                console.log(finalRes);

            })

    }

    let getMegaMenu = () => {
        axios.get(`${apiBaseUrl}home/mega-menu`)
            .then((res) => res.data)
            .then((finalRes) => {
                console.log(finalRes);
                setMegaMenu(finalRes.data)
            })
    }

    useEffect(() => {
        getMegaMenu()

        let checkMobile;
        checkMobile = () =>setIsMobile(window.innerWidth<=1024)

        checkMobile();
        window.addEventListener("resize",checkMobile)
        return()=>window.removeEventListener("resize",checkMobile)
    }, [])

    const toggleSubCat = (id) => {
        if(isMobile){
            setshowSubCat(prev => (prev===id ? null : id))
        }
    }
    const toggleSubSubCat = (id) => {
            setshowSubsubCat(prev => (prev===id ? null : id))
    }
console.log(isMobile, showSubCat);



    return (
        <>
            {/* OnScroll MenuBar */}
            <div className={`${shownav ? "top-0 left-0" : "top-[-500px]"} w-[100%] fixed bg-[rgba(255,255,255,0.85)] z-100 duration-500 lg:block hidden shadow-md`}>
                <div className='max-w-[1320px] mx-auto'>
                    <nav className='py-[10px] flex justify-center items-center '>
                        <Link href={'/'} className=' lg:mr-[30px]'>
                            <img src="/images/cccfbdab-3bec-439f-88b9-5694698cd302-1670132652.png" className='lg:w-[120px] w-[100px] cursor-pointer' alt="" />
                        </Link>
                        <ul className='lg:flex justify-center items-center lg:uppercase capitalize h-[100%]'>
                            <li className='lg:px-[20px] lg:py-[19px] py-[10px] lg:border-0 border-b-[0.1px] border-gray-200  hover:text-[var(--secondary_text_color)] duration-300'>
                                <Link href={'/'} className='active lg:text-[13px] text-[var(--gray_text_color)] hover:text-[var(--secondary_text_color)] duration-300 tracking-[0.5px] text-[11px] lg:font-[600] font-[500] flex items-center'>home</Link>
                            </li>
                            {megaMenu.map((category, index) => {
                                return (
                                    <li key={index} className='main-menu lg:px-[20px] lg:py-[19px] py-[10px] lg:border-0 border-b-[0.1px] border-gray-200 hover:text-[var(--secondary_text_color)] duration-300 relative group'>
                                        <div className='hover:text-[var(--secondary_text_color)] duration-300 lg:text-[13px] text-[var(--gray_text_color)] tracking-[0.5px] text-[11px] lg:font-[600] font-[500] flex justify-between items-center'>
                                            {category.categoryName}
                                            <GoChevronDown className='lg:text-[13px] text-[11px] ml-[3px] group-hover:rotate-180 duration-300' />
                                        </div>
                                        <ul className='mega-menu px-[25px] pt-[30px] pb-[35px] lg:absolute top-[68px] right-[-480px] z-10 bg-white border-[0.1px] border-gray-200 flex min-w-[580px]'>
                                            {category.subcategories.map((items, index) => {
                                                return (
                                                    <li key={index} className=' w-[33%]'>
                                                        <div className='hover:text-[var(--secondary_text_color)] duration-300 lg:text-[13px] text-[var(--primary_text_color)] leading-[18px] tracking-[0.5px] text-[11px] lg:font-[600] font-[500]'>
                                                            {items.subCategoryName}
                                                        </div>
                                                        <ul className='mt-[28px]'>
                                                            {items.subsubcategories.map((value, index) => {
                                                                return (
                                                                    <li key={index} className='mb-[8px]'>
                                                                        <Link href={`/product-listing/${value.slug}`} className='hover:text-[var(--secondary_text_color)] duration-300 lg:text-[13px] capitalize leading-[18px] text-[var(--gray_text)] tracking-[0.5px] text-[11px] font-[600]'>
                                                                            {value.subSubCategoryName}
                                                                        </Link>
                                                                    </li>
                                                                )
                                                            })}

                                                        </ul>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </li>
                                )
                            })}

                            <li className='main-menu relative lg:px-[20px] lg:py-[19px] py-[10px] lg:border-0 border-b-[0.1px] border-gray-200 hover:text-[var(--secondary_text_color)] duration-300 group'>
                                <div className='lg:text-[13px] text-[var(--gray_text_color)] hover:text-[var(--secondary_text_color)] duration-300 tracking-[0.5px] text-[11px] lg:font-[600] font-[500] flex justify-between items-center'>
                                    pages
                                    <GoChevronDown className='lg:text-[13px] text-[11px] ml-[3px] group-hover:rotate-180 duration-300' />
                                </div>
                                <ul className='mega-menu lg:px-[25px] lg:py-[30px] absolute top-[68px] right-[-100px] z-10 bg-white border-[0.1px] border-gray-200 min-w-[200px]'>
                                    <li className='mb-[8px]'>
                                        <Link href={'/about-us'} className='hover:text-[var(--secondary_text_color)] duration-300 lg:text-[13px] capitalize leading-[18px] text-[var(--gray_text)] tracking-[0.5px] text-[11px] font-[600]'>About Us</Link>
                                    </li>

                                    {user &&
                                        <li className='mb-[8px]'>
                                            <Link href={'/cart'} className='hover:text-[var(--secondary_text_color)] duration-300 lg:text-[13px] capitalize leading-[18px] text-[var(--gray_text)] tracking-[0.5px] text-[11px] font-[600]'>Cart</Link>
                                        </li>
                                    }

                                    {user &&
                                        <li className='mb-[8px]'>
                                            <Link href={'/checkout'} className='hover:text-[var(--secondary_text_color)] duration-300 lg:text-[13px] capitalize leading-[18px] text-[var(--gray_text)] tracking-[0.5px] text-[11px] font-[600]'>Checkout</Link>
                                        </li>
                                    }
                                    <li className='mb-[8px]'>
                                        <Link href={'/frequently-questions'} className='hover:text-[var(--secondary_text_color)] duration-300 lg:text-[13px] capitalize leading-[18px] text-[var(--gray_text)] tracking-[0.5px] text-[11px] font-[600]'>Frequently Questions</Link>
                                    </li>
                                </ul>
                            </li>
                            <li className='lg:block hidden lg:px-[20px] lg:py-[19px] py-[10px] lg:border-0 border-b-[0.1px] border-gray-200 hover:text-[var(--secondary_text_color)] duration-300'>
                                <Link href={'/contact-us'} className='lg:text-[13px] text-[var(--gray_text_color)] hover:text-[var(--secondary_text_color)] duration-300 tracking-[0.5px] text-[11px] lg:font-[600] font-[500] flex items-center'>contact us</Link>
                            </li>
                            {user ?
                                <li className='lg:hidden lg:px-[20px] lg:py-[19px] py-[10px] lg:border-0 border-b-[0.1px] border-gray-200 hover:text-[var(--secondary_text_color)] duration-300'>
                                    <button onClick={() => {
                                        dispatch(logout())
                                        router.push('/login')
                                    }} className='lg:text-[13px] text-[var(--gray_text_color)] hover:text-[var(--secondary_text_color)] duration-300 tracking-[0.5px] text-[11px] lg:font-[600] font-[500] flex items-center capitalize'>log out</button> </li>
                                :
                                <li className='lg:hidden lg:px-[20px] lg:py-[19px] py-[10px] lg:border-0 border-b-[0.1px] border-gray-200 hover:text-[var(--secondary_text_color)] duration-300'>
                                    <Link href={'/login-register'} className='lg:text-[13px] text-[var(--gray_text_color)] hover:text-[var(--secondary_text_color)] duration-300 tracking-[0.5px] text-[11px] lg:font-[600] font-[500] flex items-center capitalize'>login / register</Link>

                                </li>
                            }
                        </ul>
                    </nav>
                </div>
            </div>
            {/* OnScroll Menubar End */}


            {/* Desktop Menu */}
            <div className='header-top w-[100%] border-b-[0.1px] border-gray-200'>
                <div className='lg:max-w-[1320px] lg:h-[44px] mx-auto lg:flex hidden justify-between items-center' >
                    <div className='text-[12px] tracking-[0.4px] font-medium text-[var(--text_color)]'>Contact us 24/7 : +91-9781234560 / furniture@gmail.com</div>

                    {user
                        ?
                        <div className='relative'>
                            <div onClick={() => {
                                setMyAccount(!myAccount)
                                setTimeout(() => {
                                    setMyAccount(false)
                                }, [2000])
                            }} className={`inline-flex items-center gap-4 text-[12px] tracking-[0.4px] font-medium text-[var(--text_color)] leading-[24px] cursor-pointer duration-300 hover:text-[rgb(192,149,120)]`}>
                                My Account <span><GoChevronDown /></span>
                            </div>
                            <ul ref={menuRef} className={`absolute top-[130%] ${myAccount == true ? "block" : "hidden"} bg-white border-1 border-gray-200 rounded-[4px] w-[120px] z-50`}>
                                <li className='p-2 border-b-1 border-b-gray-200 duration-300 hover:bg-gray-50'>
                                    <Link href={'/my-dashboard'} className='hover:text-[var(--secondary_text_color)] duration-300 lg:text-[13px] capitalize leading-[18px] text-[var(--gray_text)] tracking-[0.5px] text-[11px] font-[600]'>My Dashboard</Link>
                                </li>
                                <li className='p-2 hover:bg-gray-50 duration-300 cursor-pointer'>
                                    <div onClick={() => {
                                        dispatch(logout())
                                        router.push('/login')
                                    }} className='hover:text-[var(--secondary_text_color)] duration-300 lg:text-[13px] capitalize leading-[18px] text-[var(--gray_text)] tracking-[0.5px] text-[11px] font-[600]'> Log Out</div>
                                </li>
                            </ul>
                        </div>
                        :
                        <Link href="/login" className='lg:block hidden'>
                            <p className='text-[12px] tracking-[0.4px] font-medium text-[var(--text_color)] text- leading-[16px] cursor-pointer duration-300 hover:text-[rgb(192,149,120)]'>
                                Login / Register
                            </p>
                        </Link>
                    }
                </div>
            </div>
            {/* Responsive Header */}
            <div className='header-middle w-[100%] border-b-[0.1px] lg:border-gray-200 border-gray-100 lg:py-[20px]'>
                <div className='lg:max-w-[1320px] lg:h-[44px] mx-auto flex justify-between items-center lg:p-0 py-[20px] px-[12px]' >
                    <Link href={'/'} className='flex items-center'>
                        <img src="/images/cccfbdab-3bec-439f-88b9-5694698cd302-1670132652.png" className='lg:w-[150px] w-[100px] cursor-pointer' alt="" />
                    </Link>

                    <div className='searchInput flex items-center lg:gap-0 gap-6'>
                        <form onSubmit={getSearchProduct} className='border-[0.1px] border-gray-200 h-[45px] lg:flex hidden items-center justify-between gap-2 mr-[15px]'>
                            <input type="text" name='searchProduct' placeholder='Search product...' className='h-[100%] outline-none pl-[14px]' />
                            <button type='submit' className='h-[45px] px-3 cursor-pointer group'>
                                <IoSearch className='text-[20px] text-[var(--primary_text_color)] h-[100%] group-hover:text-[var(--secondary_text_color)] duration-300' />
                            </button>
                        </form>
                        <div>
                            {user ?

                                <Link href={'/wishlist'} className='border-[0.1px] lg:border-gray-200 border-gray-100 rounded-[3px] lg:h-[45px] h-[34px] lg:w-[45px] w-[35px] cursor-pointer group flex items-center justify-center'>
                                    <PiHeartStraightFill className='lg:text-[25px] text-[20px] text-[rgb(36,36,36)] group-hover:text-[var(--secondary_text_color)] duration-300' />
                                </Link>
                                :
                                <Link href={'/'} className='border-[0.1px] lg:border-gray-200 border-gray-100 rounded-[3px] lg:h-[45px] h-[34px] lg:w-[45px] w-[35px] cursor-pointer group flex items-center justify-center'>
                                    <PiHeartStraightFill className='lg:text-[25px] text-[20px] text-[rgb(36,36,36)] group-hover:text-[var(--secondary_text_color)] duration-300' />
                                </Link>
                            }
                        </div>

                        <div className='border-[0.1px] lg:border-gray-200 border-gray-100 rounded-[3px] lg:h-[45px] lg:ml-[20px] relative'>
                            <div className='lg:pr-[10px] lg:pl-[18px] lg:pt-[11px] lg:pb-[13px] px-[10px] py-[6px] flex items-center cursor-pointer group'>
                                <div className='lg:border-r-[0.1px] border-gray-200 lg:mr-[10px] lg:pr-[10px] group'>
                                    <IoMdCart className='text-[19px] font-[500] leading-[15px] text-[var(--primary_text_color)] group-hover:text-[var(--secondary_text_color)] duration-300' />
                                </div>
                                <div onClick={() => {
                                    if (user) {
                                        setCartSideBar(1)
                                    }
                                }} className='lg:flex hidden items-center group duration-300 '>
                                    <span className='font-bold block leading-[15px] text-[14px] text-[var(--primary_text_color)] group-hover:text-[var(--secondary_text_color)] duration-300'>
                                        Rs. {user ?
                                            cart.reduce((total, obj) => total + (obj.price * obj.qty), 0)
                                            :
                                            <span>0.00</span>
                                        }
                                    </span>
                                    <span>
                                        <GoChevronDown className='text-[17px] ml-[3px] group-hover:text-[var(--secondary_text_color)] duration-300 block' />
                                    </span>
                                </div>
                            </div>

                            <span className='absolute lg:top-[12px] top-[8px] lg:left-[-11px] left-[-10px] lg:w-[20px] w-[16px] lg:h-[20px] h-[16px] rounded-[50%] flex items-center justify-center lg:text-[14px] text-[10px] text-white bg-[var(--bg_color)]'>
                                {user ?
                                    cart.length
                                    :
                                    0
                                }
                            </span>
                        </div>
                    </div>

                    {/* cart side-bar start */}

                    <div className={`${cartSideBar == 1 && 'bg-[rgba(29,29,29,0.7)] w-full h-[100vh]'} z-[99] fixed left-0 top-0`}>
                        <div className={`${cartSideBar == 1 ? 'right-0' : 'right-[-500px] '} z-[999] fixed top-0 duration-500 lg:w-[340px]  w-0 lg:h-[100vh] h-0 bg-white`}>
                            <CartSideBar cartSideBar = {cartSideBar} setCartSideBar = {setCartSideBar} />
                        </div>
                    </div>

                    {/* cart side-bar end */}

                    <button onClick={() => setResMenu(resMenu===true ? false : true)} className='lg:hidden flex items-center justify-center h-[34px] w-[35px] border-[0.1px] border-gray-200 rounded-[3px]'>
                        <LuMenu className='text-[18px]' />
                    </button>
                </div>
            </div>
            {/* Responsive Header End*/}

            {/* Responsive Menu Start*/}
            <div ref={menuRef} className='header-bottom lg:w-[100%] border-b-[0.1px] border-gray-200'>
                <div className='max-w-[1320px] mx-auto lg:h-[64px]'>
                    <nav className={`lg:h-[100%] lg:w-[100%] h-[100vh] w-[65%] lg:static fixed top-0 left-0 z-30  bg-white lg:p-0 pl-4 py-3 pr-3
                        ${resMenu == true ? 'left-0' : "left-[-100%]"} duration-700`}>

                        <div className='lg:hidden w-[100%] flex justify-end mb-[20px]'>
                            <button onClick={() => setResMenu(false)} className='w-[24px] h-[24px] rounded-full border-[0.1px] border-gray-200 flex items-center justify-center'>
                                <HiXMark className='text-[14px]' />
                            </button>
                        </div>

                        <div className='lg:hidden tracking-[0.5px] text-[11px] text-[var(--text_color)] lg:leading-8 leading-5 mb-6 text-center'>
                            Contact us 24/7 : +91-9781234560 / furniture@gmail.com
                        </div>

                        <ul className='lg:flex justify-center items-center lg:uppercase capitalize h-[100%]'>
                            <li className='lg:px-[20px] lg:py-[19px] py-[10px] lg:border-0 border-b-[0.1px] border-gray-200  hover:text-[var(--secondary_text_color)] duration-300'>
                                <Link href={'/'} className='active lg:text-[13px] text-[var(--gray_text_color)] hover:text-[var(--secondary_text_color)] duration-300 tracking-[0.5px] text-[11px] lg:font-[600] font-[500] flex items-center'>home</Link>
                            </li>

                            {megaMenu.map((category) => {
                                return (

                                    <li key={category.id} className='main-menu lg:px-[20px] lg:py-[19px] py-[10px] lg:border-0 border-b-[0.1px] border-b-gray-200 hover:text-[var(--secondary_text_color)] duration-300 relative group'>
                                        <div onClick={()=>toggleSubCat(category.id)} className='hover:text-[var(--secondary_text_color)] duration-300 lg:text-[13px] text-[var(--gray_text_color)] tracking-[0.5px] text-[11px] lg:font-[600] font-[500] flex justify-between items-center'>
                                            {category.categoryName}
                                            {showSubCat ?
                                            <button className=''>
                                                {showSubCat === category.id ?
                                                    <GoChevronUp className='lg:text-[13px] text-[11px] ml-[3px]' />
                                                    :
                                                    <GoChevronDown className='lg:text-[13px] text-[11px] ml-[3px] lg:group-hover:rotate-180 duration-300' />
                                                }
                                            </button>
                                            :
                                            <button className=''>
                                                {showSubCat === category.id ?
                                                    <GoChevronUp className='lg:text-[13px] text-[11px] ml-[3px]' />
                                                    :
                                                    <GoChevronDown className='lg:text-[13px] text-[11px] ml-[3px] lg:group-hover:rotate-180 duration-300' />
                                                }
                                            </button>
                                            }
                                        </div>

                                        {showSubCat === category.id ?

                                            <ul className={`lg:mega-menu lg:px-[25px] pl-2 lg:pt-[30px] lg:pb-[35px] lg:absolute lg:top-[61px] lg:right-[-480px] z-10 bg-white lg:border-[0.1px] border-gray-200 lg:flex lg:min-w-[580px]  min-w-full lg:max-h-[320px] duration-300 ${showSubCat === category.id ? "max-h-[100%]" : "max-h-0"}`}>

                                                {category.subcategories.map((items) => {
                                                    return (
                                                        <li key={items.id} className=' w-full lg:py-[0px] py-[10px] lg:border-0 border-b-[0.1px] border-b-gray-200'>
                                                            <div onClick={() =>toggleSubSubCat(items.id)} className='hover:text-[var(--secondary_text_color)] duration-300 lg:text-[13px] text-[var(--primary_text_color)] leading-[18px] tracking-[0.5px] text-[11px] lg:font-[600] font-[500] flex justify-between items-center '>
                                                                {items.subCategoryName}
                                                                <button className='lg:hidden block duration-300'>
                                                                    {showSubsubCat === items.id ?
                                                                        <GoChevronUp className='lg:text-[13px] text-[11px] ml-[3px] ' />
                                                                        :
                                                                        <GoChevronDown className='lg:text-[13px] text-[11px] ml-[3px] ' />
                                                                    }
                                                                </button>
                                                            </div>

                                                            {showSubsubCat === items.id &&
                                                                <ul className={`lg:pl-0 pl-3 lg:py-0 py-[8px] duration-300 ${showSubsubCat === items.id ? "max-h-[100%]" : "max-h-0"} duration-300`}>
                                                                    {items.subsubcategories.map((value, index) => {
                                                                        return (
                                                                            <li key={index} className='w-full py-[10px] border-b-[0.1px] border-gray-200'>
                                                                                <Link href={`${category.slug}/${items.slug}/${value.slug}`} className='hover:text-[var(--secondary_text_color)] duration-300 lg:text-[13px] capitalize leading-[18px] text-[var(--gray_text)] tracking-[0.5px] text-[11px] font-[600] '>
                                                                                    {value.subSubCategoryName}
                                                                                </Link>
                                                                            </li>
                                                                        )
                                                                    })}

                                                                </ul>
                                                            }
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                            :
                                             <ul className={`mega-menu lg:px-[25px] pl-2 lg:pt-[30px] pt-4 lg:pb-[35px] lg:absolute lg:top-[61px] lg:right-[-480px] z-10 bg-white lg:border-[0.1px] border-gray-200 lg:flex lg:min-w-[580px] min-w-full lg:max-h-[320px] duration-300 hidden`}>

                                                {category.subcategories.map((items) => {
                                                    return (
                                                        <li key={items.id} className=' lg:w-[33%] w-full lg:py-[0px] py-[10px]'>
                                                            <div className='hover:text-[var(--secondary_text_color)] duration-300 lg:text-[13px] text-[var(--primary_text_color)] leading-[18px] tracking-[0.5px] text-[11px] lg:font-[600] font-[500] flex justify-between items-center'>
                                                                {items.subCategoryName}
                                                                <button onClick={() =>
                                                                    setshowSubsubCat((prev) => prev === items.id ? null : items.id)} className='lg:hidden block'>
                                                                    {showSubsubCat === items.id ?
                                                                        <GoChevronUp className='lg:text-[13px] text-[11px] ml-[3px] ' />
                                                                        :
                                                                        <GoChevronDown className='lg:text-[13px] text-[11px] ml-[3px] ' />
                                                                    }
                                                                </button>
                                                            </div>
                                                                <ul className={`lg:mt-[28px] lg:pl-0 pl-2 lg:py-0 py-[10px]`}>
                                                                    {items.subsubcategories.map((value, index) => {
                                                                        return (
                                                                            <li key={index} className='mb-[8px]'>
                                                                                {/* {`${category.slug}/${items.slug}/${value.slug}`}  */}
                                                                                <Link href={`/product-listing/${value.slug}`}className='hover:text-[var(--secondary_text_color)] duration-300 lg:text-[13px] capitalize leading-[18px] text-[var(--gray_text)] tracking-[0.5px] text-[11px] font-[600]'>
                                                                                    {value.subSubCategoryName}
                                                                                </Link>
                                                                            </li>
                                                                        )
                                                                    })}

                                                                </ul>
                                                        </li>
                                                    )
                                                })}


                                            </ul>
                                        }
                                    </li>
                                )
                            })}

                            <li className='main-menu relative lg:px-[20px] lg:py-[19px] py-[10px] lg:border-0 border-b-[0.1px] border-gray-200 hover:text-[var(--secondary_text_color)] duration-300 group'>
                                <div className='lg:text-[13px] text-[var(--gray_text_color)] hover:text-[var(--secondary_text_color)] duration-300 tracking-[0.5px] text-[11px] lg:font-[600] font-[500] flex justify-between items-center'>
                                    pages
                                    <GoChevronDown className='lg:text-[13px] text-[11px] ml-[3px] lg:group-hover:rotate-180 duration-300' />
                                </div>
                                <ul className='mega-menu lg:px-[25px] lg:py-[30px] absolute top-[61px] right-[-100px] z-10 bg-white border-[0.1px] border-gray-200 min-w-[200px] lg:block hidden'>
                                    <li className='mb-[8px]'>
                                        <Link href={'/about-us'} className='hover:text-[var(--secondary_text_color)] duration-300 lg:text-[13px] capitalize leading-[18px] text-[var(--gray_text)] tracking-[0.5px] text-[11px] font-[600]'>About Us</Link>
                                    </li>
                                    {user &&
                                        <li className='mb-[8px]'>
                                            <Link href={'/cart'} className='hover:text-[var(--secondary_text_color)] duration-300 lg:text-[13px] capitalize leading-[18px] text-[var(--gray_text)] tracking-[0.5px] text-[11px] font-[600]'>Cart</Link>
                                        </li>}
                                    {user &&
                                        <li className='mb-[8px]'>
                                            <Link href={'/checkout'} className='hover:text-[var(--secondary_text_color)] duration-300 lg:text-[13px] capitalize leading-[18px] text-[var(--gray_text)] tracking-[0.5px] text-[11px] font-[600]'>Checkout</Link>
                                        </li>}
                                    <li className='mb-[8px]'>
                                        <Link href={'/frequently-questions'} className='hover:text-[var(--secondary_text_color)] duration-300 lg:text-[13px] capitalize leading-[18px] text-[var(--gray_text)] tracking-[0.5px] text-[11px] font-[600]'>Frequently Questions</Link>
                                    </li>
                                </ul>
                            </li>
                            <li className='lg:block hidden lg:px-[20px] lg:py-[19px] py-[10px] lg:border-0 border-b-[0.1px] border-gray-200 hover:text-[var(--secondary_text_color)] duration-300'>
                                <Link href={'/contact-us'} className='lg:text-[13px] text-[var(--gray_text_color)] hover:text-[var(--secondary_text_color)] duration-300 tracking-[0.5px] text-[11px] lg:font-[600] font-[500] flex items-center'>contact us</Link>
                            </li>
                            {user ?
                                <li className='lg:hidden lg:px-[20px] lg:py-[19px] py-[10px] lg:border-0 border-b-[0.1px] border-gray-200 hover:text-[var(--secondary_text_color)] duration-300'>
                                    <button onClick={() => {
                                        dispatch(logout())
                                        router.push('/login')
                                    }} className='lg:text-[13px] text-[var(--gray_text_color)] hover:text-[var(--secondary_text_color)] duration-300 tracking-[0.5px] text-[11px] lg:font-[600] font-[500] flex items-center capitalize'>log Out</button>
                                </li>
                                :
                                <li className='lg:hidden lg:px-[20px] lg:py-[19px] py-[10px] lg:border-0 border-b-[0.1px] border-gray-200 hover:text-[var(--secondary_text_color)] duration-300'>
                                    <Link href={'/login-register'} className='lg:text-[13px] text-[var(--gray_text_color)] hover:text-[var(--secondary_text_color)] duration-300 tracking-[0.5px] text-[11px] lg:font-[600] font-[500] flex items-center capitalize'>login / register</Link>
                                </li>
                            }

                        </ul>
                    </nav>
                </div>
            </div>
        </>
    )
}
