import {useDispatch, useSelector} from "react-redux";
import {
    AppBar,
    Avatar,
    Box,
    Button,
    Drawer,
    Fab,
    Popover,
    Switch,
    Tab,
    Tabs,
    ToggleButton,
    Toolbar
} from "@mui/material";
import logo from "../../assets/images/logo_64.png";
import {ROUTING_CONSTANTS, ROUTING_TAB_ITEMS} from "../../routes/RouterConfig";
import {Link, useHistory} from "react-router-dom";
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
import FoodSearchBar from "../SearchFood/SearchBar";
import {
    food_management_action,
    selectors as foodSelectors,
    update_cart_actions
} from "../../redux/slices/food/FoodSlice";
import {executeInTheNextEventLoopTick} from "@mui/lab/internal/pickers/utils";
import EditIcon from '@mui/icons-material/Edit';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBackspace, faMoneyBillAlt, faPlus} from "@fortawesome/free-solid-svg-icons";
import {AccountGrid, AddAccountForm} from "../Payment/PaymentDrawer";
import {
    add_bank_account_detail_actions,
    make_payment_actions,
    payment_selectors
} from "../../redux/slices/payment/PaymentSlice";
import {company_selectors, update_company_info_actions} from "../../redux/slices/company/SettingsSlice";
import {Field, Form, Formik} from "formik";
import * as yup from "yup";
import {TextField} from "formik-material-ui";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import PageSettingsForm from "../PageSettingForm/PageSettingsForm";

const LogoAndName = ({navTo}) => {
    const page_settings = useSelector(company_selectors.getCompanyData);
    return (
        <Box sx={{marginRight: `2em`, marginTop: `0.3em`, display: `flex`, alignItems: `center`}}>
            <img src={page_settings.logo || logo} alt={`logo`} width={`100px`}/>
            <Typography sx={{margin: `1em`}} variant={`h6`}> <Link to={navTo}>BK Food Sale </Link> </Typography>
        </Box>
    );
}


