import React, { useEffect, useState } from 'react';
import Topbar from '../../components/topbar/Topbar';
import Productbox from '../../components/Productbox/Productbox';
import Productservice from "../../../../services/Productservice";
import Categoryservice from "../../../../services/Categoryservice";
import { NavLink, useParams } from 'react-router-dom';
import Longdispprod from '../../components/2Longdisplayproduct/Longdispprod';

const Home = () => {

    let params = useParams();
    let [product,setProduct] = useState([]);
    let [cate,setCate] = useState([]);
    let [dispcartfull,setDispcartfull] = useState(false);

    useEffect(()=>{
        let getproducts = async ()=>{
            if(params.categoryid && params.categoryid != "all"){   
                let result = await  Productservice.getproductbycategory(params.categoryid);
                setProduct(result.info);
            }
            else if(params.subcategoryid){
                let result = await Productservice.getproductbysubcategory(params.subcategoryid);
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

    let dispcartfullalert = ()=>{
        window.scrollTo({
            top : 400,
            behavior : "smooth"
        })
        setDispcartfull(true);
    }

  return (
    <>
        <Topbar></Topbar>
        <section className="featured spad">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="section-title">
                        <h2>Products</h2>
                    </div>
                    <div className="featured__controls">
                        <ul>
                            <li><NavLink to={`/product/cate/all`}>All</NavLink></li>
                            {
                                cate.map((cate)=>{
                                    return <React.Fragment key={cate._id}><li><NavLink to={`/product/cate/${cate._id}`}>{cate.name}</NavLink></li></React.Fragment>
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
            {
                dispcartfull ? (
                    <div className='alert alert-danger text-center mb-5'>CART IS FULL !</div>
                ) : ""
            }
            <div className="row featured__filter">
                {   product.length ? 
                    product.map((product,index)=>{
                        return (
                            <Productbox key={index} data={product} location={"Home"} dispcartalert={dispcartfullalert}></Productbox>
                        )
                    }) : (
                        <div className='container-fluid text-center'>
                            <div className='alert alert-danger'>No Products to display, we are working on adding more products in this category ! Happy Shopping !</div>
                        </div>
                    )
                }
            </div>
        </div>
    </section>
    <Longdispprod></Longdispprod>
    </>
  )
}

export default Home