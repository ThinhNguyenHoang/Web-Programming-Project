import {create} from "@mui/material/styles/createTransitions";
import {createAction, createSlice} from "@reduxjs/toolkit";
import {error, generateSagaLifecycleNames, generateStatus, loading, success} from "../../../utils/reduxGenerate";
import {UpdateDiscount, UpdateSubtotal, UpdateQuantity} from "./FoodHelper";
import Toaster from "../../../utils/Toaster/Toaster";


// * const food_item={
//     FoodID:"",
//     FoodName:"",
//     Picture:"",
//     Price:"",
//     Description:"",
//     Instruct:"",
//     Material:[],
//     Tags:[],
// }
const tag={
    TagID:"",
    TagName:"",

}
const material={
    MaterialID:"",
    MaterialName:"",
    Picture:""}
const food_item_cart = {
    id: 0,
    name: "",
    price: 0,
    quantity: 0,
    img: "",
}
const food_combo_item_news = {
    id: 0,
    name: "",
    price: "",
    decrip: "",
    img: "",
}
const nofi_item_news = {
    id: 0,
    name: "",
    content: "",
}
const voucher = {
    id: 0,
    name: "",
    discount: 0,
}
// const food_item_cart={
//     id:0,
//     name:"",
//     price:0,
//     quantity:0,
//     img:"",
// }
// const food_combo_item_news={
//     id:0,
//     name:"",
//     price:"",
//     decrip:"",
//     img:"",
// }
// const nofi_item_news={
//     id:0,
//     name:"",
//     content:"",
// }
// const voucher={
//     id:0,
//     name:"",
//     discount:0,
// }
const news={
    NewsID:"",
    Title:"",
    Picture:"",
    HighLight:"",
    Content:"",
    Author:"",
    Comment:[],
}
const comments={
    CommentID:"",
    UserID:"",
    UserName:"",
    UserAvatar:"",
    Content:"",
    ImageList:[],
    Reply:[]
}
const Reply={
    ReplyID:"",
    CommentID:"",
    UserID:"",
    UserName:"",
    UserAvatar:"",
    Content:"",
}
const food_item = {
    id: "",
    name: "",
    picture_uri: "",
    price: "",
    description: "",
    status: generateStatus(),
    //* Giảm giá bao nhiêu phần trăm
    sale_value: "",
    instruct: "",
    //* List các tag: Mỗi tag có thể có giá trị : "Mặn" , "Chua", "Cay", "Ngọt", "Đắng",...
    tags: [],
    material: []
}



const mapFoodItemFromResponse = (item) => {
    return {
        id: item.FoodID,
        name: item.FoodName,
        picture_uri: item.Picture,
        price: item.Price,
        // ! CHANGE THIS TO REAL SALE VALUE FROM REQUEST
        sale_value: 0,
        description: item.Description,
        instruct: item.Instruct,
        material: [...item.Material],
        tags: [...item.Tags],
    }
}
const initialValue = {
    user_id: 1,
    cart: {
        food_list: [],
        voucher_list: [],
        subtotal: 0,
        discount: 0,
        quantity: 0,
        voucher_id: 0,
        get_status: generateStatus(),
        update_status: generateStatus(),
        delete_status: generateStatus(),
    },
    news: {

    },
    recommendations: {
        status: generateStatus(),
        food_list: [],
    },
    wish_list: {
        status: generateStatus(),
        food_list: [],
    },
    
    food_manage:{
        food_list:[],//list các fooditem trên
        tag_list:[],
        material_list:[],
        tempFoodID:"",
        get_foodManage_status:generateStatus(),
        // get_food:generateStatus(),//*lấy tất cả food
        add_food:generateStatus(),//?add 1 food to db ,bao gồm tag, material
        update_food:generateStatus(),//?update 1 food
        delete_food:generateStatus(),//?
        // get_tag:generateStatus(),//lấy tất cả tag
        add_tag:generateStatus(),//add 1 tag
        delete_tag:generateStatus(),//delete 1 tag
        // get_material:generateStatus(),//get all materials
        delete_material:generateStatus(),//xóa 1 materiasls
        add_material:generateStatus(),//update //*:có thể ko dùng


    },
    add_to_wishlist: generateStatus(),
    remove_from_wish_list: generateStatus(),
    food_item_detail: food_item
}


