import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from "yup";
import { adminkeyword } from '../../../../constants/Adminurl';
import Adminservice from '../../../../services/Adminservice';

const Adminchangepassword = () => {

    let navigate = useNavigate();

    let [oldpassbtnreveal,setOldpassbtnreveal] = useState(false);
    let [newpassbtnreveal,setNewpassbtnreveal] = useState(false);
    let [newrepassbtnreveal,setNewrepassbtnreveal] = useState(false);
    let [actualdata,setActualdata] = useState({});
    let [currpin,setCurrpin] = useState("");
    let [dispmsg,setDispmsg] = useState(false);
    let [errtype,setErrtype] = useState(true);
    let [msg,setMsg] = useState("");

    useEffect(()=>{
        if(localStorage.getItem('admintoken')){
            let getadminlogin = async ()=>{
                let result = await Adminservice.getlogindetails(localStorage.getItem('admintoken'));
                setActualdata(result.info);
                setCurrpin(result.info.pin);
            }
            getadminlogin();
        }
        else{
            navigate(`/admin${adminkeyword}/login`);
        }
    },[])

    let changepassschema = yup.object({
        pin : yup.number().required("Enter Pin"),
        oldpass : yup.string().required("Enter old password"),
        newpass : yup.string().required("Enter new password"),
        reenternewpass : yup.string().oneOf([yup.ref("newpass")],"Passwords do not match").required("Re-enter your Password")
    })

    let {handleChange,handleSubmit,errors,touched,values} = useFormik({
        initialValues : {
            pin : currpin ? currpin : "",
            oldpass : "",
            newpass : "",
            reenternewpass : ""
        },
        onSubmit : async (formdata)=>{
            let obj = {formdata : formdata,actualdata : actualdata };
            let result = await Adminservice.updateadminlogin(obj);
            if(result.success){
                localStorage.removeItem("admintoken");
                localStorage.setItem("admintoken",result.info);
                setDispmsg(true);
                setErrtype(true);
                setMsg("Password Changed successfully");
                navigate(`/admin${adminkeyword}`);
            }
            else{
                setDispmsg(true);
                setErrtype(false);
                setMsg("Password Entered is wrong");
            }
        },
        validationSchema : changepassschema,
        enableReinitialize : true
    })

    let oldpass = ()=>{
        if(oldpassbtnreveal){
            setOldpassbtnreveal(false);
        }
        else{
            setOldpassbtnreveal(true);
        }
    }

    let newpass = ()=>{
        if(newpassbtnreveal){
            setNewpassbtnreveal(false);
        }
        else{
            setNewpassbtnreveal(true);
        }
    }

    let newrepass = ()=>{
        if(newrepassbtnreveal){
            setNewrepassbtnreveal(false);
        }
        else{
            setNewrepassbtnreveal(true);
        }
    }

  return (
    <>
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className='row'>
                    <div className='col-md-6 offset-md-3'>
                        <h2 className='text-center my-5'><u>Change Admin Password</u></h2>
                        <div className='formgroup my-3'>
                            <label>Pin</label>
                            {
                                currpin ?
                                (
                                    <input disabled type="text" className='form-control' value={values.pin}></input>
                                ) :
                                (
                                    <>
                                    <input type="number" name="pin" className={'form-control ' + (errors.pin && touched.pin ? "is-invalid" : "")} onChange={handleChange}></input>
                                    <small className='text-danger'>
                                        {
                                            errors.pin && touched.pin ? errors.pin : ""
                                        }  
                                    </small>     
                                    </>
                                )
                            }
                            
                        </div>
                        <div className='formgroup my-3'>
                            <label>Old Password</label>
                            <div className='btn-group btn-block'>
                                <input type={oldpassbtnreveal ? "text" : "password"} name="oldpass" className={'form-control ' + (errors.oldpass && touched.oldpass ? "is-invalid" : "")} onChange={handleChange}></input>
                                <button onClick={oldpass} className={'btn ' + (oldpassbtnreveal ? "btn-danger" : "btn-success")} type="button">{oldpassbtnreveal ? "Hide" : "Show"}</button>
                            </div>
                            <small className='text-danger'>
                                {
                                    errors.oldpass && touched.oldpass ? errors.oldpass : ""
                                }
                            </small>
                        </div>
                        <div className='formgroup my-3'>
                            <label>New Password</label>
                            <div className='btn-group btn-block'>
                                <input  type={newpassbtnreveal ? "text" : "password"} name="newpass" className={'form-control ' + (errors.newpass && touched.newpass ? "is-invalid" : "")} onChange={handleChange}></input>
                                <button onClick={newpass} type="button" className={'btn ' + (newpassbtnreveal ? "btn-danger" : "btn-success")}>{newpassbtnreveal ? "Hide" : "Show"}</button>
                            </div>
                            <small className='text-danger'>
                                {
                                    errors.newpass && touched.newpass ? errors.newpass : ""
                                }
                            </small>
                        </div>
                        <div className='fromgroup my-3'>
                            <label>Re-enter New Password</label>
                            <div className='btn-group btn-block'>
                                <input type={newrepassbtnreveal ? "text" : "password"} name='reenternewpass' className={'form-control ' + (errors.reenternewpass && touched.reenternewpass ? "is-invalid" : "")} onChange={handleChange}></input>
                                <button onClick={newrepass} type="button" className={'btn ' + (newrepassbtnreveal ? "btn-danger" : "btn-success")}>{newrepassbtnreveal ? "Hide" : "Show"}</button>
                            </div>
                            <small className='text-danger'>
                                {
                                    errors.reenternewpass && touched.reenternewpass ? errors.reenternewpass : ""
                                }
                            </small>
                        </div>
                        <button type="submit" className='btn btn-primary my-2'>Change</button>
                        <div className='my-4'>
                            {
                                dispmsg ? (
                                    <div className={'alert ' + (errtype ? "alert-success" : "alert-danger")}>{msg}</div>
                                ) : (
                                    ""
                                )
                            }
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </>
  )
}

export default Adminchangepassword