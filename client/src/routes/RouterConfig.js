import {Switch, Route, Redirect} from "react-router-dom";
import Login from "../pages/Login";
import App from "../App";
import Register from "../pages/Register";
import News from "../pages/News"
import FoodCart from "../pages/FoodCart"
import OrderMangament from "../pages/OrderManagement";
import ClientManagement from "../pages/ClientManagement";
import HomePage from "../pages/HomePage";
import {WithHeader} from "../components/header/Header";
import AboutUs from "../pages/AboutUs";
import AccountManagement from "../pages/AccountManagement";
import FoodRecommendationPage from "../pages/FoodRecommendationPage";
import WishListPage from "../pages/WishListPage";
import FoodPage from "../pages/FoodPage";

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
    WISH_LIST: "/wish_list",
    ACCOUNT: "/account",
    MANAGE_USERS: "/manage-user",
    MANAGE_ITEM_LIST: "/manage-item-info",
    MANAGE_BILL: "/manage-bill",
    TRANSACTIONS: "/transaction",
    CLIENT: "/clients",
    ORDER: "/orders",
    TESTING: "/test",
    PAYMENT:"/payment",
    FOOD: "/food"
}

const generateTabLinkItem = (label_name, nav_to, require_auth) => {
    return {
        id: `id-${label_name}`,
        label: label_name,
        navigateTo: nav_to,
        require_auth_level: "",
    }
}

function ManageUser() {

}

export const ROUTING_TAB_ITEMS = [
    generateTabLinkItem("Home Page", ROUTING_CONSTANTS.HOMEPAGE),
    generateTabLinkItem("About Us", ROUTING_CONSTANTS.ABOUT_US),
    generateTabLinkItem("News", ROUTING_CONSTANTS.NEWS),
    generateTabLinkItem("My Cart", ROUTING_CONSTANTS.ITEM_CART),
    generateTabLinkItem("Recommendations", ROUTING_CONSTANTS.RECOMMENDATION),
    generateTabLinkItem("My Account", ROUTING_CONSTANTS.ACCOUNT),
    // ! EDIT THE FOLLOWING LAST PROPS TO THE USER ROLE STRING CONSTANT
    generateTabLinkItem("Manage User", ROUTING_CONSTANTS.MANAGE_USERS, "Manager"),
    generateTabLinkItem("Manage Item Info", "Manager"),
    generateTabLinkItem("Manage User", ROUTING_CONSTANTS.MANAGE_BILL, "Manager"),
    generateTabLinkItem("Login", ROUTING_CONSTANTS.LOGIN),
    generateTabLinkItem("Register", ROUTING_CONSTANTS.REGISTER),
    generateTabLinkItem("Wishlist", ROUTING_CONSTANTS.WISH_LIST),
    generateTabLinkItem("All Foods", ROUTING_CONSTANTS.FOOD),
]

function Recommendations() {
    return null;
}

function PaymentPage() {
    return null;
}

export const RouterConfig = () => {
    return (
        <WithHeader>
            <Switch>
                <Route exact path={ROUTING_CONSTANTS.ROOT}>
                    <Redirect to={ROUTING_CONSTANTS.HOMEPAGE}/>
                </Route>
                <Route exact path={ROUTING_CONSTANTS.HOMEPAGE}>
                    <HomePage/>
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
                <Route exact path={ROUTING_CONSTANTS.ACCOUNT}>
                    <AccountManagement/>
                </Route>
                <Route exact path={ROUTING_CONSTANTS.RECOMMENDATION}>
                    <FoodRecommendationPage/>
                </Route>
                <Route exact path={ROUTING_CONSTANTS.ITEM_CART}>
                    <FoodCart/>
                </Route>
                <Route exact path={ROUTING_CONSTANTS.CLIENT}>
                    <ClientManagement/>
                </Route>
                <Route exact path={ROUTING_CONSTANTS.ORDER}>
                    <OrderMangament/>
                </Route>
                <Route exact path={ROUTING_CONSTANTS.WISH_LIST}>
                    <WishListPage/>
                </Route>
                <Route exact path={ROUTING_CONSTANTS.TESTING}>
                    <App/>
                </Route>
                <Route exact path={ROUTING_CONSTANTS.PAYMENT}>
                    <PaymentPage/>
                </Route>
                <Route exact path={ROUTING_CONSTANTS.FOOD}>
                    <FoodPage/>
                </Route>
            </Switch>
        </WithHeader>

    )
}