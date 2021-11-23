import request from "../../../utils/RequestHelper";
import {CartData2FoodCart,FoodCart2CartData,VoucherData2VoucherList} from './FoodHelper';
import axios from "axios";
import { appendOwnerState } from "@mui/core";

const baseURL="sfsd";
const base2URL="fsdf";
const api_endpoints = {
    food:"/food",
    tag:"/tag",
    material:"/material",
    voucher:"/voucher",
    cart:"/cart",
    combo:"/combo",
    nofication:"/nofication",


}



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

export const getFoodManageService = async (payload)=>{
    const food_list= await request.getAsync(api_endpoints.food)
                                .then((response)=>response.data)
                                .catch((error)=>console.log("fail at food service ",error));
    const tag_list=await request.getAsync(api_endpoints.tag)
                                    .then((response)=>response.data)
                                    .catch((error)=>console.log("fail at food service ",error));
    const material_list=await request.getAsync(api_endpoints.material)
                                    .then((response)=>response.data)
                                    .catch((error)=>console.log("fail at food service ",error));
    return {
        food_list:food_list,
        tag_list:tag_list,
        material_list:material_list
    }
}

export const deleteTagService=async (payload)=>{
    return await request.deleteAsync(api_endpoints.tag+"/"+payload)
                        .then((res)=>res)
                        .catch((e)=>e);
}
export const addTagService=async (payload)=>{
    return await request.postAsync(api_endpoints.tag,payload)
                        .then((res)=>res)
                        .catch((e)=>e);
}
export const addFoodService=async (payload)=>{
    return await request.postAsync(api_endpoints.food,payload)
                        .then((res)=>res)
                        .catch((e)=>e);
}
export const updateFoodService=async (payload)=>{
    return await request.putAsync(api_endpoints.food+"/"+payload.FoodID,payload)
                        .then((res)=>res)
                        .catch((e)=>e);
}
export const deleteFoodService=async (payload)=>{
    return await request.deleteAsync(api_endpoints.food+"/"+payload)
                        .then((res)=>res)
                        .catch((e)=>e);
}
export const addMaterialService=async (payload)=>{
    return await request.postAsync(api_endpoints.material,payload)
                        .then((res)=>res.data)
                        .catch((e)=>e);
}
export const deleteMaterialService=async (payload)=>{

    return await request.deleteAsync(api_endpoints.material.concat("/",payload))
                        .then((res)=>res.data)
                        .catch(e=>e);
}



