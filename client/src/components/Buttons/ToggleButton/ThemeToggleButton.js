import {useContext, useState} from "react";
import {ThemeContext} from "../../../theme";
import {THEME_CONSTANTS} from "../../../theme/constants";
import {Button} from "@mui/material";
import Box from "@mui/material/Box";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'

// <div className="toggle">
//     <input type="checkbox" id="toggle"/>
//     <label htmlFor="toggle"></label>
// </div>
const LightThemeButton = ({setTheme}) => {
    return (
      <Button variant={`contained`} color={`primary`} onClick={
          () => setTheme(THEME_CONSTANTS.DARK_THEME)}>
          <Box sx={{mr:1}}>
              <FontAwesomeIcon icon={faMoon}/>
          </Box>
          Dark Mode
      </Button>
    );
}

const DarkThemeButton = ({setTheme}) => {
    return (
        <Button variant={`contained`} color={`error`} onClick={
            () => setTheme(THEME_CONSTANTS.LIGHT_THEME)}>
            <Box sx={{mr:1}}>
                <FontAwesomeIcon icon={faSun}/>
            </Box>
            Light Mode
        </Button>
    );
}

const ThemeToggleButton = () =>{
    const [themeName,setThemeName] = useContext(ThemeContext);
    return (
        <Box>
            {(themeName === THEME_CONSTANTS.LIGHT_THEME ? <LightThemeButton setTheme={setThemeName}/> : <DarkThemeButton setTheme={setThemeName}/>)}
        </Box>
    );
}

export default ThemeToggleButton;

