import React, { useEffect, useState } from 'react';
import { Box, Button, Drawer, ImageList, ImageListItem, Popover } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { selectors } from "../../redux/slices/auth/AuthSlice";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { ImageUploader, storage } from "../../utils/UploadFile/FileUploader";
import Typography from "@mui/material/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackspace, faPlus } from "@fortawesome/free-solid-svg-icons";
import Toaster from "../../utils/Toaster/Toaster";
import default_account_image from '../../assets/images/default_bank_account_img.png'
import CardMedia from "@mui/material/CardMedia";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FoodItemCard from "../Food/FoodItemCard";



const getAccountImageFromAccountType = (type) => {
    return undefined;
}


export const bank_account_init_list = [{
    id: "",
    bank_account_number: "",
    bank_account_owner: "",
    bank_account_type: "",
    balance: 150,
    valid_start: "",
    valid_end: "",
}, {
    id: "",
    bank_account_number: "",
    bank_account_owner: "",
    bank_account_type: "",
    balance: 0,
    valid_start: "",
    valid_end: "",
}, {
    id: "",
    bank_account_number: "",
    bank_account_owner: "",
    bank_account_type: "",
    balance: 130,
    valid_start: "",
    valid_end: "",
}]

export const BankAccountItem = ({ account_item, additionalStyle }) => {
    return (
        <Card sx={{ maxWidth: 345, ...additionalStyle }}>
            <CardMedia
                component="img"
                height="140"
                image={getAccountImageFromAccountType(account_item.bank_account_type) || default_account_image}
                alt="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div" color={`primary.main`}>
                    {account_item.bank_account_number || "No account number info"}
                </Typography>
                <Typography variant={`h6`}>
                    {`Owner: ${account_item.bank_account_owner || "No owner info"}`}
                </Typography>
                <Typography variant={`h6`}>
                    {`Balance: ${account_item.balance || "0000"} K` || "No owner info"}
                </Typography>
                <Typography variant={`body2`} body>
                    {`Valid From: ${account_item.valid_start || "N/A"} To: ${account_item.valid_end || "N/A"}` || "No validity info"}
                </Typography>
            </CardContent>
        </Card>
    );
}

export const AccountGrid = ({ bank_account_list, callback }) => {
    const [chosenAccount, setChosenAccount] = useState(0);
    return (
        <Box sx={{ flexGrow: 1, m: 4 }}>
            {
                bank_account_list ?
                    <Grid
                        container
                        spacing={{ xs: 2, md: 2 }}
                        columns={{ xs: 4, sm: 8, md: 12 }}
                    >
                        {bank_account_list.map((item, index) => (
                            <Grid item
                                xs={2} sm={4} md={4} key={index} onClick={() => {
                                    setChosenAccount(index);
                                    if (callback) {
                                        callback(chosenAccount);
                                    }
                                }}>
                                <BankAccountItem account_item={item} additionalStyle={chosenAccount === index ? {
                                    border: 4,
                                    borderColor: `primary.main`
                                } : {}} />
                            </Grid>
                        ))}
                    </Grid>
                    : <Typography variant={`h1`} color={`primary.main`}>
                        You haven't added an account yet
                    </Typography>
            }
        </Box>
    );
}


export const PaymentDrawer = (
    {
        trigger, additionalStyle = {}, amount_to_pay = 0
    }
) => {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [indexChosen, setIndexChosen] = useState(0);


    const [anchorEl, setAnchorEl] = React.useState(null);

    const showPopOver = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const closePopOver = () => {
        setAnchorEl(null);
    };
    // TODO GET THE REAL BANK ACCOUNT LIST AND ADD IT TO THE GRID
    // const [accountList,setAccountList]  = useState([]);
    return (
        <Box sx={{ m: 1, p: 1, display: `flex`, flexDirection: `column` }} xs={12} md={4}
            justifyContent={`flex-start`} alignItems={`center`}>
            <Box sx={{
                py: 3,
                color: `black`,
                display: `flex`,
                flexDirection: `column`,
                alignItems: `center`,
                justifyContent: `center`
            }}>
                <Box sx={{ ...additionalStyle }} onClick={() => {
                    setShow(true)
                }}>
                    {/*<img src={image_uri ? image_uri :default_user_avatar} alt={`image`}/>*/}
                    {trigger}
                </Box>
                <Drawer sx={{ display: `flex`, flexDirection: `column`, alignItems: `center` }} open={show}
                    anchor={`bottom`} onClose={() => setShow(false)}>
                    <Box sx={{
                        display: `flex`,
                        flexDirection: `row`,
                        alignItems: `center`,
                        justifyContent: `space-between`
                    }}>
                        <Typography variant={`h6`} sx={{ m: 3 }}>
                            {"Your Payment Accounts"}
                        </Typography>
                        <Box>
                            <Button sx={{ mx: 2 }} variant={`contained`} color={`primary`}>
                                <Box sx={{ mr: 1 }}>
                                    <FontAwesomeIcon style={{ color: '#fff' }} icon={faPlus} />
                                </Box>
                                Add Payment Account
                            </Button>

                            <Button sx={{ mx: 2 }} variant={`contained`} color={`primary`} onClick={() => setShow(false)}>
                                <Box sx={{ mr: 1 }}>
                                    <FontAwesomeIcon style={{ color: '#fff' }} icon={faBackspace} />
                                </Box>
                                CLOSE
                            </Button>
                            {/* Popover to add new bank account */}
                            <Popover
                                open={false}
                                anchorEl={anchorEl}
                                onClose={closePopOver}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                            >
                                {/* Form to add bank account */}

                            </Popover>

                        </Box>
                    </Box>
                    <AccountGrid bank_account_list={bank_account_init_list}
                        callback={(index) => setIndexChosen(index)} />
                    {amount_to_pay && <Typography sx={{ alignSelf: `center`, m: 2 }} variant={`h3`}
                        color={`${bank_account_init_list[indexChosen].balance >= amount_to_pay ? 'success.main' : 'error.main'}`}>
                        {bank_account_init_list[indexChosen].balance < amount_to_pay ? "Insufficent Balance To Pay" : "Valid account with enough money"}
                    </Typography>}
                    {/*<MyImageMasonry/>*/}
                </Drawer>
            </Box>
        </Box>
    );
}
    ;
export default PaymentDrawer;
