import React from 'react';
import { NavLink } from 'react-router-dom';

const Loggedin = () => {
  return (
    <>
        <div className="header__top__right__auth">
            <NavLink to="/profile"><i className="fa fa-user-circle-o" aria-hidden="true"></i>Profile</NavLink>
        </div>
        <div className="header__top__right__auth ml-3">
            <NavLink to="/logout"><i className="fa fa-sign-out" aria-hidden="true"></i>Logout</NavLink>
        </div>
    </>
  )
}

export default Loggedin