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
                </BrowserRouter>
            </Provider>
        </CustomThemeProvider>
    </React.StrictMode>,
    document.getElementById("root")
);



//
// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries
//
// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyAMeYALPFuQ_klstxu-M8WDNUmR4hoEJZM",
//     authDomain: "bk-food-sale.firebaseapp.com",
//     projectId: "bk-food-sale",
//     storageBucket: "bk-food-sale.appspot.com",
//     messagingSenderId: "1086337831090",
//     appId: "1:1086337831090:web:f3ffc96eaaf043ec5279ab",
//     measurementId: "G-BC8N7S3TK5"
// };
//
// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);