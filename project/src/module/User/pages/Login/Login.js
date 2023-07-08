import React,{useEffect, useState} from 'react';
import { useFormik } from 'formik';
import loginSchema from '../validationSchema/Loginvalschema';
import { NavLink, useNavigate } from 'react-router-dom';
import Profileservice from '../../../../services/Profileservice';
import { useDispatch } from 'react-redux';
import {login,logout} from "../../../../Redux/Userauthslice"
import { cartadd,cartinit,getcartitems } from '../../../../Redux/Cartslice';

const Login = () => {

    let navigate = useNavigate();
    let disp = useDispatch();

    let [err,setErr] = useState(false);
    let [errmsg,setErrmsg] = useState();
    let [signupbtn,setSignupbtn] = useState(false);

    useEffect(()=>{
        if(localStorage.getItem("token")){
            navigate("/profile");
        }
    },[])

    // password show&hide button

    let [passtype,setPasstype] = useState("password");
    let [revealpassname, setRevealpassname] = useState("Show");
    let [revealed,setRevealed] = useState(false);

    let reveal = ()=>{
        if(revealpassname == "Show"){
            setPasstype("text");
            setRevealpassname("Hide");
            setRevealed(true);
        }
        else{
            setPasstype("Password");
            setRevealpassname("Show");
            setRevealed(false);
        }
    }

    let {handleSubmit, handleChange, errors, touched } = useFormik({
        initialValues : {
            email : "",
            password : ""
        },
        onSubmit : async (formdata)=>{
            let result = await Profileservice.checklogin(formdata);
            if(result.success){ 
                let token = result.token;
                localStorage.setItem("token",token);
                disp(login(result.userid));
                disp(getcartitems(result.userid));
                navigate("/");
            }
            else{
                if(result.errType == 1){
                    setSignupbtn(false);
                    setErr(true);
                    setErrmsg("You have entered the wrong password !");
                }
                if(result.errType == 2){
                    setSignupbtn(true);
                    setErr(true);
                    setErrmsg("This E-Mail id is not registered. Please create an account");
                }
            }
        },
        validationSchema : loginSchema
    })

  
    return (
    <>
        <div className='Toppagename container-fluid'>
            <h4 className="mb-5">User Login</h4>
        </div>
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="row mt-3">
                    <div className="col-md-6 offset-md-3">
                        <div className="form-group pt-2">
                            <label className='pb-2'>Username/E-Mail</label>
                            <input type="text" name="email" onChange={handleChange} className={"form-control " + (errors.email && touched.email ? "is-invalid" : "")}></input>
                            <small className="text-danger">
                                {errors.email && touched.email ? errors.email : ""}
                            </small>
                        </div>
                        <div className="form-group pt-2 pb-3">
                            <label className='pb-2'>Password</label>
                            <div className="btn-group btn-block">
                                <input type={passtype} name="password" onChange={handleChange} className={"form-control " + (errors.password && touched.password ? "is-invalid" : "")}></input>
                                <button className={"btn " + (revealed ? "btn-danger" : "btn-primary")} type="button" onClick={reveal}>{revealpassname}</button>
                            </div>
                            <small className="text-danger">
                                {errors.password && touched.password ? errors.password : ""}
                            </small>
                        </div> 
                        <button type="submit" className='btn btn-success pt-'>Login</button>
                        {
                            signupbtn ? (
                                <NavLink className='btn btn-info mx-4' to="/signup">Click here to create new account</NavLink>
                            ) : ""
                        }
                        { err ? (<div className='alert alert-danger my-4'>
                            {errmsg}
                        </div>) 
                        : ""
                        }
                    </div>
                </div>
            </form>
        </div>
    </>
  )
}

export default Login