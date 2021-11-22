import * as React from 'react';
import {Grid,CardMedia} from '@mui/material';
import ReactFirebaseFileUpload from '../utils/UploadFile/FileUploader';

function EditFoodItemManagement(){
    return (
        <Grid container>
            <Grid item container xs={12}>
                <Grid item xs={3}>
                    <ReactFirebaseFileUpload/>
                </Grid>
                <Grid item xs={9}>
                    //Form
                </Grid>
            </Grid>
            <Grid item xs={12}>

            </Grid>
            <Grid item xs={12}>
            </Grid>
        </Grid>
    );
}