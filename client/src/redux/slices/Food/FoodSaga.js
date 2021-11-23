import {call, put, takeLatest,putResolve} from "redux-saga/effects";
import {
    UpdateCart,
    GetCart,
    GetNews,
    AddCartService,
    GetNewsService,
    getFoodRecommendationService,
    getWishList, addFoodToWishtListService, removeFoodFromWishtListService
} from "./FoodService";
import {
    update_cart_actions,
    get_cart_actions,
    get_news_actions,
    delete_cart_actions,
    add_cart_actions,
    food_recommendation_actions, food_wish_list_actions, add_to_wish_list_actions, remove_from_wish_list_actions
} from "./FoodSlice";
import Toaster from "../../../utils/Toaster/Toaster";
import {GetCartService,GetFoodService,GetVoucherService,UpdateCartService,DeleteCartService} from './FoodService';
import {stringify} from "query-string";

function* UpdateCartSaga({payload}){

    console.log("Update cart Saga",payload);
    try{
        yield call(UpdateCartService,payload);
        yield put({type:update_cart_actions.success});
        Toaster.toastSuccessful("Update cart Successfully");
    }catch(e){
        Toaster.toastError("Update cart faild: " + e.message);
        yield put({type: update_cart_actions.error, payload: e.message});

    }
    //TODO
}

function* GetCartSaga({payload}){
    console.log("Get cart Saga");
    try{
        const res=yield call(GetCartService,payload);
        console.log("res data",res);
        yield put({type:"get_cart.success",payload:res});
        Toaster.toastSuccessful("Load cart Successfully");
        

    }catch(e){
        Toaster.toastError("Load cart faild: " + e.message);
        yield put({type: get_cart_actions.error, payload: ''});
    }
}

function* DeleteCartSaga({payload}){
    console.log("Delete cart item",payload);
    try{
        yield call(DeleteCartService,payload);
        yield put({type:delete_cart_actions.success});
        Toaster.toastSuccessful("Delete success");
    }catch(e){
        Toaster.toastError("Delete faild: " + e.message);
        yield put({type: delete_cart_actions.error});
    }
}

function* AddCartSaga({payload}){
    try{
        yield call(AddCartService,payload);
        yield put({type:add_cart_actions.success});
        Toaster.toastSuccessful("Add success");
    }catch(e){
        Toaster.toastError("Add faild: " + e.message);
        yield put({type:add_cart_actions.error});
    }
}

function* GetNewsSaga({payload}){
    try{
        console.log("Get cart Saga");
        const res= yield call(GetNewsService,payload);
        yield put({type: get_news_actions.success,payload:res});
        Toaster.toastSuccessful("Get news data success");
    }catch (e){
        Toaster.toastError("Get news data faild: " + e.message);
        yield put({type:get_news_actions.error});
    }
}

function* getFoodRecommendationSaga({payload}){
    try{
        const res = yield call(getFoodRecommendationService,payload);
        Toaster.toastSuccessful("SAGA RECOM:",res);
        yield put({type:food_recommendation_actions.success, payload: res})
    }
    catch (e) {
        Toaster.toastError("SAGA RECOM-ERR:",JSON.stringify(e));
        yield put({type:food_recommendation_actions.error,payload:JSON.stringify(e)});
    }
}

function* getWishListSaga({payload}){
    try{
        const res = yield call(getWishList,payload);
        yield put({type:food_wish_list_actions.success, payload: res})
    }
    catch (e) {
        yield put({type:food_wish_list_actions.error,payload:JSON.stringify(e)});
    }
}

function* addItemToWishListSaga({payload}){
    try{
        const res = yield call(addFoodToWishtListService,payload);
        yield put({type:add_to_wish_list_actions.success, payload: res})
    }
    catch (e) {
        yield put({type:add_to_wish_list_actions.error,payload:JSON.stringify(e)});
    }
}
function* removeItemFromWishListSaga({payload}){
    try{
        const res = yield call(removeFoodFromWishtListService,payload);
        yield put({type:remove_from_wish_list_actions.success, payload: res})
    }
    catch (e) {
        yield put({type:remove_from_wish_list_actions.error,payload:JSON.stringify(e)});
    }
}

const watchersFood = function* (){
    yield takeLatest(update_cart_actions.loading, UpdateCartSaga);
    yield takeLatest(get_cart_actions.loading,GetCartSaga);
    yield takeLatest(get_news_actions.loading,GetNewsSaga);
    yield takeLatest(delete_cart_actions.loading,DeleteCartSaga);
    yield takeLatest(add_cart_actions.loading,AddCartSaga);
    yield takeLatest(food_recommendation_actions.loading,getFoodRecommendationSaga);
    yield takeLatest(food_wish_list_actions.loading,getWishListSaga);
    yield takeLatest(add_to_wish_list_actions.loading,addItemToWishListSaga);
    yield takeLatest(remove_from_wish_list_actions.loading,removeItemFromWishListSaga);

}
export default watchersFood;