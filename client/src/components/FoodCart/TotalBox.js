import React from "react";
import { Card, CardContent, CardHeader, ToggleButton, Typography } from "@mui/material";
import { padding, typography } from "@mui/system";
import { ToggleButtonGroup, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { base_keys } from '../../locales/constants';



function TotalBox(props) {
	const {t, i18n} = useTranslation();
	return (
		<Grid item >
			<Card sx={{boxShadow:3, bgcolor: 'elevation.layer1.main'}}>
				<CardContent>
					<Typography sx={{display:"inline",fontWeight:"bold", color:"elevation.layer0.contrast"}} variant="body1" color="initial" pb={2}>{t(base_keys.food.subtotal)}</Typography>
					<Typography sx={{display:"inline",float:"right",fontWeight:"bold", color:"elevation.layer0.contrast"}}  variant="body1" color="initial"   >{props.subtotal}đ</Typography>
					<br/>
					
					<Typography sx={{display:"inline",fontWeight:"bold", color:"elevation.layer0.contrast"}} variant="body1" color="initial" >{t(base_keys.food.discount)}-{props.discount}%</Typography>
					<Typography sx={{display:"inline",float:"right",fontWeight:"bold", color:"elevation.layer0.contrast"}} variant="body1" color="initial" >{props.subtotal*(props.discount/100)}đ</Typography>
					<br/><hr/>
				
					<Typography sx={{display:"inline",fontWeight:"bold",fontSize:20, color:"primary.main"}} variant="body1" color="initial" >{t(base_keys.food.total)}</Typography>
					<Typography sx={{display:"inline",float:"right",fontWeight:"bold",fontSize:20, color:"primary.main"}} variant="body1" color="initial" >{props.subtotal*(1-props.discount/100)}đ</Typography>
					
				</CardContent>
			</Card>
		</Grid>
	);
}
export default TotalBox;