/*
 * Folder này để khai báo các hàm getTheme và gom các theme lại
 */
import React from "react";
import {lightTheme} from "./light";
import {darkTheme} from "./dark";
import {ThemeProvider} from "@mui/material";
import {createContext, useState} from "react";
import {THEME_CONSTANTS} from "./constants";

export const getThemeByName = (themeName) => themeMap[themeName];

const themeMap = {
    lightTheme,
    darkTheme
}
// Expose theme getter and setter for ease of theme changing.
export const ThemeContext = createContext((themeName) => {
});

// Get and persist the theme options when changed 
const CustomThemeProvider = (props) => {
    const curThemeName = localStorage.getItem("appTheme") || THEME_CONSTANTS.LIGHT_THEME;
    const [themeName, _setThemeName] = useState(curThemeName);
    const theme = getThemeByName(themeName);

    const setThemeName = (name) => {
        localStorage.setItem("appTheme", name);
        console.log("CURRENT THEME IS: ", name);
        _setThemeName(name);
    }
    return (
        <ThemeContext.Provider value={setThemeName}>
            <ThemeProvider theme={theme}> {props.children} </ThemeProvider>
        </ThemeContext.Provider>
    )
}
export default CustomThemeProvider;