import { all } from 'redux-saga/effects';
import watchers from "../slices/auth/AuthSaga";
import watchersFood from '../slices/food/FoodSaga';
import watchersNews from '../slices/News/NewsSaga';
import { fork } from 'redux-saga/effects';

export default function* rootSaga(){
    yield fork(watchersFood);
    yield fork(watchers);
    yield fork(watchersNews);
}