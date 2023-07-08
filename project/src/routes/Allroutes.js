import React,{useEffect,useState} from 'react';
import {Routes,Route,Outlet,Navigate} from 'react-router-dom';
import { adminkeyword } from '../constants/Adminurl';
import Home from "../module/User/pages/Home/Home"
import Signup from '../module/User/pages/signup/signup';
import Login from '../module/User/pages/Login/Login';
import Logout from '../module/User/pages/Logout/Logout';
import Profile from '../module/User/pages/Profile/Profile';
import Userlayout from '../module/User/Userlayout';
import Adminlayout from '../module/Admin/Adminlayout';
import Dashboard from '../module/Admin/pages/Dashboard/Dashboard';
import CategoryList from '../module/Admin/pages/Category/Categorylist/Categorylist';
import Categoryadd from '../module/Admin/pages/Category/Categoryadd/Categoryadd';
import Subcategoryadd from '../module/Admin/pages/Subcategory/Subcategoryadd';
import Subcategorylist from '../module/Admin/pages/Subcategory/Subcategorylist';
import Productadd from '../module/Admin/pages/Product/Productadd';
import Productlist from '../module/Admin/pages/Product/Productlist';
import Adminlogin from '../module/Admin/pages/AdminLogin/Adminlogin';
import Adminchangepassword from '../module/Admin/pages/adminchangepassword/Adminchangepassword';
import Cart from '../module/User/pages/Cart/Cart';
import Shop from '../module/User/pages/Shop/Shop';
import Editdetails from '../module/User/pages/Editdetails/Editdetails';
import Contact from '../module/User/pages/contact/Contact';
import Userchangepassword from '../module/User/pages/Userchangepassword/Userchangepassword';
import Checkout from '../module/User/pages/Checkout/Checkout';
import Userlist from '../module/Admin/pages/Users/Userlist';

const Allroutes = () => {
  
  let [isLoggedin,setIsLoggedin] = useState(false);
  useEffect(()=>{ 
    if(localStorage.getItem("token")){
      setIsLoggedin(true);  
    }
  },[])
  
  return (
    <>
        <Routes>
            <Route element={<Userlayout></Userlayout>}>
              <Route path="/" element={<Home></Home>}></Route>
              <Route path="/signup" element={<Signup></Signup>}></Route>
              <Route path="/login" element={<Login></Login>}></Route> 
              <Route path="/shop" element={<Shop></Shop>}></Route>
              <Route path="/shop/:cateid" element={<Shop></Shop>}></Route>
              <Route path="/shop/cate/:subcateid" element={<Shop></Shop>}></Route>
              <Route path="/checkout" element={<Checkout></Checkout>}></Route>
              <Route element={<Protected checkedLogin={isLoggedin}></Protected>}>
                <Route path="/about" element={<Profile></Profile>}></Route>
                <Route path="/profile" element={<Profile></Profile>}></Route>
                <Route path="/profile/edit/:userid" element={<Editdetails></Editdetails>}></Route>
                <Route path="/profile/changepassword" element={<Userchangepassword></Userchangepassword>}></Route>
              </Route>
              <Route path="/logout" element={<Logout></Logout>}></Route>
              <Route path="/cart" element={<Cart></Cart>}></Route>
              <Route path="/product/cate/:categoryid" element={<Home></Home>}></Route>
              <Route path="/product/subcate/:subcategoryid" element={<Home></Home>}></Route>
              <Route path="/contact" element={<Contact></Contact>}></Route>
            </Route>

            <Route path={`admin${adminkeyword}`} element={<Adminlayout></Adminlayout>}>
              <Route path="" element={<Dashboard></Dashboard>}></Route>
              <Route path="product/add" element={<Productadd></Productadd>}></Route>
              <Route path="product/list" element={<Productlist></Productlist>}></Route>
              <Route path="product/edit/:productid" element={<Productadd></Productadd>}></Route>        
              <Route path="category/add" element={<Categoryadd></Categoryadd>}></Route>
              <Route path="category/list" element={<CategoryList></CategoryList>}></Route>
              <Route path="category/edit/:cateid" element={<Categoryadd></Categoryadd>}></Route>
              <Route path="subcategory/add" element={<Subcategoryadd></Subcategoryadd>}></Route>
              <Route path="subcategory/edit/:cateid/:subcateid" element={<Subcategoryadd></Subcategoryadd>}></Route>
              <Route path="subcategory/list" element={<Subcategorylist></Subcategorylist>}></Route>
              <Route path="user/list" element={<Userlist></Userlist>}></Route>
            </Route>
            <Route path={`admin${adminkeyword}/login`} element={<Adminlogin></Adminlogin>}></Route>
            <Route path={`admin${adminkeyword}/changepass`} element={<Adminchangepassword></Adminchangepassword>}></Route>
        </Routes>
    </>
  )
}

const Protected = (props)=>{
  return( props.checkedLogin ? <Outlet></Outlet> : <Navigate to="/login"></Navigate>)
}

export default Allroutes