import { configureStore } from '@reduxjs/toolkit'
import auth from "../slices/auth/auth";

export const store = configureStore({
    reducer: {
        auth: auth.reducer,
    },
})