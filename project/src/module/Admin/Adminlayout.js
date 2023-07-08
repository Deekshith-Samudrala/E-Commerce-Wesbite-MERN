import React from 'react';
import { Outlet } from 'react-router-dom';
import Adminfooter from "../Admin/components/Adminfooter/Adminfooter";
import Adminheader from '../Admin/components/Adminheader/Adminheader';

let Adminlayout = ()=>{

    return(
      <>
        <Adminheader></Adminheader>
        <div style={{minHeight : "700px"}}>
              <Outlet></Outlet>
        </div>
        <Adminfooter></Adminfooter>
      </>
    )
  }

export default Adminlayout