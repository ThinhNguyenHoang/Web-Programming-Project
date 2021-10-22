import * as React from 'react';
import {Box,Typography,Card} from '@mui/material';
import {base_keys} from "../locales/constants";
import {useHistory} from 'react-router-dom';
import {useTranslation} from "react-i18next";
import OrderCard from '../components/OrderCard';
import fimg from "../assets/images/foodimg.png";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


const initorder={
    foodname:"Food Name",
    foodimg:fimg,
    foodprice: "300K"
}

function Cart (){
    let history = useHistory();
    const {t, i18n} = useTranslation();
    return (
        <div>
        <Box sx={{
            display: `flex`,
            flexDirection: `column`}}>
            <Box sx={{
                display: `flex`,
                flexDirection: `row`,my:2,mx:"auto",ml:"19.5%",borderBottom: 1}}>
                <Typography variant="h3">{t(base_keys.form.cart)}</Typography>
            </Box>
            <Box sx={{
                display: `flex`,
                flexDirection: `column`,my:2,mx:"auto",ml:"19.5%",rowGap:2}}>
                <Box sx={{display:'flex',justifyContent:'center',flexDirection:'row',columnGap:13}}>
                    <Box sx={{alignItems: 'center'}}>
                        <Typography variant="h6" align="center" color="text.primary" fontWeight="bold">{t(base_keys.form.foodname)}</Typography>
                    </Box>
                    <Box sx={{alignItems: 'center'}}>
                        <Typography variant="h6" align="center" color="text.primary" fontWeight="bold">{t(base_keys.form.price)}</Typography>
                    </Box>
                    <Box sx={{alignItems: 'center'}}>
                        <Typography variant="h6" align="center" color="text.primary" fontWeight="bold">{t(base_keys.form.amount)}</Typography>
                    </Box>
                    <Box sx={{alignItems: 'center'}}>
                        <Typography variant="h6" align="center" color="text.primary" fontWeight="bold">{t(base_keys.form.total_food_price)}</Typography>
                    </Box>
                </Box>
                    {[initorder,initorder,initorder].map(OrderCard)}
            </Box>
            <Box sx={{display: `flex`,flexDirection: `column`,mx:"auto",ml:"62%"}}>
                <Box sx={{display: 'flex', flexDirection:'row',gap:1}}>
                    <Typography variant="h6" align="center" color="text.primary" fontWeight="bold">{t(base_keys.form.total)}</Typography>
                    <Typography variant="h6" align="center" color="text.primary" fontWeight="bold">360K </Typography>
                </Box>
                <Box sx={{display: `flex`,flexDirection: `row`,mx:"auto"}}>
                    <TextField
                    id="standard-multiline-static"
                    label="Note"
                    multiline
                    rows={3}
                    variant="standard"
                    />
                </Box>
                <Button variant="contained">
                    {t(base_keys.form.pay)}
                </Button>
            </Box>
        </Box>
        </div>
        
    );
}

export default Cart;
