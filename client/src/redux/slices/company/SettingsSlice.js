import { createSlice } from '@reduxjs/toolkit';
import { error, generateSagaLifecycleNames, generateStatus, loading, success } from "../../../utils/reduxGenerate";
import authSlice from "../auth/AuthSlice";

const initialValue = {
    status: generateStatus(),
    data: {
        banner: "",
        logo: "",
        name: "",
        phone: "",
        slogan: "",
        address: "",
        description: "",
        color: "",
        length: "",
        lat: "",
        facebook: "",
        mail:"",
        twitter: "",
    }
}

export const company_selectors = {
    getCompanyData: state => state.settings.data,
    getCompanySuccess: state => state.settings.status.isSuccess,
    getCompanyLoading: state => state.settings.status.isLoading,
    getCompanyError: state => state.settings.status.isError,
}

// * Update company info
export const update_company_info_actions = generateSagaLifecycleNames("update_company_info");
export const get_company_info_actions = generateSagaLifecycleNames("get_company_info");

const settingsSlice = createSlice({
    name: "settings",
    initialState: initialValue,
    reducers: {
        changePageBanner:(state,action) => {
            state.data.banner = action.payload;
        },
        changePageLogo:(state,action) => {
            state.data.logo = action.payload;
        }
    },
    extraReducers:{
        [update_company_info_actions.success]: (state,action) => {
            state.data =  action.payload.data;
            state.status = success();
        },
        [update_company_info_actions.loading]: (state,action) => {
            state.status = loading();
        },
        [update_company_info_actions.error]: (state,action) => {
            state.status = error(action.payload);
        },

        [get_company_info_actions.success]: (state,action) => {
            state.data =  action.payload.data;
            state.status = success();
        },
        [get_company_info_actions.loading]: (state,action) => {
            state.status = loading();
        },
        [get_company_info_actions.error]: (state,action) => {
            state.status = error(action.payload);
        }
    }
});

export const {changePageBanner,changePageLogo} = settingsSlice.actions;
export default settingsSlice;