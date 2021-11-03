import * as React from 'react';
import {createAction, createSlice} from '@reduxjs/toolkit';
import { RequestError } from '../../../utils/RequestHelper/errorResponse';
import fimage from "../../../assets/images/foodimg.png";
import axios from 'axios';

export const BaseUrl='http://localhost:3001';


// function getData (){ 
//     const promise= axios.get(`${BaseUrl}/foods`);
//     const promiseData=promise.then(foodList=>foodList.data);
//     const rawData=promiseData.then(data=>data.data);
//     console.log("data from server",rawData);
//     return promiseData;
//     // return promiseData;
//     // return axios.get(`${BaseUrl}/foods`)
//     //         .then(response => response.data)
//     //         .catch(err => console.log("GET FOOD_DATA ERROR")); 
// };
//nệu ko đc thì thôi a, em kiếm phương án khác
// Khong. Minh code dung luon di. Minh vao trong component react ma goi hoac la xai luon saga. de anh code nhanh cho .
// em dinh lam gi day,e tính lây data ra dạng array thoi,mà nó lun trả về promise
// const rawData=getData().then(promiseData=>promiseData.data);
// cai use case nay hoi la :V. Y la tinn lam vay ha ? . Neu muon
// lam kieu nay hoi co van de ti la tai vi ham async no khong co doi data tra ve. ma no chay tiep nen khuc o duoi no gan
// em muon chay X chi sau khi da co data tu server. The thi X mot la phai bo vao trong then cua ham getData. Hoajwc laf phai goi await o top level (cai nay thi khong duoc)
// ma X khong chi la trong file nay. No la ca cai codebase luon. Cai redux store no import 
// const rawData=getData();
// const foodlst=rawData.map((food)=>{
//     const tempFood={
//         id:food.FoodID,
//         fimg:food.Picture,
//         foodname:food.FoodName,
//         foodtype:"Category",
//         fooddescrip:food.Description,
//         price:String(food.Price/1000)+"K",
//     };
//     return tempFood;
// }); 
// console.log(2,foodlst);

const initalFoodlst={
    // cai nay la 1 list ha ? dạ
    foodShow:[],
    // cai any cung la list phai ko dạ ok
    foodHide:[],
}

const nextList=createAction("nextList");
const backList=createAction("backList");
// cái này lổi nói chung là do lúc đầu em code ko quen nên làm tùm lum , nên giờ em mới tính code lại, chứ em cũng ko nhớ nổi nữa,mà vậy đc rồi a,
// Ok. Nhunwg ma cai lay api bo len la anh code mau de em co data hien thoi. Chu luc code that minh dung saga nhe,này em biết mà. okok vay anh out ra, cám ơn anh nhiều,phiền anh quá
export const selectors = {
    getFoodList: (state) => state.foodCardLst.foodShow,  
}
// Khuc code duoi nay hinh nhu em code theo mau. Nhung ma cach code o duoi laf code theo redux thuong. Minh dung createSlice cua
// redux toolkit. Nen khong can phai dung [...state.foodShow]  ma cu lay state.foodShow.push() thang vao thoi 
const foodCardlst= createSlice({
    name:"foodCardLst",
    initialState:initalFoodlst,
    reducers:{
        nextList: (state,action) => {
            const tempfoodShow=[...state.foodShow];
            const tempfoodHide=[...state.foodHide];
            tempfoodShow.push(tempfoodHide.shift());
            tempfoodHide.push(tempfoodShow.shift());
            return {
                foodShow:tempfoodShow,
                foodHide:tempfoodHide
            };
        },
        backList: (state,action) => {
            const tempfoodShow=[...state.foodShow];
            const tempfoodHide=[...state.foodHide];
            tempfoodShow.push(tempfoodHide.shift());
            tempfoodHide.push(tempfoodShow.shift());
            return {
                foodShow:tempfoodShow,
                foodHide:tempfoodHide
            }
            
        },
        addFoodItems: (state,action) =>{
            const foodList = action.payload; 
            console.log("FOOD_LIST IN REDUCER: ",foodList);
            state.foodShow.push(foodList); 
        }
    }
});

export default foodCardlst;
