import { configureStore } from '@reduxjs/toolkit'
import auth from "../slices/auth/auth";
import foodCardlst from '../slices/foodCardlst/foodCardlst';

export const store = configureStore({
    reducer: {
        auth: auth.reducer,
        foodCardlst:foodCardlst.reducer
    },
})