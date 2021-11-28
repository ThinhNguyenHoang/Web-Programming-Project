import {createSlice} from "@reduxjs/toolkit";
import {error, generateSagaLifecycleNames, generateStatus, loading, success} from "../../../utils/reduxGenerate";
import {UpdateDiscount, UpdateQuantity, UpdateSubtotal} from "./FoodHelper";
import Toaster from "../../../utils/Toaster/Toaster";


const food_item2={
    FoodID:"",
    FoodName:"",
    Picture:"",
    Price:"",
    Description:"",
    Instruct:"",
    Material:[],
    Tags:[],
    Comment:[],
}
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
    material: [],
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
        material: item.Material? [...item.Material] : [],
        tags: item.Tags? [...item.Tags] : [],
    }
}

const mapComboFromResponse = (item) => {
    const food_list = item.Food.map((item,index) => {
        return mapFoodItemFromResponse(item);
    })

    return {
        id: item.ComboID,
        name: item.ComboName,
        description: item.ComboDescrip,
        price: item.Price,
        food_in_combo: [...food_list]
    }
}

const mapFoodItemFromResponseWithWishlist = (item) => {
    return {
        id_wish_list: item.WishListID,
        id: item.FoodID,
        name: item.FoodName,
        picture_uri: item.Picture,
        price: item.Price,
        // ! CHANGE THIS TO REAL SALE VALUE FROM REQUEST
        sale_value: 0,
        description: item.Description,
        instruct: item.Instruct,
        material: item.Material? [...item.Material] : [],
        tags: item.Tags? [...item.Tags] : [],
    }
}

const mapComboFromResponseWithWishList = (item) => {
    const food_list = item.Food.map((item,index) => {
        return mapFoodItemFromResponse(item);
    })

    return {
        id_wish_list: item.WishListID,
        id: item.ComboID,
        name: item.ComboName,
        description: item.ComboDescrip,
        price: item.Price,
        food_in_combo: [...food_list]
    }
}

const initialValue = {
    user_id: 1,
    cart: {
        food_list: [],
        combo_list:[],
        voucher_list: [],
        subtotal: 0,
        discount: 0,
        quantity: 0,
        voucher_id: 0,
        get_status: generateStatus(),
        update_status: generateStatus(),
        delete_status: generateStatus(),
    },
    recommendations: {
        status: generateStatus(),
        food_list: [],
    },
    // * WISHLIST SLICE
    wish_list: {
        status: generateStatus(),
        food_list: [],
        combo_list: [],
    },
    
    food_manage:{
        food_list:[],//list các fooditem trên
        combo_list:[],
        tag_list:[],
        material_list:[],
        tempFoodID:"",
        tempComboID:"",
        get_foodManage_status:generateStatus(),
        // get_food:generateStatus(),//*lấy tất cả food
        add_food:generateStatus(),//?add 1 food to db ,bao gồm tag, material
        update_food:generateStatus(),//?update 1 food
        delete_food:generateStatus(),//?
        add_combo:generateStatus(),//?add 1 food to db ,bao gồm tag, material
        update_combo:generateStatus(),//?update 1 food
        delete_combo:generateStatus(),
        // get_tag:generateStatus(),//lấy tất cả tag
        add_tag:generateStatus(),//add 1 tag
        delete_tag:generateStatus(),//delete 1 tag
        // get_material:generateStatus(),//get all materials
        delete_material:generateStatus(),//xóa 1 materiasls
        add_material:generateStatus(),//update //*:có thể ko dùng


    },
    add_to_wishlist: generateStatus(),
    remove_from_wish_list: generateStatus(),
    food_item_detail: food_item,
    food_detail:{
        tempID:"",
        food_detail:food_item2,
        get_status:generateStatus(),
        addCommentStatus:generateStatus(),
        deleteCommentStatus:generateStatus(),
        updateCommentStatus:generateStatus(),

    }
    
}


export const selectors = {
    getCart: state => state.food.cart,
    getVoucher: state => state.food.cart.voucher_list,
    getUserId: state => state.food.user_id,
    getFoodList: state => state.food.news.food_list,
    getComboList: state => state.food.news.combo_list,
    getNofiList: state => state.food.news.nofi_list,
    // * food mangement
    getFoodManagement:state=>state.food.food_manage,

    // * Food page
    getAllFoodListMapped: (state) => {
        const original_food_list = state.food.food_manage.food_list;
        const test = original_food_list.map((item, index) => {
            return mapFoodItemFromResponse(item);
        });
        console.log("TEST FOOD LIST: ",test);
        return test;
    },
    getAllComboListMapped: state => {
        const original_combo_list = state.food.food_manage.combo_list;
        return original_combo_list.map((item, index) => {
            return mapComboFromResponse(item);
        });
    },
    // * Food Recommendation
    getRecommendationList: state => state.food.recommendations.food_list,
    getRecommendationSuccess: state => state.food.recommendations.status.isSuccess,
    getRecommendationLoading: state => state.food.recommendations.status.isSuccess,
    getRecommendationError: state => state.food.recommendations.status.isError,
    // * Food WishList
    getWishListCombos: state => state.food.wish_list.combo_list,
    getWishListFood: state => state.food.wish_list.food_list,
    getWishListSuccess: state => state.food.wish_list.status.isSuccess,
    getWishListLoading: state => state.food.wish_list.status.isSuccess,
    getWishListError: state => state.food.wish_list.status.isError,
    //*Food detail
    getFoodDetail: state => state.food.food_detail.food_detail,
    getFoodDetailID: state=>state.food.food_detail.tempID,


}

