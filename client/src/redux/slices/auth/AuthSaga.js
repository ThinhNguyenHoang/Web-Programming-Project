import {call, put, takeEvery, takeLatest} from "redux-saga/effects";
import {
    changePasswordService,
    deleteUserAccountService, getUserProfileService,
    loginService,
    registerService,
    updateUserAccountService, updateUserProfileService
} from "./AuthService";
import {
    login_actions,
    register_actions,
    change_pass_actions,
    update_account_actions,
    delete_account_actions,
    update_user_profile_actions, read_user_profile_actions
} from "./AuthSlice";
import Toaster from "../../../utils/Toaster/Toaster";

function* loginUserSaga({ payload }) {
    console.log("Register SAGA called with payload:",payload);
    try {
        const res = yield call(loginService, payload)
        yield put({ type:"login.success", payload:res});
        Toaster.toastSuccessful("Login Successfully");
    } catch (e) {
        yield put({type: login_actions.error, payload: e.message});
    }
}

function* registerUserSaga({ payload }) {
    try {
        const res = yield call(registerService, payload);
        Toaster.toastSuccessful("Created user successfully");
        yield put({ type: register_actions.success, payload:res});
    } catch (e) {
        Toaster.toastError("Register Failed: " + e.message);
        put({ type: register_actions.error, payload: e.message});
    }
}
function* updateUserSaga({ payload }) {
    try {
        const res = yield call(updateUserAccountService, payload);
        yield put({ type: update_account_actions.success, payload:res});
    } catch (e) {
        console.log(e);
        yield put({ type: update_account_actions.error, e });
    }
}
function* deleteUserSaga({ payload }) {
    try {
        const res = yield call(deleteUserAccountService, payload);
        yield put({ type: delete_account_actions.success, payload:res});
    } catch (e) {
        console.log(e);
        yield put({ type: delete_account_actions.error, e });
    }
}

function* changeUserPasswordSaga({payload}) {
    try{
        const res = yield call(changePasswordService, payload);
        console.log("CHANGE PASS SAGA: ",res);
        yield put({type: change_pass_actions.success,payload:res})
    }
    catch (e){
        console.log(e);
        yield put({type:change_pass_actions.error, e})
    }
}

function* updateUserProfileSaga({payload}) {
    try{
        console.log("Saga: updateuser profile");
        const res = yield call(updateUserProfileService, payload);
        yield put({type: update_user_profile_actions.success,payload:res})
    }
    catch (e){
        console.log(e);
        yield put({type:update_user_profile_actions.error})
    }
}

function* getUserProfileSaga(){
    try{
        const res = yield call(getUserProfileService);
        console.log("SAGA GETTING USER PROFILE SUCCESS WITH RES: ",res);

        yield put({type: read_user_profile_actions.success,payload:res})
    }
    catch (e){
        console.log("GET PROFILE ERROR:",e.message);
        yield put({type:read_user_profile_actions.error, payload:e.message})
    }
}

const watchers = function* (){
    yield takeLatest(login_actions.loading, loginUserSaga);
    yield takeLatest(register_actions.loading, registerUserSaga);
    yield takeLatest(change_pass_actions.loading, changeUserPasswordSaga);
    yield takeEvery(update_account_actions.loading, updateUserSaga);
    yield takeLatest(delete_account_actions.loading, deleteUserSaga);

    yield takeLatest(update_user_profile_actions.loading, updateUserProfileSaga);
    yield takeLatest(read_user_profile_actions.loading, getUserProfileSaga);
}

export default watchers;