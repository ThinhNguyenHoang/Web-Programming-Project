import {create} from "@mui/material/styles/createTransitions";
import {createAction, createSlice} from "@reduxjs/toolkit";
import {error, generateSagaLifecycleNames, generateStatus, loading, success} from "../../../utils/reduxGenerate";
import {UpdateDiscount, UpdateSubtotal, UpdateQuantity} from "./FoodHelper";
import Toaster from "../../../utils/Toaster/Toaster";

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
    material: []
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
        food_list: [],
        combo_list: [],
        nofi_list: [],
        get_status: generateStatus(),
        addCart_status: generateStatus(),
    },
    recommendations: {
        status: generateStatus(),
        food_list: [],
    },
    wish_list: {
        status: generateStatus(),
        food_list: [],
    },

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

    // * Food recommendation
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
        [next_food_news]: (state, action) => {
            state.news.food_list.push(state.news.food_list.shift());
        },
        [back_food_news]: (state, action) => {
            state.news.food_list.unshift(state.news.food_list.pop());
        },
        [next_combo_news]: (state, action) => {
            state.news.combo_list.push(state.news.combo_list.shift());
        },
        [back_combo_news]: (state, action) => {
            state.news.combo_list.unshift(state.news.combo_list.pop());
        },
        [next_nofi_news]: (state, action) => {
            state.news.nofi_list.push(state.news.nofi_list.splice(0, 3));
        },
        [back_nofi_news]: (state, action) => {
            state.news.nofi_list.unshift(state.news.nofi_list.splice(-1, 3));
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
        [get_news_actions.loading]: (state, action) => {
            console.log("test here 2")
            state.news.get_status = loading();
        },
        [get_news_actions.success]: (state, action) => {
            state.news.get_status = success();
            state.news.food_list = action.payload.food_list;
            state.news.combo_list = action.payload.combo_list;
            state.news.nofi_list = action.payload.nofi_list;
        },
        [get_news_actions.error]: (state, action) => {
            state.news.get_status = error();
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

        [food_recommendation_actions.success]: (state, action) => {
            // Expect the list of food
            state.recommendations.food_list = action.payload.data;
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

