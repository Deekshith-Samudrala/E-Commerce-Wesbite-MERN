import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useNavigate,useParams } from 'react-router-dom';
import categoryservice from "../../../../services/Categoryservice"
import { adminkeyword } from '../../../../constants/Adminurl';

const Subcategoryadd = () => {

  let navigate = useNavigate();
  let params = useParams();

  let [allcategory,setAllcategory] = useState([]);
  let [title,setTitle] = useState("Add new");
  let [updtsubcateselect,setUptdsubcateselect] = useState("");
  let [updtbtn,setUpdtbtn] = useState("Add");
  let [selectedcatename,setSelectedcatename] = useState("");
  let [tobeupdtsubcate,setTobeupdtsubcate] = useState("");

  useEffect(()=>{
    if(localStorage.getItem("admintoken")){
      if(params.cateid){
        setTitle("Update");
        setUptdsubcateselect("Update");
        setUpdtbtn("Update");

        let getcatename = async ()=>{
          let result = await categoryservice.getcate(params.cateid);
          let name = result.info[0].name;
          setSelectedcatename(name);
        }
        getcatename();

        let getsubcatename = async ()=>{
          let result = await categoryservice.getsubcate(params.cateid,params.subcateid);
          let name = result.info.subcategory[0].name;
          setTobeupdtsubcate(name); // to populate the subcate input which needs to be updated.
        }
        getsubcatename();
      }
      else{
        let getallcategory = async ()=>{ // populating category select option
          let result = await categoryservice.getall();
          setAllcategory(result.info);
        }
        getallcategory();
      }
    }
    else{
      navigate(`/admin${adminkeyword}`);
    }
  },[])

  const subcategoryschema = Yup.object({
    category : Yup.string().required("Select the Sub-Category"),
    name : Yup.string().required("Enter the Sub-Category name")
  })

  let {handleChange,handleSubmit,touched,errors,values} = useFormik({
    initialValues : {
      category : selectedcatename,
      name : tobeupdtsubcate
    },
    onSubmit : async (formdata)=>{
      if(params.cateid){
        let result = await categoryservice.updatesubcate(params.cateid,params.subcateid,formdata);
        navigate(`/admin${adminkeyword}/subcategory/list`);
      }
      else{
        let result = await categoryservice.addsubcate(formdata);
        navigate(`/admin${adminkeyword}/subcategory/list`);
      }
    },
    validationSchema : subcategoryschema,
    enableReinitialize : true
  })

  return (
    <>
      <div className='container my-5'>
        <form onSubmit={handleSubmit}>
          <div className='row'>
            <div className='col-md-6 offset-md-3'>
              <h4 className="text-center">{title} Sub-Category</h4>
                <div className='form-group'>
                  <label>Select Category</label>
                  {
                    allcategory.length ? 
                    (
                      <select onChange={handleChange} name="category" className={'form-control ' + (errors.category && touched.category ? "is-invalid" : "")}>
                        <option value="">Select Sub-Category</option>  
                        {
                          allcategory.map((cate,index)=>{
                            return(
                              <option key={cate._id}>{cate.name}</option>
                            )
                          })
                        }
                      </select>
                    ) :
                    (
                      <input disabled value={values.category} onChange={handleChange} name="category" className={'form-control ' + (errors.category && touched.category ? "is-invalid" : "")} ></input>
                    )
                  }
                  <small className='text-danger'>
                    {(errors.category && touched.category) ? errors.category : ""}
                    </small>
                </div>
                <div className='form-group'>
                  <label>{updtsubcateselect} Sub-Category</label>
                  <input value={values.name} type="text" onChange={handleChange} name="name" className={'form-control ' + (errors.name && touched.name ? "is-invalid" : "")}></input>
                  <small className='text-danger'>
                    {
                      (errors.name && touched.name ? errors.name : "")
                    }
                  </small>
                </div>
                <button type="submit" className='btn btn-secondary'>{updtbtn}</button>
            </div>  
          </div>
        </form>  
      </div>  
    </>
  )
}

export default Subcategoryadd