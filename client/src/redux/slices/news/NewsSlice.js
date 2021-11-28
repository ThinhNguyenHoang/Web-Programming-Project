import {create} from "@mui/material/styles/createTransitions";
import {createAction, createSlice} from "@reduxjs/toolkit";
import {error, generateSagaLifecycleNames, generateStatus, loading, success} from "../../../utils/reduxGenerate";
import Toaster from "../../../utils/Toaster/Toaster";

const News = {
    NewsID:"",
    Title:"",
    Picture:"",
    Highlight:"",
    Content:"",
    Author:"",
    Comment:[]
}
const comment ={
    CommentID:"",
    UserID:"",
    UserName:"",
    UserAvatar:"",
    Content:"",
    ImageList:[], //Array url of image
    Reply:[]
}
const Reply = {
    ReplyID:"",
    CommentID:"",
    UserID:"",
    UserName:"",
    UserAvatar:"",
    Content:""
}

const initalValue={
    news_list:[],
    news_detail:News,
    getNewsListStatus:generateStatus(),
    getNewsDetailStatus:generateStatus(),
    addNewsStatus:generateStatus(),
    updateNewsStatus:generateStatus(),
    deleteNewsStatus:generateStatus(),
    addCommentStatus:generateStatus(),
    deleteCommentStatus:generateStatus(),
    updateCommentStatus:generateStatus(),


}

export const selectors = {
    getNewsList: state=>state.news.news_list,
    getNewsDetail:state=>state.news.news_detail,

}

export const get_news_list_action=generateSagaLifecycleNames("get_news_list");
export const get_news_detail_action=generateSagaLifecycleNames("get_news_detail");
export const add_news_action=generateSagaLifecycleNames("add_news");
export const update_news_action=generateSagaLifecycleNames("update_news");
export const delete_news_action=generateSagaLifecycleNames("delete_news");
export const add_news_comment_action=generateSagaLifecycleNames("add_news_comment");
export const update_news_comment_action=generateSagaLifecycleNames("update_news_comment");
export const delete_news_comment_action=generateSagaLifecycleNames("delete_news_comment");
export const set_new_news="set_new_news";


const newsSlice = createSlice({
    name:"news",
    initialState:initalValue,
    reducers:{},
    extraReducers:{
        [get_news_list_action.loading]:(state,action)=>{
            state.getNewsListStatus=loading();
        },
        [get_news_list_action.success]:(state,action)=>{
            state.news_list=action.payload;
            state.getNewsListStatus=success();
        },
        [get_news_list_action.error]:(state,action)=>{
            state.getNewsListStatus=error();
        },
        [get_news_detail_action.loading]:(state,action)=>{
            state.getNewsDetailStatus=loading();
            
        },
        [get_news_detail_action.success]:(state,action)=>{
            state.news_detail=action.payload;
            state.getNewsDetailStatus=success();
        },
        [get_news_detail_action.error]:(state,action)=>{
            state.getNewsDetailStatus=error();
        },
        [add_news_action.loading]:(state,action)=>{
            state.addNewsStatus=loading();
        },
        [add_news_action.success]:(state,action)=>{
            state.addNewsStatus=success();
        },
        [add_news_action.error]:(state,action)=>{
            state.addNewsStatus=error();
        },
        [delete_news_action.loading]:(state,action)=>{
            state.deleteNewsStatus=loading();
        },
        [delete_news_action.success]:(state,action)=>{
            state.deleteNewsStatus=success();
        },
        [delete_news_action.error]:(state,action)=>{
            state.deleteNewsStatus=error();
        },
        [update_news_action.loading]:(state,action)=>{
            state.updateNewsStatus=loading();
        },
        [update_news_action.success]:(state,action)=>{
            state.updateNewsStatus=success();
        },
        [update_news_action.error]:(state,action)=>{
            state.updateNewsStatus=error();
        },
        [add_news_comment_action.loading]:(state,action)=>{
            state.addCommentStatus=loading();
        },
        [add_news_comment_action.success]:(state,action)=>{
            state.addCommentStatus=success();
        },
        [add_news_comment_action.error]:(state,action)=>{
            state.addCommentStatus=error();
        },
        [update_news_comment_action.loading]:(state,action)=>{
            state.updateCommentStatus=loading();
        },
        [update_news_comment_action.success]:(state,action)=>{
            state.updateCommentStatus=success();
        },
        [update_news_comment_action.error]:(state,action)=>{
            state.updateCommentStatus=error();
        },
        [delete_news_comment_action.loading]:(state,action)=>{
            state.deleteCommentStatus=loading();
        },
        [delete_news_comment_action.success]:(state,action)=>{
            state.deleteCommentStatus=success();
        },
        [delete_news_comment_action.error]:(state,action)=>{
            state.deleteCommentStatus=error();
        },
        [set_new_news]:(state,action)=>{
            state.news_detail={
                NewsID:"",
                Title:"",
                Picture:"",
                Highlight:"",
                Content:"",
                Author:"",
                Comment:[]
            }
        }
    }
});
export default newsSlice;