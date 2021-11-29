import { all, spawn, call } from 'redux-saga/effects';
import watchers from "../slices/auth/AuthSaga";
import watchersFood from '../slices/food/FoodSaga';
import watcherPayment from '../slices/payment/PaymentSaga'
import watchersNews from '../slices/news/NewsSaga';
import watchersManage from '../slices/Manage/ManageSaga';
import watchersSettings from "../slices/company/SettingsSaga";
import { fork } from 'redux-saga/effects';

export default function* rootSaga() {
    const sagas = [
        watchers,
        watchersFood,
        watcherPayment,
        watchersNews,
        watchersManage,
        watchersSettings
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