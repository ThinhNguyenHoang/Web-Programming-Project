import {createTheme} from "@mui/material";

export const darkTheme = createTheme(({
    palette:{
        type: 'dark',
        primary: {
            main: '#ebefeb  '
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
        background:{
            main: '#090808',
            contrastText: '#fff'
        },
        header: {
            main:'#ffffff',
            background: '#000000',
            contrast: '#ebefeb',
            indicator:'#ffffff',
        },
        test:{
            default: '#db3300'
        },
    }
}))