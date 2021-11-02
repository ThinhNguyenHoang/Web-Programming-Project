import React, { useState } from "react";
import { ButtonBase, Card, CardContent, CardHeader, ToggleButton, Typography } from "@mui/material";
import { borderColor, typography } from "@mui/system";
import { ToggleButtonGroup } from "@mui/material";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import styled from "@emotion/styled";
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import { Button } from "@mui/material";
import { ButtonGroup } from "@mui/material";
import { useDispatch } from "react-redux";
import { change_voucher_cart } from "../../redux/slices/Food/FoodSlice";
import { base_keys } from "../../locales/constants";
import { useTranslation } from "react-i18next";

const VoucherButton= (props)=>{
	const choose=()=>{
		props.dispatch({type:change_voucher_cart,id:props.voucher.id})
	};
	let bg="#fffad1";
	if (props.voucher.id===props.voucher_id){
		bg="#ccc8a7";
	}
	return (
	<Box py={0.5}>
		<Button sx={{
			color:"#000",
			backgroundColor:bg,
			border:"1px solid",
			borderColor:"#000",
			fontSize:10,
			alignContent:"left",
			justifyContent:"left",
			borderRadius:0,
			width:"100%",
			height:"25px",
			fontWeight:"medium",
			"&:active":{
				backgroundColor:"#ccc8a7"
			},
			"&:hover":{
				backgroundColor:"#fffad1"
			},
			"&:focus":{
				backgroundColor:"#ccc8a7"
			}


			
		}}onClick={choose}  variant="contained" startIcon={<LoyaltyIcon sx={{color:"#ff0000",fontSize:10}} />}  square="true">  {props.voucher}</Button>
	</Box>
	);
};

function VoucherBox(props) {
	const voucherList=props.voucherList;
	const dispatch=useDispatch();
	const {t,i18n} = useTranslation();
	const {choose,setChoose}=useState({id:0, bg:"#fffad1"});
	const voucher_id=props.voucher_id;
	return (
		<Grid item >
			<Card sx={{boxShadow:3}}>
				<CardContent>
					<Typography variant="body1" color="initial" sx={{fontWeight:"bold", fontSize:20 ,}}>{t(base_keys.food.voucher)}</Typography>
					<hr/>
						{voucherList.map((voucher)=>{
							return <VoucherButton dispatch={dispatch} voucher={voucher} voucher_id={voucher_id}/>;
						})}
				</CardContent>
			</Card>
		</Grid>
	);
}
export default VoucherBox;