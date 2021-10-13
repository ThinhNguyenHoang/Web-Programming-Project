import {createSlice} from '@reduxjs/toolkit';
import {error, generateSagaLifecycleNames, generateStatus, loading, success} from "../../../utils/reduxGenerate";

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
    currentUser:{
        token: "",
        login_status: generateStatus(),
        register_status: generateStatus(),
        profile: {
            userId:"",
            userName:"",
            displayName:"",
            fullName:"",
            dateOfBirth:"",
            email:"",
            point:"",
            bankAccountId:"",
            address:"",
            phoneNumber:"",
        },
    }
}

const login_actions = generateSagaLifecycleNames("login");
const register_actions = generateSagaLifecycleNames("register");

const auth = createSlice({
    name: "auth",
    initialState: initialValue,
    reducers: {
        [login_actions.loading]: (state, action) =>{
            state.login_status = loading();
        },
        [login_actions.success]: (state,action) =>{
            const {token,profile} = action.payload;
            state.login_status = success();
            state.currentUser.profile = profile;
            state.currentUser.token = token;
        },
        [login_actions.error]: (state,action) =>{
            const {code,message} = action.payload;
            state.register_status = error(message)
        },
        [register_actions.loading]: (state, action) =>{
            state.register_status = loading();
        },
        [register_actions.success]: (state,action) =>{
            const {token,profile} = action.payload;
            state.register_status = success();
            state.currentUser.profile = profile;
            state.currentUser.token = token;
        },
        [register_actions.error]: (state,action) =>{
            const {code,message} = action.payload;
            state.register_status = error(message)
        },
    }
});
export default auth;
