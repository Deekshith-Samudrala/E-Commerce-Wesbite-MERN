import React,{useEffect, useState} from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import Profileservice from '../../../../services/Profileservice';

const Profile = () => {

    let navigate = useNavigate();
    
    let [loggeduser,setLoggeduser] = useState();
    let [userid,setUserid] = useState();
  
    useEffect(()=>{
        if(localStorage.getItem("token")){
            let token = localStorage.getItem("token");
            let getdata = async(token)=>{
                let result = await Profileservice.getuserprofiledata(token);
                setUserid(result.info._id);
                delete result.info._id;
                delete result.info.password;
                delete result.info.__v;
                setLoggeduser(result.info);
            }
            getdata(token);
          }
        else{
            navigate("/login");
        }
    },[])

  return (
    <>
        <div className='Toppagename container-fluid'>
            <h4 className="mb-5">Profile</h4>
        </div>
        <div className='text-center my-4'>
            <h4><b><u>User Details</u></b>  </h4>
        </div>
        <div className='container'>
            <div className='row'>
                <div className='col-md-8 offset-md-2'>
                    <div className='text-center mt-2 mb-4'>
                        <h4>Welcome <span><u>{loggeduser ? loggeduser.name : ""}</u></span> !</h4>
                    </div>
                    <table className='table table-hover table-dark table-striped'>
                        <thead></thead>
                        <tbody>
                            {
                                loggeduser && Object.keys(loggeduser).map((key)=>{
                                    return(
                                        <tr key={key}>
                                            <td className='border-right text-center'>{key}</td>
                                            <td className='pl-5'>{loggeduser[key]}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    <div className='text-center'>
                        <NavLink to={`/profile/edit/${userid}`} className='btn btn-info mx-3 my-2'>Edit Details</NavLink>
                        <NavLink to="/profile/changepassword" className='btn btn-primary mx-3 my-2'>Change Password</NavLink>
                        <NavLink to="/logout" className="btn btn-danger mx-3 my-2">Logout</NavLink>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Profile