import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { adminkeyword } from '../../../../constants/Adminurl';
import Categoryserivce from "../../../../services/Categoryservice";
import Productservice from '../../../../services/Productservice';
import Userservice from '../../../../services/Userservice';

const Dashboard = () => {

    let navigate = useNavigate();

    let [cate,setCate] = useState([]);
    let [product,setProduct] = useState([]);
    let [subcatenumber,setSubcatenumber] = useState();
    let [users,setUsers] = useState([]);

    useEffect(()=>{
        if(localStorage.getItem("admintoken")){
            let getcate = async()=>{
                let result = await Categoryserivce.getall();
                setCate(result.info);
                let totalsubcate = 0;
                result.info.forEach((cate)=>{
                    totalsubcate += cate.subcategory.length;
                })
                setSubcatenumber(totalsubcate);
            }
            getcate();
            
            let getproduct = async()=>{
                let result = await Productservice.getall();
                setProduct(result.info);
            }
            getproduct();

            let getusers = async ()=>{
                let result = await Userservice.getallusersdata();
                setUsers(result.info);
            }
            getusers();
        }
        else{
        navigate(`/admin${adminkeyword}/login`)
        }
    },[])

    let changepass = ()=>{
        navigate(`/admin${adminkeyword}/changepass`);
    }

    let usercount = 0;
    
    users.map((user)=>{
        usercount += 1;
    })

    return (
        <>
        <div className='text-center my-5'><h3><b><u>Welcome to Dashboard</u></b></h3></div>
        <div className='row'>
            <div className='col-md-6 offset-md-3'>
                <table className='table table-dark table-hover table-striped'>
                    <thead></thead>
                    <tbody>
                        <tr>
                            <td><h5 className='my-3 text-light text-center'>Click here to change password</h5></td>
                            <td style={{display : "flex",justifyContent : "center"}}><button className='btn btn-danger mt-2' onClick={changepass}>Change Password</button></td>
                        </tr>
                        <tr>
                            <td><h5 className='my-3 text-light text-center'>No of Categories</h5></td>
                            <td><h5 className='my-3 text-light text-center'>{cate.length}</h5></td>
                        </tr>
                        <tr>
                            <td><h5 className='my-3 text-light text-center'>No of Sub-Categories</h5></td>
                            <td><h5 className='my-3 text-light text-center'>{subcatenumber}</h5></td>
                        </tr>
                        <tr>
                            <td><h5 className='my-3 text-light text-center'>Total No of Products</h5></td>
                            <td><h5 className='my-3 text-light text-center'>{product.length}</h5></td>
                        </tr>
                        <tr>
                            <td><h5 className='my-3 text-light text-center'>Total No of Users</h5></td>
                            <td><h5 className='my-3 text-light text-center'>{usercount}</h5></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        </>
    )
    }

export default Dashboard