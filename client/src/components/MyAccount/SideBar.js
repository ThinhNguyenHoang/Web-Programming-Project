import React from "react";
import { CardContent, CardActions} from "@mui/material";
import { Card,  Typography } from "@mui/material";
import { Grid } from "@mui/material";
import Button from '@mui/material/Button';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import {RouterConfig, ROUTING_CONSTANTS} from "../../routes/RouterConfig";
import { useHistory } from "react-router";

const QuanlityButton = styled(Button)({
	// border: '1px solid ',
	// backgroundColor: '#c2c2c2',
	// borderColor: '#ababab',
	// padding: '0px 0px',
	// height: '30px',
	// width: '30px',
	// fontSize: 16,
	'&:hover': {
		backgroundColor: '#7a7a7a',
	},
	'&:active': {
		backgroundColor: '#4d4d4d',
	},
});

function SideBar(){
	const history = useHistory();
	const navigateToProfile = () => history.replace(ROUTING_CONSTANTS.PROFILE);
	const navigateToOrders = () => history.replace(ROUTING_CONSTANTS.ORDERS);
	const navigateToArchivedOrders = () => history.replace(ROUTING_CONSTANTS.ARCHIVEDORDERS);
	const navigateToVoucher = () => history.replace(ROUTING_CONSTANTS.VOUCHER);
  	return (
		<Grid item>
			<Card sx={{boxShadow:3}} square="true" sx={{bgcolor: '#e3f2fd'}}>
				<CardContent>
					<CardContent sx={{display:"flex", justifyContent: 'center'}}>
						<Avatar alt="Remy Sharp" src="" sx={{width: 100, height: 100}} />
					</CardContent>
					<CardContent sx={{textAlign:"center"}}>
						<Typography variant="subtile1" color="initial" sx={{fontWeight:"bold", fontSize:20 ,}}>Khổng Mạnh Quyền</Typography>
						<hr/>
					</CardContent>
				</CardContent>
				<CardActions sx={{flexDirection:'column', gap: '30px', paddingBottom: 5}}>
					<QuanlityButton size="big" startIcon={<AccountCircleOutlinedIcon />} sx={{fontWeight:"bold", fontSize:15}} onClick={navigateToProfile}>THÔNG TIN CÁ NHÂN</QuanlityButton>
      				<Button size="big" startIcon={<ReceiptOutlinedIcon />} sx={{fontWeight:"bold", fontSize:15}} onClick={navigateToOrders}>TÌNH TRẠNG ĐƠN HÀNG</Button>
      				<Button size="big" startIcon={<HistoryOutlinedIcon />} sx={{fontWeight:"bold", fontSize:15}} onClick={navigateToArchivedOrders}>LỊCH SỬ GIAO DỊCH</Button>
                    <Button size="big" startIcon={<LoyaltyIcon />} sx={{fontWeight:"bold", fontSize:15}} onClick={navigateToVoucher}>TÍCH LŨY</Button>
				</CardActions>
			</Card>
		</Grid>
  	);
}
export default SideBar;