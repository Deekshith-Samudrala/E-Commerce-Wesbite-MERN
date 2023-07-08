    import React,{useState,useEffect} from 'react';
    import { NavLink } from 'react-router-dom';
    import Loggedin from '../loggedstatus/Loggedin';
    import Loggedout from '../loggedstatus/Loggedout';
    import { useSelector } from 'react-redux/es/hooks/useSelector';
    import { useDispatch } from 'react-redux';
    import {login,logout} from "../../../../Redux/Userauthslice"
    import Profileservice from '../../../../services/Profileservice';
    import { cartadd,cartinit,getcartitems } from '../../../../Redux/Cartslice';    
    
    const Header = () => {

        let disp = useDispatch();

        let cartitems = useSelector(state=>state.Cartslice);
        let loggedin = useSelector(state=>state.Userauthslice);

        let cartvalue = 0;
        cartitems.map((item)=>{
            cartvalue += item.price - (item.price*item.discount/100);
        })
        if(cartitems.length > 0 && cartvalue < 500){
            cartvalue += 99;
        }

        let cartfull = true ? cartitems.length == 15 : false;

        useEffect(()=>{
            if(localStorage.getItem("token")){
                let token = localStorage.getItem("token");
                let getuserid = async (token)=>{
                    let result = await Profileservice.getuserprofiledata(token);
                    disp(login(result.info._id));
                    disp(getcartitems(result.info._id));
                }
                getuserid(token);
            }
        },[])

    return (
        <>
        <header className="header">
            <div className="header__top">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6">
                            <div className="header__top__left">
                                <ul>
                                    <li><i className="fa fa-envelope"></i> ditusamudrala@gmail.com</li>
                                    <li>Free Shipping for all Orders above &#8377;499</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="header__top__right">
                                {
                                    loggedin ? <Loggedin></Loggedin> : <Loggedout></Loggedout>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-3">
                        <div className="header__logo mb-2">
                            <a href="/"><img src="/assets/img/freshmartlogo.png" alt=""/></a>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <nav className="header__menu">
                            <ul style={{ display: 'flex', justifyContent: 'space-between',padding: '0 20px'}}>
                                <li ><NavLink to="/">Home</NavLink></li>
                                <li ><NavLink to="/shop">Shop</NavLink></li>
                                <li ><NavLink to="/cart">Cart</NavLink></li>
                                <li ><NavLink to="/about">About</NavLink></li>
                                <li ><NavLink to="/contact">Contact</NavLink></li>
                            </ul>
                        </nav>
                    </div>
                    <div className="col-lg-3">
                        <div className="header__cart">
                            <ul>
                                <li><NavLink to="/cart"><i className={"fa fa-shopping-bag " + ( cartfull ? "text-danger" : '')}></i><span>{cartitems.length}</span></NavLink></li>
                            </ul>
                            <div className="header__cart__price">
                                <b><u>Cart Value:</u></b> &nbsp; 
                                <span>&#8377; {cartvalue} </span> 
                                <span className={cartfull ? 'text-danger' : ""}>{ cartfull ? " (CART FULL)" : ""  }</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        </>
    )
    }

    export default Header