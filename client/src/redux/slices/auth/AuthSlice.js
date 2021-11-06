import { createSlice } from '@reduxjs/toolkit';
import { error, generateSagaLifecycleNames, generateStatus, loading, success } from "../../../utils/reduxGenerate";
import {useSelector} from "react-redux";
/*
 * Sample user profile:
 * profile: {
 *   userId:
 *   userName:
 *   fullName:
 *   dateOfBirth:
 *   email:
 *   point:
 *   bankAccountId:
 *   address:
 *   phoneNumber:
 * }
 */
const initialValue = {
    currentUser: {
        token: "",
        login_status: generateStatus(),
        register_status: generateStatus(),
        change_pass_status: generateStatus(),
        update_account_status: generateStatus(),
        delete_account_status: generateStatus(),
        token_renew_status: generateStatus(),
        profile: {
            account_id: "",
            address: "",
            dob: "",
            email: "",
            point: "",
            phone_number: "",
            full_name: ""
        },
    }
}

export const selectors = {
    getRegisterLoading: (state) => state.auth.currentUser.register_status.isLoading,
    getRegisterSuccess: (state) => state.auth.currentUser.register_status.isSuccess,
    getRegisterError: (state) => state.auth.register_status.isError,

    getLoginLoading: (state) => state.auth.currentUser.login_status.isLoading,
    getLoginSuccess: (state) => state.auth.currentUser.login_status.isSuccess,
    getLoginError: (state) => state.auth.currentUser.login_status.isError,

    getChangePasswordLoading: (state) => state.auth.currentUser.change_pass_status.isLoading,
    getChangePasswordSuccess: (state) => state.auth.currentUser.change_pass_status.isSuccess,
    getChangePasswordError: (state) => state.auth.currentUser.change_pass_status.isError,

    // ! UPDATE AND DELETE ACCOUNT NOT TESTED: BOTH ON SERVER AND CLIENT
    getUpdateAccountLoading: (state) => state.auth.currentUser.update_account_status.isLoading,
    getUpdateAccountSuccess: (state) => state.auth.currentUser.update_account_status.isSuccess,
    getUpdateAccountError: (state) => state.auth.currentUser.update_account_status.isError,

    getDeleteAccountLoading: (state) => state.auth.currentUser.delete_account_status.isLoading,
    getDeleteAccountSuccess: (state) => state.auth.currentUser.delete_account_status.isSuccess,
    getDeleteAccountError: (state) => state.auth.currentUser.delete_account_status.isError,
}


export const login_actions = generateSagaLifecycleNames("login");
export const register_actions = generateSagaLifecycleNames("register");
export const change_pass_actions = generateSagaLifecycleNames("change_password");
export const update_account_actions = generateSagaLifecycleNames("update_account");
export const delete_account_actions = generateSagaLifecycleNames("delete_account");
export const token_renew_actions = generateSagaLifecycleNames("token_renew");

// export const get_user_list_actions = generateStatus("get_user_list");

// TODO: Find a way to better ultilize the message returned from the server

const authSlice = createSlice({
    name: "auth",
    initialState: initialValue,
    reducers: {
        // [change_pass_actions.success]: (state,action)=>{
        //     const {message} = action.payload;
        // }
    },
    extraReducers:{
        [login_actions.loading]: (state, action) => {
            state.currentUser.login_status = loading();
        },
        [login_actions.success]: (state, action) => {
            console.log("PAYLOAD:" ,action.payload.data);
            const { token} = action.payload.data;
            // * Store the token for later retrieval
            localStorage.setItem('token', token);
            console.log("Stored token to local storage: ", token);
            state.currentUser.login_status = success();
            // state.currentUser.profile = user_profile;
            state.currentUser.token = token;
        },
        [login_actions.error]: (state, action) => {
            const { message } = action.payload;
            state.currentUser.register_status = error(message)
        },

        [register_actions.loading]: (state, action) => {
            console.log("HUHUHU");
            state.currentUser.register_status = loading();
        },
        [register_actions.success]: (state, action) => {
            console.log("REG_SUCCESS");
            state.currentUser.register_status = success();
        },
        [register_actions.error]: (state, action) => {
            console.log("Payload Received:", action);
            const { message } = action.payload;
            state.currentUser.register_status = error(message)
        },


        [change_pass_actions.loading]: (state, action) => {
            state.currentUser.change_pass_status = loading();
        },
        [change_pass_actions.success]: (state, action) => {
            const { message } = action.payload;
            state.currentUser.change_pass_status = success(message);
        },
        [change_pass_actions.error]: (state, action) => {
            const { message } = action.payload;
            state.currentUser.change_pass_status = error(message)
        },


        [update_account_actions.loading]: (state, action) => {
            state.currentUser.update_account_status = loading();
        },
        [update_account_actions.success]: (state, action) => {
            const { message } = action.payload;
            state.currentUser.update_account_status = success(message);
        },
        [update_account_actions.error]: (state, action) => {
            const { message } = action.payload;
            state.currentUser.update_account_status = error(message)
        },


        [delete_account_actions.loading]: (state, action) => {
            state.currentUser.delete_account_status = loading();
        },
        [delete_account_actions.success]: (state, action) => {
            const { message } = action.payload;
            state.currentUser.delete_account_status = success(message);
        },
        [delete_account_actions.error]: (state, action) => {
            const { message } = action.payload;
            state.currentUser.delete_account_status = error(message)
        },
        [token_renew_actions.success]: (state,action) =>{
            const {token} = action.payload.data;
            localStorage.setItem('token', token);
            console.log("Update token:", token);
        }
    }
});

export default authSlice;