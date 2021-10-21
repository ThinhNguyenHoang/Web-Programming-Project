import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Box from '@mui/material/Box';
import nofimg from "../assets/images/nofication.png";
import { CardMedia } from '@mui/material';

const initnof={
    nofiname:"Thông báo",
    noficont:"Đến với Pizza Hut, bạn sẽ là một mảnh ghép tạo nên Chiếc bánh của Niềm Tin và Sự Xuất Sắc. Là một môi trường thân thiện, hòa nhã, và tạo điều kiện phát triển sự nghiệp cho mỗi cá nhân.",
    nofimg:nofimg,
}


function Nofication ({nofInfo=initnof}){
    return (
    <Box container  sx={{ boxShadow:1,m:1,borderRadius:"10px",maxWidth:935 }} >
        <Grid container spacing={2}>
            <Grid item>
            <CardMedia title="nofication" image={nofInfo.nofimg} sx={{width: 128 ,height: 128,borderBottomLeftRadius:"10px",borderTopLeftRadius:"10px"}}/>
            </Grid>
            <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                        <Typography gutterBottom variant="subtitle1" component="div">
                            {nofInfo.nofiname}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            {nofInfo.noficont}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </Box>
    );
}
export default Nofication;