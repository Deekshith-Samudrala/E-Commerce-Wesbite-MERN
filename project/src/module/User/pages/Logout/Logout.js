import React from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {login,logout} from "../../../../Redux/Userauthslice";
import { useEffect } from 'react';
import { emptycartonlogout } from '../../../../Redux/Cartslice';

const Logout = () => {
  
    let disp = useDispatch();

    useEffect(() => {
      localStorage.removeItem('token');
      disp(logout());
      disp(emptycartonlogout())
    }, []);

    return (
    <Navigate to="/login"></Navigate>
  )
}

export default Logout