//Cart action
export const update_cart_actions = generateSagaLifecycleNames("update_cart");
export const get_cart_actions = generateSagaLifecycleNames("get_cart");
export const delete_cart_actions = generateSagaLifecycleNames("delete_cart");
export const change_voucher_cart = "change_voucher";
export const increase_quantity_cart = "increase_quantity";
export const decrease_quantity_cart = "decrease_quantity";
export const delete_food_cart = "delete_food";



// Food Item Action
export const food_item_detail = generateSagaLifecycleNames("food_item_detail");
//
//Food manage :get food list, get tag list, get material list
export const food_management_action=generateSagaLifecycleNames("food_management");
export const delete_tag_action=generateSagaLifecycleNames("delete_tag");
export const add_tag_action=generateSagaLifecycleNames("add_tag");
export const add_food_action=generateSagaLifecycleNames("add_new_food");
export const delete_food_action=generateSagaLifecycleNames("delete_exist_food");
export const update_food_action=generateSagaLifecycleNames("update_exist_food");
export const add_combo_action=generateSagaLifecycleNames("add_new_combo");
export const delete_combo_action=generateSagaLifecycleNames("delete_exist_combo");
export const update_combo_action=generateSagaLifecycleNames("update_exist_combo");
export const add_material_action=generateSagaLifecycleNames("add_new_material");
export const delete_material_action=generateSagaLifecycleNames("delete_exist_material");
export const setFoodEdit= "setFoodEdit";
export const setComboEdit="setcomboedit";


// * Food Wishlist action
export const food_wish_list_actions = generateSagaLifecycleNames("wish_list");
export const add_to_wish_list_actions = generateSagaLifecycleNames("add_wish_list");
export const remove_from_wish_list_actions = generateSagaLifecycleNames("remove_wish_list");
// * Food Recommendation Actions:
export const food_recommendation_actions = generateSagaLifecycleNames("food_recommendation");

//* food detail
export const food_detail_action = generateSagaLifecycleNames("get_food_detail");
export const set_food_detail_id="set_food_detail_id";
export const add_food_comment_action= generateSagaLifecycleNames("add_food_comment");
export const delete_food_comment_action=generateSagaLifecycleNames("delete_food_comment");
export const update_food_comment_action= generateSagaLifecycleNames("update_food_comment");



