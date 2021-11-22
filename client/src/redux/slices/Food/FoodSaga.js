import {call, put, takeLatest,putResolve} from "redux-saga/effects";
import { UpdateCart,GetCart,GetNews, AddCartService, GetNewsService, getFoodManageService } from "./FoodService";
import { update_cart_actions,get_cart_actions,get_news_actions, delete_cart_actions, add_cart_actions, 
    food_management,delete_tag,add_tag,add_food,update_food,delete_food,add_material,delete_material } from "./FoodSlice";
import Toaster from "../../../utils/Toaster/Toaster";
import {GetCartService,GetFoodService,GetVoucherService,UpdateCartService,DeleteCartService,
    deleteTagService,addTagService,addFoodService,updateFoodService,deleteFoodService,addMaterialService,deleteMaterialService} from './FoodService';
import { loading } from "../../../utils/reduxGenerate";

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
function* getFoodManageSaga({payload}){
    try{
        const res=yield call(getFoodManageService,payload);
        yield put({type: food_management.success,payload:res});
        Toaster.toastSuccessful("Get data success");
    }catch(e){
        Toaster.toastError("Get data fail"+e.message);
        yield put({type:food_management.error});
    }
}
function* deleteTagSaga({payload}){
    try{
        const res=yield call(deleteTagService,payload);
        yield put({type:delete_tag.success});
        yield put({type:food_management.loading,payload:""});
        Toaster.toastSuccessful("Delete tag success");
    }catch(e){
        Toaster.toastError("delete tag fail \n"+e.message);
        yield put({type:delete_tag.error});
    }
}
function* addTagSaga({payload}){
    try{
        const res=yield call(addTagService,payload);
        yield put({type:add_tag.success,payload:res});
        yield put({type:food_management.loading,payload:""});
        Toaster.toastSuccessful("Add tag success");
    }catch(e){
        Toaster.toastError("Add tag fail \n",e.message);
        yield put({type:add_tag.error});
    }
}
function* addFoodSaga({payload}){
    try{
        const res=yield call(addFoodService,payload);
        yield put({type:add_food.success,payload:res});
        yield put({type:food_management.loading,payload:""});
        Toaster.toastSuccessful("Add food success");
    }catch(e){
        Toaster.toastError("Add food fail \n",e.message);
        yield put({type:add_food.error});
    }
}
function* updateFoodSaga({payload}){
    try{
        const res=yield call(updateFoodSaga,payload);
        yield put({type:update_food.success,payload:res});
        yield put({type:food_management.loading,payload:""});
        Toaster.toastSuccessful("Update food success");
    }catch(e){
        Toaster.toastError("Update food fail \n",e.message);
        yield put({type:update_food.error});
    }
}
function* deleteFoodSaga({payload}){
    try{
        const res=yield call(deleteFoodService,payload);
        yield put({type:delete_food.success,payload:res});
        yield put({type:food_management.loading,payload:""});
        Toaster.toastSuccessful("Delete food success");
    }catch(e){
        Toaster.toastError("Delete food fail \n",e.message);
        yield put({type:delete_food.error});
    }
}
function* addMaterialSaga({payload}){
    try{
        const res=yield call(addMaterialService,payload);
        yield put({type:add_material.success,payload:res});
        yield put({type:food_management.loading,payload:""});
        Toaster.toastSuccessful("Add Material success");
    }catch(e){
        Toaster.toastError("Add meterial fail \n",e.message);
        yield put({type:add_material.error});
    }
}
function* deleteMaterialSaga({payload}){
    try{
        const res=yield call(deleteMaterialService,payload);
        yield put({type:delete_material.success,payload:res});
        yield put({type:food_management.loading,payload:""});
        Toaster.toastSuccessful("Delete material success");
    }catch(e){
        Toaster.toastError(" fail \n",e.message);
        yield put({type:delete_material.error});
    }
}




const watchersFood = function* (){
    yield takeLatest(update_cart_actions.loading, UpdateCartSaga);
    yield takeLatest(get_cart_actions.loading,GetCartSaga);
    yield takeLatest(get_news_actions.loading,GetNewsSaga);
    yield takeLatest(delete_cart_actions.loading,DeleteCartSaga);
    yield takeLatest(add_cart_actions.loading,AddCartSaga);
    yield takeLatest(food_management.loading,getFoodManageSaga);
    yield takeLatest(delete_tag.loading,deleteTagSaga);
    yield takeLatest(add_tag.loading,addTagSaga);
    yield takeLatest(add_food.loading,addFoodSaga);
    yield takeLatest(update_food.loading,updateFoodSaga);
    yield takeLatest(delete_food.loading,deleteFoodSaga);
    yield takeLatest(add_material.loading,addMaterialSaga);
    yield takeLatest(delete_material.loading,deleteMaterialSaga);
}
export default watchersFood;