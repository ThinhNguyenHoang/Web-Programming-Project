import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import authSlice from '../slices/auth/AuthSlice';
import FoodSlice from '../slices/food/FoodSlice';
import paymentSlice from "../slices/payment/PaymentSlice";
import createSagaMiddleware from 'redux-saga';

import rootSaga from "./sagas";


const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware];
const middleware = [...getDefaultMiddleware({thunk: false}), ...middlewares];
console.log("REDUCER OF AUTH: ", authSlice);

const reducer = {
    auth: authSlice.reducer,
    food: FoodSlice.reducer,
    payment: paymentSlice.reducer,
}

const store = configureStore({
    reducer,
    middleware: middleware
})


sagaMiddleware.run(rootSaga);

console.log("STORE CREATED: ", store);

export default store;
