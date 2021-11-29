import {call, put, takeLatest,putResolve} from "redux-saga/effects";
import Toaster from "../../../utils/Toaster/Toaster";
import { GetOrderService,GetClientService } from "./ManageService";
import { get_order_actions,get_client_actions } from "./ManageSlice";

function* GetOrderSaga({payload}){
    console.log("Get order list data");
    try{
        const res = yield call(GetOrderService,payload);
        yield put({type:get_order_actions.success,payload:res});
        Toaster.toastSuccessful("Get order data success");
    }catch(e){
        Toaster.toastError("Get order data failed"+e.message);
        yield put({type:get_order_actions.error});
    }
}

function* GetClientSaga({payload}){
    console.log("Get client data");
    try{
        const res = yield call(GetClientService,payload);
        yield put({type:get_client_actions.success,payload:res});
        Toaster.toastSuccessful("Get client data sucsess");
    }catch(e){
        Toaster.toastError("Get client data failed"+e.message);
        yield put({type:get_client_actions.error})
    }
}

const watchersManage = function* (){
    yield takeLatest(get_order_actions.loading,GetOrderSaga);
    yield takeLatest(get_client_actions.loading,GetClientSaga);
}
export default watchersManage;