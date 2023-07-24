import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import Profileservice from '../../../../services/Profileservice';
import { useFormik } from 'formik';
import * as yup from "yup";
import Couponservice from '../../../../services/Couponservice';
import Paymentservice from '../../../../services/Paymentservice';

const Checkout = () => {

    let disp = useDispatch();
    let navigate = useNavigate();
    let cartitems = useSelector(state=>state.Cartslice);

    let [shipping,setShipping] = useState(0);
    let [totalprice,setTotalprice] = useState(0);
    let [totaldiscount,setTotaldiscout] = useState(0);
    let [userdata,setUserdata] = useState({});
    let [coupondiscount,setCoupondiscount] = useState(0);
    let [couponerr,setCouponerr] = useState(false);
    let [couponname,setCouponname] = useState("");

    useEffect(()=>{
        if(localStorage.getItem("token")){      
            if(cartitems.length > 0){

                let token = localStorage.getItem("token");

                let getuserdata = async (token)=>{
                    let result = await Profileservice.getuserprofiledata(token);
                    setUserdata(result.info);
                }
                getuserdata(token);
                
                let total = 0;
                let totdisc = 0;

                cartitems.map((item)=>{
                    total += item.price;
                    if(total > 499){
                        setShipping(0);
                    }
                    else{
                        setShipping(99);    
                    }
                    totdisc += item.price*item.discount/100;
                })
                setTotalprice(total);
                setTotaldiscout(totdisc);
            }
            else{
                navigate("/shop");  
            }
        }
        else{
            navigate(`/login`);
        }
    },[cartitems])

    let couponschema = yup.object({
        couponname : yup.string().required("Enter the coupon code")
    })

    let {handleChange,handleSubmit,touched,errors} = useFormik({
        initialValues : {
            couponname : ""
        },
        onSubmit : async (formdata)=>{
            let result = await Couponservice.getcoupon(formdata.couponname);
            if(result.success){
                setCouponname(formdata.couponname);
                setCouponerr(false);
                setCoupondiscount(result.info[0].discount);
            }
            else{
                setCouponerr(true);
                setCoupondiscount(0);
            }
        },
        validationSchema : couponschema
    })

    let removecoupon  = ()=>{
        setCoupondiscount(0);
    }

    let placeorder = async ()=>{
        let orderdetails = {
            totalprice : totalprice - totaldiscount + shipping,
            items : cartitems
        }
        let result = await Paymentservice.placeorder(orderdetails);
        if(result.success){
            console.log("payment successfull");
        }
        else{
            console.log("payment Failed")
        }
    }

  return (
    <>
        <div className='Toppagename container-fluid'>
            <h4 className="mb-5">Checkout</h4>
        </div>
        <div className='container'>
            {
                cartitems.length ? "" : (
                    <div className='alert alert-danger text-center mt-3'> <h5 className='text-dark'>Cart is Empty !</h5></div>
                    )
            }
            <div className='row mb-5'>
                <div className='col-md-8 '>
                    <div className='my-4 mr-5'> 
                        <h4 className='text-center border-bottom py-3'>Shipping Information</h4>
                    </div>
                <div className='row'>
                    <div className='col-md-9 offset-md-1'>
                        <form>
                            <div className='form-group'>
                                <label>Name</label>
                                <input disabled type="text" className='form-control' value={userdata.name ? userdata.name : ""}></input>
                            </div>
                            <div className='form-group'>
                                <label>E-mail</label>
                                <input disabled type="text" className='form-control' value={userdata.email ? userdata.email : ""}></input>
                            </div>
                            <div className='form-group'>
                                <label>Address</label>
                                <textarea disabled type="text" className='form-control' value={userdata.address ? userdata.address : ""}></textarea>
                            </div>
                            <div className='form-group'>
                                <label>State</label>
                                <input disabled type="text" className='form-control' value={userdata.state ? userdata.state : ""}></input>
                            </div>
                            <div className='form-group'>
                                <label>City</label>
                                <input disabled type="text" className='form-control' value={userdata.city ? userdata.city : ""}></input>
                            </div>
                            <div className='form-group'>
                                <label>Contact Number</label>
                                <input disabled type="text" className='form-control' value={userdata.contact ? userdata.contact : ""}></input>
                            </div>
                            <NavLink to={`/profile/edit/${userdata._id}`} className="btn btn-danger mt-2">Edit Details</NavLink>
                        </form>
                    </div>
                </div>
                </div>
                <div className='col-md-4'>
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
                    <form onSubmit={handleSubmit}> {/*coupon form*/}
                        <div className='form-group'>
                            <label>Coupon Code</label>
                            <div className='btn-group btn-block'>
                                <input type="text" className={'form-control ' + (errors.couponname && touched.couponname ? "is-invalid" : "")} onChange={handleChange} name="couponname"></input>
                                <button type="submit" className='btn btn-primary'>Apply</button>
                                {
                                    coupondiscount ? (
                                        <button type="button" onClick={removecoupon} className='btn btn-danger'>X</button>
                                    ) : ""
                                }
                            </div>
                            <small className='text-danger'>
                                {
                                    errors.couponname && touched.couponname ? errors.couponname : ""
                                }
                            </small>
                            {
                                couponerr ? (
                                    <div className='alert alert-danger my-3'>Coupon is Invalid</div>
                                    ) : ""
                                }
                        </div>
                    </form>
                    <div>
                        <div className='row'>
                                {
                                    coupondiscount ? ( // if coupon is valid
                                        <>
                                            <div className='col-md-12 my-2'>
                                                <h5 className='float-left text-danger'>Total Price</h5>
                                                <h6 className='float-right text-danger'>&#8377; <b><u><del><span className='h6'>{(totalprice - totaldiscount + shipping).toFixed(2)}</span></del></u></b></h6>
                                            </div>
                                            <div className='col-md-12 my-2'>
                                                <h5 className='float-left text-secondary'>Coupon Applied</h5>
                                                <h5 className='float-right text-secondary'>"{couponname}"</h5>
                                            </div>
                                            <div className='col-md-12 my-1'>
                                                <h4 className='float-left text-info'><b>Discounted Price</b></h4>
                                                <h4 className='float-right text-info'>&#8377; <b><u>{((totalprice - totaldiscount + shipping)-((totalprice - totaldiscount + shipping)*coupondiscount/100)).toFixed(2)}</u></b></h4>
                                            </div>
                                            
                                        </>
                                    ) : (
                                        <div className='col-md-12 my-3'>
                                            <h5 className='float-left'>Total Price</h5>
                                            <h5 className='float-right'>&#8377; <b><u><span className='h4'>{(totalprice - totaldiscount + shipping).toFixed(2)}</span></u></b></h5>
                                        </div>
                                    )
                                }
                            <div>
                                {
                                    coupondiscount ? ( // if coupon is valid then add the coupon discount also 
                                        <h6 className='text-success pl-3 mt-2 mb-3'><b>You are saving &#8377; {((totalprice - totaldiscount + shipping)*coupondiscount/100).toFixed(2)}</b></h6>
                                    ) : (
                                        <h6 className='text-success pl-3 mt-2 mb-3'><b>You are saving &#8377; {(totaldiscount).toFixed(2)}</b></h6>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    {  
                        cartitems.length ? (
                            <>
                                {
                                    totalprice < 500 ? "" : (
                                        <div className='alert alert-success mb-4'>You availed free Shipping !</div>
                                    )
                                }
                            </>   
                        ) : ""
                    }
                    <div className='border-top'>
                        <button className='btn btn-primary mr-4 mt-4' onClick={placeorder}><h4 className='text-light'>Place Order</h4></button>
                        <NavLink to="/cart" className='btn btn-dark mt-4'><h4 className='text-light'>Go back to Cart</h4></NavLink>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Checkout