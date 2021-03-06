import { createAction, createSlice } from "@reduxjs/toolkit";
import { error, generateSagaLifecycleNames, generateStatus, loading, success } from "../../../utils/reduxGenerate";

const user_init={
    id:0,
    name:'',
    sex:0,
    phone:'',
    email:'',
    address:'',
    lastModified:'',
}
const order_init={
    id:"",
    time:"",
    description:"",
    amount:"",
    sale_percent:"",
    food_list:[],
    combo_list:[]
}
const inital_state={
    client:{
        client_list:[],
        get_client_status: generateStatus(),
        filter:'',
    },
    order:{
        order_list:[],
        get_order_status : generateStatus(),
        filter:'',
    },

}

export const Mselectors={
    getClient: state=> state.manage.client,
    getOrder: state=>state.manage.order.order_list,
}

export const get_client_actions = generateSagaLifecycleNames("get_client");

export const get_order_actions = generateSagaLifecycleNames("get_order");

const ManageSlice = createSlice({
    name:"manage",
    initialState:inital_state,
    reducers:{},
    extraReducers:{
        [get_client_actions.loading]: (state,action)=>{
            state.client.get_client_status=loading();
        },
        [get_client_actions.success]: (state,action)=>{
            state.client.get_client_status=success();
            state.client.client_list=action.payload.client_list;
        },
        [get_client_actions.error]: (state,action)=>{
            state.client.get_client_status=error();
        },
        [get_order_actions.loading]: (state,action)=>{
            state.order.get_order_status=loading();
        },
        [get_order_actions.success]: (state,action)=>{
            state.order.order_list=action.payload;
            state.order.get_order_status=success();
            
        },
        [get_order_actions.error]: (state,action)=>{
            state.order.get_order_status=error();
        }
    }
});
export default ManageSlice;