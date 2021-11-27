import {call, put, takeLatest,putResolve,takeEvery} from "redux-saga/effects";
import {
    UpdateCart,
    GetCart,
    AddCartService,
    getFoodRecommendationService,
    addTagService,addFoodService,addMaterialService,updateFoodService,
    deleteFoodService,deleteTagService,deleteMaterialService,getFoodManageService,
    getWishList, addFoodToWishtListService, removeFoodFromWishtListService
} from "./FoodService";
import {
    update_cart_actions,
    get_cart_actions,
    delete_cart_actions,
    add_food_action,add_tag_action,update_food_action,
    delete_tag_action,delete_food_action,add_material_action,delete_material_action,food_management_action,
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
        yield put({type:get_cart_actions.loading,payload:""});
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


function* getFoodManageSaga({payload}){
    try{
        const res=yield call(getFoodManageService,payload);
        yield put({type: food_management_action.success,payload:res});
        Toaster.toastSuccessful("Get data success");
    }catch(e){
        Toaster.toastError("Get data fail"+e.message);
        yield put({type:food_management_action.error});
    }
}
function* deleteTagSaga({payload}){
    try{
        const res=yield call(deleteTagService,payload);
        yield put({type:delete_tag_action.success});
        yield put({type:food_management_action.loading,payload:""});
        Toaster.toastSuccessful("Delete tag success");
    }catch(e){
        Toaster.toastError("delete tag fail \n"+e.message);
        yield put({type:delete_tag_action.error});
    }
}
function* addTagSaga({payload}){
    try{
        const res=yield call(addTagService,payload);
        yield put({type:add_tag_action.success,payload:res});
        yield put({type:food_management_action.loading,payload:""});
        Toaster.toastSuccessful("Add tag success");
    }catch(e){
        Toaster.toastError("Add tag fail \n",e.message);
        yield put({type:add_tag_action.error});
    }
}
function* addFoodSaga({payload}){
    try{
        const res=yield call(addFoodService,payload);
        yield put({type:add_food_action.success,payload:res});
        yield put({type:food_management_action.loading,payload:""});
        Toaster.toastSuccessful("Add food success");
    }catch(e){
        Toaster.toastError("Add food fail \n",e.message);
        yield put({type:add_food_action.error});
    }
}
function* updateFoodSaga({payload}){
    try{
        const res=yield call(updateFoodService,payload);
        yield put({type:update_food_action.success});
        yield put({type:food_management_action.loading,payload:""});
        Toaster.toastSuccessful("Update food success");
    }catch(e){
        Toaster.toastError("Update food fail \n",e.message);
        yield put({type:update_food_action.error});
    }
}
function* deleteFoodSaga({payload}){
    try{
        const res=yield call(deleteFoodService,payload);
        yield put({type:delete_food_action.success,payload:res});
        yield put({type:food_management_action.loading,payload:""});
        Toaster.toastSuccessful("Delete food success");
    }catch(e){
        Toaster.toastError("Delete food fail \n",e.message);
        yield put({type:delete_food_action.error});
    }
}
function* addMaterialSaga({payload}){
    try{
        const res=yield call(addMaterialService,payload);
        yield put({type:add_material_action.success,payload:res});
        yield put({type:food_management_action.loading,payload:""});
        Toaster.toastSuccessful("Add Material success");
    }catch(e){
        Toaster.toastError("Add meterial fail \n",e.message);
        yield put({type:add_material_action.error});
    }
}
function* deleteMaterialSaga({payload}){
    try{
        const res=yield call(deleteMaterialService,payload);
        yield put({type:"delete_exist_material.success",payload:res});
        yield put({type:food_management_action.loading,payload:""});
        Toaster.toastSuccessful("Delete material success");
    }catch(e){
        Toaster.toastError(" fail \n",e.message);
        yield put({type:delete_material_action.error});
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
// * WISH LIST
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
        console.log("SAGA ADD WISHLIST",payload);
        const res = yield call(addFoodToWishtListService,payload);
        yield put({type:add_to_wish_list_actions.success, payload: res})
    }
    catch (e) {
        yield put({type:add_to_wish_list_actions.error,payload:JSON.stringify(e)});
    }
}
function* removeItemFromWishListSaga({payload}){
    try{
        console.log("SAGA REMOVE WISHLIST",payload);
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
    yield takeLatest(delete_cart_actions.loading,DeleteCartSaga);
    yield takeLatest(food_management_action.loading,getFoodManageSaga);
    yield takeLatest(delete_tag_action.loading,deleteTagSaga);
    yield takeLatest(add_tag_action.loading,addTagSaga);
    yield takeLatest(add_food_action.loading,addFoodSaga);
    yield takeLatest(update_food_action.loading,updateFoodSaga);
    yield takeLatest(delete_food_action.loading,deleteFoodSaga);
    yield takeLatest(add_material_action.loading,addMaterialSaga);
    yield takeLatest(delete_material_action.loading,deleteMaterialSaga);
    yield takeLatest(food_recommendation_actions.loading,getFoodRecommendationSaga);

    yield takeEvery(food_wish_list_actions.loading,getWishListSaga);
    yield takeEvery(add_to_wish_list_actions.loading,addItemToWishListSaga);
    yield takeEvery(remove_from_wish_list_actions.loading,removeItemFromWishListSaga);

}
export default watchersFood;