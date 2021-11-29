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
import { useHistory } from 'react-router-dom';
import { ROUTING_CONSTANTS } from './../../routes/RouterConfig';
import { Card, CardContent } from "@mui/material";

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
	const history=useHistory();
	const food=props.food;
	const deleteFood=props.deleteFood;
	const updateFood=props.updateFood;
	const {t, i18n} = useTranslation();
	const dispatch = useDispatch();
	return (
		<Card sx={{ display: 'flex', borderRadius: 3, my:"15px",mx:"15px", bgcolor:"elevation.layer2.main"}}>
			<CardMedia
				component="img"
				sx={{ width: 151 }}
				image={food.Picture}
				title="food"
			/>
			<Box width="320px">
				<CardContent sx={{ flex: '1 0 auto' }}>
					<Button style={{textTransform: 'none'}} onClick={()=>history.push(ROUTING_CONSTANTS.FOODDETAIL+"/"+food.FoodID)}>
						<Typography component="div" variant="h5" sx={{fontWeight:"bold", color:"elevation.layer2.contrast"}}>
							{food.FoodName}
						</Typography>
					</Button>
					<br/>
					<br/>
					<Typography variant="subtitle1" component="div" sx={{pl:"10px",color:"elevation.layer2.contrast", display:"inline"}}>
						{t(base_keys.food.price)}:
					</Typography>
					{
						food.Sale==="0" ? (<></>):
						(
							<Typography style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid'}} ml="10px" variant="subtitle1" color="initial" sx={{ display: "inline",color:"elevation.layer1.contrast" }}>{food.Price}đ</Typography>
						)
					}
					<Typography variant="subtitle1" component="div" sx={{pl:"10px",color:"elevation.layer2.contrast", display:"inline", fontWeight:"bold"}}>
						{food.Price*(1-parseInt(food.Sale)/100)}đ
					</Typography>
				</CardContent>
			</Box>
			<Box sx={{px:"100px"}} alignSelf="center">
				<CardContent>
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
				</CardContent>
			</Box>
			<Box alignSelf="center">
				<IconButton size="large" square="true" onClick={()=>{
					deleteFood(food.FoodID);
				}}>
					<DeleteIcon fontSize="inherit" sx={{ color:"red" }} />
				</IconButton>
			</Box>
		</Card>
	);
}
export default FoodCard;