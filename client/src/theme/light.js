import {createTheme} from "@mui/material";


export const lightTheme = createTheme({
    palette:{
        type: 'light',
        primary: {
            main: '#42a5f5'
        },
        secondary:{
            main: '#ba68c8'
        },
        error:{
            main: '#ef5350'
        },
        warning:{
            main: '#ff9800'
        },
        info:{
            main: '#03a9f4'
        },
        success:{
            main: '#4caf50'
        },
    }
})