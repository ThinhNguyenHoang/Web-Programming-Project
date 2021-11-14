import request from "../../../utils/RequestHelper";
import {CartData2FoodCart,FoodCart2CartData,VoucherData2VoucherList} from './FoodHelper';
import axios from "axios";
import Nofication from "../../../components/News/Nofication";
import { appendOwnerState } from "@mui/core";
const api_endpoints = {
    food:"/foods",
    voucher:"/voucher",
    cart:"/cart",
    combo:"/combo",
    nofication:"/nofication"

}
const baseURL="http://localhost:3001";
const base2URL="https://api.jsonbin.io/b/6188c8584a56fb3dee0b22a4";


export const UpdateCartService= (payload)=>{
    console.log("Update user food cart",FoodCart2CartData(payload));
    FoodCart2CartData(payload).map((data)=>{
        return axios.post(`${baseURL}${api_endpoints.cart}/${data.id}`,data)
        .then((response=>console.log("Axios success ",data.id,response.data)))
        .catch((error)=>console.log("Axios fail",data.id,error));
    })
}

export const DeleteCartService = async (payload)=>{
    console.log("delet service",payload)
    return await axios.delete(`${baseURL}${api_endpoints.cart}/${payload}`)
    .then((response=>console.log("Axios success ",payload,response.data)))
    .catch((error)=>console.log("Axios fail",payload,error));
}
export const GetCartDataService= (payload)=>{
    console.log("Get user cart data");
    return axios.get(`${baseURL}${api_endpoints.cart}`)
    .then((response) => response.data)
    .catch((error) => console.log("fail cart"));

}
export const GetVoucherDataService=(payload)=>{
    console.log("Get voucher data");

    return axios.get(`${baseURL}${api_endpoints.voucher}`)
    .then((response) => response.data)
    .catch((error) => console.log("fail voucher"));
}

export const GetFoodDataService=(payload)=>{
    console.log("Get food data");
    return axios.get(`${baseURL}${api_endpoints.food}`)
    .then((response) => response.data)
    .catch((error) => console.log("fail food"));
}
export const GetComboDataService=(payload)=>{
    return axios.get(`${baseURL}${api_endpoints.combo}`)
    .then((response) => response.data)
    .catch((error) => console.log("fail combo"));
}
export const GetNofiDataService=(payload)=>{
    return axios.get(`${base2URL}`)
    .then((response) => response.data)
    .catch((error) => console.log("fail nofication"));
}
export const GetNewsService= async (payload)=>{
    console.log("get News");
    const FoodData= await GetFoodDataService(payload);
    const ComboData= await GetComboDataService(payload);
    const NofiData= await GetNofiDataService(payload);
    //TODO
    return {
        food_list:'',
        combo_list:'',
        nofi_list:'',
    }
}

export const AddCartService = async (payload) =>{
    console.log("add food to cart");
    return await axios.post(`${baseURL}${api_endpoints.cart}`,payload)
    .then(response => console.log("axios sucess",response.data))
    .catch(error => console.log("axios failed",error))
}

export const GetCartService = async  (payload)=>{
    console.log("Get cart");
    const cartData = await GetCartDataService(payload);
    const foodData = await GetFoodDataService(payload);
    const voucherData = await GetVoucherDataService(payload);
    
    return {
            food_list:CartData2FoodCart(cartData,foodData),
            voucher_list:VoucherData2VoucherList(voucherData),
        }
}

