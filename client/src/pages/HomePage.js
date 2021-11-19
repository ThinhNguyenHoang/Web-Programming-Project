import * as React from 'react';
import Header from "../components/header/Header";
import {Box} from "@mui/material";
import default_banner  from "../assets/images/default_banner.png"
import {useEffect, useState} from "react";
import axios from "axios";
import FoodItemCard from "../components/Food/FoodItemCard";
import Footer from "../components/Footer/Footer";
import FoodListCarousel from "../components/Food/FoodListCarousel";
import CustomerReviewListCarousel from "../components/CustomerReview/CustomerReviewCarousel";
import InvolvedCompanyCarousel, {
    CompanyItem,
    InvolvedCompaniesSlice
} from "../components/InvolvedCompany/InvolvedCompanyCarousel";

const BANNER_ENDPOINT = "/banner_image";

const company = {
    id: "9",
        logo: "https://i.pinimg.com/600x315/fc/59/3b/fc593b7131868f87ac0a52fa1a496e1d.jpg",
    name: 'Company 4'
}

const compayny_list = [{
    id: "7",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3prvkJeIxpLgp950D476MQV5reNYUkM_ZZN5iy6CHdWIBjLqaPSA33wwhJ0GXSWxpDho&usqp=CAU",
    name: 'Company 1'
},
    {
        id: "8",
        logo: "https://thumbs.dreamstime.com/z/food-logo-smile-label-company-grocery-store-friendly-vector-illustration-smiling-mouth-symbol-135565322.jpg",
        name: 'Company 2'
    },
    {
        id: "9",
        logo: "https://i.pinimg.com/600x315/fc/59/3b/fc593b7131868f87ac0a52fa1a496e1d.jpg",
        name: 'Company 4'
    },
]
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
        <Box sx={{display:`flex`,flexDirection:`column`,bgcolor:'elevation.layer0.main'}}>
            <Box sx={{width:`100%`}}>
                <img src={banner} alt={'Banner Image'} style={{width: `100%`}}/>
            </Box>
            {/*<Box sx={{display:`flex`,flexDirection:`row`,justifyContent:'center', alignItems:`center`}}>*/}
            {/*    <FoodItemCard food_item={food_item}/>*/}
            {/*</Box>*/}
            <FoodListCarousel />
            <CustomerReviewListCarousel/>
            <InvolvedCompanyCarousel/>
        </Box>
    );
};


export default HomePage;