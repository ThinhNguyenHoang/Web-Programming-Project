import { Grid, Typography, Button, IconButton } from "@mui/material";
import React from "react";
import Avatar from '@mui/material/Avatar';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function Information (props) {
	return (
		<Grid container xs={50} pl={0} pr={2} py={4} paddingLeft={10} paddingTop={1} sx={{bgcolor: '#e8eaf6'}}>
			<Grid item container direction="column" sx={{ flex: 1}}>
				<Grid item pl={2} paddingTop={3} paddingLeft={3} paddingBottom={5} sx={{display:'flex', flexDirection:'row', gap:5}}>
                    <Avatar alt="Remy Sharp" src="" sx={{width: 150, height: 150}} />
					<Typography variant="subtitle1" color="initial" sx={{paddingTop:6.5 ,fontWeight:"bold", display: "inline", fontSize: "h4.fontSize" }}>Khổng Mạnh Quyền</Typography>
				</Grid>
				<Grid item pl={2} paddingLeft={5} paddingBottom={5} sx={{display:"flex", flexDirection:"row", columnGap:4}}>
                    <Grid sx={{display:"flex", flexDirection:"column", alignItems:"flex-end", rowGap:5.7}}>
                        <Typography variant="subtitle1" color="initial" sx={{fontWeight:"bold" ,display: "inline", fontSize: "h6.fontSize"}}>Tên đăng nhập: </Typography>
                        <Typography variant="subtitle1" color="initial" sx={{fontWeight: "bold", display: "inline", fontSize: "h6.fontSize"}}>Mật khẩu:</Typography>
                        <Typography variant="subtitle1" color="initial" sx={{fontWeight: "bold", display: "inline", fontSize: "h6.fontSize"}}>Địa chỉ:</Typography>
                        <Typography variant="subtitle1" color="initial" sx={{fontWeight: "bold", display: "inline", fontSize: "h6.fontSize"}}>Email:</Typography>
                        <Typography variant="subtitle1" color="initial" sx={{fontWeight: "bold", display: "inline", fontSize: "h6.fontSize"}}>Số điện thoại:</Typography>
                    </Grid>
                    <Grid sx={{display:"flex", flexDirection:"column", alignItems:"flex-start", rowGap:5.7}}>
                        <Typography variant="subtitle1" color="initial" sx={{display: "inline", fontSize: "h6.fontSize"}}>iamlion </Typography>
                        <Typography variant="subtitle1" color="initial" sx={{display: "inline", fontSize: "h6.fontSize", paddingRight:10}}>**********             
                            <IconButton aria-label="visible"><VisibilityOffIcon /></IconButton>
                        </Typography>
                        <Typography variant="subtitle1" color="initial" sx={{display: "inline", fontSize: "h6.fontSize"}}>351, Trường Chinh, Bình Thạnh, TPHCM</Typography>
                        <Typography variant="subtitle1" color="initial" sx={{display: "inline", fontSize: "h6.fontSize"}}>lionking@gmail.com</Typography>
                        <Typography variant="subtitle1" color="initial" sx={{display: "inline", fontSize: "h6.fontSize"}}>09283746374</Typography>
                    </Grid>
				</Grid>
                <Grid item pl={2} paddingLeft={27} paddingTop={2} paddingBottom={10}>
                    <Button variant="contained" size="large">
                        CHỈNH SỬA THÔNG TIN
                    </Button>
                </Grid>
			</Grid>
		</Grid>
	);
}
export default Information;