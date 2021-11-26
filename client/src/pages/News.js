import * as React from 'react';
import {Box,Typography,Card, Grid} from '@mui/material';
import {base_keys} from "../locales/constants";
import {useHistory} from 'react-router-dom';
import {useTranslation} from "react-i18next";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from '@mui/material';
import { useEffect } from 'react';
import NewsCard from '../components/News/newscard';
import NewsCarousel from '../components/News/NewsCarousel';
import Divider from '@mui/material/Divider';
import { get_news_list_action,selectors } from '../redux/slices/News/NewsSlice';

import { selectors as Auth} from './../redux/slices/auth/AuthSlice';


const fake_news = {
    title: "Sách góp phần phát huy trí tuệ, phẩm chất con người Việt Nam",
    img : "https://codelearn.io/Upload/Blog/database-change-notification-oracle-63742419191.3747.jpg",
    description: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"
}

function News (){
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch({type:get_news_list_action.loading,paload:""});
    },[]);
    const news_list= useSelector(selectors.getNewsList);
    const isAdmin=useSelector(Auth.getUserRole)==="ADMIN";



    return (
        <Box sx={{display: `flex`, flexDirection: "column", flexWrap:"wrap"}} justifySelf="center">
            <Grid container xs={12} sx={{bgcolor:"elevation.layer0.main"}}>
                <Grid item container xs={12} sx={{justifyContent:"center", paddingTop: 5, width:"100%"}}>
                    <Box sx={{display:`flex`, flexDirection:"column", justifyContent:"center", bgcolor:"elevation.layer0.main", borderRadius: 5 }} width={1100}>
                        <Typography variant="h4" gutterBottom component="div" sx={{fontWeight:"bold",color:"red", ml:"50px", mt:"10px"}}>
                            Nổi bật
                        </Typography>
                        <NewsCarousel/>
                    </Box>
                </Grid>
            </Grid>
            <Grid container xs={12} sx={{bgcolor:"elevation.layer0.main"}}>
                <Grid item container xs={12} sx={{justifyContent:"center", paddingTop: 5, width:"100%"}}>
                    <Box sx={{display: `flex`, flexDirection: "column",bgcolor:"elevation.layer0.main", width:"fit-content"}}>
                        <Typography variant="h4" gutterBottom component="div" sx={{fontWeight:"bold",color:"red"}}>
                            Tin chính
                        </Typography>
                        {news_list.map(news=> <NewsCard key={news.NewsID} news={news} isAdmin={isAdmin}/>)}
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default News;