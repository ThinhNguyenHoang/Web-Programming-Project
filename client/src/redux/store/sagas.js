import { all } from 'redux-saga/effects';
import watchers from "../slices/auth/AuthSaga";
import watchersFood from '../slices/Food/FoodSaga';
import { fork } from 'redux-saga/effects';

export default function* rootSaga(){
    yield fork(watchersFood);
    yield fork(watchers)
}