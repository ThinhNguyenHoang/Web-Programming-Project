import { createSlice } from '@reduxjs/toolkit';
import { error, generateSagaLifecycleNames, generateStatus, loading, success } from "../../../utils/reduxGenerate";
import {useSelector} from "react-redux";
import userDefaultAvatar from "../../../assets/images/user_default.jpg"
import {get_news_actions} from "../food/FoodSlice";
import {ROUTING_CONSTANTS} from "../../../routes/RouterConfig";
import Toaster from "../../../utils/Toaster/Toaster";
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
 *   avatar
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
        update_profile_status: generateStatus(),
        read_profile_status: generateStatus(),
        profile: {
            account_id: "",
            username: "",
            address: "",
            dob: "",
            email: "",
            point: "",
            phone_number: "",
            full_name: "",
            avatar: "",
            role: "",
        },
    }
}

export const selectors = {
    getUserAvatar: (state) => state.auth.currentUser.avatar,
    getUserName: (state) => state.auth.currentUser.profile.username,
    getUserState: (state) => state.auth.currentUser.profile.role,
    getUserProfile: (state) => state.auth.currentUser.profile,
    getRegisterLoading: (state) => state.auth.currentUser.register_status.isLoading,
    getRegisterSuccess: (state) => state.auth.currentUser.register_status.isSuccess,
    getRegisterError: (state) => state.auth.register_status.isError,
    getUserRole: (state) => state.auth.currentUser.profile.role,

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
export const logout_actions = generateSagaLifecycleNames("logout");
export const register_actions = generateSagaLifecycleNames("register");
export const change_pass_actions = generateSagaLifecycleNames("change_password");
export const update_account_actions = generateSagaLifecycleNames("update_account");
export const delete_account_actions = generateSagaLifecycleNames("delete_account");
export const token_renew_actions = generateSagaLifecycleNames("token_renew")

export const update_user_profile_actions = generateSagaLifecycleNames("update_profile");
export const read_user_profile_actions = generateSagaLifecycleNames("read_profile");
// export const get_user_list_actions = generateStatus("get_user_list");

// TODO: Find a way to better ultilize the message returned from the server

const authSlice = createSlice({
    name: "auth",
    initialState: initialValue,
    reducers: {
        // [change_pass_actions.success]: (state,action)=>{
        //     const {message} = action.payload;
        // }
        load_user_profile_with_token: (state,action) => {
            state.currentUser.profile = action.payload.profile;
            state.currentUser.token = action.payload.token;
            state.currentUser.login_status = success();
        },
        changeUserAvatar:(state,action) => {
            console.log("CHANGE USER AVATAR TO: ",action.payload);
            state.currentUser.profile.avatar = action.payload;
        }
    },
    extraReducers:{
        [login_actions.loading]: (state, action) => {
            state.currentUser.login_status = loading();
        },
        [login_actions.success]: (state, action) => {
            console.log("PAYLOAD:" ,action.payload.data);
            const { token,username,user_profile} = action.payload.data;
            // * Store the token for later retrieval
            localStorage.setItem('token', token);
            console.log("Stored token to local storage: ", token);
            state.currentUser.login_status = success();
            // state.currentUser.profile = user_profile;
            state.currentUser.token = token;
            state.currentUser.profile = {username,...user_profile}
            // state.currentUser.profile.username = username;
            localStorage.setItem("currentUser",state.currentUser);
            const homepage = `${window.location.hostname}${ROUTING_CONSTANTS.HOMEPAGE}`
            window.location.assign(homepage);
        },
        [login_actions.error]: (state, action) => {
            const { message } = action.payload;
            state.currentUser.register_status = error(message)
        },

        [logout_actions.loading]: (state, action) => {
            state.currentUser.login_status = loading();
        },
        [logout_actions.success]: (state, action) => {
            localStorage.removeItem('token');
            state.currentUser.login_status.success = false;
            state.currentUser = initialValue.currentUser;
        },
        [logout_actions.error]: (state, action) => {
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
            console.log("CHANGE PASS SLICE: ",action.payload);
            Toaster.toastSuccessful("Change user password successfully");
            state.currentUser.change_pass_status = success();
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
        },

        [update_user_profile_actions.success]: (state, action) => {
            const user_profile = action.payload.data;
            const username = state.currentUser.profile.username;
            state.currentUser.profile =  {username,...user_profile};
            state.currentUser.update_profile_status = success();
        },
        [update_user_profile_actions.loading]: (state, action) => {
            state.currentUser.update_account_status = loading();
        }
        ,
        [update_user_profile_actions.error]: (state, action) => {
            const { message } = action.payload;
            state.currentUser.update_profile_status = error(message)
        },

        [read_user_profile_actions.success]: (state, action) =>{
            console.log("ACTION PAYLOAD: GET PROFILE: ",action.payload);
            const username = state.currentUser.profile.username;
            const user_profile = action.payload.data;
            state.currentUser.profile =  {...state.currentUser.profile,...user_profile};
            state.currentUser.read_profile_status = success();
            state.currentUser.login_status = success();
        },
        [read_user_profile_actions.loading]: (state, action) => {
            state.currentUser.read_profile_status = loading();
        }
        ,
        [read_user_profile_actions.error]: (state, action) => {
            console.log("AUTH SLICE GET PROFILE ERROR: ",action.payload);
            console.log("CLEARING LOCAL STORAGE");
            Toaster.toastError(action.payload + ` Your session has expired. Please Login again :)`);
            state.currentUser.read_profile_status = error()
        }

    }
});

export const {changeUserAvatar} = authSlice.actions;
export default authSlice;