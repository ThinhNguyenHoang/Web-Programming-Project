import {Switch, Route, Redirect} from "react-router-dom";
import Login from "../pages/Login";
import App from "../App";
import Register from "../pages/Register";
import News from "../pages/News"
import FoodCart from "../pages/FoodCart"
import OrderMangament from "../pages/OrderManagement";
import ClientManagement from "../pages/ClientManagement";


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
    ACCOUNT: "/account", 
    MANAGE_USERS: "/manage-user",
    MANAGE_ITEM_LIST :"/manage-item-info",
    MANAGE_BILL: "/manage-bill",
    TRANSACTIONS: "/transaction",
    CLIENT:"/clients",
    ORDER:"/orders",
}

const generateTabLinkItem = (label_name,component,nav_to,require_auth) => {
    return {
        id: `id-${label_name}`,
        label: label_name, 
        component: component,
        navigateTo: nav_to,
        require_auth_level: "",
    }
}

export const ROUTING_TAB_ITEMS = [
    generateTabLinkItem("Home Page", Home,ROUTING_CONSTANTS.HOMEPAGE),
    generateTabLinkItem("Login", Login,ROUTING_CONSTANTS.LOGIN),
    generateTabLinkItem("Register",Register,ROUTING_CONSTANTS.REGISTER), 
    generateTabLinkItem("About Us",AboutUs,ROUTING_CONSTANTS.ABOUT_US), 
    generateTabLinkItem("News", News,ROUTING_CONSTANTS.NEWS), 
    generateTabLinkItem("My Cart", Cart,ROUTING_CONSTANTS.ITEM_CART),
    generateTabLinkItem("Recommendations", Recommendations,ROUTING_CONSTANTS.RECOMMENDATION), 
    generateTabLinkItem("My Account", Account,ROUTING_CONSTANTS.ACCOUNT),
    // ! EDIT THE FOLLOWING LAST PROPS TO THE USER ROLE STRING CONSTANT
    generateTabLinkItem("Manage User",ManageUser,ROUTING_CONSTANTS.MANAGE_USERS,"Manager"),
    generateTabLinkItem("Manage Item Info",ManageItemInfo,"Manager"),
    generateTabLinkItem("Manage User",ManageBills,ROUTING_CONSTANTS.MANAGE_BILL,"Manager"),
    generateTabLinkItem("Manage User",ManageTransactions,ROUTING_CONSTANTS.MANAGE_ITEM_LIST,"Manager"),
]


/*
    * Từng component dưới này phải được thay bằng một page ở pages
    ! Còn phải thêm trang cho các lần thanh toán và các đơn hàng
 */
function Home() {
    return null;
}
function ManageItemInfo (){
    return null; 
}
function ManageBills (){
    return null; 
}
function ManageTransactions(){
    return null; 
}
function Account() {
    return null; 
}
function Cart(){
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
            <Route exact path={ROUTING_CONSTANTS.CLIENT}>
                <ClientManagement/>
            </Route>
            <Route exact path={ROUTING_CONSTANTS.ORDER}>
                <OrderMangament/>
            </Route>
        </Switch>
    )
}