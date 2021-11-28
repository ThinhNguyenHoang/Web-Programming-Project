import React from 'react';
import {Button, Grid, Typography} from "@mui/material";
import logo from '../../assets/images/logo_128.png'
import ThemedButton from "../Buttons/ThemedButton/ThemedButton";
import facebook_icon from '../../assets/icons/facebook.png';
import twitter_icon from '../../assets/icons/twitter.jpg';
import youtube_icon from '../../assets/icons/youtube.png';
import google_icon from '../../assets/icons/g_plus.png';
import Box from "@mui/material/Box";

const icons = [
    {
        name: "facebook",
        link: "",
        icon: facebook_icon
    },    {
        name: "twitter",
        link: "",
        icon: twitter_icon
    },    {
        name: "youtube",
        link: "",
        icon: youtube_icon
    },    {
        name: "google",
        link: "",
        icon: google_icon
    },
]
const branch_name = {
    name: "BK FOOD SALE",
    address: "286, Ly Thường Kiệt, Quận 10, TP HCM",
}

const Footer = ({additionalStyle}) => {
    return (
        <Grid sx={{position:'static',boxShadow:3,left:0,bottom:0,right:0,bgcolor:'elevation.layer1.main',marginTop:`50px`,justifyContent:'center',display:{sm:"none", md: 'flex' },...additionalStyle,mt:6}} container spacing={{ xs: 2, md: 3}}>
            <Grid item xs={12} sm={8} md={3} mx={3}>
                <Typography variant={`h4`} sx={{color:`header.contrast`}}>
                    Order Now
                </Typography>
                <Typography sx={{mb:1}} variant={`h3`} color={`primary.main`}>
                    0866457235
                </Typography>
                <Button variant={`contained`} color={`primary`}>
                    Contacts Us Now
                </Button>
            </Grid>
            <Grid item xs={12} sm={3} md={3}  mx={3} sx={{display:`flex`,flexDirection:`column`, justifyContent:`center`}}>
                <Typography variant={`h4`} color={`primary.main`}> Company</Typography>
                <Typography variant={`h6`} color={`elevation.layer2.contrast`}> Who we server</Typography>
                <Typography variant={`h6`} color={`elevation.layer2.contrast`}> Our Approach</Typography>
                <Typography variant={`h6`} color={`elevation.layer2.contrast`}> {`About ${branch_name.name}`}</Typography>
            </Grid>
            <Grid item xs={12} sm={3} md={3}>
                <Typography variant={`h4`} color={`primary.main`}> Jobs</Typography>
                <Typography variant={`h6`} color={`elevation.layer2.contrast`}> Cooker</Typography>
                <Typography variant={`h6`} color={`elevation.layer2.contrast`}> HR Employee</Typography>
                <Typography variant={`h6`} color={`elevation.layer2.contrast`}> Developer</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} mt={5} mx={3} sx={{display:{xs:'none',md:'flex'},justifyContent:'space-evenly'}} >
                <Typography variant={`h6`} color={`elevation.layer2.contrast`}>
                    {branch_name.address}
                </Typography>
                <Typography variant={`h6`} color={`elevation.layer2.contrast`}>
                    {`© Copyright 2021, ${branch_name.name}.`}
                </Typography>
                <Box sx={{display:`flex`,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                    {icons.map((item,index) => {
                        return <Box maxWidth={`30px`} maxHeight={`30px`} key={item.name} mx={1}>
                            <a href={item.link}><img src={item.icon} height={`30px`} alt={item.name}/></a>
                        </Box>
                    })}
                </Box>
            </Grid>
        </Grid>
    );
};

export default Footer;