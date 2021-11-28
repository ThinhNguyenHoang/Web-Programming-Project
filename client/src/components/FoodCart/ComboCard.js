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
		<Grid item container xs={12} pl={0} pr={2} py={4} direction="row">
			<Grid item container sx={{ flex: 1 }}>
				<Grid item pl={2}>
					<CardMedia component="img" title="food" image={combo.Picture} sx={{ maxHeight: 190, maxWidth: 190 }} />
				</Grid>
				<Grid item pl={2}>
					<Typography variant="h5" color="initial" sx={{ display: "inline" , color:"elevation.layer1.contrast", fontWeight:"bold"}}>{combo.ComboName}</Typography><br />
					<Typography variant="h6" color="initial" sx={{ fontWeight: "bold", display: "inline", color:"elevation.layer1.contrast" }}>{t(base_keys.food.price)} : {combo.Price}đ</Typography>
				</Grid>
			</Grid>
			<Grid item  justifyContent="center" alignItems="center"   >
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
				<Box textAlign='center'>
					<IconButton>
						<InfoIcon sx={{color:"elevation.layer1.contrast"}}/>
					</IconButton>
					<IconButton square="true" onClick={()=>{
						deleteCombo(combo.ComboID);
					}}>
						<DeleteIcon sx={{color:"elevation.layer1.contrast"}} />
					</IconButton>
				</Box>
			</Grid>

		</Grid>
	);
}
export default ComboCard;
