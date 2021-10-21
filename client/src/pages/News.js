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


function News (){
    let history = useHistory();
    const {t, i18n} = useTranslation();
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
                    <ButtonBase>
                        <ArrowBackIosIcon fontSize="large"/>
                    </ButtonBase>
                    
                    <FoodCard/>
                    <FoodCard/>
                    <FoodCard/>
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
                flexDirection: `row`,my:2,ml:"5%"}}>
                <Typography variant="h5">{t(base_keys.form.combo)}</Typography>
            </Box>
            <Box sx={{
                display: `flex`,
                flexDirection: `row`,mx:"auto"}}>
                    <ButtonBase>
                        <ArrowBackIosIcon fontSize="large"/>
                    </ButtonBase>
                    <FoodCard/>
                    <FoodCard/>
                    <FoodCard/>
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