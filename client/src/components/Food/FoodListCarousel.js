import React from 'react';
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import FoodItemCard from "./FoodItemCard";
import Carousel from "react-material-ui-carousel";
import FoodRecommendation from "./FoodRecommendation";
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

const food_list_test_1 = [
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
        id: "1",
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
        id: "2",
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

const food_list_test_2 = [
    {
        id: "5",
        name: "Kung Pao Chicken",
        picture_uri: "https://www.themealdb.com/images/media/meals/wxuvuv1511299147.jpg",
        price: "500",
        description: "Heat the oil in a frying pan that has a lid, then soften the onions, chilli, garlic and coriander stalks for 5 mins until soft.",
        // status: generateStatus(),
        sale_value: "12",
        instruct: "Heat the oil in a frying pan that has a lid, then soften the onions, chilli, garlic and coriander stalks for 5 mins until soft.",
        tags: [],
        material: []
    },

    {
        id: "3",
        name: "Food Name",
        picture_uri: "https://www.themealdb.com/images/media/meals/z0ageb1583189517.jpg",
        price: "500",
        description: "Heat the oil in a frying pan that has a lid, then soften the onions, chilli, garlic and coriander stalks for 5 mins until soft.",
        // status: generateStatus(),
        sale_value: "12",
        instruct: "Heat the oil in a frying pan that has a lid, then soften the onions, chilli, garlic and coriander stalks for 5 mins until soft.",
        tags: [],
        material: []
    },
    {
        id: "4",
        name: "Moroccan Carrot Soup",
        picture_uri: "https://www.themealdb.com/images/media/meals/ewcikl1614348364.jpg",
        price: "500",
        description: "Heat the oil in a frying pan that has a lid, then soften the onions, chilli, garlic and coriander stalks for 5 mins until soft.",
        // status: generateStatus(),
        sale_value: "12",
        instruct: "Heat the oil in a frying pan that has a lid, then soften the onions, chilli, garlic and coriander stalks for 5 mins until soft.",
        tags: [],
        material: []
    },
]

const list_of_food_list= [food_list_test_1,food_list_test_2]

const FoodListCarousel = () => {
    // TODO: Change this to real food api
    // const food_list = food_list_test;
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
                    list_of_food_list.map((item,index) => {
                        return <FoodRecommendation food_list={item} key={index.toString()}/>
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
