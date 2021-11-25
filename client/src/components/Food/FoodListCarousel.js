import React, {useEffect} from 'react';
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import FoodItemCard from "./FoodItemCard";
import Carousel from "react-material-ui-carousel";
import FoodGrid from "./FoodGrid";
import {food_recommendation_actions, selectors} from "../../redux/slices/Food/FoodSlice";
import {useDispatch, useSelector} from "react-redux";
import {array_to_chunks} from "../../utils";
// ? Food Item Schema
// const food_item = {
//     id: "",
//     name: "",
//     picture_uri: "",
//     price: "",
//     description: "",
//     status: generateStatus(),
//     sale_value: "",
//     instruct: "",
//     tags: [],
//     material: []
// }

const FoodListCarousel = () => {
    // TODO: Change this to real food api
    const recommendation = useSelector(selectors.getRecommendationList);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({type:food_recommendation_actions.loading})
        return () => {

        };
    }, []);
    return (
        <Box sx={{display:`flex`,flexDirection:`column`}}>
            <Typography sx={{
                fontSize: {
                    lg: 50,
                    md: 40,
                    sm: 30,
                    xs: 20
                }}} p={2} variant={`h2`} color={`primary.main`} justifySelf={`center`} alignSelf={`center`}>
                Today Recommendation
            </Typography>
            <Carousel>
                {
                    array_to_chunks(recommendation,3).map((item,index) => {
                        return <FoodGrid food_list={item} key={index.toString()}/>
                    })
                }
            </Carousel>
        </Box>
    );
};

export default FoodListCarousel;

// ! BELOW IS NORMAL LIST WITH OUT PREV AND NEXT BUTTON
// <Box sx={{display:'flex',flexDirection: {sx:'column',sm:'column',md:`row`}, alignItems:'center',justifyContent:`center` }}>
//     {
//         food_list.map((item,index) => {
//             return <FoodItemCard food_item={item} key={index.toString()} mx={4}/>
//         })
//     }
// </Box>
