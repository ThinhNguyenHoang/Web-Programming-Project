import { create } from "@mui/material/styles/createTransitions";
import { createAction, createSlice } from "@reduxjs/toolkit";
import { error, generateSagaLifecycleNames, generateStatus, loading, success } from "../../../utils/reduxGenerate";
import { UpdateDiscount,UpdateSubtotal, UpdateQuantity } from "./FoodHelper";

const food_item_cart={
    id:0,
    food_name:"",
    price:0,
    quantity:0,
    img:"",
}
const food_combo_item_news={
    id:0,
    name:"",
    price:"",
    decrip:"",
}
const nofi_item_news={
    id:0,
    name:"",
    content:"",
}
const voucher={
    id:0,
    name:"",
    discount:0,
}

const initialValue={
    user_id:1,
    cart:{
        food_list:[],
        voucher_list:[],
        subtotal:0,
        discount:0,
        quantity:0,
        voucher_id:0,
        get_status:generateStatus(),
        update_status:generateStatus(),
    },
    news:{
        food_list:[],
        combo_list:[],
        nofi_list:[],
        food_show:[],
        combo_show:[],
        nofi_show:[],
        get_status:generateStatus(),
    }
    
}

export const selectors={
    getCart: state=>state.food.cart,
}

export const update_cart_actions = generateSagaLifecycleNames("update_cart");
export const get_cart_actions = generateSagaLifecycleNames("get_cart");
export const change_voucher_cart = createAction("change_voucher");
export const increase_quantity_cart = createAction("increase_quantity");
export const decrease_quantity_cart = createAction("decrease_quantity");
export const delete_food_cart = createAction("delete_food");

export const get_news_actions = generateSagaLifecycleNames("get_news");
export const next_food_news = createAction("next_food");
export const back_food_news = createAction("back_food");
export const next_combo_news = createAction("next_combo");
export const back_combo_news = createAction("back_combo");
export const next_nofi_news = createAction("next_nofication");
export const back_nofi_news = createAction("back_nofication");


const FoodSlice= createSlice({
    name:"cart",
    initialState:initialValue,
    reducers:{
        [change_voucher_cart]:(state,action)=>{
            //TODO
            state.voucher_id=action.payload;
            UpdateDiscount(state.cart);
        },
        [increase_quantity_cart]:(state,action)=>{
            //TODO
            state.cart.food_list.map((food)=>{
                if (food.id===action.payload){
                    food.quantity+=1;
                }
                return food;
            })
            UpdateQuantity(state.cart);
            UpdateSubtotal(state.cart);
        },
        [decrease_quantity_cart]:(state,action)=>{
            //TODO
            state.cart.food_list.map((food)=>{
                if (food.id===action.payload && food.quantity>0){
                    food.quantity-=1;
                }
                return food;
            })
            UpdateQuantity(state.cart);
            UpdateSubtotal(state.cart);
            return state;
        },
        [delete_food_cart]:(state,action)=>{
            //TODO
            var deleteFood=state.cart.food_list(food=>food.id===action.payload);
            var idx= state.cart.indexOf(deleteFood);
            if (idx!==-1){
                state.cart.food_list.splice(idx,1);
            }
        },
        [next_food_news]:(state,action)=>{
            //TODO
            return state;
        },  
        [back_food_news]:(state,action)=>{
            //TODO
            return state;
        },
        [next_combo_news]:(state,action)=>{
            //TODO
            return state;
        },
        [back_combo_news]:(state,action)=>{
            //TODO
            return state;
        },
        [next_nofi_news]:(state,action)=>{
            //TODO
            return state;
        },
        [back_nofi_news]:(state,action)=>{
            //TODO
            return state;
        },
    extraReducers:{
        [get_cart_actions.loading]:(state,action)=>{
            state.cart.get_status=loading();
        },
        [get_cart_actions.success]:(state, action)=>{
            console.log("CART PAYLOAD:",action.payload);

            state.cart.food_list=action.payload.food_list;
            state.cart.voucher_list=action.payload.voucher_list;
            UpdateSubtotal(state.cart);
            UpdateQuantity(state.cart);
            state.cart.get_status=success();
        },
        [get_cart_actions.error]:(state,action)=>{
            //TODO-nothing
            console.log("CART ERROR");
            state.cart.get_status=error();
        },
        [update_cart_actions.loading]:(state,action)=>{

        },
        [get_news_actions.loading]:(state,action)=>{
            state.news.get_status=loading();
        },
        [get_news_actions.success]:(state, action)=>{
            //TODO
            state.news.get_status=success();
        },
        [get_news_actions.error]:(state,action)=>{
            //TODO
            state.news.get_status=error();
        },
    }
        
    }
});
export default FoodSlice;