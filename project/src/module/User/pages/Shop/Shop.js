import React, { useEffect, useState } from 'react';
import Categoryservice from "../../../../services/Categoryservice";
import { NavLink,useParams } from 'react-router-dom';
import Productservice from '../../../../services/Productservice';
import Productbox from '../../components/Productbox/Productbox';
import { useSelector } from 'react-redux/es/hooks/useSelector';

const Shop = () => {

    let params = useParams();

    let [cate,setCate] = useState([]);
    let [subcate,setSubcate] = useState([]);
    let [product,setProduct] = useState([]);
    let [dispcartfull,setDispcartfull] = useState(false);
    
    useEffect(()=>{
        let getproducts = async ()=>{
            if(params.subcateid){   
                let result = await Productservice.getproductbysubcategory(params.subcateid); 
                setProduct(result.info);
            }
            else if(params.cateid && params.cateid != "all"){
                let result = await Productservice.getproductbycategory(params.cateid);
                setProduct(result.info);
            }
            else{
                let result = await Productservice.getall();
                setProduct(result.info);
            }

            let getcate = async ()=>{
                let result = await Categoryservice.getall();
                setCate(result.info);
            }
            getcate();
         }
         getproducts();
    },[params])

    let getsubcate = async (id)=>{
        let result = await Categoryservice.getcate(id);
        setSubcate(result.info[0].subcategory);
    }

    let dispcartfullalert = ()=>{
        window.scrollTo({
            top : 10,
            behavior : "smooth"
        })
        setDispcartfull(true);
    }

  return (
    <>
        <div className='Toppagename container-fluid'>
            <h4 className="mb-5">Shop</h4>
        </div>
        <div className='container my-4'>
            {
                dispcartfull ? (
                    <div className='alert alert-danger text-center mb-4'>CART IS FULL !</div>
                ) : ""
            }
            <div className='row'>
                <div className='col-md-4'>
                    <div className="sidebar">
                        <div className="sidebar__item">
                            <h4><u>Categories</u></h4>
                            <ul className='border-bottom pl-3 pb-3'>
                                <li><NavLink to={`/shop/${"all"}`}>All</NavLink></li>
                                {
                                    cate.map((cate)=>{
                                        return (
                                            <li key={cate._id}><NavLink to={`/shop/${cate._id}`} onClick={()=>getsubcate(cate._id)}>{cate.name}</NavLink></li>
                                        )
                                    })
                                }
                            </ul>
                            {
                                subcate.length ? (
                                    <div>
                                        <h5 className='pt-3 pb-3'><u>Sub-Categories</u></h5>
                                        <ul className='border-bottom pl-3 pb-3'>
                                        {
                                            subcate.map((subcate)=>{
                                                return (
                                                    <li><NavLink to={`/shop/cate/${subcate._id}`}>{subcate.name}</NavLink></li>
                                                )
                                            })
                                        }
                                        </ul>
                                    </div>
                                ) : ""
                            }
                        </div>
                    </div>
                </div>
                <div className='col-md-8'>
                    <div className="row featured__filter">
                        {   product.length ? 
                            product.map((product,index)=>{
                                return (
                                    <Productbox key={index} data={product} location={"Shop"} dispcartalert={dispcartfullalert}></Productbox>
                                )
                            }) : (
                                <div className='container-fluid text-center'>
                                    <div className='alert alert-danger'>No Products to display, we are working on adding more products in this category ! Happy Shopping !</div>
                                </div>
                            )
                        }
                    </div>  
                </div>
            </div>
        </div>
    </>
  )
}

export default Shop