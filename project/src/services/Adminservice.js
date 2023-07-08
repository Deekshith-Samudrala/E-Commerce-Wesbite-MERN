import axios from "axios";
import { api } from "../constants/serverapi";

let checklogin = async(data)=>{
    let result = await axios.post(`${api}/admin/login`,data);
    return result.data;
}

let getlogindetails = async (token)=>{
    let result = await axios.get(`${api}/admin/login/${token}`);
    return result.data;
}

let updateadminlogin = async(data)=>{
    let result = await axios.put(`${api}/admin/login`,data);
    return result.data;
}

export default {checklogin, getlogindetails, updateadminlogin};