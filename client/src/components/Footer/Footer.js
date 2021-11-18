import React from 'react';
import {Grid, Typography} from "@mui/material";
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
    address: "286, Ly Thuowng kiet, quan 10, TP HCM",
}

const Footer = (props) => {
    return (
        <Grid sx={{position:'static',left:0,bottom:0,right:0,bgcolor:'header.background',marginTop:`50px`,justifyContent:'center',display:{sm:"none", md: 'flex' }}} px={5} container spacing={{ xs: 2, md: 3}}>
            <Grid item xs={12} sm={8} md={3} mx={3}>
                <Typography variant={`h4`} sx={{color:`header.contrast`}}>
                    ORDER FOOD NOW
                </Typography>
                <Typography variant={`h3`} color={`secondary.main`}>
                    0866457235
                </Typography>
                <ThemedButton>
                    Contacts Us Now
                </ThemedButton>
            </Grid>
            <Grid item xs={12} sm={3} md={3}  mx={3} sx={{display:`flex`,flexDirection:`column`, justifyContent:`center`}}>
                <Typography variant={`h3`} color={`secondary.main`}> Company</Typography>
                <Typography variant={`h4`} color={`primary`}> Who we server</Typography>
                <Typography variant={`h4`} color={`primary`}> Our Approach</Typography>
                <Typography variant={`h4`} color={`primary`}> {`About ${branch_name.name}`}</Typography>
            </Grid>
            <Grid item xs={12} sm={3} md={3}>
                <Typography variant={`h3`} color={`secondary.main`}> Jobs</Typography>
                <Typography variant={`h4`} color={`primary`}> Cooker</Typography>
                <Typography variant={`h4`} color={`primary`}> HR Employee</Typography>
                <Typography variant={`h4`} color={`primary`}> Developer</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} mt={5} mx={3} sx={{display:`flex`,justifyContent:'space-evenly'}} >
                <Typography variant={`h5`} color={`primary`}>
                    {branch_name.address}
                </Typography>
                <Typography variant={`h5`} color={`primary`}>
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