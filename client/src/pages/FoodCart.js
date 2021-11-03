import React, { useState,useEffect } from 'react';
import { Grid,Typography, Button } from '@mui/material';
import { Box } from '@mui/system';

import { Card } from '@mui/material';
import { Paper } from '@mui/material';

import {useSelector} from 'react-redux';

import {selectors} from '../redux/slices/Food/FoodSlice'
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { base_keys } from '../locales/constants';
import VoucherBox from '../components/FoodCart/VoucherBox';
import TotalBox from '../components/FoodCart/TotalBox';
import NoteBox from '../components/FoodCart/NoteBox';
import FoodCard from '../components/FoodCart/FoodCard';
import {get_cart_actions} from '../redux/slices/Food/FoodSlice'

function FoodCart() {
  const cart=useSelector(selectors.getCart)
  let history = useHistory();
  const {t, i18n} = useTranslation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({type:get_cart_actions.loading,payload:``});
  }, []);
  return (
    <Grid container spacing={2} p={5} >
      <Grid item xs={12}>
        <Typography variant="h5" sx={{fontWeight:"Bold"}}>{t(base_keys.food.cart)}({cart.quantity})</Typography>
      </Grid>
      <Grid item container xs={12} spacing={2} >
        <Grid item container md={8} xs={12}  >
          <Paper sx={{boxShadow:3,width:"100%",height:"auto"}} >
            <Grid item container xs={12}  >
              {cart.food_list.map((food)=>{
                return <FoodCard food={food} key={food.id}/>;
              })}
            </Grid>
          </Paper>
        </Grid>
        <Grid item container md={4} xs={12} display="flex" flexDirection="column" spacing={2}  >


          <VoucherBox  voucherList={cart.voucher_list} voucher_id={cart.voucher_id} />

          
          <TotalBox subtotal={cart.subtotal} discount={cart.discount} />
          <NoteBox/>
          <Box textAlign="center" pt={8} >
            <Button onClick={()=>{}} variant="text" px="auto" sx={{
              color:"#fff",
              backgroundColor:"#f00",
              height:"50px",
              width:"180px",
              fontSize:20,
              fontWeight:"bold",
              borderRadius:3,
              "&:hover":{
                backgroundColor:"#f00"
              },
              "&:active":{
                backgroundColor:"#ff7373"
              },
              "&:focus":{
                backgroundColor:"#f00"
              }
            }} >
              {t(base_keys.food.pay)}
            </Button>
          </Box>
        </Grid>
      </Grid>
      
    </Grid>
  );
}

export default FoodCart;