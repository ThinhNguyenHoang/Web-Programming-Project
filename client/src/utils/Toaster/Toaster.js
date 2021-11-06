import {ThemeContext} from "../../theme";
import {toast} from "react-toastify";
import {lightTheme} from "../../theme/light";
import {THEME_CONSTANTS} from "../../theme/constants";

const NotificationCreator = (() => {
    const toastSuccessful = (message) =>{
        const currentTheme = localStorage.getItem("appTheme");
        console.log(currentTheme);
        if (currentTheme === THEME_CONSTANTS.LIGHT_THEME) {
            toast.success(`${message}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme:"light"
            });
        }
        else{
            toast.success(`${message}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme:"dark"
            });
        }
    }
    const toastWarning = (message) =>{
        const currentTheme = localStorage.getItem("appTheme");
        console.log(currentTheme);
        if (currentTheme === THEME_CONSTANTS.LIGHT_THEME) {
            toast.warn(`${message}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme:"light"
            });
        }
        else{
            toast.warn(`${message}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme:"dark"
            });
        }
    }
    const toastError = (message) =>{
        const currentTheme = localStorage.getItem("appTheme");
        console.log(currentTheme);
        if (currentTheme === THEME_CONSTANTS.LIGHT_THEME) {
            toast.error(`${message}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme:"light"
            });
        }
        else{
            toast.error(`${message}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme:"dark"
            });
        }
    }
    const toastMoveErrorWarning = (message)=>{
        toast.warn(`💩 ${message}!`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    return {toastWarning, toastSuccessful,toastError,toastMoveErrorWarning};
})();


export default NotificationCreator;