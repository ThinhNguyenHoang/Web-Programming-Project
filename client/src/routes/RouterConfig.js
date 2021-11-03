import {Switch, Route, Redirect} from "react-router-dom";
import Login from "../pages/Login";
import App from "../App";
import Register from "../pages/Register";
import News from "../pages/News"
import FoodCart from "../pages/FoodCart"



const baseUrl = process.env.FAKE_SERVER_HOST;
export const ROUTING_CONSTANTS = {
    ROOT: "/",
    LOGIN: "/login",
    REGISTER: "/register",
    // Trang chủ
    HOMEPAGE: "/homepage",
    PAGE1: "/page1",
    ABOUT_US: "/about",
    NEWS: "/news",
    ITEM_CART: "/cart",
    RECOMMENDATION: "/recommendations",
}

/*
    * Từng component dưới này phải được thay bằng một page ở pages
    ! Còn phải thêm trang cho các lần thanh toán và các đơn hàng
 */
function Home() {
    return null;
}

function Topics() {
    return null;
}

function AboutUs() {
    return null;
}

// function News() {
//     return null;
// }

function Recommendations() {
    return null;
}

export const RouterConfig = () => {
    return (
        <Switch>
            <Route exact path={ROUTING_CONSTANTS.ROOT}>
                <Redirect to={ROUTING_CONSTANTS.HOMEPAGE}/>
            </Route>
            <Route exact path={ROUTING_CONSTANTS.HOMEPAGE}>
                <App/>
            </Route>
            <Route exact path={ROUTING_CONSTANTS.LOGIN}>
                <Login/>
            </Route>
            <Route exact path={ROUTING_CONSTANTS.REGISTER}>
                <Register/>
            </Route>
            <Route exact path={ROUTING_CONSTANTS.ABOUT_US}>
                <AboutUs/>
            </Route>
            <Route exact path={ROUTING_CONSTANTS.NEWS}>
                <News/>
            </Route>
            <Route exact path={ROUTING_CONSTANTS.RECOMMENDATION}>
                <Recommendations/>
            </Route>
            <Route exact path={ROUTING_CONSTANTS.ITEM_CART}>
                <FoodCart/>
            </Route>
        </Switch>
    )
}