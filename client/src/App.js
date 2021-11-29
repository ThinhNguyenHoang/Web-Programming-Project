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
import Map from './components/Map/Map'

import Toaster from "./utils/Toaster/Toaster";
import ReactFirebaseFileUpload from "./utils/UploadFile/FileUploader";
import MyImageMasonry from "./components/ImageMasonry/MyImageMasonry";
import ImageDrawerUpdater from "./components/ImageDrawerUpdater/ImageDrawerUpdater";
import {AccountGrid, BankAccountItem, PaymentDrawer} from "./components/Payment/PaymentDrawer";
import {selectors} from "./redux/slices/food/FoodSlice";
import {useSelector} from "react-redux";
import ComboItemCard from "./components/Food/ComboItemCard";
import moment from "moment";
import FoodSearchBar from "./components/SearchFood/SearchBar";
require('dotenv').config();
// function TestComponent(){}

const api_key = process.env.MAP_API;
const host = process.env.REACT_APP_PHP_PORT;
console.log("MAP KEY IS: ",process.env.MAP_API,host);

const bank_account_init = {
    id: "",
    bank_account_number:"",
    bank_account_owner: "",
    bank_account_type: "",
    balance: "",
    valid_start: "",
    valid_end: "",
}


export const bank_account_init_list = [{
    id: "",
    bank_account_number: "",
    bank_account_owner: "",
    bank_account_type: "",
    balance: "",
    valid_start: "",
    valid_end: "",
},{
    id: "",
    bank_account_number: "",
    bank_account_owner: "",
    bank_account_type: "",
    balance: "",
    valid_start: "",
    valid_end: "",
},{
    id: "",
    bank_account_number: "",
    bank_account_owner: "",
    bank_account_type: "",
    balance: "",
    valid_start: "",
    valid_end: "",
}]


const combo =  {
    id: '1',
    name: 'Combo thứ 2',
    description: 'Thịt lợn rim tiêu + Trứng đúc thịt',
    price: '150000',
    food_in_combo: [
        {
            id: '1',
            name: 'Thịt lợn rim tiêu',
            picture_uri: null,
            price: '120000',
            sale_value: 0,
            description: 'Thịt kho là món mặn dùng chính trong bữa cơm của người Việt, bên cạnh món canh và món rau. Hôm nay bếp kho quẹt sẽ giới thiệu đến các bạn món thịt kho tiêu, cũng là món được các chị em thường xuyên chế biến, nhưng để làm đúng chuẩn về màu sắc và mùi vị thì chắc hẳn nhiều người còn bỏ ngỏ. Nào, còn chờ gì nữa, chúng ta bắt tay vào làm món thịt kho tiêu cho kịp bữa cơm chiều nhé!',
            instruct: null,
            material: [],
            tags: []
        },
        {
            id: '2',
            name: 'Trứng đúc thịt',
            picture_uri: null,
            price: '80000',
            sale_value: 0,
            description: 'Món trứng đúc thịt là một món dễ làm, dễ ăn. Đặc biệt là trẻ em, gần như bé nào cũng thích ăn trứng nhưng đôi khi lại không thích ăn thịt vì dai. Với cách làm trứng đúc thịt này, thịt mềm và ngon, trứng rán vàng thơm lừng khắp cả nhà, hương vị rất kích thích với các bé. Hơn nữa vào những ngày bận rộn Bạn chỉ cần mất vài phút là đã có ngay một món ăn thơm ngon mà vẫn đầy đủ chất dinh dưỡng cho cả nhà rồi.',
            instruct: null,
            material: [],
            tags: []
        }
    ]
};
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
    const [image,setImage] = useState(null);
    const navigateToLoginPage = () => history.push(ROUTING_CONSTANTS.LOGIN);
    const navigateToRegisterPage = () => history.push(ROUTING_CONSTANTS.REGISTER);
    ///////////////test
    const navigateToNewsPage = () => history.push(ROUTING_CONSTANTS.NEWS);
    const navigateToCartPage=()=>{history.push(ROUTING_CONSTANTS.ITEM_CART);}
    const navigateToClient=()=>{history.push(ROUTING_CONSTANTS.CLIENT)};
    const navigateToOrder=()=>{history.push(ROUTING_CONSTANTS.ORDER)}
    ///////////////test

    const combos = useSelector(selectors.getWishListCombos);
    console.log("COMBO IS: ",combos);
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
                    <Button ml={4} value={`vi`} variant={`contained`} color={`error`}
                        onClick={navigateToCartPage}>
                        Cart
                    </Button>
                    <Button value={`vi`} variant={`contained`} color={`error`}
                        onClick={navigateToNewsPage}>
                        News
                    </Button>
                    <Button value={`vi`} variant={`contained`} color={`error`}
                        onClick={navigateToClient}>
                        Client
                    </Button>
                    <Button value={`vi`} variant={`contained`} color={`error`}
                        onClick={navigateToOrder}>
                        Order
                    </Button>
                    {/* //////////////test */}
                </Grid>
            </header>
            {/*<ImageDrawerUpdater trigger={<img src={image ? image : `https://i.stack.imgur.com/ly34R.jpg?s=96`} alt={`test`}/>} img_uri_callback={(img_uri) => {*/}
            {/*    console.log("SET IMAGE FROM THE OUST SIDE",img_uri);*/}
            {/*    setImage(img_uri)*/}
            {/*}} additionalStyle={{}}/>*/}
            {/*<Map*/}
            {/*    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyAMeYALPFuQ_klstxu-M8WDNUmR4hoEJZM&callback=initMap`}*/}
            {/*    loadingElement={<div style={{ height: `100%` }} />}*/}
            {/*    containerElement={<div style={{ height: `90vh`, margin: `auto`, border: '2px solid black' }} />}*/}
            {/*    mapElement={<div style={{ height: `100%` }} />}*/}
            {/*/>*/}
            {/*<ReactFirebaseFileUpload/>*/}
            {/*<MyImageMasonry/>*/}
            {/*<BankAccountItem account_item={bank_account_init}/>*/}
            {/*<AccountGrid bank_account_list={bank_account_init_list}/>*/}
            {/*<PaymentDrawer trigger={<Button variant={`contained`} color={`primary`}> PAY NOW</Button>} />*/}
            <ComboItemCard combo_item={combo}/>
            <FoodSearchBar/>
    </div>
    );
}

export default App;