export const selectors = {
    getCart: state => state.food.cart,
    getVoucher: state => state.food.cart.voucher_list,
    getUserId: state => state.food.user_id,
    getNews: state => state.food.news,
    getFoodList: state => state.food.news.food_list,
    getComboList: state => state.food.news.combo_list,
    getNofiList: state => state.food.news.nofi_list,
    //food mangement
    getFoodManagement:state=>state.food.food_manage,

    // * Food recommendationa
    getRecommendationList: state => state.food.recommendations.food_list,
    getRecommendationSuccess: state => state.food.recommendations.status.isSuccess,
    getRecommendationLoading: state => state.food.recommendations.status.isSuccess,
    getRecommendationError: state => state.food.recommendations.status.isError,
    // * Food WishList
    getWishList: state => state.food.wish_list.food_list,
    getWishListSuccess: state => state.food.wish_list.status.isSuccess,
    getWishListLoading: state => state.food.wish_list.status.isSuccess,
    getWishListError: state => state.food.wish_list.status.isError,


}

//Cart action
export const update_cart_actions = generateSagaLifecycleNames("update_cart");
export const get_cart_actions = generateSagaLifecycleNames("get_cart");
export const delete_cart_actions = generateSagaLifecycleNames("delete_cart");
export const change_voucher_cart = "change_voucher";
export const increase_quantity_cart = "increase_quantity";
export const decrease_quantity_cart = "decrease_quantity";
export const delete_food_cart = "delete_food";

//News actions
export const get_news_actions = generateSagaLifecycleNames("get_news");
export const add_cart_actions = generateSagaLifecycleNames("add_cart");
export const next_food_news = "next_food";
export const back_food_news = "back_food";
export const next_combo_news = "next_combo";
export const back_combo_news = "back_combo";
export const next_nofi_news = "next_nofication";
export const back_nofi_news = "back_nofication";

// Food Item Action
export const food_item_detail = generateSagaLifecycleNames("food_item_detail");
//
//Food manage :get food list, get tag list, get material list
export const food_management=generateSagaLifecycleNames("food_management");
export const delete_tag=generateSagaLifecycleNames("delete_tag");
export const add_tag=generateSagaLifecycleNames("add_tag");
export const add_food=generateSagaLifecycleNames("add_new_food");
export const delete_food=generateSagaLifecycleNames("delete_exist_food");
export const update_food=generateSagaLifecycleNames("update_exist_food");
export const add_material=generateSagaLifecycleNames("add_new_material");
export const delete_material=generateSagaLifecycleNames("delete_exist_material");
export const setFoodEdit= "setFoodEdit";


// Food Wishlist action
export const add_to_wish_list_actions = generateSagaLifecycleNames("add_wish_list");
export const remove_from_wish_list_actions = generateSagaLifecycleNames("remove_wish_list");
// * Food Recommendation Actions:
export const food_recommendation_actions = generateSagaLifecycleNames("food_recommendation");
export const food_wish_list_actions = generateSagaLifecycleNames("wish_list");


