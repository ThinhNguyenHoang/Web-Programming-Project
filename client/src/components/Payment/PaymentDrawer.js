import React, { useEffect, useState } from 'react';
import { Box, Button, CardActionArea, CardActions, Drawer, ImageList, ImageListItem, Popover } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackspace, faPlus, faMoneyBillAlt } from "@fortawesome/free-solid-svg-icons";
import Toaster from "../../utils/Toaster/Toaster";
import default_account_image from '../../assets/images/default_bank_account_img.png'
import CardMedia from "@mui/material/CardMedia";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FoodItemCard from "../Food/FoodItemCard";
import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import { TextField } from "formik-material-ui";
import { useHistory} from 'react-router';
import { useTranslation } from 'react-i18next';
import {
    add_bank_account_detail_actions,
    edit_bank_account_detail_actions,
    remove_bank_account_detail_actions,
    payment_selectors,
    get_bank_accounts_actions, make_payment_actions
} from '../../redux/slices/payment/PaymentSlice';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import {getYearMonthDateFromJsDate} from "../../utils";
import {selectors} from "../../redux/slices/auth/AuthSlice";
import {selectors as foodSelectors, update_cart_actions} from "../../redux/slices/food/FoodSlice";
import { ROUTING_CONSTANTS } from './../../routes/RouterConfig';

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
    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const showPopOver = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const closePopOver = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <Card sx={{ width: 400, ...additionalStyle }}>
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
            <CardActions>
                {/* // TODO: Detail --> To bank detail page 
                    // TODO: Remove --> Delete the accoutn  */}
                <Button onClick={showPopOver}> Edit Balance</Button>
                <Button onClick={() => {
                    dispatch({ type: remove_bank_account_detail_actions.loading, payload: account_item})
                }}> Remove </Button>

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
                    <Box sx={{
                        bgcolor: `white`,
                        borderRadius: 2,
                        py: 3,
                        borderColor: `elevation.layer3.contrast`,
                        border: 2,
                        color: `black`,
                        display: `flex`,
                        flexDirection: `column`,
                        alignItems: `center`,
                        justifyContent: `center`
                    }}>
                        <Formik
                            initialValues={{

                            }}
                            validationSchema={yup.object({
                                balance: yup
                                    .number("New balance amount")
                                    .min(
                                        0,
                                        "Balance amount shoud be positive"
                                    )
                            })}
                            // * TODO: Change onSubmit handler to post to authorize api
                            onSubmit={(values, { setSubmitting }) => {
                                const payload = {
                                    ...account_item,
                                    ...values,
                                }
                                console.log("Update account with values:",payload);
                                dispatch({type:edit_bank_account_detail_actions.loading,payload:payload});
                            }}
                        >
                            {({ submitForm, isSubmitting, isValid }) => (
                                <Form>
                                    <Box
                                        display={`flex`}
                                        flexDirection={`column`}
                                        justifyContent={`center`}
                                        alignItems={`center`}
                                    >
                                        <Box sx={{ my: 1, px: 3, }}>
                                            <Field component={TextField} type="text" label="New Balance Amount"
                                                name="balance"
                                                variant={`outlined`} />
                                        </Box>
                                    </Box>
                                    <Box sx={{
                                        display: `flex`,
                                        flexDirection: "row",
                                        justifyContent: "center",
                                        m: 2,
                                        mx: 4,
                                        mb: 3,
                                        px: 1,
                                    }}>
                                        <Box
                                            sx={{
                                                m: 1,
                                            }}
                                        >
                                            <Button
                                                variant={`contained`}
                                                color={`primary`}
                                                disabled={isSubmitting || !isValid}
                                                onClick={submitForm}
                                            >
                                                {"Update Bank Balance"}
                                            </Button>
                                        </Box>
                                    </Box>
                                </Form>
                            )}
                        </Formik>
                    </Box>
                </Popover>
            </CardActions>
        </Card >
    );
}

