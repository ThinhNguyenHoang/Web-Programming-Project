import request from "../../../utils/RequestHelper";
import {CartData2FoodCart,FoodCart2CartData,VoucherData2VoucherList} from './FoodHelper';
import axios from "axios";
const api_endpoints = {
    food:"/foods",
    voucher:"/voucher",
    cart:"/cart",

}
const baseURL="http://localhost:3001"


export const UpdateCartService= (payload)=>{
    console.log("Update user food cart",FoodCart2CartData(payload));
    //TODO
    return axios.put(`${baseURL}${api_endpoints.cart}`,...FoodCart2CartData(payload))
    .then((reponse)=>console.log("axios success",reponse.data))
    .catch((error)=>console.log("axios fail",error))
    //return request.putAsync(payload);
}
export const GetCartDataService= (payload)=>{
    console.log("Get user cart data");
    //TODO
    //return request.getAsync(api_endpoints.cart,payload);
    
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
    //TODO
    return axios.get(`${baseURL}${api_endpoints.food}`)
    .then((response) => response.data)
    .catch((error) => console.log("fail food"));

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
    // return 1;

}

