import request from "../../../utils/RequestHelper";
import {CartData2FoodCart,FoodCart2CartData,VoucherData2VoucherList} from './FoodHelper';
import axios from "axios";
import { appendOwnerState } from "@mui/core";

const baseURL="sfsd";
const base2URL="fsdf";
const food_local_base = '/food'

const api_endpoints = {
    food:"/food",
    tag:"/tag",
    material:"/material",
    voucher:"/voucher",
    cart:"/cart",
    combo:"/combo",
    nofication:"/nofication",


    recommendations: `${food_local_base}/recommendation`,
    wish_list: "/wish_list"
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
export const GetVoucherDataService=async (payload)=>{
    return await request.getAsync(api_endpoints.voucher)
                        .then((response) => response.data)
                        .catch((error) => error);
}

export const GetFoodDataService=(payload)=>{
    console.log("Get food data");
    return axios.get(`${baseURL}${api_endpoints.food}`)
    .then((response) => response.data)
    .catch((error) => console.log("fail food"));
}

export const AddCartService = async (payload) =>{
    console.log("add food to cart");
    return await axios.post(`${baseURL}${api_endpoints.cart}`,payload)
    .then(response => console.log("axios sucess",response.data))
    .catch(error => console.log("axios failed",error))
}

export const GetCartService =  (payload)=>{
    const cartData = cartt;
    const voucherData = GetVoucherDataService(payload);
    
    return {
            food_list:cartData,
            voucher_list:voucherData,
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



export const getFoodRecommendationService = (payload) => {
    return request.getAsync(api_endpoints.recommendations, payload);
}


export const getWishList = (payload) => {
    return request.getAsync(api_endpoints.wish_list, payload);
}

export const addFoodToWishtListService = (payload)=>{
    console.log("WISHLIST_SERVICE::ADD ",payload);
    return request.postAsync(api_endpoints.wish_list,payload);
}

export const removeFoodFromWishtListService = (payload)=>{
    console.log("WISHLIST_SERVICE::REMOVE ",payload);
    return request.deleteAsync(api_endpoints.wish_list,payload);
}


const fooddd1={
    FoodID:"1",
    FoodName:"food name 1",
    Picture:"https://image.shutterstock.com/image-photo/suraj-mukhi-flower-my-great-600w-1467178388.jpg",
    Quantity:1,
    Price:4000,
}
const fooddd2={
    FoodID:"2",
    FoodName:"food name 2",
    Picture:"https://image.shutterstock.com/image-photo/suraj-mukhi-flower-my-great-600w-1467178388.jpg",
    Quantity:1,
    Price:4000,
}
const fooddd3={
    FoodID:"3",
    FoodName:"food name 3",
    Picture:"https://image.shutterstock.com/image-photo/suraj-mukhi-flower-my-great-600w-1467178388.jpg",
    Quantity:1,
    Price:4000,
}
const comboo={
    ComboID:"1",
    ComboName:"",
    Picture:"",
    Quantity:"",
    Price:10000,
    FoodList:[fooddd1,fooddd2,fooddd3]
}

const cartt={
    ComboList:[comboo],
    FoodList:[fooddd1,fooddd2,fooddd3],
}