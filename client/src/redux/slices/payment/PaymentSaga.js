import {call, put, takeLatest} from "redux-saga/effects";

import Toaster from "../../../utils/Toaster/Toaster";
import {
    addNewBankAccountService, deleteBankAccountService, editBankAccountService,
    getBankAccountItemService,
    getBankAccountListService,
    getTransactionItemService,
    getTransactionListService,
    makePaymentService
} from "./PaymentService";
import {
    add_bank_account_detail_actions,
    edit_bank_account_detail_actions,
    get_bank_account_detail_actions,
    get_bank_accounts_actions,
    get_list_transactions_actions,
    get_transaction_detail_actions, make_payment_actions, remove_bank_account_detail_actions
} from "./PaymentSlice";



function* getTransactionListSaga({ payload }) {
    try {
        const res = yield call(getTransactionListService, payload)
        yield put({ type:get_list_transactions_actions.success, payload:res});
    } catch (e) {
        yield put({type: get_list_transactions_actions.error, payload: e.message});
    }
}

function* getTransactionDetailSaga({ payload }) {
    try {
        const res = yield call(getTransactionItemService, payload)
        yield put({ type:get_transaction_detail_actions.success, payload:res});
    } catch (e) {
        yield put({type: get_transaction_detail_actions.error, payload: e.message});
    }
}

// TODO: THIS IS NOT COMPLETE. REMEMBER TO FIX IT
function* makePaymentSaga({ payload }) {
    try {
        const res = yield call(makePaymentService, payload)
        yield put({ type:makePaymentService.success, payload:res});
    } catch (e) {
        yield put({type: makePaymentService.error, payload: e.message});
    }
}

function* getBankAccountListSaga({ payload }) {
    try {
        const res = yield call(getBankAccountListService, payload)
        yield put({ type:get_bank_accounts_actions.success, payload:res});
    } catch (e) {
        yield put({type: get_bank_accounts_actions.error, payload: e.message});
    }
}

function* getBankAccountDetailSaga({ payload }) {
    try {
        const res = yield call(getBankAccountListService, payload)
        yield put({ type:get_bank_account_detail_actions.success, payload:res});
    } catch (e) {
        yield put({type: get_bank_account_detail_actions.error, payload: e.message});
    }
}

function* editBankAccountDetailSaga({ payload }) {
    try {
        const res = yield call(editBankAccountService, payload)
        yield put({ type:edit_bank_account_detail_actions.success, payload:res});
    } catch (e) {
        yield put({type: edit_bank_account_detail_actions.error, payload: e});
    }
}

function* addBankAccountSaga({ payload }) {
    try {
        const res = yield call(addNewBankAccountService, payload)
        yield put({ type:add_bank_account_detail_actions.success, payload:res});
    } catch (e) {
        yield put({type: add_bank_account_detail_actions.error, payload: e});
    }
}

function* removeBankAccountSaga({ payload }) {
    try {
        const res = yield call(deleteBankAccountService, payload)
        yield put({ type:remove_bank_account_detail_actions.success, payload:res});
    } catch (e) {
        yield put({type: remove_bank_account_detail_actions.error, payload: e});
    }
}


const watchers = function* (){
    yield takeLatest(get_list_transactions_actions.loading, getTransactionListSaga);
    yield takeLatest(make_payment_actions.loading, makePaymentSaga);
    yield takeLatest(get_transaction_detail_actions.loading, getTransactionDetailSaga);

    yield takeLatest(get_bank_accounts_actions.loading, getBankAccountListSaga);
    yield takeLatest(get_bank_account_detail_actions.loading, getBankAccountDetailSaga);
    yield takeLatest(add_bank_account_detail_actions.loading, addBankAccountSaga);
    yield takeLatest(remove_bank_account_detail_actions.loading, removeBankAccountSaga);
    yield takeLatest(edit_bank_account_detail_actions.loading, editBankAccountDetailSaga);
}

export default watchers;