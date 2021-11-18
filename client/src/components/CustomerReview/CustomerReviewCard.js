import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {ThemedOutlineButton} from "../Buttons/ThemedButton/ThemedButton";
import default_avatar from "../../assets/images/user_default.jpg"

const review = {
    id: "",
    name: "",
    food_name :"",
    role: "",
    food_reviewed: "",
    description: "",
    user_avatar: "",
}
export default function RecipeReviewCard({review}) {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    <Avatar src={review.user_avatar ? review.user_avatar : default_avatar} sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {review.name ? review.name : "Guess"}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={`${review.name ? review.name : "Customer"}`}
                subheader="Our Customer"
            />
            <CardContent>
                <Typography>{review.food_name ? review.food_name : "Main Dish"}</Typography>
            </CardContent>
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    This impressive paella is a perfect party dish and a fun meal to cook
                    together with your guests. Add 1 cup of frozen peas along with the mussels,
                    if you like.
                </Typography>
            </CardContent>
            {/*<CardActions disableSpacing>*/}
            {/*    <IconButton aria-label="add to favorites">*/}
            {/*        <FavoriteIcon />*/}
            {/*    </IconButton>*/}
            {/*    <ThemedOutlineButton>*/}
            {/*        Order same disk*/}
            {/*    </ThemedOutlineButton>*/}
            {/*</CardActions>*/}
        </Card>
    );
}
