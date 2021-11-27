import React, {useEffect} from 'react';
import {food_recommendation_actions, food_wish_list_actions, selectors} from "../../redux/slices/food/FoodSlice";
import {useDispatch, useSelector} from "react-redux";
import Grid from "@mui/material/Grid";
import FoodItemCard from "./FoodItemCard";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ComboItemCard from "./ComboItemCard";

export const RecommendationGrid = () => {
    const recommendation_list = useSelector(selectors.getRecommendationList);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({type: food_recommendation_actions.loading})
        return () => {

        };
    }, []);
    console.log("recommendation_list",);
    return (
        <Box sx={{flexGrow: 1, m: 4}}>
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
    const wish_list_food = useSelector(selectors.getWishListFood);
    const wish_list_combo = useSelector(selectors.getWishListCombos);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({type: food_wish_list_actions.loading})
        return () => {
        };
    }, []);

    return (
        <Box sx={{p:2,m:2,display:'flex',justifyContent:`center`,flexDirection:`column`,alignItems:`center`}}>
            {/* WISH LIST FOOD ITEMS */}
            <Box sx={{display:`flex`, flexGrow: 1,justifyContent:`center`,flexDirection:`column`,alignItems:`center`}}>
                <Typography variant={`h4`} color={`primary.main`}  sx={{m:2}}> Food Items</Typography>
                <Grid
                    container
                    spacing={{xs: 2, md: 3}}
                    columns={{xs: 4, sm: 8, md: 12}}
                >
                    {wish_list_food.map((item, index) => (
                        <Grid item xs={2} sm={4} md={4} key={index}>
                            <FoodItemCard food_item={item}/>
                        </Grid>
                    ))}
                </Grid>
            </Box>;

            {/* WISH LIST COMBO ITEMS */}
            <Box sx={{display:`flex`, flexGrow: 1,justifyContent:`center`,flexDirection:`column`,alignItems:`center`}}>
                <Typography variant={`h4`} color={`primary.main`} sx={{m:2}}> Combo Items</Typography>
                <Grid
                    container
                    spacing={{xs: 2, md: 3}}
                    columns={{xs: 4, sm: 8, md: 12}}
                >
                    {wish_list_combo.map((item, index) => (
                        <Grid item xs={2} sm={4} md={4} key={index}>
                            <ComboItemCard combo_item={item}/>
                        </Grid>
                    ))}
                </Grid>
            </Box>;

        </Box>
    );
};
