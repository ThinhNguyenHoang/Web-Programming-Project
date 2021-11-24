import React from 'react';

import default_avatar from "../../assets/images/user_default.jpg";
import Box from "@mui/material/Box";
import FoodItemCard from "../Food/FoodItemCard";
import CustomerReviewCard from "./CustomerReviewCard";

const init_review_list = [{
    id: "1",
    name: "Guess",
    food_name :"Water Melon",
    role: "CUSTOMER",
    food_reviewed: "Com Suon",
    description: "                    This impressive paella is a perfect party dish and a fun meal to cook\n" +
        "                    together with your guests. Add 1 cup of frozen peas along with the mussels,\n" +
        "                    if you like.",
    user_avatar: default_avatar,
},{
    id: "2",
    name: "Guess",
    food_name :"Water Melon",
    role: "CUSTOMER",
    food_reviewed: "Com Suon",
    description: "                    This impressive paella is a perfect party dish and a fun meal to cook\n" +
        "                    together with your guests. Add 1 cup of frozen peas along with the mussels,\n" +
        "                    if you like.",
    user_avatar: default_avatar,
},{
    id: "3",
    name: "Guess",
    food_name :"Water Melon",
    role: "CUSTOMER",
    food_reviewed: "Com Suon",
    description: "                    This impressive paella is a perfect party dish and a fun meal to cook\n" +
        "                    together with your guests. Add 1 cup of frozen peas along with the mussels,\n" +
        "                    if you like.",
    user_avatar: default_avatar,
},]

const CustomerReviewList = ({review_list}) => {
    const temp_review_list = review_list ? review_list : init_review_list;
    return (
            <Box sx={{display:'flex',flexDirection: {xs:'column',sm:'column',md:`row`}, alignItems:'center',justifyContent:`center` }}>
                {
                    temp_review_list.map((item,index) => {
                        return <CustomerReviewCard review_passed={item} key={index.toString()} mx={{xs:1,sm:2,md:3,lg:4}}/>
                    })
                }
            </Box>
    );
};

export default CustomerReviewList;
