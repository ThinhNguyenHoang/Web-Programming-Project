import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Box from '@mui/material/Box';
import { Card, CardActionArea, CardMedia } from '@mui/material';
import { Divider } from '@mui/material';

function NewsCard (props){
    const news=props.news;
    return (
        <Box sx={{display: `flex`, flexDirection: "column"}}>
            <Divider variant="middle"/>
            <Card sx={{display:"flex",flexDirection:"row",height:128,mb:2, width:1000, my:"10px", bgcolor:"elevation.layer1.main", boxShadow:0, borderRadius:0}}>
                <CardMedia title="nofication" image={news.img} sx={{width: 128 ,height: 128,borderBottomLeftRadius:"0",borderTopLeftRadius:"0",flexShrink:0}}/>
                <CardContent sx={{height:128,py:0}}>
                    <CardActionArea>
                        <Typography variant="subtitle1" color="initial" sx={{fontWeight:"bold",fontSize:"large",textOverflow: 'ellipsis',color:"elevation.layer1.contrast"}}>{news.title}</Typography>
                    </CardActionArea>
                    <Typography variant="body1" color="initial" sx={{ height:96,textOverflow: 'ellipsis',overflow: 'hidden', color:"elevation.layer1.contrast"}}>{news.description}</Typography>
                </CardContent>
            </Card>
        </Box>
    );
}
export default NewsCard;
