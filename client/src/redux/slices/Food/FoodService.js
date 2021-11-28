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
export const addCommentService = (payload)=>{
    console.log("add comment service, data:",payload);
    return "";
}
export const deleteCommentService= (payload)=>{
    console.log("delete comment service,data:",payload);
    return ""
}
export const updateCommentService = (payload)=>{
    console.log("update comment service, data:",payload);
    return "";
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
    ComboName:"Combo 1",
    Picture:"https://image.shutterstock.com/image-photo/suraj-mukhi-flower-my-great-600w-1467178388.jpg",
    Quantity:1,
    Price:10000,
    FoodList:[fooddd1,fooddd2,fooddd3]
}

const cartt={
    ComboList:[comboo],
    FoodList:[fooddd1,fooddd2,fooddd3],
}

const Reply1={
    ReplyID:"1",
    CommentID:"1",
    UserID:"2",
    UserName:"Username 2",
    UserAvatar:"https://glenfarrow.co.uk/wp-content/uploads/User-icon.png",
    Content:"Phó đại sứ Thụy Sĩ Nichole Wyrsch cho biết Tổng thống Guy Parmelin rất mong được đón tiếp Chủ tịch nước Nguyễn Xuân Phúc đến thăm nhân kỷ niệm 50 năm quan hệ ngoại giao hai nước"
}
const Reply2={
    ReplyID:"2",
    CommentID:"1",
    UserID:"3",
    UserName:"Username 3",
    UserAvatar:"https://glenfarrow.co.uk/wp-content/uploads/User-icon.png",
    Content:"Phó đại sứ Thụy Sĩ Nichole Wyrsch cho biết Tổng thống Guy Parmelin rất mong được đón tiếp Chủ tịch nước Nguyễn Xuân Phúc đến thăm nhân kỷ niệm 50 năm quan hệ ngoại giao hai nước"
}
const Reply3={
    ReplyID:"3",
    CommentID:"1",
    UserID:"4",
    UserName:"Username 4",
    UserAvatar:"https://glenfarrow.co.uk/wp-content/uploads/User-icon.png",
    Content:"Phó đại sứ Thụy Sĩ Nichole Wyrsch cho biết Tổng thống Guy Parmelin rất mong được đón tiếp Chủ tịch nước Nguyễn Xuân Phúc đến thăm nhân kỷ niệm 50 năm quan hệ ngoại giao hai nước"
}

