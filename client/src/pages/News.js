import * as React from 'react';
import {Box,Typography,Card} from '@mui/material';
import {base_keys} from "../locales/constants";
import {useHistory} from 'react-router-dom';
import {useTranslation} from "react-i18next";
import ButtonBase from '@mui/material/ButtonBase';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FoodCard from '../components/FoodCard';
import Nofication from '../components/Nofication';

import { store } from '../redux/index';
import foodCardlst,{selectors,BaseUrl} from '../redux/slices/foodCardlst/foodCardlst';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

function News (){
    let history = useHistory();
    const {t, i18n} = useTranslation();
    const foodLst= useSelector( selectors.getFoodList);
    const dispatch = useDispatch();
    console.log(JSON.stringify(foodLst));
    console.log(foodCardlst);
    // THINH CODE: 
    React.useEffect( ()=>{
        const foodData = axios.get(`${BaseUrl}/foods`)
        .then(response => {
            console.log("Food data in News: ", response.data); 
            dispatch(foodCardlst.actions.addFoodItems(response.data));    
        })
        .catch((err) =>{
            console.log("ERROR FETCHING DATA IN NEWS", err);
        });
    },[]);
    // END THINH CODE em xem anh bo vao store dung chua 

    return (
        <div>
        <Box sx={{
            display: `flex`,
            flexDirection: `column`}}>
            <Box sx={{
                display: `flex`,
                flexDirection: `row`,my:2,ml:"5%"}}>
                <Typography variant="h5">{t(base_keys.form.sale_off)}</Typography>
            </Box>
            <Box sx={{
                display: `flex`,
                flexDirection: `row`,mx:"auto"}}>
                    <ButtonBase onClick={ () => dispatch(foodCardlst.actions.backList())}>
                        <ArrowBackIosIcon fontSize="large" />
                    </ButtonBase>
                    {foodLst.map(foods => <FoodCard foodinfo={foods} key={foods.FoodName}/>)}
                    <ButtonBase onClick={ () => dispatch(foodCardlst.actions.nextList())}>
                        <ArrowForwardIosIcon fontSize="large"/>
                    </ButtonBase>
                    
                
            </Box>
        </Box>
        <Box sx={{
            display: `flex`,
            flexDirection: `column`}}>
            <Box sx={{
                display: `flex`,
                flexDirection: `row`,my:2,ml:"5%"}}>
                <Typography variant="h5">{t(base_keys.form.combo)}</Typography>
            </Box>
            <Box sx={{
                display: `flex`,
                flexDirection: `row`,mx:"auto"}}>
                    <ButtonBase onClick={ () => dispatch(foodCardlst.actions.backList())}>
                        <ArrowBackIosIcon fontSize="large"/>
                    </ButtonBase>
                    {foodLst.map((foods) => {return <FoodCard foodinfo={foods} key={foods.foodname}/>})}

                    <ButtonBase onClick={ () => dispatch(foodCardlst.actions.nextList())} >
                        <ArrowForwardIosIcon fontSize="large"/>
                    </ButtonBase>
                
            </Box>
        </Box>
        <Box sx={{
            display: `flex`,
            flexDirection: `column`}}>
            <Box sx={{
                display: `flex`,
                flexDirection: `row`,my:2}}>
                <Typography sx={{flexGrow: `1`,ml:"5%"}} variant="h5">{t(base_keys.form.nofication)}</Typography>
                <Box sx={{mr:"15%"}}>
                    <ButtonBase >
                        <ArrowBackIosIcon />
                    </ButtonBase>
                    <ButtonBase >
                        <ArrowForwardIosIcon />
                    </ButtonBase>
                </Box>
            </Box>
            <Box sx={{
                display: `flex`,
                flexDirection: `column`,mx:"auto"}}>
                <Nofication/>
                <Nofication/>
                <Nofication/>
            </Box>
        </Box>
        </div>
    );
}

export default News;