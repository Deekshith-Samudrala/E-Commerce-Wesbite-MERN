import axios from "axios";
import { api } from "../constants/serverapi";

const placeorder = async(orderdata)=>{
    let result = await axios.post(`${api}/payment/createOrder`,orderdata);
    return result.info;
}

export default {placeorder};