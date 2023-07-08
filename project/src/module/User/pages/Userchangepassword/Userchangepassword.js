import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from "yup";
import Profileservice from '../../../../services/Profileservice';
import { useNavigate } from 'react-router-dom';
import Userservice from '../../../../services/Userservice';

const Userchangepassword = () => {

    let navigate = useNavigate();

    let [oldpassreveal,setOldpassreveal] = useState(false);
    let [newpassreveal,setNewpassreveal] = useState(false);
    let [renewpassreveal,setRenewpassreveal] = useState(false);
    let [useremail,setUseremail] = useState("");
    let [userid,setUserid] = useState();
    let [dispmsg,setDispmsg] = useState(false);

    useEffect(()=>{
        if(localStorage.getItem("token")){
            let token = localStorage.getItem("token");
            let getdata = async(token)=>{
                let result = await Profileservice.getuserprofiledata(token);
                setUserid(result.info._id);
                setUseremail(result.info.email);
            }
            getdata(token);
          }
        else{
            navigate("/login");
        }
    },[])

    let Userchangepassschema = yup.object({
        password : yup.string().required("Enter your Current password"),
        newpass : yup.string().required("Enter you New Password"),
        renewpass : yup.string().oneOf([yup.ref("newpass")],"Passwords do not match").required("Re Enter your Password")
    });

    let {handleChange,handleSubmit,errors,touched,values} = useFormik({
        initialValues : {
            email : useremail ? useremail : "",
            password : "",
            newpass : "",
            renewpass : ""
        },
        onSubmit : async (formdata)=>{
            let result = await Userservice.updatepassword(formdata,userid);
            if(result.success){
                navigate("/logout");
            }
            else{
                setDispmsg(true);
            }
        },
        validationSchema : Userchangepassschema,
        enableReinitialize : true
    })

    let oldpassbtn = ()=>{
        if(oldpassreveal){
            setOldpassreveal(false);
        }
        else{
            setOldpassreveal(true);
        }
    }
    let newpassbtn = ()=>{
        if(newpassreveal){
            setNewpassreveal(false);
        }
        else{
            setNewpassreveal(true);
        }
    }
    let renewpassbtn = ()=>{
        if(renewpassreveal){
            setRenewpassreveal(false);
        }
        else{
            setRenewpassreveal(true);
        }
    }

  return (
    <>
        <div className='Toppagename container-fluid'>
            <h4 className="mb-5">Change Password</h4>
        </div>
        <div className='container'>
            <form onSubmit={handleSubmit}>
            <div className='row'>
                <div className='col-md-6 offset-md-3'>
                    <div className='form-group my-4'>
                        <label>E-Mail</label>
                        <input disabled type="text" className={'form-control ' + (errors.name && touched.name ? "is-invalid" : "" )} onChange={handleChange} name="name" value={values.email}></input>
                    </div>
                    <div className='form-group my-4'>
                        <label>Current Password</label>
                        <div className='btn-group btn-block'>
                            <input type={oldpassreveal ? "text" : "password"} name="password" className={'form-control ' + (errors.password && touched.password ? "is-invalid" : "")} onChange={handleChange}></input>
                            <button type="button" onClick={()=>oldpassbtn()} className={'btn ' + (oldpassreveal ? "btn-danger" : "btn-primary")}>{oldpassreveal ? "Hide" : "Show"}</button>
                        </div>
                        <small className='text-danger'>
                            {
                                errors.password && touched.password ? errors.password : ""
                            }
                        </small>
                    </div>
                    <div className='form-group my-4'>
                        <label>New Password</label>
                        <div className='btn-group btn-block'>
                            <input type={newpassreveal ? "text" : "password"} name="newpass" className={'form-control ' + (errors.newpass && touched.newpass ? "is-invalid" : "")} onChange={handleChange}></input>
                            <button type="button" onClick={()=>newpassbtn()} className={'btn ' + (newpassreveal ? "btn-danger" : "btn-primary")}>{newpassreveal ? "Hide" : "Show"}</button>
                        </div>
                        <small className='text-danger'>
                            {
                                errors.newpass && touched.newpass ? errors.newpass : ""
                            }
                        </small>
                    </div>
                    <div className='form-group my-4'>
                        <label>Re Enter New Password</label>
                        <div className='btn-group btn-block'>
                            <input type={renewpassreveal ? "text" : "password"} name="renewpass" className={'form-control ' + (errors.renewpass && touched.renewpass ? "is-invalid" : "")} onChange={handleChange}></input>
                            <button type="button" onClick={()=>renewpassbtn()} className={'btn ' + (renewpassreveal ? "btn-danger" : "btn-primary")}>{renewpassreveal ? "Hide" : "Show"}</button>
                        </div>
                        <small className='text-danger'>
                            {
                                errors.renewpass && touched.renewpass ? errors.renewpass : ""
                            }
                        </small>
                    </div>
                    <button type="submit" className='btn btn-success'>Update</button>
                    <div className='my-4'>
                            {
                                dispmsg ? (
                                    <div className='alert alert-danger'>Password entered is wrong</div>
                                ) : ""
                            }
                        </div>
                </div>
            </div>
            </form>
        </div>
    </>
  )
}

export default Userchangepassword