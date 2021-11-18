import React from 'react';
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import FoodItemCard from "./FoodItemCard";
import Carousel from "react-material-ui-carousel";
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

const food_list_test = [
    {
        id: "0",
        name: "Food Name",
        picture_uri: "https://www.themealdb.com/images/media/meals/g373701551450225.jpg",
        price: "500",
        description: "Heat the oil in a frying pan that has a lid, then soften the onions, chilli, garlic and coriander stalks for 5 mins until soft.",
        // status: generateStatus(),
        sale_value: "12",
        instruct: "Heat the oil in a frying pan that has a lid, then soften the onions, chilli, garlic and coriander stalks for 5 mins until soft.",
        tags: [],
        material: []
    },
    {
        id: "0",
        name: "Moroccan Carrot Soup",
        picture_uri: "https://www.themealdb.com/images/media/meals/jcr46d1614763831.jpg",
        price: "500",
        description: "Heat the oil in a frying pan that has a lid, then soften the onions, chilli, garlic and coriander stalks for 5 mins until soft.",
        // status: generateStatus(),
        sale_value: "12",
        instruct: "Heat the oil in a frying pan that has a lid, then soften the onions, chilli, garlic and coriander stalks for 5 mins until soft.",
        tags: [],
        material: []
    },
    {
        id: "0",
        name: "Kung Pao Chicken",
        picture_uri: "https://www.themealdb.com/images/media/meals/1525872624.jpg",
        price: "500",
        description: "Heat the oil in a frying pan that has a lid, then soften the onions, chilli, garlic and coriander stalks for 5 mins until soft.",
        // status: generateStatus(),
        sale_value: "12",
        instruct: "Heat the oil in a frying pan that has a lid, then soften the onions, chilli, garlic and coriander stalks for 5 mins until soft.",
        tags: [],
        material: []
    }
]
const FoodRecommendation = ({food_list}) => {
    // TODO: Change this to real food api
    const list_food = food_list ? food_list : food_list_test;
    return (
        <Box sx={{display:`flex`,flexDirection:`column`}}>
            <Box sx={{display:'flex',flexDirection: {sx:'column',sm:'column',md:`row`}, alignItems:'center',justifyContent:`center` }}>
                {
                    list_food.map((item,index) => {
                        return <FoodItemCard food_item={item} key={index.toString()} mx={4}/>
                    })
                }
            </Box>
        </Box>
    );
};

export default FoodRecommendation;

// ! BELOW IS NORMAL LIST WITH OUT PREV AND NEXT BUTTON
// <Box sx={{display:'flex',flexDirection: {sx:'column',sm:'column',md:`row`}, alignItems:'center',justifyContent:`center` }}>
//     {
//         food_list.map((item,index) => {
//             return <FoodItemCard food_item={item} key={index.toString()} mx={4}/>
//         })
//     }
// </Box>


// ! CAROUSEL WITH ONE ITEM
// <Carousel>
//     {
//         list_food.map((item,index) => {
//             return <FoodItemCard food_item={item} key={index.toString()} mx={4}/>
//         })
//     }
// </Carousel>