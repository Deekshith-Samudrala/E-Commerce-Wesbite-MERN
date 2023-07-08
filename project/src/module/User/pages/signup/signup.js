import React,{useState,useEffect} from 'react';
import { useFormik } from 'formik';
import { NavLink, useNavigate } from 'react-router-dom';
import signupSchema from '../validationSchema/Signupvalschema';
import Userservice from '../../../../services/Userservice';
import { useDispatch } from 'react-redux';
import { cartinit } from '../../../../Redux/Cartslice';
import Profileservice from '../../../../services/Profileservice';

const Signup = () => {

    let navigate = useNavigate();
    let disp = useDispatch();

    let [accerr,setAccerr] = useState(false);
    let [disperr,setDisperr] = useState("");
    let [loginbtn,setLoginbtn] = useState(false);
    let [passreveal,setPassreveal] = useState(false);
    let [repassreveal,setRepassreveal] = useState(false);

    useEffect(()=>{
        if(localStorage.getItem("token")){
            navigate("/profile");
        }
        
        let cityget = async()=>{
            let result = await Userservice.getstate();
            setState(result.info);
        }
        cityget();
    },[])

    let [state,setState] = useState([]);
    let [citylist,setCitylist] = useState([{name:"Please select a State",_id: "04567"}]);

    let onchangestate = (e)=>{
        handleChange(e);
        let citylist = async (e)=>{
            let result = await Userservice.getcity(e.target.value);
            setCitylist(result.info);
        }
        citylist(e);
    }

    let { handleSubmit , handleChange , errors , touched} = useFormik({
        initialValues : {
            name : "",
            email : "",
            password : "",
            repass : "",
            address : "",
            gender : "",
            state:"",
            city : "", 
            contact : ""
        } ,
        onSubmit : async (formdata)=>{
            let result = await Userservice.userdata(formdata);
            if(result.success){
                let getuserid = async(name)=>{
                    let result = await Profileservice.getuserbyname(name);
                    console.log(result);
                    disp(cartinit(result.info[0]._id));
                }
                getuserid(formdata.name);
                navigate("/");
            }
            else{
                setAccerr(true);
                if(result.err == 1){
                    setLoginbtn(true);
                    setDisperr("An account with this email is already registered ! Please login to that account !");
                }
                else if(result.err == 2){
                    setDisperr("Name already exists ! Please give another Username");
                }
            }
        },
        validationSchema : signupSchema
    });

    let passwordreveal = ()=>{
        if(passreveal){
            setPassreveal(false);
        }
        else{
            setPassreveal(true);
        }
    }

    let repasswordreveal = ()=>{
        if(repassreveal){
            setRepassreveal(false);
        }
        else{
            setRepassreveal(true);
        }
    }
  
    return (
    <>
        <div className='Toppagename containe-fluid my-3'>
            <h4 className="mb-5">User Registration</h4>
        </div>
        <div className='container' style={{minHeigh : "700px"}}>
            <form  onSubmit={handleSubmit}>
            <div className='row'>
                <div className='col-md-6 offset-md-3'>
                    <div className='formgroup'>
                        <label className='my-2'>Username</label>
                        <input name="name" onChange={handleChange} type="text" className={'form-control my-2 ' + (errors.name && touched.name ? "is-invalid" : "")}></input>
                        <small className="text-danger">
                            {errors.name && touched.name ? errors.name : ""}
                        </small>
                    </div>
                    <div className='formgroup'>
                        <label className='my-2'>E-mail</label>
                        <input name="email" onChange={handleChange} type="text" className={'form-control my-2 ' + (errors.email && touched.email ? "is-invalid" : "")}></input>
                        <small className="text-danger">
                            {errors.email && touched.email ? errors.email : ""}
                        </small>
                    </div>
                    <div className='formgroup'>
                        <label className='my-2'>Password</label>
                        <div className='btn-group btn-block'>
                            <input name="password" onChange={handleChange} type={passreveal ? "text" : "password"} className={'form-control my-2  ' + (errors.password && touched.password ? "is-invalid" : "")}></input>
                            <button onClick={passwordreveal} type="button" className={'btn my-2 ' + (passreveal ? "btn-danger" : "btn-primary") }>{passreveal ? "Hide" : "Show"}</button>
                        </div>
                        <small className="text-danger">
                            {errors.password && touched.password ? errors.password : ""}
                        </small>
                    </div>
                    <div className='formgroup'>
                        <label className='my-2'>Re-enter password</label>
                        <div className='btn-group btn-block'>
                            <input name="repass" onChange={handleChange} type={repassreveal ? "text" : "password"} className={'form-control my-2 ' + (errors.repass && touched.repass ? "is-invalid" : "")}></input>
                            <button onClick={repasswordreveal} type="button" className={'btn my-2 ' + (repassreveal ? "btn-danger" : "btn-primary")}>{repassreveal ? "Hide" : "Show"}</button>
                        </div>
                        <small className="text-danger">
                            {errors.repass && touched.repass ? errors.repass : ""}
                        </small>
                    </div>
                    <div className='formgroup'>
                        <label className='my-2'>Address</label>
                        <textarea name="address" onChange={handleChange} className={'form-control my-2 ' + (errors.address && touched.address ? "is-invalid" : "")}></textarea>
                        <small className="text-danger">
                            {errors.address && touched.address ? errors.address : ""}
                        </small>
                    </div>
                    <div className='form-group'>
                        <label className='my-2'>Gender  </label>
                        <select onChange={handleChange} name="gender" className={'form-control my-2 ' + (errors.gender && touched.gender ? "is-invalid" : "")}>
                            <option>Select a Gender</option>
                            <option>male</option>
                            <option>female</option>
                            <option>prefer not to say</option>
                        </select>
                        <small className="text-danger">
                            {errors.gender && touched.gender ? errors.gender : ""}
                        </small>
                    </div>
                    <div className='formgroup'>
                        <label className='my-2'>State</label>
                        <select name="state" onChange={(e)=>onchangestate(e)} className={'form-control my-2 ' + (errors.state && touched.state ? "is-invalid" : "")}>
                            <option>Select</option>
                            {
                                state.map((x,n)=><option key={n}>{x}</option>)
                            }
                        </select>
                        <small className="text-danger">
                            {errors.state && touched.state ? errors.state : ""}
                        </small>
                    </div>
                    <div className='formgroup'>
                        <label className='my-2'>City</label>
                        <select name="city" onChange={handleChange} className={'form-control my-2 ' + (errors.city && touched.city ? "is-invalid" : "")}>
                            <option>Select</option>
                            {
                                citylist.map(x=>{
                                    return(
                                        <option key={x._id}>{x.name}</option>
                                    )
                                })
                            }
                        </select>
                        <small className="text-danger">
                            {errors.city && touched.city ? errors.city : ""}
                        </small>
                    </div>
                    <div className='formgroup'>
                        <label className='my-2'>Contact Number</label>
                        <input type="text" name="contact" onChange={handleChange} className={'form-control my-2 ' + (errors.contact && touched.contact ? "is-invalid" : "")}></input>
                        <small className="text-danger">
                            {errors.contact && touched.contact ? errors.contact : ""}
                        </small>
                    </div>
                    <br/>
                    <button type="submit" className='btn btn-success mb-4'>Submit</button>
                    {
                loginbtn ? (
                    <NavLink className="btn btn-primary mx-4 mb-4" to="/login">Click here to login</NavLink>
                ) : ""
            }
                </div>
                
            </div >
            {
                accerr ? (
                <div className='col-md-6 offset-md-3 alert alert-danger'>
                    {disperr}
                </div>
                ) : ""
            }
            
            </form>
        </div>
    </>
  )
}

export default Signup