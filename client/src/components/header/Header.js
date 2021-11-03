import {useDispatch, useSelector} from "react-redux";
import {Box} from "@mui/material";
import TableContext from "@mui/material/Table/TableContext";
import logo from "../../assets/images/logo_64.png";

const tabsName = ["Home Page", "Food & Combo", "News", "Cart", "About Us", "Bill", "Transactions"];

const styles = {
    allContainer:{

    }
}
const Header = (props) => {
    const currentUser = useSelector((state) => state.auth.currentUser);
    const dispatch = useDispatch();

    return (
        <Box>
            <img src={logo} alt={`Food Sale Logo`}/>
        </Box>
    );
}