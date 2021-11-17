import * as React from 'react';
import {Box,Typography,Card, Grid} from '@mui/material';
import {base_keys} from "../locales/constants";
import {useHistory} from 'react-router-dom';
import {useTranslation} from "react-i18next";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FoodCard from '../components/News/FoodCard';
import Nofication from '../components/News/Nofication';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from '@mui/material';
import { get_news_actions,selectors } from '../redux/slices/food/FoodSlice'
import { useEffect } from 'react';
function News (){
    let history = useHistory();
    const {t, i18n} = useTranslation();
    const dispatch = useDispatch();
    const news=useSelector(selectors.getNews);
    useEffect(() => {
        console.log("test here 3");
        dispatch({type:get_news_actions.loading,payload:''});
    },[]);
    let foodRender;
    if (window.innerWidth<=500){
        foodRender=[0];
    }
    else if (window.innerWidth<=800){
        foodRender=[0,1];
    }
    else {
        foodRender=[0,1,2];
    }
    
    console.log("hi test here");
    return (
        <Box sx={{
            display:"flex", 
            flexDirection:"column"
        }}>
            <Typography variant="h4" color="initial" sx={{
                fontWeight:"Bold",
                ml:2,
                mt:2,
                mb:2
            }}>
                {t(base_keys.food.sale_off)}
            </Typography>
            <Box sx={{
                display:"flex", 
                flexDirection:"row",
                justifyContent:"center"
                }}>
                <IconButton sx={{
                    borderRadius:"0px",
                    height:"100%", 
                    alignSelf:"center"
                }}>
                    <ArrowBackIosNewIcon sx={{fontSize:60}}/>
                </IconButton>
                
                {foodRender.map((idx)=>{
                    if (news.food_list[idx] === undefined){
                        return;
                    }else {
                        return <FoodCard food={news.food_list[idx]} key={idx}/>;
                    }
                    
                } )}
                

                <IconButton sx={{
                    borderRadius:"0px",
                    height:"100%",
                    alignSelf:"center"
                }}>
                    <ArrowForwardIosIcon sx={{fontSize:60}}/>
                </IconButton>
            </Box>
            <Typography variant="h4" color="initial" sx={{
                fontWeight:"Bold",
                ml:2,
                mt:2,
                mb:2
            }}>
                {t(base_keys.food.combo)}
            </Typography>
            <Box sx={{
                display:"flex", 
                flexDirection:"row",
                justifyContent:"center"
                }}>
                <IconButton sx={{
                    borderRadius:"0px",
                    height:"100%", 
                    alignSelf:"center"
                }}>
                    <ArrowBackIosNewIcon sx={{fontSize:60}}/>
                </IconButton>
                
                {foodRender.map((idx)=> {
                    if (news.food_list[idx] === undefined){
                        return;
                    }else {
                        return <FoodCard food={news.combo_list[idx]} key={idx} />;
                    }
                })}
                

                <IconButton sx={{
                    borderRadius:"0px",
                    height:"100%",
                    alignSelf:"center"}}>
                    <ArrowForwardIosIcon sx={{fontSize:60}}/>
                </IconButton>
            </Box>
            <Box sx={{display:"flex",flexDirection:"row",justifyContent:"space-between",mx:2}}>
                
                <Typography variant="h4" color="initial" sx={{
                        fontWeight:"Bold",
                        mt:2,
                        mb:2
                    }}>
                        {t(base_keys.food.nofication)}
                </Typography>
                <Box sx={{mr:2}}>
                    <IconButton sx={{
                        borderRadius:"0px",
                        height:"100%", 
                        alignSelf:"center"
                    }}>
                        <ArrowBackIosNewIcon sx={{fontSize:30}}/>
                    </IconButton>
                    <IconButton sx={{
                        borderRadius:"0px",
                        height:"100%",
                        alignSelf:"center"
                    }}>
                        <ArrowForwardIosIcon sx={{fontSize:30}}/>
                    </IconButton>
                </Box>
            </Box>
            <Box sx={{display:"flex",flexDirection:"column",justifyContent:"center",mx:4}}>
                {[0,1,2].map((idx)=>{
                    if (news.nofi_list[idx] === undefined){
                        return;
                    }else {
                        return <Nofication nofi={news.nofi_list[idx]} key={idx} />;
                    }
                })}
            </Box>
            
        </Box>
    );
}

export default News;