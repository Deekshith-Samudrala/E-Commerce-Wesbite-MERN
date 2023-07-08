import React from 'react';
import { useState,useEffect } from 'react';
import categoryservice from "../../../../../services/Categoryservice";
import Delmodal from "../../../../../constants/Delmodal";
import { useNavigate,useParams } from 'react-router-dom';
import { adminkeyword } from '../../../../../constants/Adminurl';

const CategoryList = () => {

  let navigate = useNavigate();
  let params = useParams();

  let[allcategory,setAllcategory] = useState([]);
  let[selectedcate,setSelectedcate] = useState([]);

  useEffect(()=>{
    if(localStorage.getItem("admintoken")){
      let getcategory = async ()=>{
        let result = await categoryservice.getall();
        setAllcategory(result.info);
      }
      getcategory();
    }
    else{
      navigate(`/admin${adminkeyword}/login`)
    }
  },[])

  let askdelete = (category)=>{
    setSelectedcate(category);
  }

  let askedit = (category)=>{
    navigate(`/admin${adminkeyword}/category/edit/${category._id}`);
  }

  let confdelete = async ()=>{
    await categoryservice.delcate(selectedcate._id);
    setAllcategory((arr)=>{
      return arr.filter((val)=>val != selectedcate);
    }) 
  }

  return (
    <>
      <div className='container my-5'>
        <div className='row'>
          <div className='col-md-8 offset-md-2'>
            { allcategory.length ? 
            <table className='table table-hover table-dark table-striped'>
              <thead>
                <tr>
                  <th>slno</th>
                  <th>Category</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {
                  allcategory.map((category,index)=>{
                    return(
                      <tr key={category._id}>
                        <td>{index + 1}</td>
                        <td>{category.name}</td>
                        <td><button onClick={()=>askedit(category)} className="btn btn-primary btn-sm" >Edit</button></td>
                        <td><button onClick={()=>askdelete(category)} className='btn btn-danger btn-sm' data-toggle="modal" data-target="#delmodal">Delete</button></td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table> :
            <div className='alert alert-danger'>No Data Found !</div>
          }
          </div>
        </div>
      </div>
      <Delmodal dispselectedcate={selectedcate.name} confirmdelete={confdelete}></Delmodal> {/* Used props concept to send data from parent to child */}
    </>
  )
}

export default CategoryList