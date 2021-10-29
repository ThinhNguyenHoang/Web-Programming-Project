import { createSlice } from '@reduxjs/toolkit';
import { error, generateSagaLifecycleNames, generateStatus, loading, success } from "../../../utils/reduxGenerate";

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


const login_actions = generateSagaLifecycleNames("login");
const register_actions = generateSagaLifecycleNames("register");

const auth = createSlice({
    name: "auth",
    initialState: initialValue,
    reducers: {
        [login_actions.loading]: (state, action) => {
            state.login_status = loading();
        },
        [login_actions.success]: (state, action) => {
            console.log("PAYLOAD:" + action.payload);
            const { token, user_profile } = action.payload.data;
            // * Store the token for later retrieval 
            localStorage.setItem('token', token);
            state.currentUser.login_status = success();
            state.currentUser.profile = user_profile;
            state.currentUser.token = token;
        },
        [login_actions.error]: (state, action) => {
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
    }
});
export default auth;