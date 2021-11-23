import React, {useEffect} from 'react';
import {food_recommendation_actions, selectors} from "../../redux/slices/food/FoodSlice";
import {useDispatch, useSelector} from "react-redux";
import Grid from "@mui/material/Grid";
import FoodItemCard from "./FoodItemCard";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const RecommendationGrid = () => {
    const recommendation_list = useSelector(selectors.getRecommendationList);
    const dispatch =useDispatch();
    useEffect(() => {
        dispatch({type:food_recommendation_actions.loading})
        return () => {

        };
    }, []);

    return (
        <Box sx={{flexGrow: 1,m:4}}>
            {
                recommendation_list ?
                    <Grid
                        container
                        spacing={{xs: 2, md: 2}}
                        columns={{xs: 4, sm: 8, md: 12}}
                    >
                        {recommendation_list.map((item, index) => (
                            <Grid item xs={2} sm={4} md={4} key={index}>
                                <FoodItemCard food_item={item}/>
                            </Grid>
                        ))}
                    </Grid>
                : <Typography variant={`h1`} color={`primary.main`}>
                            You have no recommendation yet
                    </Typography>
            }
        </Box>);
};

export const WishListGrid = () => {
    const wish_list = useSelector(selectors.getWishList);
    return (
        <Box sx={{flexGrow: 1}}>
            <Grid
                container
                spacing={{xs: 2, md: 3}}
                columns={{xs: 4, sm: 8, md: 12}}
            >
                {wish_list.map((item, index) => (
                    <Grid item xs={2} sm={4} md={4} key={index}>
                        <FoodItemCard food_item={item}/>
                    </Grid>
                ))}
            </Grid>
        </Box>);
};
