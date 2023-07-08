import axios from "axios";
import { api } from "../constants/serverapi";

let getall = async ()=>{
    let result = await axios.get(`${api}/category`);
    return result.data;
}

let addcate = async (data)=>{
    let result = await axios.post(`${api}/category`,data);
    return result.data;
}

let getcate = async (cateid)=>{
    let result = await axios.get(`${api}/category/${cateid}`);
    return result.data;
}

let delcate = async (data)=>{
    let result = await axios.delete(`${api}/category/${data}`);
    return result.data;
}

let updatecate = async (id,name)=>{
    let result = await axios.put(`${api}/category/${id}`, name);
    return result.data;
}

let addsubcate = async (data)=>{
    let result = await axios.post(`${api}/category/subcategory`,data);
    return result.data;
}

let getsubcate = async (cateid,subcateid)=>{
    let result = await axios.get(`${api}/category/subcategory/${cateid}/${subcateid}`);
    return result.data;
}

let updatesubcate = async (cateid,subcateid,data)=>{
    let result = await axios.put(`${api}/category/subcategory/${cateid}/${subcateid}`,data);
    return result.data;
}

let delsubcate = async (cateid,subcateid)=>{
    let result = await axios.delete(`${api}/category/subcategory/${cateid}/${subcateid}`);
    return result.data;
}

let exportobj = {getall, addcate, getcate, updatecate, delcate,addsubcate, getsubcate, updatesubcate, delsubcate};

export default exportobj;
