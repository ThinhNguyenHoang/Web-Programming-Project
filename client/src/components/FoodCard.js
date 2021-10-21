import * as React from 'react';
import {Box,Typography,Card, Avatar, Button} from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import fimg from "../assets/images/foodimg.png"


function FoodCard ({foodimg=fimg,foodname="Food Name",foodtype="Category",fooddescrip="Fry your onion, peppers and garlic in olive oil until nicely translucent.\nMake a well in your veg and add your chicken.Add your seasoning and salt.",price="300K"}) {
    return (
        <Card sx={{m:1,maxWidth:300}}>
            <CardMedia
                component="img"
                height="194"
                image={foodimg}
                alt={foodname}/>
            <CardHeader
              subheader={foodtype}
              title={foodname}
            />
            <CardContent>
            <Typography variant="body2" color="text.secondary">{fooddescrip}</Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Order</Button>
                <Button size="small">Wishlist</Button>
                <Button size="small">{price}</Button>
            </CardActions>
            

        </Card>
    );
}
export default FoodCard;