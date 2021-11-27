import { all } from 'redux-saga/effects';
import watchers from "../slices/auth/AuthSaga";
import watchersFood from '../slices/food/FoodSaga';
import watcherPayment from '../slices/payment/PaymentSaga'
import { fork } from 'redux-saga/effects';

export default function* rootSaga(){
    yield fork(watcherPayment);
    yield fork(watchersFood);
    yield fork(watchers);
}