import React from 'react';
import { Grid,Typography, Button } from '@mui/material';
import SideBar from '../../components/MyAccount/SideBar';
import { useState,useEffect } from 'react';
import { Box } from '@mui/system';

import { Card } from '@mui/material';
import { Paper } from '@mui/material';

import {useSelector} from 'react-redux';

import {selectors} from '../../redux/slices/Food/FoodSlice'
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { base_keys } from '../../locales/constants';
import FoodOrderCard from '../../components/MyAccount/FoodOrderCard';
import {get_cart_actions,update_cart_actions} from '../../redux/slices/Food/FoodSlice'

function Orders () {
  const cart=useSelector(selectors.getCart);
  const userID=useSelector(selectors.getUserId);
  let history = useHistory();
  const {t, i18n} = useTranslation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({type:get_cart_actions.loading,payload:``});
  }, []);
    return (
        <Grid container spacing={5} p={20} paddingTop={5}>
        <Grid item xs={12}>
          <Typography variant="h4" sx={{fontWeight:"Bold"}}>My Account</Typography>
        </Grid>
        <Grid item container xs={12} spacing={2} >
          <Grid item container md={3} xs={12}  >
                <SideBar  />
          </Grid>
          <Grid item container md={9} xs={12}>
            {/* <Paper sx={{boxShadow:3,width:"100%",height:"auto"}} > */}
              <Grid item container xs={12} rowGap={2}  >
                {cart.food_list.map((food)=>{
                  return <FoodOrderCard food={food} key={food.id}/>;
                })}
              </Grid>
            {/* </Paper> */}
          </Grid>
        </Grid>
      </Grid>
    );
}
 
export default Orders;