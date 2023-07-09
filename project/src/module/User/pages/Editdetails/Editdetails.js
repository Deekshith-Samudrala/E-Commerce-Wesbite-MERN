import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from "yup";
import { useParams,useNavigate } from 'react-router-dom';
import Profileservice from '../../../../services/Profileservice';
import Userservice from '../../../../services/Userservice';

const Editdetails = () => {

    let params = useParams();
    let navigate = useNavigate();
    let [details,setDetails] = useState([]);
    let [state,setState] = useState([]);
    let [city,setCity] = useState([]);
    let [revealed,setRevealed] = useState(false);
    let [wrongpass,setWrongpass] = useState(false);

    useEffect(()=>{
        if(params.userid){
            let getstate = async ()=>{
                let result = await Userservice.getstate();
                setState(result.info);
            }
            getstate();
            let getuserdetails = async ()=>{
                let result = await Profileservice.getuserdatabyid(params.userid);
                setDetails(result.info[0]);
                let getcityname = async ()=>{
                    let result1 = await Userservice.getcity(result.info[0].state);
                    setCity(result1.info);
                }
                getcityname();
            }
            getuserdetails();
        }
        else{
            navigate("/login");
        }
    },[])
    
    let revealpass = ()=>{
        if(revealed){
            setRevealed(false);
        }
        else{
            setRevealed(true);
        }
    }

    let editschema = yup.object({
        name : yup.string().required("Enter new username"),
        password : yup.string().required("Enter your original password"),
        address : yup.string().required("Enter updated Address"),
        gender : yup.string().required("Select new gender"),
        state : yup.string().required("Please select the updated state"),
        city : yup.string().required("Please select the city"),
        contact : yup.number().min(7000000000,"Enter valid Number").max(9999999999,"Enter valid Number").typeError("Enter only numbers").required("Please enter mobile number")
    })

    let {handleChange,handleSubmit,errors,touched,values} = useFormik({
        initialValues : {
            name : details.name ? details.name : "",
            email : details.email ? details.email : "",
            password : "",
            address : details.address ? details.address : "",
            gender : details.gender,
            city : details.city ? details.city : "",
            contact : details.contact ? details.contact : "",
            state : details.state ? details.state : ""
        },
        onSubmit : async (formdata)=>{
            formdata._id = params.userid;
            let result = await Userservice.updateuserdata(formdata,params.userid);
            if(result.success){
                navigate("/profile");
            }
            else{
                setWrongpass(true);
                window.scrollTo({
                    top : document.documentElement.scrollHeight,
                    behavior : "smooth"
                })
            }
        },
        validationSchema : editschema,
        enableReinitialize : true
    })

    let getcityname = async (e)=>{
        handleChange(e);
        let result = await Userservice.getcity(e.target.value);
        setCity(result.info);
    }

  return (
    <>
        <div className='Toppagename container-fluid'>
            <h4 className="mb-5">Edit User Details</h4>
        </div>
        <div className='container my-5'>
            <form onSubmit={handleSubmit}>
                <div className='row'>
                    <div className='col-md-6 offset-md-3'>
                        <div className='form-group'>
                            <label>Username</label>
                            <input type="text" name="name" value={values.name} className={'form-control ' + (errors.name && touched.name ? "is-invalid" : "")} onChange={handleChange}></input>
                            <small className='text-danger'>
                                {
                                    errors.name && touched.name ? errors.name : "" 
                                }
                            </small>
                        </div>
                        <div className='form-group'>
                            <label>E-mail</label>
                            <input disabled type="text" name="email" value={values.email} className={'form-control ' + (errors.email && touched.email ? "is-invalid" : "")}></input>
                            <small className='text-danger'>
                                {
                                    errors.email && touched.email ? errors.email : "" 
                                }
                            </small>
                        </div>
                        <div className='form-group'>
                            <label>Password</label>
                            <div className='btn-group btn-block'>
                                <input type={revealed ? "text" : "password"} name="password" className={"form-control " + (errors.password && touched.password ? "is-invalid" : "")} onChange={handleChange}></input>
                                <button type="button" onClick={revealpass} className={"btn " + (revealed ? "btn-danger" : "btn-primary")}>{revealed ? "Hide" : "Show"}</button>
                            </div>
                            <small className='text-danger'>
                                {
                                    errors.password && touched.password ? errors.password : ""
                                }
                            </small>
                        </div>
                        <div className='form-group'>
                            <label>Address</label>
                            <textarea type="text" name="address" value={values.address} className={'form-control ' + (errors.address && touched.address ? "is-invalid" : "")} onChange={handleChange}></textarea>
                            <small className='text-danger'>
                                {
                                    errors.address && touched.address ? errors.address : "" 
                                }
                            </small>
                        </div>
                        <div className='form-group'>
                            <label>Gender</label>
                            <select name="gender" value={values.gender} className={'form-control ' + (errors.gender && touched.gender ? "is-invalid" : "")} onChange={handleChange}>
                                <option value="">Select a Gender</option>
                                <option>male</option>
                                <option>female</option>
                                <option>prefer not to say</option>
                            </select>
                        </div>
                        <div className='form-group'>
                            <label>State</label>
                            <select className={'form-control ' + (errors.state && touched.state ? "is-invalid" : "")} onChange={(e)=>getcityname(e)} name="state" value={values.state}>
                                <option value="">Select a State</option>
                                {
                                    state.map((statename,idx)=>{
                                        return (
                                            <React.Fragment key={idx}>
                                                <option>{statename}</option>
                                            </React.Fragment>
                                        )
                                    })
                                }
                            </select>
                            <small className='text-danger'>
                                {
                                    errors.state && touched.state ? errors.state : "" 
                                }
                            </small>
                        </div>
                        <div className='form-group'>
                            <label>City</label>
                            <select className={'form-control ' + (errors.city && touched.city ? "is-invalid" : "")} onChange={handleChange} name="city" value={values.city || ""} > 
                                <option value="">Select a city</option>
                                {
                                    city.map((x)=>{
                                        return(
                                            <option key={x._id}>{x.name}</option>
                                        )
                                    })
                            }
                            </select>
                            <small className='text-danger'>
                                {
                                    errors.city && touched.city ? errors.city : "" 
                                }
                            </small>
                        </div>
                        <div className='form-group'>
                            <label>Contact</label>
                            <input type="number" name="contact" value={values.contact} className={'form-control ' + (errors.contact && touched.contact ? "is-invalid" : "")} onChange={handleChange}></input>
                            <small className='text-danger'>
                                {
                                    errors.contact && touched.contact ? errors.contact : "" 
                                }
                            </small>
                        </div>
                        <button type="submit" className='btn btn-success'>Update</button>
                        {
                            wrongpass ? (
                                <div className='alert alert-danger my-3'>
                                    password you have entered is wrong ! Please enter correct password !
                                </div>
                            ) : ""
                        }
                    </div>
                </div>
            </form>
        </div>
    </>
  )
}

export default Editdetails