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
import { Card, CardContent } from "@mui/material";
import default_combo from '../../assets/images/default_combo.jpg';

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

function ComboCard(props) {
	const combo=props.combo;
    const deleteCombo=props.deleteCombo;
    const updateCombo=props.updateCombo;
	const {t} = useTranslation();
	const dispatch = useDispatch();
	return (
		<Card sx={{ display: 'flex', borderRadius: 3, my:"15px",mx:"15px", bgcolor:"elevation.layer2.main"}}>
			<CardMedia
				component="img"
				sx={{ width: 151 }}
				image={combo.Picture ? combo.Picture : default_combo}
				title="food"
			/>
			<Box width="320px">
				<CardContent sx={{ flex: '1 0 auto' }}>
					<Typography component="div" variant="h5" sx={{pl:"10px", fontWeight:"bold", color:"elevation.layer2.contrast"}}>
						{combo.ComboName}
					</Typography>
					<br/>
					<br/>
					<Typography variant="subtitle1" component="div" sx={{pl:"10px",color:"elevation.layer2.contrast", display:"inline"}}>
						{t(base_keys.food.price)}:
					</Typography>
					<Typography variant="subtitle1" component="div" sx={{color:"elevation.layer2.contrast", display:"inline", fontWeight:"bold"}}>
						{combo.Price}đ
					</Typography>
				</CardContent>
			</Box>
			<Box sx={{px:"100px"}} alignSelf="center">
				<CardContent>
					<Typography variant="subtitle1" color="initial" sx={{ fontWeight: "bold", textAlign: "center", color:"elevation.layer1.contrast" }} pb={2}>{t(base_keys.food.quantity)}</Typography>
					<Box display="flex" flexDirection="row" pb={2}>
						<QuanlityButton onClick={()=>{
							updateCombo({...combo,Quantity:parseInt(combo.Quantity)+1});
						}} >
							<AddIcon sx={{ fill: "black" }} />
						</QuanlityButton>
						<Typography variant="subtitle1" color="initial" sx={{ fontWeight: "bold", px: 2, color:"elevation.layer1.contrast" }}>{combo.Quantity}</Typography>
						<QuanlityButton onClick={()=>{
							if(parseInt(combo.Quantity)<2){
								return;
							}else{
								updateCombo({...combo,Quantity:parseInt(combo.Quantity)-1});
							}
						}}>
							<RemoveIcon sx={{ fill: "black" }} />
						</QuanlityButton>
					</Box>
				</CardContent>
			</Box>
			<Box alignSelf="center">
				<IconButton size="large" square="true" onClick={()=>{
					deleteCombo(combo.ComboID);
				}}>
					<DeleteIcon fontSize="inherit" sx={{ color:"red" }} />
				</IconButton>
			</Box>
		</Card>
	);
}
export default ComboCard;