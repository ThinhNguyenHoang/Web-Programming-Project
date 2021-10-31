import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./redux/store";
import { Provider } from "react-redux";
import CustomThemeProvider from "./theme";
import "./locales/i18n";
import { BrowserRouter } from "react-router-dom";
import { RouterConfig } from "./routes/RouterConfig";
import {toast, ToastContainer} from "react-toastify";


ReactDOM.render(
    <React.StrictMode>
        <CustomThemeProvider>
            <ToastContainer draggablePercent={60} />
            <Provider store={store}>
                <BrowserRouter>
                    <RouterConfig />
                </BrowserRouter>{" "}
            </Provider>{" "}
        </CustomThemeProvider>{" "}
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
