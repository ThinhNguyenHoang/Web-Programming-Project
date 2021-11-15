import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import TableContext from "@mui/material/Table/TableContext";
import logo from "../../assets/images/logo_64.png";
import { ROUTING_CONSTANTS, ROUTING_TAB_ITEMS } from "../../routes/RouterConfig";
import { Link } from "react-router-dom";

<<<<<<< HEAD

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

const styles = {
    allContainer: {

    }
}
// Header should be passed in the number of tabs available 
// If not logged in the props should not contains the protected routes  
=======

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
>>>>>>> main
const Header = (props) => {
    const currentUser = useSelector((state) => state.auth.currentUser);
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState(0);
    const components = props.components;
    const handleChange = (event , value) => {
<<<<<<< HEAD
        setValue(value); 
=======
        setValue(value);
>>>>>>> main
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
<<<<<<< HEAD
                                    <Link to={item.navigateTo}>
                                     </Link>
                                </Tab>
=======
                                <Link to={item.navigateTo}>
                                </Link>
                            </Tab>
>>>>>>> main
                        })
                    }
                </Tabs>
            </Box>
        </Box>
    );
}



<<<<<<< HEAD

const food_item_cart={
    id:0,
    name:"",
    price:0,
    quantity:0,
    img:"",
}
const food_combo_item_news={
    id:0,
    name:"",
    price:"",
    decrip:"",
    img:"",
}
const nofi_item_news={
    id:0,
    name:"",
    content:"",
}
const voucher={
    id:0,
    name:"",
    discount:0,
}

const initialValue={
    user_id:1,
    cart:{
        food_list:[],
        voucher_list:[],
        subtotal:0,
        discount:0,
        quantity:0,
        voucher_id:0,
        get_status:generateStatus(),
        update_status:generateStatus(),
        delete_status:generateStatus(),
    },
    news:{
        food_list:[],
        combo_list:[],
        nofi_list:[],
        get_status:generateStatus(),
        addCart_status:generateStatus(),
    }
    
}
=======
>>>>>>> main
