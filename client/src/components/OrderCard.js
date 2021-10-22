import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Box from '@mui/material/Box';
import foodimg from "../assets/images/foodimg.png";
import { Button, CardMedia, IconButton,Card, CardActions } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';

const initorder={
    foodname:"Food Name",
    foodimg:foodimg,
    foodprice: "300K"
}


function OrderCard ({OrderInfo=initorder}){
    return (
        <Card sx={{display:'flex', mx: 2}}>
            <CardMedia
                component="img"
                sx={{ width: 100,height:100 }}
                image={OrderInfo.foodimg}
                alt={OrderInfo.foodname}/>
            <Box sx={{ display: 'flex', flexDirection: 'row',gap:10, alignItems: 'center'}}>
                <CardContent>
                    <Typography align="center" variant="h6" color="text.primary" fontWeight="bold">{OrderInfo.foodname}</Typography>
                </CardContent>
                <CardContent>
                    <Typography align="center" variant="h6" color="success.main" fontWeight="regular">{OrderInfo.foodprice}</Typography>
                </CardContent>
                <CardActions>
                    <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                        <IconButton aria-label="minus">
                            <RemoveIcon />
                        </IconButton>
                        <TextField
                            sx= {{ color: 'text.primary', fontSize: 20, fontWeight: 'medium', width: 60}}
                            id="food-amount"
                            defaultValue="1"
                            variant="outlined"
                            size="small"
                            margin="dense"
                        />
                        <IconButton aria-label="add">
                            <AddIcon />
                        </IconButton>
                    </Box>
                </CardActions>
                <CardContent>
                    <Typography align="center" variant="h6" color="success.main" fontWeight="regular">600K</Typography>
                </CardContent>
                <CardActions>
                    <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                        <IconButton aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                </CardActions>
            </Box>
        </Card>
    );
}
export default OrderCard;