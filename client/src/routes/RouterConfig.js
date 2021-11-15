import {Switch, Route, Redirect} from "react-router-dom";
import Login from "../pages/Login";
import App from "../App";
import Register from "../pages/Register";


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
    USER_MANAGEMENT: "/user-manage",
    FOOD_COMBO_LIST: "/food_combo",
    FOOD_DETAIL: "/food/:food_id",
    USER_DETAIL: "/user/:user_id",
    COMBO_DETAIL: "/combo/:combo_id",
    BILLS: "/bill",
    TRANSACTIONS_HISTORY: "/transaction"

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

function News() {
    return null;
}

function Recommendations() {
    return null;
}

function UserManagement() {
    return null;
}

function FoodDetail() {
    return null;
}

function ComboDetail() {
    return null;
}

function FoodsAndCombos() {
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
            <Route exact path={ROUTING_CONSTANTS.USER_MANAGEMENT}>
                <UserManagement/>
            </Route>
            <Route exact path={ROUTING_CONSTANTS.FOOD_COMBO_LIST}>
                <FoodsAndCombos/>
            </Route>
            <Route exact path={ROUTING_CONSTANTS.FOOD_DETAIL}>
                <FoodDetail/>
            </Route>
            <Route exact path={ROUTING_CONSTANTS.COMBO_DETAIL}>
                <ComboDetail/>
            </Route>
        </Switch>
    );
}