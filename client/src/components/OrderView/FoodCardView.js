import {  Grid, CardMedia, Typography, Button, IconButton } from "@mui/material";
import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { styled } from '@mui/material/styles';
import { Box } from "@mui/system";
import {base_keys} from '../../locales/constants';
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { increase_quantity_cart,decrease_quantity_cart,delete_food_cart,update_cart_actions,delete_cart_actions } from "../../redux/slices/food/FoodSlice";
import img from '../../assets/images/foodimg.png';
import InfoIcon from '@mui/icons-material/Info';
import { Card } from "@mui/material";
import CardContent from '@mui/material/CardContent';

const QuanlityButton = styled(Button)({
	border: '1px solid ',
	backgroundColor: '#c2c2c2',
	borderColor: '#ababab',
	padding: '0px 0px',
	height: '30px',
	width: '30px',
	fontSize: 16,
	'&:hover': {
		backgroundColor: '#7a7a7a',
	},
	'&:active': {
		backgroundColor: '#4d4d4d',
	},
});

function FoodCardView(props) {
	const food=props.food;
	const {t, i18n} = useTranslation();
	const dispatch = useDispatch();
	return (
        <Card sx={{ display: 'flex', borderRadius: 3, my:"15px", bgcolor:"elevation.layer2.main"}}>
            <CardMedia
                component="img"
                sx={{ width: 151 }}
                image={food.Picture}
                title="food"
            />
            <Box>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5" sx={{fontWeight:"bold", color:"elevation.layer2.contrast"}}>
                        {food.FoodName}
                    </Typography>
                    <Typography variant="subtitle1" component="div" sx={{color:"elevation.layer2.contrast"}}>
                        Giá: {food.Price} VND
                    </Typography>
                </CardContent>
            </Box>
            <Box sx={{px:"100px"}} alignSelf="center">
                <CardContent>
                    <Typography variant="subtitle1" component="div" sx={{color:"elevation.layer2.contrast"}}>
                        Số lượng: {food.Quantity}
                    </Typography>
                </CardContent>
            </Box>
            <Box alignSelf="center">
                <IconButton>
                    <InfoIcon sx={{color:"elevation.layer0.contrast"}}/>
                </IconButton>
            </Box>
        </Card>
	);
}
export default FoodCardView;