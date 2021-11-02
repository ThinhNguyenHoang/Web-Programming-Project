// * Anh chưa code xong nhưng up lên để mấy đứa chạy được mà coi source
import logo from './logo.svg';
import './App.css';
import {useContext, useState} from "react";
import {ThemeContext} from "./theme";
import {Button, Grid} from "@mui/material";
import {THEME_CONSTANTS} from "./theme/constants";
import {Trans, useTranslation} from "react-i18next";
import {base_keys} from "./locales/constants";
import {RouterConfig, ROUTING_CONSTANTS} from "./routes/RouterConfig";
import {useHistory} from "react-router-dom";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Toaster from "./utils/Toaster/Toaster";
require('dotenv').config();

// function TestComponent(){}
function App() {
    // Test theme context:
    const setThemeName = useContext(ThemeContext);
    const {t, i18n} = useTranslation();
    const history = useHistory();

    const handleChangeLanguage = (e) => {
        e.preventDefault();
        console.log("Changing language to:", e.target.value);
        i18n.changeLanguage(e.target.value);
    }

    const navigateToLoginPage = () => history.push(ROUTING_CONSTANTS.LOGIN);
    const navigateToRegisterPage = () => history.push(ROUTING_CONSTANTS.REGISTER);
    ///////////////test
    const navigateToNewsPage = () => history.push(ROUTING_CONSTANTS.NEWS);
    const navigateToCartPage=()=>{history.push(ROUTING_CONSTANTS.ITEM_CART);}
    ///////////////test

    Toaster.toastSuccessful("HHUHU");
    return (<div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p> {t(base_keys.test.welcome)} </p>
                <a className="App-link" href="https://reactjs.org"
                   target="_blank"
                   rel="noopener noreferrer">
                    {t(base_keys.test.learn_react)} </a>
                <Grid container spacing={2}>
                    <Grid item xs={6}
                          sm={6}
                          md={6}
                          xl={6}
                          lg={6}>
                        <Button variant={`contained`}
                                color={`primary`}
                                onClick={
                                    () => setThemeName(THEME_CONSTANTS.LIGHT_THEME)}> {t(base_keys.theme.set_light_theme)}
                        </Button>
                    </Grid>
                    <Grid item xs={6}
                          sm={6}
                          md={6}
                          xl={6}
                          lg={6}>
                        <Button variant={`contained`}
                                color={`secondary`}
                                onClick={
                                    () => setThemeName(THEME_CONSTANTS.DARK_THEME)}> {t(base_keys.theme.set_dark_theme)} </Button>
                    </Grid>
                    <Grid item xs={6}
                          sm={6}
                          md={6}
                          xl={6}
                          lg={6}>
                        <Button value={`en`}
                                variant={`contained`}
                                color={`success`}
                                onClick={handleChangeLanguage}> {t(base_keys.language_choice.english)} </Button>
                    </Grid>
                    <Grid item xs={6}
                          sm={6}
                          md={6}
                          xl={6}
                          lg={6}>
                        <Button value={`vi`}
                                variant={`contained`}
                                color={`warning`}
                                onClick={handleChangeLanguage}> {t(base_keys.language_choice.vietnamese)} </Button>
                    </Grid>
                    <Grid item xs={12}
                          sm={12}
                          md={12}
                          xl={12}
                          lg={12}>
                        <Button value={`vi`}
                                variant={`contained`}
                                color={`warning`}
                                onClick={navigateToLoginPage}> {t(base_keys.form.login)} </Button>
                    </Grid>
                    <Grid item xs={12}
                          sm={12}
                          md={12}
                          xl={12}
                          lg={12}>
                        <Button value={`vi`}
                                variant={`contained`}
                                color={`error`}
                                onClick={navigateToRegisterPage}> {t(base_keys.form.register)} </Button>
                    </Grid>
                    {/* //////////////test */}
                    <Button value={`vi`} variant={`contained`} color={`error`}
                        onClick={navigateToCartPage}>
                        Cart
                    </Button>
                    {/* //////////////test */}
                </Grid>
            </header>
        </div>
    );
}

export default App;