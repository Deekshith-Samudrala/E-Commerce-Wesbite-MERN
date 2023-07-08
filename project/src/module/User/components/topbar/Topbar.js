import React,{useState,useEffect} from 'react';
import Categoryservice from "../../../../services/Categoryservice";
import { NavLink } from 'react-router-dom';

const Topbar = () => {

  let [cate,setCate] = useState([]);

  useEffect(()=>{
    let getcate = async ()=>{
        let result = await Categoryservice.getall();
        setCate(result.info);
    }
    getcate();
    },[])

  let scrolltoproduct = ()=>{
    window.scrollTo({
        top : 580,
        behavior : "smooth"
    })
}

  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="hero__categories">
                <div className="hero__categories__all" >
                  <i className="fa fa-bars"></i>
                  <span>All departments</span>
                </div>
                <ul >
                  {
                    cate.map((cate,index)=>{
                        return(
                          <React.Fragment key={index}>
                            <li><NavLink to={`/product/cate/${cate._id}`}><button onClick={scrolltoproduct} className='btn site-btn btn-hover button-no-outline'>{cate.name}</button></NavLink></li>
                          </React.Fragment>
                        )
                    })
                  }
                </ul>
              </div>
            </div>
            <div className="col-lg-9">
              <div className="hero__item set-bg" style={{backgroundImage:"url('/assets/img/hero/banner.jpg')"}} data-setbg="/assets/img/hero/banner.jpg">
                <div className="hero__text">
                  <span> FRESH FRUITS  </span>
                  <h2>Vegetables <br />100% Organic</h2>
                  <p>Free Pickup and Delivery Available</p>
                  </div>
                </div>
              </div>
            </div>
         </div>
        </section>
    </>
  );
}

export default Topbar;