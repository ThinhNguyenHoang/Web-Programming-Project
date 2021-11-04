import React from 'react';
import { Grid,Typography, Button } from '@mui/material';
import SideBar from '../../components/MyAccount/SideBar';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import Information from '../../components/MyAccount/Information';
import { Paper } from '@mui/material';

function Profile () {
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

          {/* These lines of code are gonna be changed lately in order to match the database */}
          <Grid item container md={9} xs={12}>
            <Paper sx={{boxShadow:3,width:"100%",height:"auto"}}>
              <Information />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    );
}
 
export default Profile;