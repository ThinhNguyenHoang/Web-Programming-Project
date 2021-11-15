import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import TableContext from "@mui/material/Table/TableContext";
import logo from "../../assets/images/logo_64.png";
import { ROUTING_CONSTANTS, ROUTING_TAB_ITEMS } from "../../routes/RouterConfig";
import { Link } from "react-router-dom";


// const tabsName = ["Home Page", "Food & Combo", "News", "Cart", "About Us", "Bill", "Transactions"];


// const generateTabLinkItem = (label_name,component,nav_to,require_auth) => {
//     return {
//         id: `id-${label_name}`,
//         label: label_name,
//         component: component,
//         navigateTo: nav_to,
//         require_auth_level: "",
//     }
// }

// Header should be passed in the number of tabs available
// If not logged in the props should not contains the protected routes
const Header = (props) => {
    const currentUser = useSelector((state) => state.auth.currentUser);
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState(0);
    const components = props.components;
    const handleChange = (event , value) => {
        setValue(value);
    }
    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottm: 1, borderColor: 'divider' }}>
                <img id="logo-mage" src={logo} alt={`Food Sale Logo`} />
                <Tabs value={1} onChange={handleChange} >
                    {/* <Tab label />   */}
                    {
                        ROUTING_TAB_ITEMS.map((item, index) => {
                            return <Tab label={item.label} id={item.id}>
                                <Link to={item.navigateTo}>
                                </Link>
                            </Tab>
                        })
                    }
                </Tabs>
            </Box>
        </Box>
    );
}



