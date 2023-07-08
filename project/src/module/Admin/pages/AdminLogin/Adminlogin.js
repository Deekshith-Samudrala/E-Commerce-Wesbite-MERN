import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from "yup";
import Adminservice from '../../../../services/Adminservice';
import { useNavigate } from 'react-router-dom';
import { adminkeyword } from '../../../../constants/Adminurl';

const Adminlogin = () => {

    let navigate = useNavigate();

    let [err,setErr] = useState(false);
    let [errmessage,setErrmessage] = useState("");
    let [btnname,setBtnname] = useState("Show");
    let [passtype,setPasstype] = useState("password");
    let [revealed,setRevealed] = useState(false);

    useEffect(()=>{
      if(localStorage.getItem("admintoken")){
        navigate(`/admin${adminkeyword}/`);
      }
    })

    let adminloginschema = Yup.object(({
        pin : Yup.number().required("Enter your Pin"),
        password : Yup.string().required("Enter your Password")
      }))
  
      let {handleChange,handleSubmit,errors,touched} = useFormik({
        initialValues : {
          pin : "",
          password : ""
        },
        onSubmit : async (formdata)=>{
          let result = await Adminservice.checklogin(formdata);
          if(result.success){
            let result = await Adminservice.checklogin(formdata);
            localStorage.setItem("admintoken",result.token);
            navigate(`/admin${adminkeyword}`);
          }
          else{
            if(result.err == 1){
              setErr(true)
              setErrmessage("You have Entered the wrong password");
            }
            else{
              setErr(true)
              setErrmessage("PIN is not recognized");
            }
          }
        },
        validationSchema : adminloginschema
      })

      let revealbtnclick = ()=>{
        if(passtype == "password"){
          setPasstype("text");
          setBtnname("Hide");
          setRevealed(true);
        }
        else{
          setPasstype("password")
          setBtnname("Show");
          setRevealed(false);
        }
      }

  return (
    <>
        <div className='container my-5'>
          <form onSubmit={handleSubmit}>
            <div className='row'>
              <div className='col-md-6 offset-md-3'>
                <h3 className='text-center mb-4 mt-3'>Admin Login</h3>
                <div className='formgroup'>
                  <label>Pin</label>
                  <input type="number" onChange={handleChange} name="pin" className={'form-control ' + (errors.pin && touched.pin ? "is-invalid" : "")}></input>
                  <small className='text-danger'>
                    {errors.pin && touched.pin ? errors.pin : ""}
                  </small>
                </div>
                <div className='formgroup my-3'>
                  <label>Password</label>
                  <div className='btn-group btn-block'>
                    <input type={passtype} name="password" onChange={handleChange} className={'form-control ' + (errors.password && touched.password ? "is-invalid" : "")}></input>
                    <button className={'btn '+ (revealed ? 'btn-danger' : 'btn-primary')} type="button" onClick={revealbtnclick}>{btnname}</button>
                  </div>
                  <small className='text-danger'>
                    {errors.password && touched.password ? errors.password : ""}
                  </small>
                </div>
                <button type="submit" className='btn btn-success my-3'>Login</button>
                {
                  err ? 
                  (<div className='alert alert-danger my-3'>
                  {
                    errmessage
                  }
                  </div>) : ""
                }
                
              </div>
            </div>
          </form>
        </div>
    </>
  )
}

export default Adminlogin