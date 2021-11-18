import * as React from 'react';
import Header from "../components/header/Header";
import {Box} from "@mui/material";
import default_banner  from "../assets/images/default_banner.png"
import {useEffect, useState} from "react";
import axios from "axios";
import FoodItemCard from "../components/Food/FoodItemCard";
import Footer from "../components/Footer/Footer";
import FoodRecommendation from "../components/Food/FoodRecommendation";
import FoodListCarousel from "../components/Food/FoodListCarousel";

const BANNER_ENDPOINT = "/banner_image";

const food_item = {
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
}
const HomePage = (props) => {
    const [banner, setBanner] = useState(default_banner);
    useEffect(() => {
        // * API to get banner image
        axios.get(BANNER_ENDPOINT)
            .then((res) => {
                setBanner(res.data);
            })
            .catch((e) => console.log(`Failed to get banner`))
    }, []);
    
    return (
        <Box sx={{display:`flex`,flexDirection:`column`}}>
            <Box sx={{width:`100%`}}>
                <img src={banner} alt={'Banner Image'} style={{width: `100%`}}/>
            </Box>
            {/*<Box sx={{display:`flex`,flexDirection:`row`,justifyContent:'center', alignItems:`center`}}>*/}
            {/*    <FoodItemCard food_item={food_item}/>*/}
            {/*</Box>*/}
            <FoodListCarousel />
            <Footer/>
        </Box>
    );
};


export default HomePage;