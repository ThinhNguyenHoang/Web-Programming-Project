import * as React from 'react';
import {Box,Typography,Card} from '@mui/material';
import {base_keys} from "../locales/constants";
import {useHistory} from 'react-router-dom';
import {useTranslation} from "react-i18next";
import ButtonBase from '@mui/material/ButtonBase';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FoodCard from '../components/FoodCard';
import fimg from "../assets/images/foodimg.png";

const initfood={
    fimg:fimg,
    foodname:"Food Name",
    foodtype:"Category",
    fooddescrip:"Fry your onion, peppers and garlic in olive oil until nicely translucent.\nMake a well in your veg and add your chicken.Add your seasoning and salt.",
    price:"300K"
}

function Recommendation (){
    let history = useHistory();
    const {t, i18n} = useTranslation();
    return (
        <div>
        <Box sx={{
            display: `flex`,
            flexDirection: `column`}}>
            <Box sx={{
                display: `flex`,
                flexDirection: `row`,my:2,mx:"auto",ml:"19.5%"}}>
                <Typography variant="h3">{t(base_keys.form.trending)}</Typography>
            </Box>
            <Box sx={{
                display: `flex`,
                flexDirection: `row`,mx:"auto",ml:"19.5%"}}>
                <Typography variant="body1">{t(base_keys.form.trending_description)}</Typography>
            </Box>
            <Box sx={{
                display: `flex`,
                flexDirection: `row`,mx:"auto"}}>
                    <ButtonBase>
                        <ArrowBackIosIcon fontSize="large"/>
                    </ButtonBase>
                    {[initfood,initfood,initfood].map(FoodCard)}
                    <ButtonBase>
                        <ArrowForwardIosIcon fontSize="large"/>
                    </ButtonBase>
            </Box>
        </Box>
        <Box sx={{
            display: `flex`,
            flexDirection: `column`}}>
            <Box sx={{
                display: `flex`,
                flexDirection: `row`,my:2,ml:"19.5%"}}>
                <Typography variant="h3">{t(base_keys.form.everybodyeating)}</Typography>
            </Box>
            <Box sx={{
                display: `flex`,
                flexDirection: `row`,mx:"auto",ml:"19.5%"}}>
                <Typography variant="body1">{t(base_keys.form.everybodyeating_description)}</Typography>
            </Box>
            <Box sx={{
                display: `flex`,
                flexDirection: `row`,mx:"auto"}}>
                    <ButtonBase>
                        <ArrowBackIosIcon fontSize="large"/>
                    </ButtonBase>
                    {[initfood,initfood,initfood].map(FoodCard)}

                    <ButtonBase>
                        <ArrowForwardIosIcon fontSize="large"/>
                    </ButtonBase>
            </Box>
        </Box>
        <Box sx={{
            display: `flex`,
            flexDirection: `column`}}>
            <Box sx={{
                display: `flex`,
                flexDirection: `row`,my:2,ml:"19.5%"}}>
                <Typography variant="h3">{t(base_keys.form.goodforhealth)}</Typography>
            </Box>
            <Box sx={{
                display: `flex`,
                flexDirection: `row`,mx:"auto",ml:"19.5%"}}>
                <Typography variant="body1">{t(base_keys.form.goodforhealth_description)}</Typography>
            </Box>
            <Box sx={{
                display: `flex`,
                flexDirection: `row`,mx:"auto"}}>
                    <ButtonBase>
                        <ArrowBackIosIcon fontSize="large"/>
                    </ButtonBase>
                    {[initfood,initfood,initfood].map(FoodCard)}
                    <ButtonBase>
                        <ArrowForwardIosIcon fontSize="large"/>
                    </ButtonBase>
            </Box>
        </Box>
        </div>
        
    );
}

export default Recommendation;