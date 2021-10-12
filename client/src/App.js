// ! Khúc dưới này mới là hàng thật
// import logo from './logo.svg';
// import './App.css';
// import {useContext} from "react";
// import {ThemeContext} from "./theme";
// import {Button} from "@mui/material";
// import {THEME_CONSTANTS} from "./theme/constants";
// import {BrowserRouter} from "react-router-dom";
// require('dotenv').config();


// function App() {
//   // Test theme context:
//   const setThemeName = useContext(ThemeContext);
//   return (
//       <BrowserRouter>
//       {/*  Header with tabs */}
//       {/*  RouteConfig will render the body based the tab*/}
//
//       </BrowserRouter>
//   );
// }

// export default App;
// ! Hết hàng thật


// * Anh chưa code xong nhưng up lên để mấy đứa chạy được mà coi source
import logo from './logo.svg';
import './App.css';
import {useContext, useState} from "react";
import {ThemeContext} from "./theme";
import {Button, Grid} from "@mui/material";
import {THEME_CONSTANTS} from "./theme/constants";
import {Trans, useTranslation} from "react-i18next";

require('dotenv').config();
// function TestComponent(){}
function App() {
    // Test theme context:
    const setThemeName = useContext(ThemeContext);
    const {t,i18n} = useTranslation();
    const handleChangeLanguage = (e) => {
        e.preventDefault();
        console.log("Changing language to:", e.target.value);
        i18n.changeLanguage(e.target.value);
    }
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    {t("test.welcome")}
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {t("test.learn_react")}
                </a>
                <Grid container spacing={2}>
                    <Grid item xs={6} sm={6} md={6} xl={6} lg={6}>
                        <Button variant={`contained`} color={`primary`}
                                onClick={() => setThemeName(THEME_CONSTANTS.LIGHT_THEME)}>
                            {t("theme.set_light_theme")}
                        </Button>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} xl={6} lg={6}>
                        <Button variant={`contained`} color={`secondary`}
                                onClick={() => setThemeName(THEME_CONSTANTS.DARK_THEME)}>
                            {t("theme.set_dark_theme")}
                        </Button>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} xl={6} lg={6}>
                        <Button value={`en`} variant={`contained`} color={`success`}
                                onClick={handleChangeLanguage}>
                            {t("language_choice.english")}
                        </Button>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} xl={6} lg={6}>
                        <Button value={`vi`} variant={`contained`} color={`warning`}
                                onClick={handleChangeLanguage}>
                            {t("language_choice.vietnamese")}
                        </Button>
                    </Grid>
                </Grid>


            </header>
        </div>
    );
}

export default App;



