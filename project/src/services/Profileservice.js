import axios from "axios";
import { api } from "../constants/serverapi";

let getuserprofiledata = async (token)=>{
    let result = await axios.get(`${api}/user/profile/${token}`);
    return result.data;
}

let checklogin = async (data)=>{
    let result = await axios.post(`${api}/user/auth`,data);
    return result.data;
}

let getuserdatabyid = async (userid)=>{
    let result = await axios.get(`${api}/user/profile/data/${userid}`);
    return result.data;
}

let getuserbyname = async(username)=>{
    let result = await axios.get(`${api}/user/profile/userdeetbyname/${username}`);
    return result.data;
}

export default {getuserprofiledata, checklogin, getuserdatabyid,getuserbyname}