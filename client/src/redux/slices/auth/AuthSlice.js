import { createSlice } from '@reduxjs/toolkit';
import { error, generateSagaLifecycleNames, generateStatus, loading, success } from "../../../utils/reduxGenerate";
import {ROUTING_CONSTANTS} from "../../../routes/RouterConfig";
import Toaster from "../../../utils/Toaster/Toaster";

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
    },
    // * Manager Only
    user_list: {
        status: generateStatus(),
        data:[]
    },
    remove_user_status: generateStatus(),
    edit_user_status: generateStatus(),
    get_user_detail: generateStatus(),
}

export const selectors = {
    // * Manager Only
    getUserList: (state) => state.auth.user_list.data,
    getUserListSuccess: (state) => state.auth.user_list.status.isSuccess,
    getUserListLoading: (state) => state.auth.user_list.status.isLoading,
    getUserListError: (state) => state.auth.user_list.status.isError,



    // * User Slice
    getUserAvatar: (state) => state.auth.currentUser.profile.avatar,
    getUserName: (state) => state.auth.currentUser.profile.username,
    getUserState: (state) => state.auth.currentUser.profile.role,
    getUserProfile: (state) => state.auth.currentUser.profile,
    getRegisterLoading: (state) => state.auth.currentUser.register_status.isLoading,
    getRegisterSuccess: (state) => state.auth.currentUser.register_status.isSuccess,
    getRegisterError: (state) => state.auth.register_status.isError,
    getUserRole: (state) => state.auth.currentUser.profile.role,
    getAcountId: (state) => state.auth.currentUser.profile.account_id,

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
// * Manager Actions
export const get_user_list_actions = generateSagaLifecycleNames("get_user_list");
export const remove_user_actions = generateSagaLifecycleNames("remove_user");
export const edit_user_actions = generateSagaLifecycleNames("edit_user");
export const get_user_detail_actions = generateSagaLifecycleNames("get_user_detail");

// * Normal User Actions
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
        //  * Manager only
        [get_user_list_actions.loading]: (state, action) => {
            state.user_list.status = loading();
        },
        // TODO: Put the list in to the store
        [get_user_list_actions.success]: (state, action) => {
            state.user_list.data = action.payload.data;
            state.user_list.status = success();
        },
        [get_user_list_actions.error]: (state, action) => {
            state.user_list.status = error();
        },

        [remove_user_actions.loading]: (state, action) => {
            state.user_list.status = loading();
        },
        // TODO: Put the list in to the store
        [remove_user_actions.success]: (state, action) => {
            state.user_list.data = action.payload.data;
            state.user_list.status = success();
        },
        [remove_user_actions.error]: (state, action) => {
            state.user_list.status = error();
        },

        [edit_user_actions.loading]: (state, action) => {
            state.user_list.status = loading();
        },
        // TODO: Put the list in to the store
        [edit_user_actions.success]: (state, action) => {
            const updated_user = action.payload.data;
            state.user_list.data = state.user_list.data.map((item) => {
                if(item.username === updated_user.username){
                    return updated_user;
                }
                return item;
            });

            state.user_list.status = success();
        },
        [edit_user_actions.error]: (state, action) => {
            state.user_list.status = error();
        },

        [get_user_detail_actions.loading]: (state, action) => {
            state.user_list.status = loading();
        },
        // TODO: Put the list in to the store
        [get_user_detail_actions.success]: (state, action) => {
            state.user_list.data = action.payload.data;
            state.user_list.status = success();
        },
        [get_user_detail_actions.error]: (state, action) => {
            state.user_list.status = error();
        },
        // * Every User
        [login_actions.loading]: (state, action) => {
            state.currentUser.login_status = loading();
            window.localStorage.removeItem("token");
            window.localStorage.clear();
            console.log("SAGA CLEARING LOCAL STORAGE");
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
            Toaster.toastError("Login Failed: " + action.payload.message);
            const { message } = action.payload;
            window.localStorage.removeItem("token");
            window.localStorage.clear();


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
            state.currentUser.register_status = loading();
        },
        [register_actions.success]: (state, action) => {
            state.currentUser.register_status = success();
        },
        [register_actions.error]: (state, action) => {
            const { message } = action.payload;
            state.currentUser.register_status = error(message)
        },


        [change_pass_actions.loading]: (state, action) => {
            state.currentUser.change_pass_status = loading();
        },
        [change_pass_actions.success]: (state, action) => {
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
            Toaster.toastSuccessful("Update account success");
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
            localStorage.clear();
            state.currentUser.read_profile_status = error()
        },


    }
});

export const {changeUserAvatar} = authSlice.actions;
export default authSlice;