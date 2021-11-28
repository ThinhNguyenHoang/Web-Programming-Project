import { all, spawn, call } from 'redux-saga/effects';
import watchers from "../slices/auth/AuthSaga";
import watchersFood from '../slices/food/FoodSaga';
import watcherPayment from '../slices/payment/PaymentSaga'
import watchersNews from '../slices/news/NewsSaga';
import { fork } from 'redux-saga/effects';

export default function* rootSaga() {
    // yield all([
    //     watcherPayment(),
    //     watchersFood(),
    //     watchers(),
    // ])
    const sagas = [
        watchers,
        watchersFood,
        watcherPayment,
        watchersNews
    ]
    yield all(sagas.map(saga =>
        spawn(function*() {
            while (true) {
                try {
                    yield call(saga)
                    break
                } catch (e) {
                    console.log(e)
                }
            }
        })));
}