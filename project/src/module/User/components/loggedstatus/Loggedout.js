import React from 'react';
import { NavLink } from 'react-router-dom';

const Loggedout = () => {
  return (
    <>
        <div className="header__top__right__auth">
            <NavLink to="/login"><i className="fa fa-user" aria-hidden="true"></i>Login</NavLink>
        </div>
        <div className="header__top__right__auth ml-3">
            <NavLink to="/signup"><i className="fa fa-lock"></i>SignUp</NavLink>
        </div> 
    </>
  )
}

export default Loggedout