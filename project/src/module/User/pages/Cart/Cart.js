import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux';
import { removeallitems,removeoneitem } from '../../../../Redux/Cartslice';
import { NavLink, useNavigate } from 'react-router-dom';

const Cart = () => {

    let disp = useDispatch();
    let navigate = useNavigate();
    let cartitems = useSelector(state=>state.Cartslice);

    let shipping = 0;
    let totalprice = 0;
    let totaldiscount = 0;

    useEffect(()=>{
        if(localStorage.getItem("token")){
        }
        else{
            navigate(`/login`);
        }
    },[])

    let clearcartfunc = ()=>{
        console.log("hello");
        disp(removeallitems());
    }

    return (
      <>
        <div className='Toppagename container-fluid'>
            <h4 className="mb-5">Cart</h4>
        </div>
        <div className='container'>
            {
            cartitems.length ? "" : (
                <div className='alert alert-danger text-center mt-3'> <h5 className='text-dark'>Cart is Empty !</h5></div>
                )
        }
            <div className='row'>
                <div className='col-md-7'>
                    <div className='row my-4 border-right pr-5 ml-5'>
                        
                        {
                            cartitems.map((item,index)=>{
                                totalprice += item.price;
                                if(totalprice > 499){
                                    shipping = 0
                                }
                                else{
                                    shipping = 99;
                                }
                                let discountedprice = item.price - (item.price*item.discount/100);
                                totaldiscount += item.price*item.discount/100

                                return(
                                    <React.Fragment key={index}>
                                        <div className='row'>
                                            <div className='col-md-12 border-bottom'>
                                                <div className='row'>
                                                    <div className='col-md-6'>
                                                    <img className='py-3' src={`http://localhost:3001/uploads/${item.image}`} style={{borderRadius : "40px",height : "250px",width : "370px",backgroundSize : "contain"}}></img>
                                                    </div>
                                                    <div className='col-md-6'>
                                                        <div className='my-3 py-3'>
                                                            <h4 className='mb-3'><b>{item.title}</b></h4>
                                                            <h6 className='mb-3'><i>{item.details}</i>  </h6>
                                                            <div style={{display : "flex"}}>
                                                                <h5 className='mr-2'>Price : &#8377;</h5>
                                                                <h6 className='mr-2' style={{paddingTop : "1px"}}><del>{item.price.toFixed(2)}</del></h6>
                                                                <h5 className='mb-4'>{discountedprice.toFixed(2)}</h5>
                                                            </div>
                                                            <button className='btn btn-sm btn-danger' onClick={()=>disp(removeoneitem(item._id))} >Remove</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                )
                            })
                        }
                    </div>
                </div>
                <div className='col-md-5 pl-5'>
                    <div className='my-4'> 
                        <h4 className='text-center border-bottom py-3'>Price Details</h4>
                    </div>
                    <div>
                        <div className='row'>
                            <div className='col-md-12 my-3'>
                                <h5 className='float-left'>Price ({cartitems.length} items)</h5>
                                <h5 className='float-right'>&#8377; {totalprice.toFixed(2)}</h5>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='row'>
                            <div className='col-md-12 my-3'>
                                <h5 className='float-left text-info'>Total Discount</h5>
                                <h5 className='float-right text-info'>&#8377; -{totaldiscount.toFixed(2)}</h5>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='row'>
                            <div className='col-md-12 my-3'>
                                <h5 className='float-left'>Shipping</h5>
                                <h5 className='float-right'>&#8377; {shipping == 0 && cartitems.length > 0 ? "Free" : shipping.toFixed(2)}</h5>
                            </div>
                        </div>
                    </div>
                    <hr></hr>
                    <div>
                        <div className='row'>
                            <div className='col-md-12 my-3'>
                                <h5 className='float-left'>Total Price</h5>
                                <h5 className='float-right'>&#8377; {(totalprice - totaldiscount + shipping).toFixed(2)}</h5>  
                            </div>
                            <h6 className='text-success pl-3 mt-2 mb-4'><b>You are saving &#8377; {(totaldiscount).toFixed(2)}</b></h6>
                        </div>
                    </div>
                    {  
                        cartitems.length ? (
                            <>
                                {
                                    totalprice < 500 ? (
                                        <div className='alert alert-info mb-4'>Add Products worth &#8377; <b><u>{499 - totalprice}</u></b> to get free Shipping ! </div>
                                    ) : (
                                        <div className='alert alert-success mb-4'>You availed free Shipping !</div>
                                    )
                                }
                                <button className='btn btn-danger mb-4 mr-3' onClick={clearcartfunc}>Clear Cart</button>
                                <NavLink className='btn btn-success mb-4' to="/checkout">Checkout</NavLink>
                            </>   
                        ) : ""
                    }
                    
                </div>
            </div>
        </div>
      </>
    )
}

export default Cart