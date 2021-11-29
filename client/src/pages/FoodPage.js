import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {food_management_action, food_wish_list_actions, selectors} from "../redux/slices/food/FoodSlice";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import FoodItemCard from "../components/Food/FoodItemCard";
import ComboItemCard from "../components/Food/ComboItemCard";
import FoodSearchBar from "../components/SearchFood/SearchBar";


export const AllFoodGrid = (pagination = 4) => {
    const wish_list_food = useSelector(selectors.getAllFoodListMapped);
    const wish_list_combo = useSelector(selectors.getAllComboListMapped);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({type: food_management_action.loading})
        return () => {
        };
    }, []);

    return (
        <Box sx={{p:2,m:2,display:'flex',justifyContent:`center`,flexDirection:`column`,alignItems:`center`,bgcolor:`elevation.layer0.main`}}>
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
            </Box>

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
            </Box>

        </Box>
    );
};


const FoodPage = () => {
    return (
            <AllFoodGrid/>
    );
};

export default FoodPage;
