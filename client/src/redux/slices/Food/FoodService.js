import request from "../../../utils/RequestHelper";
import {CartData2FoodCart,FoodCart2CartData,VoucherData2VoucherList} from './FoodHelper';
import axios from "axios";
import { appendOwnerState } from "@mui/core";
import { async } from '@firebase/util';

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
    wish_list: "/wish_list",
    comment:"/food/comment"
}



export const UpdateCartService= async (payload)=>{
    console.log("Update user food cart sevice",payload);
    return await request.putAsync(api_endpoints.cart,payload)
                        .then((response)=>response.data)
                        .catch((error)=>console.log("fail at cart service ",error));
}
export const GetCartService = async (payload)=>{
    const cartData = await request.getAsync(api_endpoints.cart)
                                    .then((response)=>response.data)
                                    .catch((error)=>console.log("fail at cart service ",error));
    const voucherData = await request.getAsync(api_endpoints.voucher)
                                    .then((response)=>response.data)
                                    .catch((error)=>console.log("fail at cart service ",error));
    console.log("cart load",cartData);
    return {
            food_list:cartData.FoodList,
            combo_list:cartData.ComboList,
            voucher_list:voucherData,
        }
}
export const GetVoucherDataService=(payload)=>{
    return request.getAsync(api_endpoints.voucher);
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
    const combo_list=await request.getAsync(api_endpoints.combo)
                                    .then((response)=>response.data)
                                    .catch((error)=>console.log("fail at food service ",error));
    return {
        food_list:food_list,
        tag_list:tag_list,
        material_list:material_list,
        combo_list:combo_list
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
export const addComboService=async (payload)=>{
    return await request.postAsync(api_endpoints.combo,payload)
                        .then((res)=>res)
                        .catch((e)=>e);
}
export const updateComboService=async (payload)=>{
    return await request.putAsync(api_endpoints.combo+"/"+payload.ComboID,payload)
                        .then((res)=>res)
                        .catch((e)=>e);
}
export const deleteComboService=async (payload)=>{
    return await request.deleteAsync(api_endpoints.combo+"/"+payload)
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
    return request.deleteAsync(`${api_endpoints.wish_list}/${payload}`);
}
export const foodDetailService=async (payload)=>{
    return await request.getAsync(api_endpoints.food+"/"+payload)
                        .then((response)=>response.data)
                        .catch((error)=>error);

}
export const addCommentService = async (payload)=>{
    console.log("add comment service, data:",payload);
    return await request.postAsync(api_endpoints.comment,payload)
                        .then(res=>res.data)
                        .catch(e=>e);
}
export const deleteCommentService= async (payload)=>{
    console.log("delete comment service,data:",payload);
    return await request.deleteAsync(api_endpoints.comment+"/"+payload)
                        .then(res=>res.data)
                        .catch(e=>e);
}
export const updateCommentService = async (payload)=>{
    console.log("update comment service, data:",payload);
    return await request.putAsync(api_endpoints.comment+"/"+payload.CommentID,payload)
                        .then(res=>res.data)
                        .catch(e=>e);
}


