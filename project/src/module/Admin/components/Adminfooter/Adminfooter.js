import React, { useState } from 'react';
import { useEffect } from 'react';
import Adminservice from '../../../../services/Adminservice';

const Adminfooter = () => {
  
    let [pin,setPin] = useState('');

    useEffect(()=>{
        let getadmindetails = async ()=>{
            let token = localStorage.getItem("admintoken");
            let result = await Adminservice.getlogindetails(token);
            setPin(result.info.pin);
        }
        getadmindetails();
    })

    return (
        <>
            <div className='text-center h3 text-secondary'>Logged into Admin - <b>{pin}</b></div>
        </>
    )
}

export default Adminfooter