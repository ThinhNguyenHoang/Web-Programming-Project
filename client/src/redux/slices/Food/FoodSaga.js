import {call, put, takeLatest,putResolve} from "redux-saga/effects";
import { UpdateCart,GetCart,GetNews } from "./FoodService";
import { update_cart_actions,get_cart_actions,get_news_actions } from "./FoodSlice";
import Toaster from "../../../utils/Toaster/Toaster";
import {GetCartService,GetFoodService,GetVoucherService,UpdateCartService} from './FoodService';

function* UpdateCartSaga({payload}){
    console.log("Update cart Saga");
    try{
<<<<<<< HEAD
        const res = yield call(UpdateCartService,payload);
        yield put({type:update_cart_actions.success,payload:res})
=======
        yield call(UpdateCartService,payload);
        yield put({type:update_cart_actions.success});
>>>>>>> master/Khoi
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

function* GetNewsSaga({payload}){
    console.log("Get cart Saga");
    yield;
    //TODO
}

const watchersFood = function* (){
    yield takeLatest(update_cart_actions.loading, UpdateCartSaga);
    yield takeLatest(get_cart_actions.loading,GetCartSaga);
    yield takeLatest(get_news_actions.loading,GetNewsSaga);
}
export default watchersFood;