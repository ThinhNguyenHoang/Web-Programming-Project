import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Box from '@mui/material/Box';
import { Button, Card, CardActionArea, CardMedia } from '@mui/material';
import { Divider } from '@mui/material';
import { useDispatch } from 'react-redux';
import { delete_news_action } from '../../redux/slices/News/NewsSlice';
import { useHistory } from 'react-router';
import { get_news_detail_action } from './../../redux/slices/News/NewsSlice';
import { ROUTING_CONSTANTS } from './../../routes/RouterConfig';



function NewsCard (props){
    const news=props.news;
    const isAdmin=props.isAdmin;
    const dispatch = useDispatch();
    let history=useHistory();
    let adminAction;
    if(isAdmin){
        adminAction=(
            <CardActionArea>
                <Button onClick={()=>dispatch({type:delete_news_action.loading,payload:news.NewsID})}>Xóa</Button>
                <Button onClick={()=>{
                    // dispatch({type:get_news_detail_action.loading,payload:news.NewsID});
                    history.push(ROUTING_CONSTANTS.EDITNEWS+"/"+news.NewsID);}}>Sửa</Button>
            </CardActionArea>
        );
    }else{
        adminAction=(<></>);
    }
    return (
        <Box sx={{display: `flex`, flexDirection: "column"}}>
            <Divider variant="middle"/>
            <Card sx={{display:"flex",flexDirection:"row",height:128,mb:2, width:1000, my:"10px", bgcolor:"elevation.layer1.main", boxShadow:0, borderRadius:0}}>
                <CardMedia title="nofication" image={news.Picture} sx={{width: 128 ,height: 128,borderBottomLeftRadius:"0",borderTopLeftRadius:"0",flexShrink:0}}/>
                <CardContent sx={{height:128,py:0}}>
                    <CardActionArea>
                        <Typography 
                            variant="subtitle1" 
                            color="initial" 
                            sx={{fontWeight:"bold",fontSize:"large",textOverflow: 'ellipsis',color:"elevation.layer1.contrast"}} 
                            onClick={()=>{
                                            // dispatch({type:get_news_detail_action.loading,payload:news.NewsID});
                                            history.push(ROUTING_CONSTANTS.NEWSINFO+"/"+news.NewsID);}}>
                            {news.Title}
                        </Typography>
                    </CardActionArea>
                    <Typography variant="body1" color="initial" sx={{ height:96,textOverflow: 'ellipsis',overflow: 'hidden', color:"elevation.layer1.contrast"}}>{news.Highlight}</Typography>
                </CardContent>
                {adminAction}
            </Card>
        </Box>
    );
}
export default NewsCard;
