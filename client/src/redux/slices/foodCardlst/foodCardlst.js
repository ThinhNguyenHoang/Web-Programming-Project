import * as React from 'react';
import {createAction, createSlice} from '@reduxjs/toolkit';

import fimage from "../../../assets/images/foodimg.png";

const initfoodcard={
    fimg: {fimage},
    foodname:"Food Name",
    foodtype:"Category",
    fooddescrip:"Fry your onion, peppers and garlic in olive oil until nicely translucent.\nMake a well in your veg and add your chicken.Add your seasoning and salt.",
    price:"300K",
}

const foodlst=["1","2","3","4","5"].map(name=>({
    fimg:initfoodcard.fimg,
    foodname:initfoodcard.foodname+" "+name,
    foodtype:initfoodcard.foodtype,
    fooddescrip:initfoodcard.fooddescrip,
    foodprice:initfoodcard.price
}))

const initalFoodlst={
    foodShow:foodlst.slice(0,3),
    foodHide:foodlst.slice(3),
}

const nextList=createAction("nextList");
const backList=createAction("backList");

const foodCardlst= createSlice({
    name:"foodCardlst",
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
            
        }
    }
});

export default foodCardlst;
