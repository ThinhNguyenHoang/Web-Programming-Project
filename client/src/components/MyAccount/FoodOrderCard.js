import { Paper, Grid, CardMedia, Typography, Button, IconButton } from "@mui/material";
import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { styled } from '@mui/material/styles';
import { Box } from "@mui/system";
import {base_keys} from '../../locales/constants';
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { increase_quantity_cart,decrease_quantity_cart,delete_food_cart } from "../../redux/slices/Food/FoodSlice";
import img from '../../assets/images/foodimg.png';

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

function FoodOrderCard(props) {
	const food=props.food;
	const {t, i18n} = useTranslation();
  	const dispatch = useDispatch();
	return (
		<Grid item container xs={12} pl={0} pr={2} py={4} direction="row" padding="0px" sx={{bgcolor: '#c5cae9'}}>
			<Grid item direction="row" container sx={{ flex: 1 }}>
				<Grid item pl={2}>
					<CardMedia component="img" title="food" image={img} sx={{ maxHeight: 150, maxWidth: "auto" }} />
				</Grid>
				<Grid item pl={2} paddingTop="30px" width="200px">
					<Typography variant="subtitle1" color="initial" sx={{ fontSize:"20px" ,fontWeight: "bold", display: "inline" }}>{food.name}</Typography><br />
					<br />
					<br />
					<Typography variant="subtitle1" color="initial" sx={{ display: "inline" }}>{t(base_keys.food.price)} : {food.price}đ</Typography>
				</Grid> 
				<Grid item pl={2} paddingTop="30px" width="200px">
					<Typography variant="subtitle1" color="initial" sx={{ fontSize:"20px" ,fontWeight: "bold", display: "inline" }}></Typography><br />
					<br />
					<br />
					<Typography variant="subtitle1" color="initial" sx={{ textAlign: "center" }} pb={2}>{t(base_keys.food.quantity)}: {food.quantity}</Typography>
				</Grid> 
				<Grid item pl={2} paddingTop="30px" width="200px">
					<Typography variant="subtitle1" color="initial" sx={{ fontSize:"20px" ,fontWeight: "bold", display: "inline" }}></Typography><br />
					<br />
					<br />
					<Typography variant="subtitle1" color="initial" sx={{ fontWeight: "bold", textAlign: "center" }} pb={2}>Tổng tiền: 100000đ</Typography>
				</Grid> 
				<Grid item pl={2} paddingTop="50px" paddingLeft="40px">
					<Box textAlign='center'>
						<IconButton square="true" onClick={()=>{dispatch({type:delete_food_cart,payload:food.id})}}>
							<DeleteIcon sx={{ fill: "black" }} />
						</IconButton>
					</Box>
				</Grid> 
			</Grid>
		</Grid>
	);
}
export default FoodOrderCard;