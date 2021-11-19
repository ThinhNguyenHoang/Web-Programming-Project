import {useDispatch, useSelector} from "react-redux";
import {AppBar, Avatar, Box, Tab, Tabs, ToggleButton, Toolbar} from "@mui/material";
import logo from "../../assets/images/logo_64.png";
import {ROUTING_CONSTANTS, ROUTING_TAB_ITEMS} from "../../routes/RouterConfig";
import {Link} from "react-router-dom";
import {useState} from "react";
import Typography from "@mui/material/Typography";
import ThemeToggleButton from "../Buttons/ToggleButton/ThemeToggleButton";
import {selectors} from "../../redux/slices/auth/AuthSlice";
import {deepOrange} from "@mui/material/colors";
import {SearchBar} from "../Search/SearchBar";
import Footer from "../Footer/Footer";
import * as React from "react";

// Header should be passed in the number of tabs available
// If not logged in the props should not contains the protected routes

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
        return <Box sx={{display:`flex`, flexDirection:'row',justifyContent:`space-between`,alignItems:`center`,m:1}}>
                <Avatar src={userAvatar} alt={userName}>{userName? userName : "Guess"}</Avatar>
            <Typography sx={{ml:1}}>
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
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState(0);
    const components = props.components;
    const isLoggedIn = useSelector(selectors.getLoginSuccess)
    const handleChange = (event, value) => {
        setActiveTab(value);
    }
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
                                ROUTING_TAB_ITEMS.map((item, index) => {
                                    if (item.navigateTo === ROUTING_CONSTANTS.HOMEPAGE) {
                                        return <LogoAndName navTo={item.navigateTo}/>
                                    }
                                    else if(isLoggedIn && (item.navigateTo === ROUTING_CONSTANTS.LOGIN || item.navigateTo=== ROUTING_CONSTANTS.REGISTER)){
                                        return <></>
                                    }
                                    return <Tab label={item.label} id={item.id} component={Link} to={item.navigateTo}>
                                        <Link to={item.navigateTo}>
                                        </Link>
                                    </Tab>
                                })
                            }
                        </Tabs>
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
        <div>
            <Header/>
            <Box sx={{pt:{xs:`100px`,sm:`100px`,md:`100px`,lg:`75px`}}}>
                {props.children}
            </Box>
            <Footer/>
        </div>
    )
}
export default Header;


