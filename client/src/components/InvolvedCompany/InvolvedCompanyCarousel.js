import React from 'react';
import default_company_logo from "../../assets/images/default_company_logo.jpeg";
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import CustomerReviewList from "../CustomerReview/CustomerReviewList";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import default_food_image from "../../assets/images/defaul_food_image.jpg";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import {ThemedOutlineButton} from "../Buttons/ThemedButton/ThemedButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import {array_to_chunks} from "../../utils";

const involved_company_init = [
    {
        id: "0",
        logo: "https://www.logodesign.net/logo/building-on-crescent-4303ld.png",
        name: 'Company 1'
    },
    {
        id: "1",
        logo: "https://ephoto360.com/uploads/worigin/2019/10/04/Tao_logo_cong_ty_-_Logo_doanh_nghiep_truc_tuyen_tot_nhat5d96f2ae01939_c43f7da2af7c09b3d6d8836ae5f9f02d.jpg",
        name: 'Company 2'
    },
    {
        id: "3",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXKbSB2O4yiwr4UgZ_5ZQrOKsWjcRdrZr5Mw&usqp=CAU",
        name: 'Company 4'
    },
    {
        id: "4",
        logo: "https://www.logodesign.net/logo/building-on-crescent-4303ld.png",
        name: 'Company 1'
    },
    {
        id: "5",
        logo: "https://ephoto360.com/uploads/worigin/2019/10/04/Tao_logo_cong_ty_-_Logo_doanh_nghiep_truc_tuyen_tot_nhat5d96f2ae01939_c43f7da2af7c09b3d6d8836ae5f9f02d.jpg",
        name: 'Company 2'
    },
    {
        id: "6",
        logo: "https://gigamall.com.vn/data/2019/09/20/14514819_LOGO-THE-PIZZA-COMPANY-500x500.jpg",
        name: 'Com 123'
    },
    {
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
export const CompanyItem = ({company, mx,sx},...props) => {
    return (
        <Card sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: 345,
            mx: mx ? mx : 0,
            bgcolor: `elevation.layer0.main`
        }}>
            <CardMedia
                sx={sx}
                component="img"
                height="194"
                image={company.logo ? company.logo : default_company_logo}
                alt={company.name ? company.name : "No info"}
            />
        </Card>
    );
}
export const InvolvedCompaniesSlice = ({company_list}) => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: {xs: 'column', sm: 'column', md: `row`},
            alignItems: 'center',
            justifyContent: `center`
        }}>
            {company_list.map((item, index) => {
                return <CompanyItem company={item} key={index.toString()} sx={{mx:4}}/>
            })}
        </Box>
    )
}
const InvolvedCompanyCarousel = () => {
    // TODO: Code use Effect to get the involved company logo
    const list_of_list = array_to_chunks(involved_company_init,3);
    console.log("COMPANY LIST: ",list_of_list)
    return (
        <Box sx={{display: `flex`, flexDirection: `column`,mb:6}}>
            <Typography sx={{
                fontSize: {
                    lg: 50,
                    md: 40,
                    sm: 30,
                    xs: 20
                }
            }} p={2} variant={`h2`} color={`primary.main`} justifySelf={`center`} alignSelf={`center`}>
                Involved Companies
            </Typography>
            <Carousel>
                {
                    list_of_list.map((item, index) =>{
                        console.log("Rendering LIST:",item)
                        return <InvolvedCompaniesSlice company_list={item} key={index.toString()}/>
                    })
                }
            </Carousel>

        </Box>
    );
};


export default InvolvedCompanyCarousel;