const UserAvatarBox = () => {
    const isLoggedIn = useSelector(selectors.getLoginSuccess)
    const userAvatar = useSelector(selectors.getUserAvatar)
    const userName = useSelector(selectors.getUserName)
    if (isLoggedIn) {
        return <Box sx={{
            display: {xs: `none`, sm: `none`, md: `flex`},
            flexDirection: 'row',
            justifyContent: `space-between`,
            alignItems: `center`,
            m: 1
        }}>
            <Avatar src={userAvatar} alt={userName}>{userName ? userName : "Guess"}</Avatar>
            <Typography sx={{ml: 1, color: `elevation.layer0.contrast`}}>
                {`Hello, ${userName}`}
            </Typography>
        </Box>
    } else {
        return <Box
            sx={{display: `flex`, flexDirection: 'row', justifyContent: `space-between`, alignItems: `center`, m: 1}}>
            <Avatar sx={{bgcolor: deepOrange[500]}}>
                G
            </Avatar>
            <Typography sx={{ml: 1, color: 'header.contrast'}}>
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
    const [checked, setChecked] = useState(false);

    const components = props.components;
    const isLoggedIn = useSelector(selectors.getLoginSuccess);
    const userRole = useSelector(selectors.getUserRole);
    const handleChange = (event, value) => {
        setActiveTab(value);
    }

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const closePopOver = () => {
        setAnchorEl(null);
    };
    const tabs_item_to_render = (list_tab) => {

    }

    const signOutUser = () => {
        console.log("SIGN OUT USER");
        dispatch({type: logout_actions.success});
    }

    useEffect(() => {
        dispatch({type: food_management_action.loading})
        return () => {

        };
    }, []);

    const userProfile = useSelector(selectors.getUserProfile);
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        console.log("TOKEN FOUND IS: ", storedToken);
        if (storedToken) {
            console.log("FOUND TOKEN ==> Trying to find load user profile", storedToken);
            dispatch({type: read_user_profile_actions.loading})
        }
    }, [])
    return (
        <Box sx={{
            width: '100%',
            position: 'fixed',
            zIndex: 2,
            maxHeight: {xs: `100px`, sm: `100px`, md: `100px`, lg: `100px`}
        }}>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <AppBar sx={{bgcolor: 'elevation.layer1.main', display: `flex`, justifyContent: `space-around`}}
                        position="static" color={`default`}>
                    <Toolbar sx={{display: `flex`, justifyContent: `space-around`, flexWrap: `wrap`}}>
                        <Tabs sx={{display: `flex`, flexWrap: `wrap`, color: `elevation.layer0.contrast`}}
                              value={activeTab} onChange={handleChange}
                              variant={`scrollable`} scrollButtons={`auto`}
                              textColor="header.contrast"
                              indicatorColor="primary"
                              disableRipple
                              aria-label="scrollable auto tabs example"
                        >
                            {
                                ROUTING_TAB_ITEMS.filter((item) => {
                                    if (!isLoggedIn) {
                                        return (NormalTabs.includes(item.navigateTo))
                                    } else if (isLoggedIn) {
                                        if (userRole !== USER_CONSTANTS.ROLE.MANAGER) {
                                            return (NormalTabs.includes(item.navigateTo) || LoggedInTabs.includes(item.navigateTo));
                                        }
                                        return true;
                                    }
                                }).filter((item) => {
                                    if (isLoggedIn && (item.navigateTo === ROUTING_CONSTANTS.LOGIN || item.navigateTo === ROUTING_CONSTANTS.REGISTER)) {
                                        return false;
                                    } else if (!isLoggedIn && (item.navigateTo === ROUTING_CONSTANTS.RECOMMENDATION || item.navigateTo === ROUTING_CONSTANTS.ACCOUNT)) {
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
                        {isLoggedIn &&
                        <Button sx={{mx: 1}} variant={`contained`} color={`primary`} onClick={signOutUser}>
                            Sign Out
                        </Button>}
                        <ThemeToggleButton/>
                        <Box>
                            <Button variant={`contained`} onClick={handleClick}>Search</Button>
                        </Box>
                        <Popover
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={closePopOver}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                        >
                            <FoodSearchBar/>
                        </Popover>
                        <UserAvatarBox/>
                    </Toolbar>
                </AppBar>

            </Box>
        </Box>
    );
}

export const WithHeader = (props) => {
    return (
        <Box sx={{display: `flex`, flexDirection: `column`}}>
            <Header/>
            <Box sx={{
                pt: {xs: `100px`, sm: `100px`, md: `100px`, lg: `75px`},
                mb: {xs: `100px`, sm: `100px`, md: `100px`, lg: `75px`}
            }}>
                {props.children}
            </Box>
            <PageSettingDrawer
                trigger={<Fab color="secondary" aria-label="edit" sx={{position: `fixed`, bottom: 0, right: 0, m: 4}}>
                    <EditIcon/>
                </Fab>}/>
            <Footer additionalStyle={{justifySelf: `flex-end`}}/>
        </Box>
    )
}

export const PageSettingDrawer = (
    {
        trigger, additionalStyle = {}
    }
) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [show, setShow] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const showPopOver = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const closePopOver = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const company_data = useSelector(company_selectors.getCompanyData);

    const updateCompanyData = (values,setSubmitting) => {
        console.log("VALUES TO UDPATE SETTING: ",values);
        // const payload = {
        //     ...company_data,
        //     // TODO: add new values herer
        // }
        // dispatch({type: update_company_info_actions.loading, payload});
    }
    return (
        <Box sx={{m: 1, p: 1, display: `flex`, flexDirection: `column`}} xs={12} md={4}
             justifyContent={`flex-start`} alignItems={`center`}>
            <Box sx={{
                py: 3,
                color: `black`,
                display: `flex`,
                flexDirection: `column`,
                alignItems: `center`,
                justifyContent: `center`
            }}>
                <Box sx={{...additionalStyle}} onClick={() => {
                    setShow(true)
                }}>
                    {/*<img src={image_uri ? image_uri :default_user_avatar} alt={`image`}/>*/}
                    {trigger}
                </Box>
                <Drawer sx={{display: `flex`, flexDirection: `column`, alignItems: `center`}} open={show}
                        anchor={`bottom`} onClose={() => setShow(false)}>
                    <Box sx={{
                        display: `flex`,
                        flexDirection: `row`,
                        alignItems: `center`,
                        justifyContent: `space-between`
                    }}>
                        <Typography variant={`h6`} sx={{m: 3}}>
                            {"Update Page Settings"}
                        </Typography>
                        <Box>
                            <Button sx={{mx: 2}} variant={`contained`} color={`primary`} onClick={() => setShow(false)}>
                                <Box sx={{mr: 1}}>
                                    <FontAwesomeIcon style={{color: '#fff'}} icon={faBackspace}/>
                                </Box>
                                CLOSE
                            </Button>
                        </Box>
                    </Box>
                    <PageSettingsForm callback={(values,setSubmitting) => {
                        // TODO: Do something to update page settings
                        console.log("CALLING PAGE SETTING UPDATE IN HEADER: ",values);
                    }}/>
                </Drawer>
            </Box>
        </Box>
    );
};

export default Header;