const FoodSlice = createSlice({
    name: "food",
    initialState: initialValue,
    reducers: {},
    extraReducers: {
        [change_voucher_cart]: (state, action) => {
            console.log("change voucher");
            state.cart.voucher_id = action.payload;
            UpdateDiscount(state.cart);
            //update to db ?
        },
        [increase_quantity_cart]: (state, action) => {
            state.cart.food_list.map((food) => {
                if (food.id === action.payload) {
                    food.quantity += 1;
                }
                return food;
            })
            UpdateQuantity(state.cart);
            UpdateSubtotal(state.cart);

        },
        [decrease_quantity_cart]: (state, action) => {
            state.cart.food_list.map((food) => {
                if (food.id === action.payload && food.quantity > 0) {
                    food.quantity -= 1;
                }
                return food;
            })
            UpdateQuantity(state.cart);
            UpdateSubtotal(state.cart);
            return state;
        },
        [delete_food_cart]: (state, action) => {
            var deleteFood = state.cart.food_list.filter(food => food.id == action.payload);
            var idx = state.cart.food_list.indexOf(deleteFood[0]);
            if (idx !== -1) {
                state.cart.food_list.splice(idx, 1);
            }
            UpdateQuantity(state.cart);
            UpdateSubtotal(state.cart);
        },
        [get_cart_actions.loading]: (state, action) => {
            state.cart.get_status = loading();
        },
        [get_cart_actions.success]: (state, action) => {
            console.log("CART PAYLOAD:", action.payload);

            state.cart.food_list = action.payload.food_list;
            state.cart.voucher_list = action.payload.voucher_list;
            UpdateSubtotal(state.cart);
            UpdateQuantity(state.cart);
            state.cart.get_status = success();
        },
        [get_cart_actions.error]: (state, action) => {
            console.log("CART ERROR");
            state.cart.get_status = error();
        },
        [update_cart_actions.loading]: (state, action) => {
            state.cart.update_status = loading();
        },
        [update_cart_actions.success]: (state, action) => {
            console.log("Update cart sucess");
            state.cart.update_status = success();
        },
        [update_cart_actions.error]: (state, action) => {
            console.log("Update cart fail")
            state.cart.update_status = loading();
        },
        [delete_cart_actions.loading]: (state, action) => {
            console.log("delete dispatch");
            state.cart.delete_status = loading();
        },
        [delete_cart_actions.success]: (state, action) => {
            state.cart.delete_status = success();
        },
        [delete_cart_actions.error]: (state, action) => {
            state.cart.delete_status = error();
        },
        [add_cart_actions.loading]: (state, action) => {
            state.news.addCart_status = loading();
        },
        [add_cart_actions.success]: (state, action) => {
            state.news.addCart_status = success();
        },
        [add_cart_actions.error]: (state, action) => {
            state.news.addCart_status = error();
        },
        [food_item_detail.loading]: (state, action) => {
            state.food_item_detail.status = loading();
        },

        [food_item_detail.success]: (state, action) => {
            const detail = action.payload.detail;
            console.log("FOOD_DETAIL: ", detail);
            state.food_item_detail = detail;
            state.food_item_detail.status = success();
        },
        [food_item_detail.loading]: (state, action) => {
            state.food_item_detail.status = error();
        },
        [food_management.loading]:(state,action)=>{
            state.food_manage.get_foodManage_status=loading();
        },
        [food_management.success]:(state,action)=>{
            state.food_manage.food_list=action.payload.food_list;
            state.food_manage.tag_list=action.payload.tag_list;
            state.food_manage.material_list=action.payload.material_list;
            state.food_manage.get_foodManage_status=success();
        },
        [food_management.error]:(state,action)=>{
            state.food_manage.get_foodManage_status=error();
        },
        [delete_tag.loading]:(state,action)=>{
            state.food_manage.delete_tag=loading();
        },
        [delete_tag.success]:(state,action)=>{
            state.food_manage.delete_tag=success();
        },
        [delete_tag.error]:(state,action)=>{
            state.food_manage.delete_tag=error();
        },
        [add_tag.loading]:(state,action)=>{
            state.food_manage.add_tag =loading();
        },
        [add_tag.success]:(state,action)=>{
            state.food_manage.add_tag =success();
        },
        [add_tag.error]:(state,action)=>{
            state.food_manage.add_tag =error();
        },
        [add_food.loading]:(state,action)=>{
            state.food_manage.add_food =loading();
        },
        [add_food.success]:(state,action)=>{
            state.food_manage.add_food =success();
        },
        [add_food.error]:(state,action)=>{
            state.food_manage.add_food =error();
        },
        [update_food.loading]:(state,action)=>{
            state.food_manage.update_food =loading();
        },
        [update_food.success]:(state,action)=>{
            state.food_manage.update_food =success();
        },
        [update_food.error]:(state,action)=>{
            state.food_manage.update_food =error();
        },
        [delete_food.loading]:(state,action)=>{
            state.food_manage.delete_food =loading();
        },
        [delete_food.success]:(state,action)=>{
            state.food_manage.delete_food =success();
        },
        [delete_food.error]:(state,action)=>{
            state.food_manage.delete_food =error();
        },
        [add_material.loading]:(state,action)=>{
            state.food_manage.add_material =loading();
        },
        [add_material.success]:(state,action)=>{
            state.food_manage.add_material =success();
        },
        [add_material.error]:(state,action)=>{
            state.food_manage.add_material =error();
        },
        [delete_material.loading]:(state,action)=>{
            state.food_manage.delete_material =loading();
        },
        [delete_material.success]:(state,action)=>{
            state.food_manage.delete_material =success();
        },
        [delete_material.error]:(state,action)=>{
            state.food_manage.delete_material =error();
        },
        [setFoodEdit]:(state,action)=>{
            state.food_manage.tempFoodID=action.payload;
        },
        

        

        [food_recommendation_actions.success]: (state, action) => {
            // Expect the list of food
            Toaster.toastSuccessful("FOOD RECOMMENDATION: " + JSON.stringify(action.payload));
            state.recommendations.food_list = action.payload.data.map(item => mapFoodItemFromResponse(item));
            state.recommendations.status = success();
        },
        [food_recommendation_actions.error]: (state, action) => {
            Toaster.toastError(JSON.stringify(action.payload));
            state.recommendations.status = error();
        },
        [food_recommendation_actions.loading]: (state, action) => {
            state.recommendations.status = loading();
        },

        [food_wish_list_actions.success]: (state, action) => {
            state.wish_list.status = success();
        },
        [food_wish_list_actions.error]: (state, action) => {
            Toaster.toastError(JSON.stringify(action.payload));
            state.recommendations.status = error();
            state.wish_list.status = error();
        },
        [food_wish_list_actions.loading]: (state, action) => {
            state.wish_list.status = loading();
        },

        [add_to_wish_list_actions.success]: (state, action) => {
            console.log("FOOD SLICE::WISHLIST::ADD ",action.payload);
            state.add_to_wishlist.status = success();
        },
        [add_to_wish_list_actions.error]: (state, action) => {
            Toaster.toastError(JSON.stringify(action.payload));
            state.add_to_wishlist.status = error();
        },
        [add_to_wish_list_actions.loading]: (state, action) => {
            state.add_to_wishlist.status = loading();
        },

        [remove_from_wish_list_actions.success]: (state, action) => {
            console.log("FOOD SLICE::REMOVE:: ",action.payload);
            state.remove_from_wish_list.status = success();
        },
        [remove_from_wish_list_actions.error]: (state, action) => {
            Toaster.toastError(JSON.stringify(action.payload));
            state.recommendations.status = error();
            state.remove_from_wish_list.status = error();
        },
        [remove_from_wish_list_actions.loading]: (state, action) => {
            state.remove_from_wish_list.status = loading();
        },


    }
});
export default FoodSlice;


// //
// const comment_init = {
//     user_iamge: "",
//     time: "",
//     content: "",
//     name: " ",
// }
// const Comment = () => {
//     return (
//
//     );
// }
//
// //
// const review_init = {
//     review: "",
//     comments: []
// }
// const Review = () => {
//     return (
//         <Box>
//             // Cái này là tiêu đề của cái review
//             <Typography>
//             </Typography>
//             <Typography>
//                 NỘi dung
//                 {/*Có hình ảnh ở cuối cái review nếu có */}
//             </Typography>
//             <Box>
//             {/*  LIst các comment lên trên bài review */}
//             </Box>
//         </Box>
//     );
// }

