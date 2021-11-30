import {call, put, takeLatest} from "redux-saga/effects";
import {getPageSettingService, updatePageSettingService} from "./SettingsService";
import {get_company_info_actions, update_company_info_actions} from "./SettingsSlice";




function* updatePageSettingsSaga({ payload }) {
    try {
        const res = yield call(updatePageSettingService, payload)
        yield put({ type:update_company_info_actions.success, payload:res});
    } catch (e) {
        yield put({type: update_company_info_actions.error, payload: e.message});
    }
}

function* getPageSettingsSaga({ payload }) {
    try {
        const res = yield call(getPageSettingService, payload)
        yield put({ type:get_company_info_actions.success, payload:res});
    } catch (e) {
        yield put({type: get_company_info_actions.error, payload: e.message});
    }
}

const watchersSettings = function* (){
    yield takeLatest(update_company_info_actions.loading, updatePageSettingsSaga);
    yield takeLatest(get_company_info_actions.loading, getPageSettingsSaga);
}

export default watchersSettings;