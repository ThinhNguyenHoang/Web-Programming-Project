import * as React from 'react';
import {Box,Typography,Card, Grid} from '@mui/material';
import {base_keys} from "../locales/constants";
import {useHistory} from 'react-router-dom';
import {useTranslation} from "react-i18next";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from '@mui/material';
import { get_news_actions,selectors } from '../redux/slices/food/FoodSlice'
import { useEffect } from 'react';
import NewsCard from '../components/News/newscard';
import NewsCarousel from '../components/News/NewsCarousel';
import Divider from '@mui/material/Divider';

const fake_news = {
    title: "This is title",
    img : "https://codelearn.io/Upload/Blog/database-change-notification-oracle-63742419191.3747.jpg",
    description: "this is descriptionnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn"
}

function News (){
    return (
        <Box sx={{display: `flex`, flexDirection: "column", justifyContent:"center"}}>
            <Grid container xs={12} sx={{bgcolor:"elevation.layer0.main"}}>
                <Grid item container xs={12} sx={{justifyContent:"center", paddingTop: 5, width:"100%"}}>
                    <Box sx={{display:`flex`, flexDirection:"column", justifyContent:"center", bgcolor:"elevation.layer0.main", borderRadius: 5 }} width={1100}>
                        <Typography variant="h4" gutterBottom component="div" sx={{fontWeight:"bold",color:"red", ml:"10px", mt:"10px"}}>
                            Nổi bật
                        </Typography>
                        <NewsCarousel/>
                    </Box>
                </Grid>
            </Grid>
            <Divider variant="middle" />
            <Box sx={{display: `flex`, flexDirection: "column", justifyContent:"center",bgcolor:"elevation.layer0.main"}}>
            {[1,2,3,4,5,6,7,8].map(idx=> <NewsCard key={idx} news={fake_news}/>)}
            </Box>
        </Box>
    );
}

export default News;