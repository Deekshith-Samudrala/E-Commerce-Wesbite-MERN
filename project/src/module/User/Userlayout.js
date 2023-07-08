import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../User/components/header/header';
import Footer from '../User/components/footer/Footer';

let Userlayout = ()=>{
    return(
      <>
        <Header></Header>
        <div style={{minHeight : "700px"}}>
              <Outlet></Outlet>
        </div>
        <Footer></Footer>
      </>
    )
  }

export default Userlayout