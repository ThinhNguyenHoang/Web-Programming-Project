import {alpha, createTheme} from "@mui/material";


export const lightTheme = createTheme({
    palette:{
        type: 'light',
        primary: {
            main: '#f30021'
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
        header: {
            background: '#f8f8f8',
            contrast: '#211d1d',
            indicator:'#efe9e4'
        },
        background:{
            default: '#ffffff'
        },
        button:{
            outlined: {
                main:'#fd0808'
            }
        },
        elevation:{
            layer0: {
                main: '#fff',
                contrast: '#000'
            }, // For the deepest level background
            layer1: {
                main: '#ffffff',
                contrast: '#000'
            }, // Item containers , header, footer
            layer2: {
                main: '#ffffff',
                contrast: '#000'
            }, // Item above the container
            layer3: {
                main: '#fff',
                contrast: '#000'
            }, // popup,...
        }

    },

})