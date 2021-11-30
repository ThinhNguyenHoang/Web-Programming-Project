import React from 'react';
import default_company_logo from "../../assets/images/default_company_logo.jpeg";
import Box from "@mui/material/Box";
import Carousel from "react-material-ui-carousel";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import {ThemedOutlineButton} from "../Buttons/ThemedButton/ThemedButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import {array_to_chunks} from "../../utils";
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useHistory } from 'react-router';
import { ROUTING_CONSTANTS } from './../../routes/RouterConfig';

const involved_company_init = [
    {
        id: "0",
        logo: "https://www.logodesign.net/logo/building-on-crescent-4303ld.png",
        name: 'Sách góp phần phát huy trí tuệ, phẩm chất con người Việt Nam',
        description: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica'
    },
    {
        id: "1",
        logo: "https://ephoto360.com/uploads/worigin/2019/10/04/Tao_logo_cong_ty_-_Logo_doanh_nghiep_truc_tuyen_tot_nhat5d96f2ae01939_c43f7da2af7c09b3d6d8836ae5f9f02d.jpg",
        name: 'Sách góp phần phát huy trí tuệ, phẩm chất con người Việt Nam',
        description: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica'
    },
    {
        id: "3",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXKbSB2O4yiwr4UgZ_5ZQrOKsWjcRdrZr5Mw&usqp=CAU",
        name: 'Sách góp phần phát huy trí tuệ, phẩm chất con người Việt Nam',
        description: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica'
    },
    {
        id: "4",
        logo: "https://www.logodesign.net/logo/building-on-crescent-4303ld.png",
        name: 'Sách góp phần phát huy trí tuệ, phẩm chất con người Việt Nam',
        description: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica'
    },
    {
        id: "5",
        logo: "https://ephoto360.com/uploads/worigin/2019/10/04/Tao_logo_cong_ty_-_Logo_doanh_nghiep_truc_tuyen_tot_nhat5d96f2ae01939_c43f7da2af7c09b3d6d8836ae5f9f02d.jpg",
        name: 'Sách góp phần phát huy trí tuệ, phẩm chất con người Việt Nam',
        description: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica'
    },
    {
        id: "6",
        logo: "https://gigamall.com.vn/data/2019/09/20/14514819_LOGO-THE-PIZZA-COMPANY-500x500.jpg",
        name: 'Sách góp phần phát huy trí tuệ, phẩm chất con người Việt Nam',
        description: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica'
    },
    {
        id: "7",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3prvkJeIxpLgp950D476MQV5reNYUkM_ZZN5iy6CHdWIBjLqaPSA33wwhJ0GXSWxpDho&usqp=CAU",
        name: 'Sách góp phần phát huy trí tuệ, phẩm chất con người Việt Nam',
        description: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica'
    },
    {
        id: "8",
        logo: "https://thumbs.dreamstime.com/z/food-logo-smile-label-company-grocery-store-friendly-vector-illustration-smiling-mouth-symbol-135565322.jpg",
        name: 'Sách góp phần phát huy trí tuệ, phẩm chất con người Việt Nam',
        description: 'Ranging across all continents except Antarctica'
    },
    {
        id: "9",
        logo: "https://i.pinimg.com/600x315/fc/59/3b/fc593b7131868f87ac0a52fa1a496e1d.jpg",
        name: 'Sách góp phần phát huy trí tuệ, phẩm chất con người Việt Nam',
        description: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica'
    },
]

const useStyles = makeStyles({
    root: {
      maxWidth: 300,
    },
    customBox: {
      display: "-webkit-box",
      boxOrient: "vertical",
      lineClamp: 2,
      overflow: "hidden",
    },
    customHighLight: {
        display: "-webkit-box",
        boxOrient: "vertical",
        lineClamp: 4,
        overflow: "hidden",
    }
});


export const CompanyItem = ({company, mx,sx},...props) => {
    const history=useHistory();
    const classes = useStyles();
    return (
        <Card sx={{ width: 300, height:350, bgcolor:"elevation.layer2.main"}} className={classes.root}>
            <CardActionArea onClick={()=>history.push(ROUTING_CONSTANTS.NEWSINFO+"/"+company.NewsID)}>
                <CardMedia
                    component="img"
                    height="150"
                    image={company.Picture ? company.Picture : default_company_logo}
                    alt="green iguana"
                />
                <CardContent>
                    <Box sx={{height:"80px"}}>
                        <Typography gutterBottom component="div" classes={{root: classes.customBox}} variant="h6" sx={{fontWeight:"bold", color:"elevation.layer2.contrast"}} component="div">
                            {company.Title}
                        </Typography>
                    </Box>
                    <Box sx={{height:"100px"}}>
                        <Typography component="div" classes={{root: classes.customHighLight}} variant="body2" color="elevation.layer2.contrast">
                            {company.Highlight}
                        </Typography>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
export const InvolvedCompaniesSlice = ({company_list}) => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: {xs: 'column', sm: 'column', md: `row`},
            alignItems: 'center',
            justifyContent: `space-evenly`,
        }}>
            {company_list.map((item, index) => {
                return <CompanyItem company={item} key={index.toString()} sx={{mx:4}}/>
            })}
        </Box>
    )
}
const NewsCarousel = (props) => {
    // TODO: Code use Effect to get the involved company logo
    const list_of_list = array_to_chunks(props.list.slice(-9),3);
    console.log("COMPANY LIST: ",list_of_list)
    return (
        <Box sx={{display: `flex`, flexDirection: `column`,mb:6}}>
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


export default NewsCarousel;
