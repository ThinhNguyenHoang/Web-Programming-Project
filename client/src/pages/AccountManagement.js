import React from 'react';
import {Avatar, Box, Button, Grid, LinearProgress} from "@mui/material";
import {generateStatus} from "../utils/reduxGenerate";
import {login_actions, selectors} from "../redux/slices/auth/AuthSlice";
import {useDispatch, useSelector} from "react-redux";
import Typography from "@mui/material/Typography";
import {deepOrange} from "@mui/material/colors";
import default_user_avatar from '../assets/images/user_default.jpg'
import {Field, Form, Formik} from "formik";
import * as yup from "yup";
import {base_keys} from "../locales/constants";
import {TextField} from "formik-material-ui";
import {useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";
//
// const initialValue = {
//     currentUser: {
//         token: "",
//         login_status: generateStatus(),
//         register_status: generateStatus(),
//         change_pass_status: generateStatus(),
//         update_account_status: generateStatus(),
//         delete_account_status: generateStatus(),
//         token_renew_status: generateStatus(),
//         profile: {
//             account_id: "",
//             username: "",
//             address: "",
//             dob: "",
//             email: "",
//             point: "",
//             phone_number: "",
//             full_name: "",
//             avatar: "",
//             role: "",
//         },
//     }
// }


const AccountManagement = () => {
    let history = useHistory();
    const {t, i18n} = useTranslation();
    const dispatch = useDispatch();
    const user_profile = useSelector(selectors.getUserProfile)
    // const on
    const onUpdateUser = (values, setSubmitting) => {
        const username = values.username;
        const password = values.password;
        console.log("Login user with values:", values);
        // dispatch({
        //     type: login_actions.loading,
        //     payload: {username, password},
        // });
        setSubmitting(false);
    }
    return (
        <Grid container>
            <Grid item>
                <Avatar src={user_profile.avatar ? user_profile.avatar : default_user_avatar} alt={`User image`}>
                    {user_profile.username ? user_profile.username : "A"}
                </Avatar>
                <Typography sx={{ml: 1, color: `elevation.layer1.contrast`}}>
                    {user_profile.username ? user_profile.username : "Guess"}
                </Typography>
            </Grid>
            <Grid item>
                <Box sx={{display: `flex`, flexDirection: `column`, alignItems: `center`, justifyContent: `center`}}>
                    <Formik
                        initialValues={{
                            ...user_profile
                        }}
                        validationSchema={yup.object({
                            username: yup
                                .string(t(base_keys.form.username))
                                .min(
                                    9,
                                    t(base_keys.form.username_min_8_requirement)
                                )
                                .required(
                                    t(base_keys.form.username_required_prompt)
                                )
                                .default(user_profile.username)
                            ,
                            address: yup
                                .string("Enter Your Address")
                                .min(
                                    8,
                                    "Valid Address should be a bit longer"
                                )
                                .default(user_profile.address ? user_profile.address: "No Addresse Provided")
                            ,
                            dob: yup
                                .date()
                                .min(
                                    new Date().getFullYear() - 130,
                                    "You should not be older than 130 years old"
                                )
                                .max(
                                    new Date().getFullYear() - 10,
                                    "You should be old enoguh to buy things yourself"
                                )
                                .default(user_profile.dob)
                            ,
                            email: yup
                                .string(t(base_keys.form.email_prompt))
                                .email(t(base_keys.form.email_valid_prompt))
                                .required(t(base_keys.form.email_required_prompt))
                                .default(user_profile.email)
                            ,
                            phone_number: yup
                                .string(t(base_keys.form.password_prompt))
                                .min(
                                    6,
                                    t(base_keys.form.password_min_8_requirement)
                                )
                                .default(user_profile.phone_number),
                            // full_name: yup
                            //     .string(t(base_keys.form.password_prompt))
                            //     .min(
                            //         8,
                            //         t(base_keys.form.password_min_8_requirement)
                            //     )
                            //     .required(
                            //         t(base_keys.form.password_required_prompt)
                            //     )
                            //     .default(user_profile.full_name),
                        })}
                        // * TODO: Change onSubmit handler to post to authorize api
                        onSubmit={(values, {setSubmitting}) => {
                            // setTimeout(() => {
                            //     setSubmitting(false);
                            //     alert(JSON.stringify(values, null, 2));
                            // }, 500);
                            onUpdateUser(values, setSubmitting);
                        }}
                    >
                        {({submitForm, isSubmitting, isValid}) => (
                            <Form>
                                <Box
                                    display={`flex`}
                                    flexDirection={`column`}
                                    justifyContent={`center`}
                                    alignItems={`center`}
                                >
                                    <Box sx={{my: 1, px: 3,}}>
                                        <Field
                                            component={TextField}
                                            name="username"
                                            type="text"
                                            label="Username"
                                            variant={`outlined`}
                                        />
                                    </Box><br/>
                                    {/*<Box sx={{my: 1, px: 3,}}>*/}
                                    {/*    <Field component={TextField} type="password" label="Password" name="password"*/}
                                    {/*           variant={`outlined`}/>*/}
                                    {/*</Box>*/}
                                    <Box sx={{my: 1, px: 3,}}>
                                        <Field component={TextField} type="text" label="Phone Number:" name="phone_number"
                                               variant={`outlined`}/>
                                    </Box>
                                    <Box sx={{my: 1, px: 3,}}>
                                        <Field component={TextField} type="text" label="Address" name="address"
                                               variant={`outlined`}/>
                                    </Box>
                                    <Box sx={{my: 1, px: 3,}}>
                                        <Field component={TextField} type="text" label="Date Of Birth" name="dob"
                                               variant={`outlined`}/>
                                    </Box>
                                    <Box sx={{my: 1, px: 3,}}>
                                        <Field component={TextField} type="email" label="Email" name="email"
                                               variant={`outlined`}/>
                                    </Box>
                                    {isSubmitting && <LinearProgress/>}{" "}
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
                                            {"Update Information"}
                                        </Button>
                                    </Box>
                                </Box>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Grid>
        </Grid>
    );
};

export default AccountManagement;
