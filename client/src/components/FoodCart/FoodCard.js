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

const QuanlityButton = styled(Button)({
	border: '1px solid ',
	borderRadius:16,
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
	const deleteFood=props.deleteFood;
	const updateFood=props.updateFood;
	const {t, i18n} = useTranslation();
	const dispatch = useDispatch();
	return (
		<Grid item container xs={12} pl={0} pr={2} py={4} direction="row">
			<Grid item container width="300px">
				<Grid item pl={2}>
					<CardMedia component="img" title="food" image={food.Picture} sx={{ maxHeight: 190, maxWidth: 190 }} />
				</Grid>
				<Grid item pl={2}>
					<Button style={{textTransform: 'none'}}>
						<Typography variant="h5" sx={{color:"elevation.layer1.contrast", fontWeight:"bold" }}>{food.FoodName}</Typography><br />
					</Button>
					<br/>
					<Typography  ml="10px" variant="h6" color="initial" sx={{ fontWeight: "bold", display: "inline",color:"elevation.layer1.contrast" }}>{t(base_keys.food.price)} : {food.Price*(1-parseInt(food.Sale)/100)}đ</Typography>
					{
						food.Sale==="0" ? (<></>):
						(
							<Typography style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid'}} ml="10px" variant="h6" color="initial" sx={{ fontWeight: "bold", display: "inline",color:"elevation.layer1.contrast" }}>{food.Price}đ</Typography>
						)
					}
					
				</Grid>
			</Grid>
			<Grid item justifyContent="center" alignItems="center" margin="auto">
				<Typography variant="subtitle1" color="initial" sx={{ fontWeight: "bold", textAlign: "center", color:"elevation.layer1.contrast" }} pb={2}>{t(base_keys.food.quantity)}</Typography>
				<Box display="flex" flexDirection="row" pb={2}>
					<QuanlityButton onClick={()=>{
						updateFood({...food,Quantity:parseInt(food.Quantity)+1});
					}} >
						<AddIcon sx={{ fill: "black" }} />
					</QuanlityButton>
					<Typography variant="subtitle1" color="initial" sx={{ fontWeight: "bold", px: 2, color:"elevation.layer1.contrast" }}>{food.Quantity}</Typography>
					<QuanlityButton onClick={()=>{
						if(parseInt(food.Quantity)<2){
                            return;
                        }else{
                            updateFood({...food,Quantity:parseInt(food.Quantity)-1});
                        }
					}}>
						<RemoveIcon sx={{ fill: "black" }} />
					</QuanlityButton>
				</Box>
			</Grid>
			<Box textAlign='center'>
				<IconButton size="large" square="true" onClick={()=>{
					deleteFood(food.FoodID);
				}}>
					<DeleteIcon fontSize="inherit" sx={{ color:"red" }} />
				</IconButton>
			</Box>

		</Grid>
	);
}
export default FoodCard;