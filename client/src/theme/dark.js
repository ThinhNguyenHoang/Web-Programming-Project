import {createTheme} from "@mui/material";

export const darkTheme = createTheme(({
    palette:{
        type: 'dark',
        primary: {
            main: '#1565c0'
        },
        secondary:{
            main: '#7b1fa2'
        },
        error:{
            main: '#c62828'
        },
        warning:{
            main: '#e65100'
        },
        info:{
            main: '#01579b'
        },
        success:{
            main: '#1b5e20'
        },
    }
}))