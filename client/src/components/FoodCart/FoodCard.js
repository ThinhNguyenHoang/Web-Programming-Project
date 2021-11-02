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

function FoodCard(props) {
	const food=props.food;
	const {t, i18n} = useTranslation();
  	const dispatch = useDispatch();
	return (
		<Grid item container xs={12} pl={0} pr={2} py={4} direction="row">
			<Grid item container sx={{ flex: 1 }}>
				<Grid item pl={2}>
					<CardMedia component="img" title="book" image={food.picture} sx={{ height: 190, width: "auto" }} />
				</Grid>
				<Grid item pl={2}>
					<Typography variant="subtitle1" color="initial" sx={{ display: "inline" }}>{food.name}</Typography><br />
					<Typography variant="subtitle1" color="initial" sx={{ fontWeight: "bold", display: "inline" }}>{t(base_keys.food.price)} : {food.price}đ</Typography>
				</Grid>
			</Grid>
			<Grid item direction="column" justifyContent="center" alignItems="center"   >
				<Typography variant="subtitle1" color="initial" sx={{ fontWeight: "bold", textAlign: "center" }} pb={2}>{t(base_keys.food.quantity)}</Typography>
				<Box display="flex" flexDirection="row" pb={2}>
					<QuanlityButton onClick={dispatch({type:increase_quantity_cart,payload:food.id})} >
						<AddIcon sx={{ fill: "black" }} />
					</QuanlityButton>
					<Typography variant="subtitle1" color="initial" sx={{ fontWeight: "bold", px: 2 }}>{food.quantity}</Typography>
					<QuanlityButton onClick={dispatch({type:decrease_quantity_cart,payload:food.id})}>
						<RemoveIcon sx={{ fill: "black" }} />
					</QuanlityButton>
				</Box>
				<Box textAlign='center'>
					<IconButton square="true" onClick={dispatch({type:delete_food_cart,payload:food.id})}>
						<DeleteIcon sx={{ fill: "black" }} />
					</IconButton>
				</Box>
			</Grid>

		</Grid>
	);
}
export default FoodCard;