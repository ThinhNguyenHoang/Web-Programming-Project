import React, {useEffect, useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {food_management_action, selectors, set_food_detail_id} from "../../redux/slices/food/FoodSlice";
import {useDispatch, useSelector} from "react-redux";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {ROUTING_CONSTANTS} from "../../routes/RouterConfig";
import {useHistory} from "react-router-dom";
import {Button} from "@mui/material";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faMoneyBillAlt, faTimesCircle} from "@fortawesome/free-solid-svg-icons";
const originalRows = [
    { name: "Pizza", calories: 200, fat: 6.0, carbs: 24, protein: 4.0 },
    { name: "Hot Dog", calories: 300, fat: 6.0, carbs: 24, protein: 4.0 },
    { name: "Burger", calories: 400, fat: 6.0, carbs: 24, protein: 4.0 },
    { name: "Hamburger", calories: 500, fat: 6.0, carbs: 24, protein: 4.0 },
    { name: "Fries", calories: 600, fat: 6.0, carbs: 24, protein: 4.0 },
    { name: "Ice Cream", calories: 700, fat: 6.0, carbs: 24, protein: 4.0 }
];

export default function FoodSearchBar( {callback}) {
    const food_list = useSelector(selectors.getAllFoodListMapped);
    const dispatch = useDispatch();
    const history = useHistory();

    const [filtered_food, setFiltedFood] = useState(food_list);
    const [searched, setSearched] = useState("");



    const requestSearch = (searchedVal) => {
        const filtered_food = food_list.filter((item) => {
            return item.name.toLowerCase().includes(searchedVal.toLowerCase());
        })
        console.log("Filted food is: ",filtered_food);
        setFiltedFood(filtered_food);
    };

    const cancelSearch = () => {
        setSearched("");
        setFiltedFood([]);
        if(callback){
            callback();
        }
    };

    return (
        <>
            <Paper sx={{display:`absolute`,zIndex:88}}>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                       }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="outlined-basic" label="Search" variant="outlined" value={searched} onChange={(e)=> {
                        const value = e.target.value;
                        console.log("searching ", value);
                        setSearched(value);
                        requestSearch(searched);
                        if(!value) cancelSearch();
                    }}/>
                    <Button variant={`contained`} onClick={cancelSearch}>
                        <Box sx={{ mr: 1 }}>
                            <FontAwesomeIcon style={{ color: '#fff' }} icon={faTimesCircle} />
                        </Box>
                        Clear
                    </Button>
                </Box>
                {/*<SearchBar*/}
                {/*    value={searched}*/}
                {/*    onChange={(searchVal) => requestSearch(searchVal)}*/}
                {/*    onCancelSearch={() => cancelSearch()}*/}
                {/*/>*/}
                <TableContainer>
                    <Table  aria-label="simple table">
                        <TableBody>
                            {filtered_food.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row" onClick={() => {
                                        setSearched(row.name);
                                        dispatch({type: set_food_detail_id, payload: row.id});
                                        history.push(ROUTING_CONSTANTS.FOODDETAIL);
                                    }}>
                                        {row.name}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

        </>
    );
}
