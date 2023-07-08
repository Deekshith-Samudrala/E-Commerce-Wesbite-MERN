import axios from "axios";
import { api } from "../constants/serverapi";

let getstate = async()=>{
    let result = await axios.get(`${api}/city/state`);
    return result.data;
}

let getcity = async(statename)=>{
    let result = await axios.get(`${api}/city/getcity/${statename}`);
    return result.data;
}

let userdata = async(userdata)=>{
    let result = await axios.post(`${api}/user/signup`,userdata);
    return result.data;
}

let updateuserdata = async(data,userid)=>{
    let result = await axios.put(`${api}/user/signup/${userid}`,data);
    return result.data;
}

let updatepassword = async(data,userid)=>{
    let result = await axios.put(`${api}/user/signup/password/${userid}`,data);
    return result.data;
}

let getallusersdata = async()=>{
    let result = await axios.get(`${api}/user/signup`);
    return result.data;
}

let deluser = async(userid)=>{
    let result = await axios.delete(`${api}/user/signup/${userid}`);
    return result.data;
}

export default {getstate, getcity, userdata, updateuserdata, updatepassword, getallusersdata, deluser};