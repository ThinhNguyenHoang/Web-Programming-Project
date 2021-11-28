import * as React from 'react';
import {Box,Typography,Card, Grid,Button} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import NewsCard from '../components/News/newscard';
import NewsCarousel from '../components/News/NewsCarousel';
import { get_news_list_action,selectors } from "../redux/slices/news/NewsSlice"

import { selectors as Auth} from './../redux/slices/auth/AuthSlice';
import { useHistory } from 'react-router-dom';
import { ROUTING_CONSTANTS } from './../routes/RouterConfig';


function News (){
    const dispatch = useDispatch();
    const history=useHistory();
    useEffect(()=>{
        dispatch({type:get_news_list_action.loading,payload:""});
    },[]);
    const news_list= useSelector(selectors.getNewsList);
    const isAdmin=useSelector(Auth.getUserRole)==="ADMIN";

    var addButton;
    if(isAdmin){
        addButton=(<Button sx={{width:"fit-content", mt:"20px", mr:"10px"}} variant="contained" onClick={()=>history.push(ROUTING_CONSTANTS.EDITNEWS+"/add")}>Thêm tin</Button>);
    }else{
        addButton=<></>;
    }

    return (
        <Box sx={{display: `flex`, flexDirection: "column", flexWrap:"wrap"}} justifySelf="center">
            <Grid container xs={12} sx={{bgcolor:"elevation.layer0.main"}}>
                <Grid item container xs={12} sx={{justifyContent:"center", paddingTop: 5, width:"100%"}}>
                    <Box sx={{display:`flex`, flexDirection:"column", justifyContent:"center", bgcolor:"elevation.layer0.main", borderRadius: 5 }} width={1100}>
                        <Typography variant="h4" gutterBottom component="div" sx={{fontWeight:"bold",color:"red", ml:"50px", mt:"10px"}}>
                            Nổi bật
                        </Typography>
                        <NewsCarousel list={news_list}/>
                    </Box>
                </Grid>
            </Grid>
            <Grid container xs={12} sx={{bgcolor:"elevation.layer0.main"}}>
                <Grid item container xs={12} sx={{justifyContent:"center", paddingTop: 5, width:"100%"}}>
                    <Box sx={{display: `flex`, flexDirection: "column",bgcolor:"elevation.layer0.main", width:"fit-content"}}>
                        <Typography variant="h4" gutterBottom component="div" sx={{fontWeight:"bold",color:"red"}}>
                            Tin chính
                        </Typography>
                        {
                           addButton
                        }
                        
                        {news_list.map(news=> <NewsCard key={news.NewsID} news={news} isAdmin={isAdmin}/>)}
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default News;