const comment1 ={
    CommentID:"1",
    UserID:"1",
    UserName:"Username 1",
    UserAvatar:"https://glenfarrow.co.uk/wp-content/uploads/User-icon.png",
    Content:"Tổng thống Thụy Sĩ Guy Parmelin rất mong đợi được đón tiếp người đồng cấp Việt Nam",
    ImageList:["https://glenfarrow.co.uk/wp-content/uploads/User-icon.png","https://glenfarrow.co.uk/wp-content/uploads/User-icon.png","https://glenfarrow.co.uk/wp-content/uploads/User-icon.png"], //Array url of image
    Reply:[Reply1,Reply2,Reply3]
}
const comment2 ={
    CommentID:"2",
    UserID:"2",
    UserName:"Username 2",
    UserAvatar:"https://glenfarrow.co.uk/wp-content/uploads/User-icon.png",
    Content:"Tổng thống Thụy Sĩ Guy Parmelin rất mong đợi được đón tiếp người đồng cấp Việt Nam",
    ImageList:["https://glenfarrow.co.uk/wp-content/uploads/User-icon.png","https://glenfarrow.co.uk/wp-content/uploads/User-icon.png","https://glenfarrow.co.uk/wp-content/uploads/User-icon.png"], //Array url of image
    Reply:[]
}
const comment3 ={
    CommentID:"3",
    UserID:"3",
    UserName:"Username 3",
    UserAvatar:"https://glenfarrow.co.uk/wp-content/uploads/User-icon.png",
    Content:"Tổng thống Thụy Sĩ Guy Parmelin rất mong đợi được đón tiếp người đồng cấp Việt Nam",
    ImageList:["https://glenfarrow.co.uk/wp-content/uploads/User-icon.png","https://glenfarrow.co.uk/wp-content/uploads/User-icon.png","https://glenfarrow.co.uk/wp-content/uploads/User-icon.png"], //Array url of image
    Reply:[]
}
const news1={
    NewsID:"1",
    Title:"Phó đại sứ Thụy Sĩ: Tổng thống rất mong được tiếp Chủ tịch nước",
    Picture:"https://image.shutterstock.com/image-photo/suraj-mukhi-flower-my-great-600w-1467178388.jpg",
    Highlight:"Phó đại sứ Thụy Sĩ Nichole Wyrsch cho biết Tổng thống Guy Parmelin rất mong được đón tiếp Chủ tịch nước Nguyễn Xuân Phúc đến thăm nhân kỷ niệm 50 năm quan hệ ngoại giao hai nước.",
    Content:"Tổng thống Thụy Sĩ Guy Parmelin rất mong đợi được đón tiếp người đồng cấp Việt Nam, chỉ ít lâu sau lần gần nhất hai người gặp mặt bên lề phiên thảo luận chung cấp cao Khóa họp thứ 76 Đại hội đồng Liên Hợp Quốc vào tháng 9.Kỷ niệm 50 năm quan hệ ngoại giao là thời khắc quan trọng đối với cả hai quốc gia. Thành tựu mà Việt Nam và Thụy Sĩ đạt được trong nửa thế kỷ qua đã khẳng định sức mạnh của quan hệ đối tác này, cũng như niềm tin và cam kết với tương lai.",
    Author:"Nichole Wyrsch",
    Comment:[comment1,comment2,comment3]
}
const news2={
    NewsID:"2",
    Title:"Phó đại sứ Thụy Sĩ: Tổng thống rất mong được tiếp Chủ tịch nước",
    Picture:"https://image.shutterstock.com/image-photo/suraj-mukhi-flower-my-great-600w-1467178388.jpg",
    Highlight:"Phó đại sứ Thụy Sĩ Nichole Wyrsch cho biết Tổng thống Guy Parmelin rất mong được đón tiếp Chủ tịch nước Nguyễn Xuân Phúc đến thăm nhân kỷ niệm 50 năm quan hệ ngoại giao hai nước.",
    Content:"Tổng thống Thụy Sĩ Guy Parmelin rất mong đợi được đón tiếp người đồng cấp Việt Nam, chỉ ít lâu sau lần gần nhất hai người gặp mặt bên lề phiên thảo luận chung cấp cao Khóa họp thứ 76 Đại hội đồng Liên Hợp Quốc vào tháng 9.Kỷ niệm 50 năm quan hệ ngoại giao là thời khắc quan trọng đối với cả hai quốc gia. Thành tựu mà Việt Nam và Thụy Sĩ đạt được trong nửa thế kỷ qua đã khẳng định sức mạnh của quan hệ đối tác này, cũng như niềm tin và cam kết với tương lai.",
    Author:"Nichole Wyrsch",
    Comment:[]
}
const news3={
    NewsID:"3",
    Title:"Phó đại sứ Thụy Sĩ: Tổng thống rất mong được tiếp Chủ tịch nước",
    Picture:"https://image.shutterstock.com/image-photo/suraj-mukhi-flower-my-great-600w-1467178388.jpg",
    Highlight:"Phó đại sứ Thụy Sĩ Nichole Wyrsch cho biết Tổng thống Guy Parmelin rất mong được đón tiếp Chủ tịch nước Nguyễn Xuân Phúc đến thăm nhân kỷ niệm 50 năm quan hệ ngoại giao hai nước.",
    Content:"Tổng thống Thụy Sĩ Guy Parmelin rất mong đợi được đón tiếp người đồng cấp Việt Nam, chỉ ít lâu sau lần gần nhất hai người gặp mặt bên lề phiên thảo luận chung cấp cao Khóa họp thứ 76 Đại hội đồng Liên Hợp Quốc vào tháng 9.Kỷ niệm 50 năm quan hệ ngoại giao là thời khắc quan trọng đối với cả hai quốc gia. Thành tựu mà Việt Nam và Thụy Sĩ đạt được trong nửa thế kỷ qua đã khẳng định sức mạnh của quan hệ đối tác này, cũng như niềm tin và cam kết với tương lai.",
    Author:"Nichole Wyrsch",
    Comment:[]
}
const news4={
    NewsID:"4",
    Title:"Phó đại sứ Thụy Sĩ: Tổng thống rất mong được tiếp Chủ tịch nước",
    Picture:"https://image.shutterstock.com/image-photo/suraj-mukhi-flower-my-great-600w-1467178388.jpg",
    Highlight:"Phó đại sứ Thụy Sĩ Nichole Wyrsch cho biết Tổng thống Guy Parmelin rất mong được đón tiếp Chủ tịch nước Nguyễn Xuân Phúc đến thăm nhân kỷ niệm 50 năm quan hệ ngoại giao hai nước.",
    Content:"Tổng thống Thụy Sĩ Guy Parmelin rất mong đợi được đón tiếp người đồng cấp Việt Nam, chỉ ít lâu sau lần gần nhất hai người gặp mặt bên lề phiên thảo luận chung cấp cao Khóa họp thứ 76 Đại hội đồng Liên Hợp Quốc vào tháng 9.Kỷ niệm 50 năm quan hệ ngoại giao là thời khắc quan trọng đối với cả hai quốc gia. Thành tựu mà Việt Nam và Thụy Sĩ đạt được trong nửa thế kỷ qua đã khẳng định sức mạnh của quan hệ đối tác này, cũng như niềm tin và cam kết với tương lai.",
    Author:"Nichole Wyrsch",
    Comment:[]
}


// const response={
//     FoodList:[],
//     ComBoList:[]
// }
// const food={
//     FoodID:"",
//     FoodName:"",
//     Picture:"",
//     Price:0,
//     Quantity:0,
// }
// const Combo={
//     ComboID:"",
//     ComboName:"",
//     Picture:"",
//     Quantity:0,
//     Price:0,
//     FoodList:[] 
// }
const news_list=[news1,news2,news3,news4];