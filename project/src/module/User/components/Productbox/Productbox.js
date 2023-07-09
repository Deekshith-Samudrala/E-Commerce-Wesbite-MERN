import React, { useEffect, useState } from 'react';
import Productaddmodal from '../../../../constants/Productaddmodal';
import { useDispatch, useSelector } from 'react-redux';
import { cartadd } from '../../../../Redux/Cartslice';
import { useNavigate } from 'react-router-dom';
import Randomstring from 'randomstring';

const Productbox = ({data,location,dispcartalert}) => {

    let disp = useDispatch();
    let navigate = useNavigate();
    let [productname,setProductname] = useState("")
    let [login,setLogin] = useState(false);
    let [productloc,setProductloc] = useState("");

    let cartitems = useSelector(state=>state.Cartslice);

    useEffect(()=>{
        if(localStorage.getItem("token")){
            setLogin(true)
        }
        else{
            setLogin(false);
        }
        if(location == "Home"){
            setProductloc("homeproduct");
        }
        if(location == "Shop"){
            setProductloc("shopproduct");
        }
    },[])

    let modalname = (name)=>{
        if(login){
            if(cartitems.length == 15){
                dispcartalert();
            }
            else{
                let itemunqid = Randomstring.generate();
                data.unqid = itemunqid;
                console.log(data);
                disp(cartadd(data));
                setProductname(name);
            }
        }
        else{
            window.scrollTo({
                top : 0,
                behavior : "smooth"
            })
            navigate("/login");
        }
    }

    let resetname = ()=>{
        setProductname("");
    }

  return (
    <>
        <div className="col-lg-3 col-md-4 col-sm-6 mix oranges fresh-meat">
            <div className="featured__item">
                <div className={`${productloc}` + " featured__item__pic set-bg"} style={{backgroundImage : `url(http://localhost:3001/Uploads/${data.image})`}}>
                    <ul className="featured__item__pic__hover">
                        <li><button className='btn btn-dark' onClick={()=>modalname(data.title)} data-toggle={ cartitems.length < 16 ? "modal" : ""} data-target="#productmodal"><i className="fa fa-shopping-cart"></i></button></li>
                    </ul>
                </div>
                <div className="featured__item__text">
                    <h6><a className="my-5" href="#"><b>{data.title}</b></a></h6>   
                    <h6><del>&#8377;{data.price.toFixed(2)}</del></h6>
                    {
                        location == "Home" ? (
                            <h4>&#8377;{(data.price - ((data.price*data.discount)/100)).toFixed(2)}</h4>
                        ) : (
                            <h5>&#8377;{(data.price - ((data.price*data.discount)/100)).toFixed(2)}</h5>
                        )
                    }
                    
                </div>
            </div>
        </div>
        {productname && <Productaddmodal name={productname} reset={resetname}/>}
    </>
  )
}

export default Productbox