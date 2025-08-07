import { createRoot } from 'react-dom/client'
import './index.css'
import 'react-responsive-pagination/themes/classic-light-dark.css';
import { BrowserRouter, Route, Routes } from 'react-router'

import DashboardData from './pages/dashboard/DashboardData'

import User from './pages/user/User'
import AddColors from './pages/color/Addcolors'
import ViewColors from './pages/color/ViewColors'
import Material from './pages/material/Material'
import Viewmaterial from './pages/material/Viewmaterial'
import AddCategory from './pages/category/AddCategory'
import Viewcategory from './pages/category/Viewcategory'
import Subcategory from './pages/sub-category/Subcategory'
import Viewsubcategory from './pages/sub-category/Viewsubcategory'
import Subsubcategory from './pages/sub-sub-category/Subsubcategory'
import Viewsubsubcategory from './pages/sub-sub-category/Viewsubsubcategory'
import Addproduct from './pages/product/Addproduct'
import Viewproduct from './pages/product/Viewproduct'
import Addwhychoose from './pages/why-choose-us/Addwhychoose'
import Viewwhychoose from './pages/why-choose-us/Viewwhychoose'
import Orders from './pages/orders/Orders'
import Addsliders from './pages/slider/Addsliders'
import Viewslider from './pages/slider/Viewslider'
import Addcountry from './pages/country/Addcountry'
import Viewcountry from './pages/country/Viewcountry'
import Addfaq from './pages/faq/Addfaq'
import Viewfaq from './pages/faq/Viewfaq'
import Addtestimonial from './pages/testimonial/Addtestimonial'
import Viewtestimonial from './pages/testimonial/Viewtestimonial'
import Enquiries from './pages/enquiry\'s/Enquiries'
import Newsletter from './pages/enquiry\'s/Newsletter'
import Profile from './pages/Profile';
import ComapanyProfile from './pages/CompanyProfile';
import Login from './LogIn';
import Rootlayout from './common/RootLayout';
import MainContext from './context/MainContext';
import ForgetPassword from './pages/ForgetPassword';



createRoot(document.getElementById('root')).render(
  <MainContext>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/forget-password' element={<ForgetPassword />} />
        <Route path='/' element={<Rootlayout />}>
          <Route path='/profile' element={<Profile/>} />
          <Route path='/company-profile' element={<ComapanyProfile />} />
          <Route path='/dashboard' element={<DashboardData/> } />
          <Route path='/user/view' element={<User />} />

          <Route path='' >
          <Route path='/contact/enquiries' element={<Enquiries />} />
          <Route path='/newsletters' element={<Newsletter />} />
          </Route>

          <Route path='color' >
            <Route path='add' element={<AddColors />} />
            <Route path='edit/:id' element={<AddColors />} />
            <Route path='view' element={<ViewColors />} />
          </Route>

          <Route path='material'>
            <Route path='add' element={<Material />} />
            <Route path='edit/:id' element={<Material />} />
            <Route path='view' element={<Viewmaterial />} />
          </Route>

          <Route path='category'>
            <Route path='add' element={<AddCategory />} />
            <Route path='edit/:id' element={<AddCategory />} />
            <Route path='view' element={<Viewcategory />} />
          </Route>

          <Route path='sub-category'>
            <Route path='add' element={<Subcategory />} />
            <Route path='edit/:id' element={<Subcategory />} />
            <Route path='view' element={<Viewsubcategory />} />
          </Route>

          <Route path='sub-sub-category'>
            <Route path='add' element={<Subsubcategory />} />
            <Route path='edit/:id' element={<Subsubcategory />} />
            <Route path='view' element={<Viewsubsubcategory />} />
          </Route>

          <Route path='product'>
            <Route path='add' element={<Addproduct />} />
            <Route path='edit/:id' element={<Addproduct />} />
            <Route path='view' element={<Viewproduct />} />
          </Route>

          <Route path='why-choose-us'>
            <Route path='add' element={<Addwhychoose />} />
            <Route path='edit/:id' element={<Addwhychoose />} />
            <Route path='view' element={<Viewwhychoose />} />
          </Route>

          <Route path='orders'>
            <Route path='view' element={<Orders />} />
          </Route>

          <Route path='slider'>
            <Route path='add' element={<Addsliders />} />
            <Route path='edit/:id' element={<Addsliders />} />
            <Route path='view' element={<Viewslider />} />
          </Route>

          <Route path='country'>
            <Route path='add' element={<Addcountry />} />
            <Route path='edit/:id' element={<Addcountry />} />
            <Route path='view' element={<Viewcountry />} />
          </Route>

          <Route path='faq'>
            <Route path='add' element={<Addfaq />} />
            <Route path='edit/:id' element={<Addfaq />} />
            <Route path='view' element={<Viewfaq />} />
          </Route>

          <Route path='testimonial'>
            <Route path='add' element={<Addtestimonial />} />
            <Route path='view' element={<Viewtestimonial />} />
          </Route> 
        </Route>
      </Routes>
    </BrowserRouter>
  </MainContext>
)
