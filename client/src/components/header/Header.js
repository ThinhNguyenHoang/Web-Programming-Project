import {useDispatch, useSelector} from "react-redux";
import {AppBar, Box, Tab, Tabs, ToggleButton, Toolbar} from "@mui/material";
import logo from "../../assets/images/logo_64.png";
import {ROUTING_CONSTANTS, ROUTING_TAB_ITEMS} from "../../routes/RouterConfig";
import {Link} from "react-router-dom";
import {useState} from "react";
import Typography from "@mui/material/Typography";
import ThemeToggleButton from "../Buttons/ToggleButton/ThemeToggleButton";

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

const Header = (props) => {
    const currentUser = useSelector((state) => state.auth.currentUser);
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState(0);
    const components = props.components;
    const handleChange = (event, value) => {
        setActiveTab(value);
    }
    return (
        <Box sx={{width: '100%'}}>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <AppBar sx={{bgcolor:'header.background'}} position="static" color={`default`}>
                    <Toolbar>

                        <Tabs sx={{display: `flex`, flexWrap: `wrap`,color:`header.contrast`}} value={activeTab} onChange={handleChange}
                              variant={`scrollable`} scrollButtons={`auto`}
                              textColor="header.contrast"
                              indicatorColor="primary"
                              disableRipple
                              aria-label="scrollable auto tabs example"
                        >
                            {/* <Tab label />   */}
                            {
                                ROUTING_TAB_ITEMS.map((item, index) => {
                                    if (item.navigateTo === ROUTING_CONSTANTS.HOMEPAGE) {
                                        return <LogoAndName navTo={item.navigateTo}/>
                                    }
                                    return <Tab label={item.label} id={item.id} component={Link} to={item.navigateTo}>
                                        <Link to={item.navigateTo}>
                                        </Link>
                                    </Tab>
                                })
                            }
                        </Tabs>
                        <ThemeToggleButton/>
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
            {props.children}
        </div>
    )
}
export default Header;


