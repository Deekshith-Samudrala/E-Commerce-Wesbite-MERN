import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "../constants/serverapi";

let cartadd = createAsyncThunk("productaddtocart", async(data,{getState})=>{
    
    let userid = getState().Userauthslice;
    let result = await axios.post(`${api}/cart/addtocart/${userid}`,data);
    return result.data;
})

let cartinit = createAsyncThunk("cartinitializationindb", async(userid)=>{
    
    let result = await axios.post(`${api}/cart/${userid}`);
    return result.data;
})

let getcartitems = createAsyncThunk("getallcartitemsfromdb",async(userid)=>{
    let result = await axios.get(`${api}/cart/${userid}`);
    return result.data;
})

let removeallitems = createAsyncThunk("removeallitemsincart",async(_,{getState})=>{

    let userid = getState().Userauthslice;
    
    let result = await axios.delete(`${api}/cart/${userid}`);
    return result.data;
})

let removeoneitem = createAsyncThunk("removeoneitemfromcart",async(unqid,{getState})=>{

    let userid = getState().Userauthslice;

    let result = await axios.delete(`${api}/cart/${userid}/${unqid}`);
    return result.data;
})

let emptycartonlogout = createAsyncThunk("removeallitemsfromcartonlogout",async()=>{
    
})

let Cartslice = createSlice({
    name : "Cartslice",
    initialState : [],
    extraReducers : {
        [cartadd.fulfilled] : (state,action)=>{
            state.push(action.payload.info);
        },
        [cartinit.fulfilled] : (state,action)=>{
            return ;
        },
        [getcartitems.fulfilled] : (state,action)=>{
            let obj = action.payload.info[0];
            if(obj.Cart[0]){
                return obj.Cart ;
            }
        },
        [removeallitems.fulfilled] : (state,action)=>{
            return [];
        },
        [removeoneitem.fulfilled] : (state,action)=>{
            let curritems = action.payload.info.Cart;
            let delitemid = action.payload.delid;
            return curritems.filter((item)=>item._id != delitemid);
        },
        [emptycartonlogout.fulfilled] : (state,action)=>{
            console.log("cartlogout");
            return [];
        }
    }
})

export default Cartslice.reducer;
export { cartadd ,cartinit ,getcartitems, removeallitems, removeoneitem, emptycartonlogout};