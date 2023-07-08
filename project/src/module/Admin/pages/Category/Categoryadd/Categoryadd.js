import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useNavigate,useParams } from 'react-router-dom';
import categoryservice from "../../../../../services/Categoryservice";
import { adminkeyword } from '../../../../../constants/Adminurl';

const Categoryadd = () => {

  let navigate = useNavigate();
  let params = useParams();

  let [title,setTitle] = useState("Add New");
  let [submitbtn,setSubmitbtn] = useState("Add");
  let [name,setName] = useState("");

  useEffect(()=>{
    if(localStorage.getItem("admintoken")){
      if(params.cateid){
        setTitle("Update");
        setSubmitbtn("Update");
        let call = async ()=>{
          let result = await categoryservice.getcate(params.cateid);
          setName(result.info[0].name);
        }
        call();
      }
    }
    else{
      navigate(`/admin${adminkeyword}/login`)
    }
  },[])

  const categoryschema = Yup.object({
    name : Yup.string().required("Enter the category name")
})


let {handleSubmit,handleChange,errors,touched,values} = useFormik({
    initialValues : {name : name},
    onSubmit : async (formdata)=>{
      if(params.cateid){
        let result = await categoryservice.updatecate(params.cateid,formdata);
        navigate(`/admin${adminkeyword}/category/list`);
      }
      else{
        let result = await categoryservice.addcate(formdata);
        navigate(`/admin${adminkeyword}/category/list`);
      }
    },
    validationSchema : categoryschema,
    enableReinitialize : true
});
  
  return (
    <>
      <div className="container my-5">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <h4 className="text-center">{title} category</h4>
              <div className='form-group'>
                <label>Category</label>
                <input value={values.name} onChange={handleChange} name="name" type="text" className={'form-control ' + (errors.name && touched.name ? "is-invalid" : "")}></input>
                  <small className='text-danger'> 
                    {(errors.name && touched.name) ? errors.name : ""} 
                  </small>
              </div>
              <br/>
              <button type="submit" className="btn btn-primary">{submitbtn}</button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default Categoryadd