const FoodSlice = createSlice({
    name: "food",
    initialState: initialValue,
    reducers: {},
    extraReducers: {
        [change_voucher_cart]: (state, action) => {
            console.log("change voucher");
            state.cart.voucher_id = action.payload;
            UpdateDiscount(state.cart);
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
            state.cart.combo_list=action.payload.combo_list;
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
        [food_management_action.loading]:(state,action)=>{
            state.food_manage.get_foodManage_status=loading();
        },
        [food_management_action.success]:(state,action)=>{
            state.food_manage.food_list=action.payload.food_list;
            state.food_manage.tag_list=action.payload.tag_list;
            state.food_manage.material_list=action.payload.material_list;
            state.food_manage.combo_list=action.payload.combo_list;
            state.food_manage.get_foodManage_status=success();
        },
        [food_management_action.error]:(state,action)=>{
            state.food_manage.get_foodManage_status=error();
        },
        [delete_tag_action.loading]:(state,action)=>{
            state.food_manage.delete_tag=loading();
        },
        [delete_tag_action.success]:(state,action)=>{
            state.food_manage.delete_tag=success();
        },
        [delete_tag_action.error]:(state,action)=>{
            state.food_manage.delete_tag=error();
        },
        [add_tag_action.loading]:(state,action)=>{
            state.food_manage.add_tag =loading();
        },
        [add_tag_action.success]:(state,action)=>{
            state.food_manage.add_tag =success();
        },
        [add_tag_action.error]:(state,action)=>{
            state.food_manage.add_tag =error();
        },
        [add_food_action.loading]:(state,action)=>{
            state.food_manage.add_food =loading();
        },
        [add_food_action.success]:(state,action)=>{
            state.food_manage.add_food =success();
        },
        [add_food_action.error]:(state,action)=>{
            state.food_manage.add_food =error();
        },
        [update_food_action.loading]:(state,action)=>{
            state.food_manage.update_food =loading();
        },
        [update_food_action.success]:(state,action)=>{
            state.food_manage.update_food =success();
        },
        [update_food_action.error]:(state,action)=>{
            state.food_manage.update_food =error();
        },
        [delete_food_action.loading]:(state,action)=>{
            state.food_manage.delete_food =loading();
        },
        [delete_food_action.success]:(state,action)=>{
            state.food_manage.delete_food =success();
        },
        [delete_food_action.error]:(state,action)=>{
            state.food_manage.delete_food =error();
        },
        [add_combo_action.loading]:(state,action)=>{
            state.food_manage.add_combo =loading();
        },
        [add_combo_action.success]:(state,action)=>{
            state.food_manage.add_combo =success();
        },
        [add_combo_action.error]:(state,action)=>{
            state.food_manage.add_combo =error();
        },
        [update_combo_action.loading]:(state,action)=>{
            state.food_manage.update_combo =loading();
        },
        [update_combo_action.success]:(state,action)=>{
            state.food_manage.update_combo =success();
        },
        [update_combo_action.error]:(state,action)=>{
            state.food_manage.update_combo =error();
        },
        [delete_combo_action.loading]:(state,action)=>{
            state.food_manage.delete_combo =loading();
        },
        [delete_combo_action.success]:(state,action)=>{
            state.food_manage.delete_combo =success();
        },
        [delete_combo_action.error]:(state,action)=>{
            state.food_manage.delete_combo =error();
        },
        [add_material_action.loading]:(state,action)=>{
            state.food_manage.add_material =loading();
        },
        [add_material_action.success]:(state,action)=>{
            state.food_manage.add_material =success();
        },
        [add_material_action.error]:(state,action)=>{
            state.food_manage.add_material =error();
        },
        [delete_material_action.loading]:(state,action)=>{
            state.food_manage.delete_material =loading();
        },
        [delete_material_action.success]:(state,action)=>{
            state.food_manage.delete_material =success();
        },
        [delete_material_action.error]:(state,action)=>{
            state.food_manage.delete_material =error();
        },
        [setFoodEdit]:(state,action)=>{
            state.food_manage.tempFoodID=action.payload;
        },
        [setComboEdit]:(state,action)=>{
            state.food_manage.tempComboID=action.payload;
        },
        [food_recommendation_actions.success]: (state, action) => {
            state.recommendations.food_list = action.payload.data.map(item => mapFoodItemFromResponse(item));
            state.recommendations.status = success();
        },
        [food_recommendation_actions.error]: (state, action) => {
            state.recommendations.status = error(action.payload);
            // Toaster.toastError(action.payload);

        },
        [food_recommendation_actions.loading]: (state, action) => {
            state.recommendations.status = loading();
        },
        // * Food Wishlist Reducers
        [food_wish_list_actions.success]: (state, action) => {
            Toaster.toastSuccessful(action.payload.message);
            const original_list = action.payload.data;
            const food_wish_list = original_list.filter((item) => item.FoodID !== "0").map((item) => mapFoodItemFromResponse(item.data));
            const combo_wish_list = original_list.filter((item) => item.ComboID !== "0").map((item) => mapComboFromResponse(item.data));
            state.wish_list.food_list = [...food_wish_list];
            state.wish_list.combo_list = [...combo_wish_list];
            state.wish_list.status = success();
        },

        [food_wish_list_actions.error]: (state, action) => {
            Toaster.toastError(JSON.stringify(action.payload));
            state.wish_list.status = error();
        },
        [food_wish_list_actions.loading]: (state, action) => {
            state.wish_list.status = loading();
        },
        [add_to_wish_list_actions.success]: (state, action) => {
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
        //*Food detail
        [set_food_detail_id]:(state,action)=>{
            state.food_detail.tempID=action.payload;
        },
        [food_detail_action.loading]:(state,action)=>{
            state.food_detail.get_status=loading();
        },
        [food_detail_action.success]:(state,action)=>{
            state.food_detail.food_detail=action.payload;
            state.food_detail.get_status=success();
        },
        [food_detail_action.error]:(state,action)=>{
            state.food_detail.get_status=error();
        },
        [add_food_comment_action.loading]:(state,action)=>{
            state.food_detail.addCommentStatus=loading();
        },
        [add_food_comment_action.success]:(state,action)=>{
            state.food_detail.addCommentStatus=success();
        },
        [add_food_comment_action.error]:(state,action)=>{
            state.food_detail.addCommentStatus=error();
        },
        [update_food_comment_action.loading]:(state,action)=>{
            state.food_detail.updateCommentStatus=loading();
        },
        [update_food_comment_action.success]:(state,action)=>{
            state.food_detail.updateCommentStatus=success();
        },
        [update_food_comment_action.error]:(state,action)=>{
            state.food_detail.updateCommentStatus=error();
        },
        [delete_food_comment_action.loading]:(state,action)=>{
            state.food_detail.deleteCommentStatus=loading();
        },
        [delete_food_comment_action.success]:(state,action)=>{
            state.food_detail.deleteCommentStatus=success();
        },
        [delete_food_comment_action.error]:(state,action)=>{
            state.food_detail.deleteCommentStatus=error();
        },


    }
});
export default FoodSlice;

