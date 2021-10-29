import { all } from 'redux-saga/effects';
import watchers from "../slices/auth/AuthSaga";
import { fork } from 'redux-saga/effects';

export default function* rootSaga(){
    yield fork(watchers);
}