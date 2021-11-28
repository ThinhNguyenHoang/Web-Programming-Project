import {useDispatch, useSelector} from "react-redux";
import {AppBar, Avatar, Box, Button, Tab, Tabs, ToggleButton, Toolbar} from "@mui/material";
import logo from "../../assets/images/logo_64.png";
import {ROUTING_CONSTANTS, ROUTING_TAB_ITEMS} from "../../routes/RouterConfig";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import ThemeToggleButton from "../Buttons/ToggleButton/ThemeToggleButton";
import {load_user_profile_with_token, logout_actions, selectors} from "../../redux/slices/auth/AuthSlice";
import {deepOrange} from "@mui/material/colors";
import {SearchBar} from "../Search/SearchBar";
import Footer from "../Footer/Footer";
import * as React from "react";
import {read_user_profile_actions} from "../../redux/slices/auth/AuthSlice";
import {USER_CONSTANTS} from "../../redux/slices/auth/AuthConstants";

const LogoAndName = ({navTo}) =>{
    return (
        <Box sx={{marginRight:`2em`,marginTop:`0.3em`,display:`flex`,alignItems: `center`}}>
            <img src={logo}  alt={`logo`}/>
            <Typography sx={{margin:`1em`}} variant={`h6`}> <Link to={navTo}>BK Food Sale </Link> </Typography>
        </Box>
    );
}

const UserAvatarBox = () =>{
    const isLoggedIn = useSelector(selectors.getLoginSuccess)
    const userAvatar = useSelector(selectors.getUserAvatar)
    const userName = useSelector(selectors.getUserName)
    if(isLoggedIn){
        return <Box sx={{display: {xs:`none`,sm:`none`,md:`flex`}, flexDirection:'row',justifyContent:`space-between`,alignItems:`center`,m:1}}>
                <Avatar src={userAvatar} alt={userName}>{userName? userName : "Guess"}</Avatar>
            <Typography sx={{ml:1,color: `elevation.layer0.contrast`}} >
                {`Hello, ${userName}`}
            </Typography>
        </Box>
    }
    else{
        return <Box sx={{display:`flex`, flexDirection:'row',justifyContent:`space-between`,alignItems:`center`,m:1}}>
            <Avatar sx={{ bgcolor: deepOrange[500] }}>
                G
            </Avatar>
            <Typography sx={{ml:1, color:'header.contrast'}}>
                Guess
            </Typography>
        </Box>
    }
}


const Header = (props) => {
    const NormalTabs = [
        ROUTING_CONSTANTS.HOMEPAGE,
        ROUTING_CONSTANTS.ABOUT_US,
        ROUTING_CONSTANTS.NEWS,
        ROUTING_CONSTANTS.ITEM_CART,
        ROUTING_CONSTANTS.LOGIN,
        ROUTING_CONSTANTS.REGISTER,
        ROUTING_CONSTANTS.FOOD,
    ]
    const LoggedInTabs = [
        ROUTING_CONSTANTS.WISH_LIST,
        ROUTING_CONSTANTS.RECOMMENDATION,
        ROUTING_CONSTANTS.ACCOUNT,
    ];
    const ManagerTabs = [
        ROUTING_CONSTANTS.MANAGE_BILL,
        ROUTING_CONSTANTS.MANAGE_USERS,
        ROUTING_CONSTANTS.MANAGE_ITEM_LIST,
    ];

    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState(0);
    const components = props.components;
    const isLoggedIn = useSelector(selectors.getLoginSuccess);
    const userRole = useSelector(selectors.getUserRole);
    const handleChange = (event, value) => {
        setActiveTab(value);
    }

    const tabs_item_to_render = (list_tab) => {

    }

    const signOutUser = () => {
        console.log("SIGN OUT USER");
        dispatch({type:logout_actions.success});
    }

    const userProfile = useSelector(selectors.getUserProfile);
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        console.log("TOKEN FOUND IS: ",storedToken);
        if(storedToken) {
            console.log("FOUND TOKEN ==> Trying to find load user profile",storedToken);
            dispatch({type:read_user_profile_actions.loading})
        }
    },[])
    return (
        <Box sx={{width: '100%',position:'fixed',zIndex:2,maxHeight:{xs:`100px`,sm:`100px`,md:`100px`,lg:`100px`}}}>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <AppBar sx={{bgcolor:'elevation.layer1.main',display:`flex`,justifyContent:`space-around`}} position="static" color={`default`}>
                    <Toolbar sx={{display:`flex`,justifyContent:`space-around`, flexWrap: `wrap`}}>
                        <Tabs sx={{display: `flex`, flexWrap: `wrap`,color:`elevation.layer0.contrast`}} value={activeTab} onChange={handleChange}
                              variant={`scrollable`} scrollButtons={`auto`}
                              textColor="header.contrast"
                              indicatorColor="primary"
                              disableRipple
                              aria-label="scrollable auto tabs example"
                        >
                            {
                                ROUTING_TAB_ITEMS.filter((item) => {
                                    if(!isLoggedIn){
                                        return (NormalTabs.includes(item.navigateTo))
                                    }
                                    else if(isLoggedIn){
                                        if(userRole !== USER_CONSTANTS.ROLE.MANAGER){
                                            return (NormalTabs.includes(item.navigateTo) || LoggedInTabs.includes(item.navigateTo));
                                        }
                                        return true;
                                    }
                                }).filter((item) => {
                                    if(isLoggedIn && (item.navigateTo === ROUTING_CONSTANTS.LOGIN || item.navigateTo=== ROUTING_CONSTANTS.REGISTER)) {
                                        return false;
                                    }
                                    else if(!isLoggedIn && (item.navigateTo === ROUTING_CONSTANTS.RECOMMENDATION || item.navigateTo=== ROUTING_CONSTANTS.ACCOUNT)){
                                        return false;
                                    }
                                    return true;
                                }).map((item, index) => {
                                    if (item.navigateTo === ROUTING_CONSTANTS.HOMEPAGE) {
                                        return <LogoAndName navTo={item.navigateTo}/>
                                    }

                                    // }
                                    return <Tab label={item.label} id={item.id} component={Link} to={item.navigateTo}>
                                        <Link to={item.navigateTo}>
                                        </Link>
                                    </Tab>
                                })
                            }
                        </Tabs>
                        {isLoggedIn && <Button sx={{mx:1}} variant={`contained`} color={`primary`} onClick={signOutUser}>
                            Sign Out
                        </Button>}
                        <ThemeToggleButton/>
                        <UserAvatarBox/>
                    </Toolbar>
                </AppBar>
            </Box>
        </Box>
    );
}

export const WithHeader = (props) => {
    return (
        <Box sx={{display:`flex`, flexDirection:`column`}}>
            <Header/>
            <Box sx={{pt:{xs:`100px`,sm:`100px`,md:`100px`,lg:`75px`},mb:{xs:`100px`,sm:`100px`,md:`100px`,lg:`75px`}}}>
                {props.children}
            </Box>
            <Footer additionalStyle={{justifySelf:`flex-end`}}/>
        </Box>
    )
}
export default Header;


