import axios from "axios";
import { api } from "../constants/serverapi";

let getcoupon = async(couponname)=>{
    let result = await axios.get(`${api}/coupon/getcoupon/${couponname}`);
    return result.data;
}

export default {getcoupon};