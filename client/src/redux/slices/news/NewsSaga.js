import {call, put, takeLatest,putResolve,takeEvery} from "redux-saga/effects";
import Toaster from "../../../utils/Toaster/Toaster";
import { get_news_list_action,get_news_detail_action,add_news_action,
        update_news_action,delete_news_action,add_news_comment_action,
        delete_news_comment_action,update_news_comment_action } from "./NewsSlice";
import { getNewsListService,getNewsDetailService,addNewsService,
        deleteNewsService,updateNewsService,addCommentService,
        deleteCommentService,updateCommentService } from './NewsService';

function* getNewsListSaga({payload}){
    try{
        const res=yield call(getNewsListService,payload);
        Toaster.toastSuccessful("Get News list sucess");
        yield put({type:get_news_list_action.success, payload: res});
    }catch(e){
        Toaster.toastError("Get News list fail",e.message);
        yield put({type:get_news_list_action.error});
    }
}
function* getNewsDetailSaga({payload}){
    try{
        const res=yield call(getNewsDetailService,payload);
        Toaster.toastSuccessful("Get News detail sucess");
        yield put({type:get_news_detail_action.success, payload: res});
    }catch(e){
        Toaster.toastError("Get News detail fail",e.message);
        yield put({type:get_news_detail_action.error});
    }
}
function* addNewsSaga({payload}){
    try{
        const res=yield call(addNewsService,payload);
        yield put({type:add_news_action.success, payload: res});
    }catch(e){
        yield put({type:add_news_action.error});
    }
}
function* updateNewsSaga({payload}){
    try{
        const res=yield call(updateNewsService,payload);
        yield put({type:update_news_action.success, payload: res});
    }catch(e){
        yield put({type:update_news_action.error});
    }
}
function* deleteNewsSaga({payload}){
    try{
        const res=yield call(deleteNewsService,payload);
        yield put({type:delete_news_action.success, payload: res});
    }catch(e){
        yield put({type:delete_news_action.error});
    }
}
function* addCommentSaga({payload}){
    try{
        const res=yield call(addCommentService,payload);
        yield put({type:add_news_comment_action.success, payload: res});
    }catch(e){
        yield put({type:add_news_comment_action.error});
    }
}
function* updateCommentSaga({payload}){
    try{
        const res=yield call(updateCommentService,payload);
        yield put({type:update_news_comment_action.success, payload: res});
    }catch(e){
        yield put({type:update_news_comment_action.error});
    }
}
function* deleteCommentSaga({payload}){
    try{
        const res=yield call(deleteCommentService,payload);
        yield put({type:delete_news_comment_action.success, payload: res});
    }catch(e){
        yield put({type:delete_news_comment_action.error});
    }
}

const watchersNews = function* (){
    yield takeLatest(get_news_list_action.loading,getNewsListSaga);
    yield takeLatest(get_news_detail_action.loading,getNewsDetailSaga);
    yield takeLatest(add_news_action.loading,addNewsSaga);
    yield takeLatest(update_news_action.loading,updateNewsSaga);
    yield takeLatest(delete_news_action.loading,deleteNewsSaga);
    yield takeLatest(add_news_comment_action.loading,addCommentSaga);
    yield takeLatest(delete_news_comment_action.loading,deleteCommentSaga);
    yield takeLatest(update_news_comment_action.loading,updateCommentSaga);
}
export default watchersNews;
