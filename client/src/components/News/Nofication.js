import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Box from '@mui/material/Box';
import { Card, CardMedia } from '@mui/material';



function Nofication (props){
    const nofimg="https://codelearn.io/Upload/Blog/database-change-notification-oracle-63742419191.3747.jpg";
    const nofInfo=props.nofi;
    return (
    <Card sx={{display:"flex",flexDirection:"row",height:128,mb:2}}>
        <CardMedia title="nofication" image={nofimg} sx={{width: 128 ,height: 128,borderBottomLeftRadius:"10px",borderTopLeftRadius:"10px",flexShrink:0}}/>
        <CardContent sx={{height:128,py:0}}>
            <Typography variant="subtitle1" color="initial" sx={{fontWeight:"bold",fontSize:"large",textOverflow: 'ellipsis',}}>{nofInfo.name}</Typography>
            <Typography variant="body1" color="initial" sx={{ height:96,textOverflow: 'ellipsis',overflow: 'hidden'}}>{nofInfo.content}</Typography>
        </CardContent>
    </Card>
    );
}
export default Nofication;