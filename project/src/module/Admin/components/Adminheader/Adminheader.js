import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { adminkeyword } from '../../../../constants/Adminurl';
import "./Adminheadercss.css";

const Adminheader = () => {

    let navigate = useNavigate();

    let adminlogout = ()=>{
        localStorage.removeItem("admintoken");
        navigate(`/admin${adminkeyword}/login`);
    }

  return (
    <>
        <div className="container-fluid">
            <nav className="navbar navbar-dark bg-dark navbar-expand-xl p-3">
                <NavLink className="navbar-brand" to={`/admin${adminkeyword}`}>Admin</NavLink>
                <ul className="navbar-nav">
                    <li className="nav-item px-2">
                        <NavLink className="nav-link" to={`/admin${adminkeyword}`}>Dashboard</NavLink>
                    </li>
                    <li className='nav-item dropdown px-2'>
                        <NavLink className="nav-link dropdown-toggle" data-toggle="dropdown">Users</NavLink>
                        <div className='dropdown-menu'>
                            <NavLink className="dropdown-item" to={`/admin${adminkeyword}/user/list`}>UserList</NavLink>
                        </div>
                    </li>
                    <li className="nav-item dropdown px-2">
                        <NavLink className="nav-link dropdown-toggle" data-toggle="dropdown" >Product</NavLink>
                        <div className="dropdown-menu">
                        <NavLink className="dropdown-item" to={`/admin${adminkeyword}/product/add`}>ProductAdd</NavLink>
                            <NavLink className="dropdown-item" to={`/admin${adminkeyword}/product/list`}>ProductList</NavLink>
                        </div>
                    </li>
                    <li className="nav-item dropdown px-2">
                        <NavLink className="nav-link dropdown-toggle" data-toggle="dropdown" >Category</NavLink>
                        <div className="dropdown-menu">
                            <NavLink className="dropdown-item" to={`/admin${adminkeyword}/category/add`}>Categoryadd</NavLink>
                            <NavLink className="dropdown-item" to={`/admin${adminkeyword}/category/list`}>CategoryList</NavLink>
                        </div>
                    </li>
                    <li className='nav-item dropdown px-2'>
                        <NavLink className="nav-link dropdown-toggle" data-toggle="dropdown">Sub-Category</NavLink>
                        <div className='dropdown-menu'>
                            <NavLink className="dropdown-item" to={`/admin${adminkeyword}/subcategory/add`}>Sub-Categoryadd</NavLink>
                            <NavLink className="dropdown-item" to={`/admin${adminkeyword}/subcategory/list`}>Sub-CategoryList</NavLink>
                        </div>
                    </li>
                </ul>
                <button onClick={adminlogout} className='btn btn-danger ml-auto mr-5'>logout</button>
            </nav>
        </div>
    </>
  )
}

export default Adminheader