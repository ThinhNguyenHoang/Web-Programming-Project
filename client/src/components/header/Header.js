import {useDispatch, useSelector} from "react-redux";
import {Box, Typography, Tabs, Tab, Avatar} from "@mui/material";
import TableContext from "@mui/material/Table/TableContext";
import logo from "../../assets/images/logo_64.png";
import {ROUTING_CONSTANTS} from "../../routes/RouterConfig";
import {selectors} from "../../redux/slices/auth/AuthSlice";
import userDefaultAvatar from "../../assets/images/user_default.jpg";

const styles = {
    allContainer: {
        display: `flex`,
        justifyContent: `space-between`,
        alignItems: `center`,
        mb: 2,
    },
    brandContainer: {
        justifyContent: `space-between`,
        alignItems: `center`,
        ml: 2,
        p: 1,
    },
    logo: {},
    brandName: {},
    tabContainer: {},
    userInfoContainer: {
        display: `flex`,
        justifyContent: `space-between`,
        alignItems: `center`,
        m: 2,
    },
    avatar: {},
    userName: {}
}

const tabs = [
    {
        value: ROUTING_CONSTANTS.HOMEPAGE,
        label: "Home Page",
    },
    {
        value: ROUTING_CONSTANTS.FOOD_COMBO_LIST,
        label: "Food & Combos",
    },
    {
        value: ROUTING_CONSTANTS.NEWS,
        label: "News"
    }, {
        value: ROUTING_CONSTANTS.ITEM_CART,
        label: "Cart"
    }, {
        value: ROUTING_CONSTANTS.ABOUT_US,
        label: "About Us",
    }, {
        value: ROUTING_CONSTANTS.BILLS,
        label: "Bills"
    }, {
        value: ROUTING_CONSTANTS.TRANSACTIONS_HISTORY,
        label: "Transactions"
    }
];
const Header = (props) => {

    const dispatch = useDispatch();
    // * This function should navigate to other component
    const handleChange = (event, value) => {

    }
    const userAvatar = useSelector(selectors.getUserAvatar);
    const userName = useSelector(selectors.getUserName);

    return (
        <Box className={`outside-container`}>
            <Box className={`brand-container`}>
                <img src={logo} alt={`Logo Image`}/>
                <Typography variant={`h1`}>BKFood System</Typography>
            </Box>
            <Box className={`tabs-container`}>
                <Tabs
                    value={0}
                    onChange={handleChange}
                    textColor="secondary"
                    indicatorColor="secondary"
                    aria-label="secondary tabs example"
                >
                    {
                        tabs.map((item, index) =>
                            <Tab key={`{index}`} label={item.label} value={item.value}/>
                        )
                    }
                </Tabs>
            </Box>
            <Box className={`user-info-container`}>
                <Avatar
                    alt="User Avatar"
                    src={userAvatar? userAvatar:userDefaultAvatar}
                    sx={{ width: 56, height: 56 }}
                />
                <Typography variant={`h2`}>{userName ? userName : "Guess"}</Typography>
            </Box>
        </Box>
    );
}