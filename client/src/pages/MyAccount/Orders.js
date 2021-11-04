import React from 'react';
import { Grid,Typography, Button } from '@mui/material';
import SideBar from '../../components/MyAccount/SideBar';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';

function Orders () {
    let history = useHistory();
    const {t, i18n} = useTranslation();
    return (
        <Grid container spacing={5} p={20} paddingTop={5}>
        <Grid item xs={12}>
          <Typography variant="h4" sx={{fontWeight:"Bold"}}>My Account</Typography>
        </Grid>
        <Grid item container xs={12} spacing={2} >
          <Grid item container md={3} xs={12}  >
                <SideBar  />
          </Grid>
        </Grid>
      </Grid>
    );
}
 
export default Orders;