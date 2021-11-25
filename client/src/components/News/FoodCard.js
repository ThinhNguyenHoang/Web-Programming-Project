import * as React from 'react';
import {Box,Typography,Card, Avatar, Button, Paper} from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import fimg from "../../assets/images/foodimg.png";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { red } from '@mui/material/colors';
import { useTranslation } from 'react-i18next';
import { add_cart_actions } from '../../redux/slices/Food/FoodSlice';
import { useHistory } from 'react-router';
import { useDispatch  } from 'react-redux';
import { ROUTING_CONSTANTS } from '../../routes/RouterConfig'; 

const initfood={
    fimg:fimg,
    foodname:"Food Name",
    foodtype:"Category",
    fooddescrip:"Fry your onion, peppers and garlic in olive oil until nicely translucent.\nMake a well in your veg and add your chicken.Add your seasoning and salt.",
    price:"300K"
}




function FoodCard (props) {
    const {t, i18n} = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();
    const foodinfo= props.food;
    return (
        <Card sx={{ maxWidth: 250 ,mx:1}}>
            <CardMedia
                component="img"
                alt="green iguana"
                height="150"
                image={foodinfo.img}
                />
            <CardContent >
                <Typography gutterBottom variant="h5" component="div">
                    {foodinfo.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ textOverflow: 'ellipsis',overflow: 'hidden',height:130 }}>
                    {foodinfo.decrip}
                </Typography>
            </CardContent>
            <CardActions sx={{display:"flex",flexWrap:"wrap"}}>
                <Button size="small"
                    onClick={()=>{
                        dispatch({type:add_cart_actions.loading,payload:foodinfo.id});
                        history.push(ROUTING_CONSTANTS.ITEM_CART);
                    }}
                >Order</Button>
                <Button size="small" onClick={()=>{dispatch({type:add_cart_actions.loading,payload:foodinfo.id})}}>Add cart</Button>
                <Button size="small" disabled sx={{
                    backgroundColor:"#f0f0f0"                
                }}>
                    <Typography variant="body1" color="#ba68c8">{foodinfo.price}</Typography>
                </Button>
            </CardActions>
        </Card>
    );
}
export default FoodCard;