import React from 'react';
import { Box, margin } from "@mui/system";
import {Card,Typography,TextField,CardContent} from '@mui/material';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import {base_keys} from '../../locales/constants';

function NoteBox(){
    const {t, i18n} = useTranslation();

    return (
        <Grid item>
            <Card sx={{boxShadow:3}}>
                <CardContent>
                    <Typography sx={{display:"inline",fontWeight:"bold"}} variant="body1" color="initial" pb={2}>{t(base_keys.food.note)}</Typography>
                    <br/>
                    <TextField
                        multiline
                        rows={4}
                        defaultValue={t(base_keys.food.note)}
                        sx={{width:"100%"}}
                        />
                </CardContent>
            </Card>
        </Grid>
    );
}
export default NoteBox;