import React from 'react';
import default_company_logo from "../../assets/images/default_company_logo.jpeg";
import Box from "@mui/material/Box";
import Carousel from "react-material-ui-carousel";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";

import {array_to_chunks} from "../../utils";
import Typography from '@mui/material/Typography';


export const CompanyItem = ({company, mx,sx},...props) => {
    return (
        <Card sx={{ width: 130, maxWidth:200 , minWidth: 200}}>
          <CardMedia
            component="img"
            height="140px"
            image={company.Picture ? company.Picture : default_company_logo}
            alt={company.MaterialName ? company.MaterialName : "No info"}
          />
          <CardContent sx={{bgcolor:'elevation.layer1.main', color: 'elevation.layer1.contrast'}}>
            <Typography gutterBottom variant="h5" component="div" sx={{textAlign:"center"}}>
              {company.MaterialName}
            </Typography>
          </CardContent>
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
            // columnGap:"30px"
        }}>
            {company_list.map((item, index) => {
                return <CompanyItem company={item} key={index.toString()} sx={{mx:4}}/>
            })}
        </Box>
    )
}
const MaterialListCarousel = (props) => {
    // TODO: Code use Effect to get the involved company logo
    const list_of_list = array_to_chunks(props.material_list,5);
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


export default MaterialListCarousel;
