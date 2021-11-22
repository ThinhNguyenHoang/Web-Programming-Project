import React from 'react';
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";

import Carousel from "react-material-ui-carousel";
import CustomerReviewList from "./CustomerReviewList";
import default_avatar from "../../assets/images/user_default.jpg";
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


const review_list_test_1 = [
    {
        id: "1",
        name: "Guess",
        food_name :"Com Suon",
        role: "CUSTOMER",
        description: " Democrats say the congressional redistricting plan violates the state constitution. Republicans say they worked within the law and did not consider race in drawing lines that give an edge to conservative White Republicans.",
        user_avatar: default_avatar,
    },
    {
        id: "2",
        name: "Guess",
        food_name :"Banh Bao",
        role: "CUSTOMER",
        description: " Closing arguments are expected Monday morning after 10 days of witness testimony.",
        user_avatar: default_avatar,
    },{
        id: "3",
        name: "Guess",
        food_name :"Marijuana",
        role: "CUSTOMER",
        description: "The move would restrict development on roughly 9.3 million acres in the Tongass National Forest, according to those briefed on the plan",
        user_avatar: default_avatar,
    }
]
const review_list_test_2 = [
    {
        id: "1",
        name: "Guess",
        food_name :"Com Suon",
        role: "CUSTOMER",
        description: " Democrats say the congressional redistricting plan violates the state constitution. Republicans say they worked within the law and did not consider race in drawing lines that give an edge to conservative White Republicans.",
        user_avatar: default_avatar,
    },
    {
        id: "2",
        name: "Guess",
        food_name :"Banh Bao",
        role: "CUSTOMER",
        description: "Coronavirus Updates newsletter\n" +
            "Key developments about the outbreak sent straight to your inbox. All stories in the newsletter are free.\n" +
            "Nearly 1 in 10 younger U.S. children got a coronavirus shot in first two weeks of vaccine eligibility\n" +
            "By Andrew Jeong\n" +
            "Image\n" +
            "White House to invest billions in vaccine manufacturing to lift poorer nations’ supply",
        user_avatar: default_avatar,
    },{
        id: "3",
        name: "Guess",
        food_name :"Marijuana",
        role: "CUSTOMER",
        description: "Biden administration to propose ban on logging and roads in much of Alaskan rainforest, reversing Trump-era policy",
        user_avatar: default_avatar,
    }
]
const review_list_of_list= [review_list_test_1,review_list_test_2]

const CustomerReviewListCarousel = () => {
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
                }}} p={2} variant={`h2`} color={`primary.main`} justifySelf={`center`} alignSelf={`center`} noWrap={true}>
                What our customer say about us
            </Typography>
            <Carousel>
                {
                    review_list_of_list.map((item,index) => {
                        return <CustomerReviewList review_list={item} key={index.toString()}/>
                    })
                }
            </Carousel>
        </Box>
    );
};

export default CustomerReviewListCarousel;

// ! BELOW IS NORMAL LIST WITH OUT PREV AND NEXT BUTTON
// <Box sx={{display:'flex',flexDirection: {sx:'column',sm:'column',md:`row`}, alignItems:'center',justifyContent:`center` }}>
//     {
//         food_list.map((item,index) => {
//             return <FoodItemCard food_item={item} key={index.toString()} mx={4}/>
//         })
//     }
// </Box>