export const AccountGrid = ({ bank_account_list, callback }) => {
    const [chosenAccount, setChosenAccount] = useState(0);
    const bank_list = useSelector(payment_selectors.getBankAccountsList);
    const list_to_display = bank_account_list ? bank_account_list : bank_list;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({type:get_bank_accounts_actions.loading})
        return () => {

        };
    }, []);

    return (
        <Box sx={{ flexGrow: 1, m: 4 }}>
            {
                list_to_display ?
                    <Grid
                        container
                        spacing={{ xs: 2, md: 2 }}
                        columns={{ xs: 4, sm: 8, md: 12 }}
                    >
                        {list_to_display.map((item, index) => (
                            <Grid item
                                xs={2} sm={4} md={4} key={index} onClick={() => {
                                    setChosenAccount(index);
                                    if (callback) {
                                        callback(chosenAccount);
                                    }
                                }}>
                                <BankAccountItem account_item={item} additionalStyle={chosenAccount === index ? {
                                    border: 4,
                                    borderColor: `primary.main`,
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

export const AddAccountForm = ({callback}) => {
    const { t, i18n } = useTranslation();

    return (
        <Box sx={{
            bgcolor: `white`,
            borderRadius: 2,
            py: 3,
            borderColor: `elevation.layer3.contrast`,
            border: 2,
            color: `black`,
            display: `flex`,
            flexDirection: `column`,
            alignItems: `center`,
            justifyContent: `center`
        }}>
            <Formik
                initialValues={{

                }}
                validationSchema={yup.object({
                    bank_account_number: yup
                        .string("Bank Account Number")
                        .min(
                            8,
                            "Valid Bank Number should be a bit longer"
                        )
                    ,
                    bank_account_owner: yup
                        .string("Bank Account Owner")
                        .min(
                            2,
                            "Valid Bank Owner should be a bit longer"
                        )
                    ,
                    bank_account_type: yup
                        .string("Bank Account Type")
                        .min(
                            2,
                            "Valid account type should be a bit longer"
                        )
                    ,
                    valid_start: yup
                        .date()
                        .min(
                            new Date().getFullYear() - 200,
                            "Enter valid end date"
                        )
                        .max(
                            new Date(),
                            "Please enter valid start date"
                        )
                    ,
                    valid_end: yup
                        .date()
                        .min(
                            new Date().getFullYear() - 200,
                            "Enter valid end date"
                        )
                        .max(
                            new Date().getFullYear() + 300,
                            "Please enter valid end date"
                        )
                })}
                onSubmit={(values, { setSubmitting }) => {

                    const modified_values = {
                        ...values,
                        bank_account_type: "OCB",
                        balance: 0,
                    }
                    if (callback){
                        callback(modified_values, setSubmitting);
                    }
                    else {
                        console.log("Account form: No Callback: ",values,setSubmitting);
                    }
                }}
            >
                {({ submitForm, isSubmitting, isValid ,values,setFieldValue}) => (
                    <Form>
                        <Box
                            display={`flex`}
                            flexDirection={`column`}
                            justifyContent={`center`}
                            alignItems={`center`}
                        >
                            {/*<Box sx={{my: 1, px: 3,}}>*/}
                            {/*    <Field component={TextField} type="password" label="Password" name="password"*/}
                            {/*           variant={`outlined`}/>*/}
                            {/*</Box>*/}
                            <Box sx={{ my: 1, px: 3, }}>
                                <Field component={TextField} type="text" label="Bank Account Number"
                                    name="bank_account_number"
                                    variant={`outlined`} />
                            </Box>
                            <Box sx={{ my: 1, px: 3, }}>
                                <Field component={TextField} type="text" label="Bank Account Owner" name="bank_account_owner"
                                    variant={`outlined`} />
                            </Box>
                            <Box sx={{ my: 1, px: 3, }}>
                                <DesktopDatePicker
                                    label="Valid Start"
                                    inputFormat="DD/MM/YYYY"
                                    value={values.valid_start}
                                    onChange={(value) => {
                                        setFieldValue("valid_start",value.format("YYYY-MM-DD"),true);
                                    }}
                                    renderInput={(params) => <Field component={TextField} type="text" name="valid_start"
                                                                    variant={`outlined`} {...params} />}
                                 />
                            </Box>
                            <Box sx={{ my: 1, px: 3, }}>
                                <DesktopDatePicker
                                    label="Valid End"
                                    inputFormat="DD/MM/YYYY"
                                    value={values.valid_end}
                                    onChange={(value) => {

                                        setFieldValue("valid_end",value.format("YYYY-MM-DD"),true);
                                    }}
                                    renderInput={(params) => <Field component={TextField} type="text" name="valid_end"
                                                                    variant={`outlined`} {...params} />}
                                />
                            </Box>
                        </Box>{" "}
                        <Box sx={{
                            display: `flex`,
                            flexDirection: "row",
                            justifyContent: "center",
                            m: 2,
                            mx: 4,
                            mb: 3,
                            px: 1,
                        }}>
                            <Box
                                sx={{
                                    m: 1,
                                }}
                            >
                                <Button
                                    variant={`contained`}
                                    color={`primary`}
                                    disabled={isSubmitting || !isValid}
                                    onClick={submitForm}
                                >
                                    {"Create Bank Account"}
                                </Button>
                            </Box>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Box>
    );
}



export const PaymentDrawer = (
    {
        trigger, additionalStyle = {}, amount_to_pay = 0
    }
) => {
    const dispatch = useDispatch();
    const history= useHistory();
    const [show, setShow] = useState(false);
    const [indexChosen, setIndexChosen] = useState(0);
    const userProfile = useSelector(selectors.getUserProfile);
    const bank_account_list = useSelector(payment_selectors.getBankAccountsList);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const showPopOver = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const closePopOver = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    const food_list_in_card = useSelector(foodSelectors.getFoodListInCard);
    const combo_list_in_card = useSelector(foodSelectors.getComboListInCard);


    const handleAddBankAccount = (values,setSubmitting) => {
        console.log("Add bank account with values:", values);
        dispatch({
            type: add_bank_account_detail_actions.loading,
            payload: values,
        });
    }

    const makePayment = () => {
        const account_chosen = bank_account_list[indexChosen];
        const payload = {
            bank_account_number: account_chosen.bank_account_number,
            user_id: userProfile.account_id,
            amount: amount_to_pay,
            description: "No description",
            voucher_id: "1",
            food_list: food_list_in_card.map(item => {
                return {
                    FoodID: item.FoodID,
                    Quanity:item.Quantity
                }
            }),
            combo_list:
                combo_list_in_card.map(item => {
                    return {
                        ComboID: item.ComboID,
                        Quantity:item.Quantity
                    }
                })
        }
        dispatch({type: make_payment_actions.loading, payload});
        dispatch({type:update_cart_actions.loading,payload:{FoodList:[],ComboList:[]}});
        setShow(false);
        history.push(ROUTING_CONSTANTS.ORDERUSER);
    }

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
                            <Button sx={{ mx: 2 }} variant={`contained`} color={`primary`} onClick={makePayment}>
                                <Box sx={{ mr: 1 }}>
                                    <FontAwesomeIcon style={{ color: '#fff' }} icon={faMoneyBillAlt} />
                                </Box>
                                Pay
                            </Button>
                            <Button sx={{ mx: 2 }} variant={`contained`} color={`primary`} onClick={showPopOver}>
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
                                <AddAccountForm callback={handleAddBankAccount}/>
                            </Popover>

                        </Box>
                    </Box>
                    <AccountGrid bank_account_list={bank_account_list}
                        callback={(index) => setIndexChosen(index)} />
                    {amount_to_pay && <Typography sx={{ alignSelf: `center`, m: 2 }} variant={`h3`}
                        color={`${bank_account_list[indexChosen]?.balance >= amount_to_pay ? 'success.main' : 'error.main'}`}>
                        {bank_account_list[indexChosen]?.balance < amount_to_pay ? `Insufficent Balance To Pay for ${amount_to_pay}` : `Valid account with enough money to pay for ${amount_to_pay}`}
                    </Typography>}
                </Drawer>
            </Box>
        </Box>
    );
}
    ;
export default PaymentDrawer;
