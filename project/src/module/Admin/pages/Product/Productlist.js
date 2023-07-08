import React, { useEffect, useState } from 'react';
import Productservice from '../../../../services/Productservice';
import categoryservice from "../../../../services/Categoryservice";
import Delmodal from '../../../../constants/Delmodal';
import { useNavigate } from 'react-router-dom';
import { adminkeyword } from '../../../../constants/Adminurl';

const Productlist = () => {

  let navigate = useNavigate();

  let [product,setProduct] = useState([]);
  let [cate,setCate] = useState([]); 
  let [subcate,setSubcate] = useState([]);
  let [cateid,setCateid] = useState("");
  let [subcateid,setSubcateid] = useState("");
  let [selectedproduct,setSelectedproduct] = useState("");

  useEffect(()=>{
    if(localStorage.getItem("admintoken")){
      let getcate = async ()=>{
        let result = await categoryservice.getall();
        setCate(result.info);
      }
      getcate();
    }
    else{
      navigate(`/admin${adminkeyword}`);
    }
  },[])

  let getsubcate = async (e)=>{
    if(e.target.value != "101"){
    setCateid(e.target.value);
    let result = await categoryservice.getcate(e.target.value);
    setSubcate(result.info[0].subcategory);}
    else{
      setCateid("");
      setSubcate([]);
    }
  }

  let getsubcateid = async (e)=>{
    if(e.target.value != "101"){
    setSubcateid(e.target.value);
    let getproduct = async ()=>{
      let result = await Productservice.getproducts(cateid,e.target.value);
      setProduct(result.info);
    }
    getproduct();}
    else{
      setSubcateid("");
    }
  }

  let setproduct = (e)=>{
    setSelectedproduct(e);
  }

  let confdelete = async ()=>{
    let result = await Productservice.Deletebyname(selectedproduct);
    setProduct((arr)=>{
      return arr.filter((val)=>val != selectedproduct);
    });
  }

  let askedit = (product)=>{
    navigate(`/admin${adminkeyword}/product/edit/${product._id}`);
  }

  return (
    <>
      <div className='container-fluid my-5'>
        <div className='row'>
          <div className='col-md-6 offset-md-3'>
            <h3 className='text-center mb-4 mt-2'>Select Category</h3>
            <select className='form-control' onChange={(e)=>{getsubcate(e)}}>
              <option value="101">Select a Category</option>
              {
                cate.map((cate)=><option value={cate._id} key={cate._id}>{cate.name}</option>)
              }
            </select>
            <select className='form-control my-5' onChange={(e)=>getsubcateid(e)}>
              <option value="101">Select Sub-Category</option>
              {
                subcate.map((subcate)=>{
                  return(
                    <option value={subcate._id} key={subcate._id}>{subcate.name}</option>
                  )
                })
              }
            </select>
          </div>
          <div className='col-md-10 offset-md-1'>
            {cateid.length ? (
              subcateid.length ? (
                <div>
                  <h3 className='text-center mb-4 mt-2'>Product List</h3>
                  {product.length ? (
                    <table className='table table-dark table-hover'>
                      <thead>
                        <tr>
                          <th>slno</th>
                          <th>Name</th>
                          <th>Price</th>
                          <th>Details</th>
                          <th>Category</th>
                          <th>Sub-Category</th>
                          <th>Quantity</th>
                          <th>Discount</th>
                          <th>Edit</th>
                          <th>Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {product.map((product, idx) => {
                          return (
                            <tr key={idx}>
                              <td>{idx + 1}</td>
                              <td>{product.title}</td>
                              <td>{product.price}</td>
                              <td>{product.details}</td>
                              <td>{product.category}</td>
                              <td>{product.subcategory}</td>
                              <td>{product.quantity}</td>
                              <td>{product.discount}</td>
                              <td><button className='btn btn-primary btn-sm' onClick={()=>askedit(product)} >Edit</button></td>
                              <td><button className='btn btn-danger btn-sm' data-toggle="modal" data-target="#delmodal" onClick={()=>setproduct(product)}>Delete</button></td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  ) : (
                    <div className='alert alert-danger'>No Data Found !</div>
                  )}
                </div>
              ) : <div className='alert alert-primary'>Please select a sub-category</div>
            ) : (   
              <div className='alert alert-secondary'>Please select a category</div>
            )}
          </div>
        </div>
      </div>
      <Delmodal dispselectedcate={selectedproduct.title} confirmdelete={confdelete}></Delmodal>
    </>
  )
}

export default Productlist