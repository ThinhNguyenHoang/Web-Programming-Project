import {createTheme,alpha} from "@mui/material";
import {THEME_CONSTANTS} from "./constants";

const main_dark = '#121212'
export const darkTheme = createTheme(({
    palette:{
        type: 'dark',
        primary: {
            main: '#f30021'
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
        borderColor: {
            main: '#020000'
        },
        button:{
            outlined: {
                main:'#fd0808'
            }
        },
        elevation:{
            layer0: {
                main: '#121212',
                contrast: '#fff'
            }, // For the deepest level background
            layer1: {
                main: '#1d1d1d',
                contrast: '#fff'
            }, // Item containers , header, footer
            layer2: {
                main: '#2c2c2c',
                contrast: '#fff'
            }, // Item above the container
            layer3: {
                main: '#373737',
                contrast: '#fff'
            }, // popup,...
        }
    }
}))



const ELEVATION_BACKGROUND = {
    LAYER0: 'elevation.layer0',
    LAYER1: 'elevation.layer1',
    LAYER2: 'elevation.layer2',
    LAYER3: 'elevation.layer3',
}
