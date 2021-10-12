import {Switch, Route, Redirect} from "react-router-dom";
import ROUTING_CONSTANTS from "./constants";
// const ROUTING_CONSTANTS = {
//     ROOT: "/",
//     LOGIN: "/login",
//     REGISTER: "/register",
//     // Trang chủ
//     HOMEPAGE: "/homepage",
//     PAGE1: "/page1",
//     ABOUT_US: "/about",
//     NEWS: "/news",
//     ITEM_CART: "/cart",
//     RECOMMENDATION: "/recommendations",
// }

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

function News() {
    return null;
}

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
                <Home/>
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
        </Switch>
    )
}