import React, {useState} from 'react';
import {Avatar, Box, Button, Drawer, Grid, LinearProgress, Popover} from "@mui/material";
import {generateStatus} from "../utils/reduxGenerate";
import {
    change_pass_actions, changeUserAvatar,
    login_actions,
    selectors,
    update_user_profile_actions
} from "../redux/slices/auth/AuthSlice";
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
import MyImageMasonry from "../components/ImageMasonry/MyImageMasonry";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus, faBackspace} from '@fortawesome/free-solid-svg-icons'
import {THEME_CONSTANTS} from "../theme/constants";
import FileUploader, {ImageUploader} from "../utils/UploadFile/FileUploader";
import ImageDrawerUpdater from "../components/ImageDrawerUpdater/ImageDrawerUpdater";

//
// const ImageChooserDrawer = () => {
//     const [show,setShow] = useState(false);
//     return (
//         <Box onClick={()=> setShow(false)}>
//             <Drawer open={show} onClose={toggleDrawer(anchor,true)}>
//
//             </Drawer>
//         </Box>
//     );
// }

const AccountManagement = () => {
    let history = useHistory();
    const {t, i18n} = useTranslation();
    const dispatch = useDispatch();
    const user_profile = useSelector(selectors.getUserProfile)
    // const on
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


    const onUpdateUser = (values, setSubmitting) => {
        console.log("Update profile with values:", values);
        const avatar = user_profile.avatar;
        const data = {...values, avatar}
        dispatch({
            type: update_user_profile_actions.loading,
            payload: data,
        });
    }
    const onChangeUserPassword = (values, setSubmitting) => {
        console.log("Change pass with values", values);
        // const data = {...values, avatar}
        dispatch({
            type: change_pass_actions.loading,
            payload: values.password,
        });
        // setSubmitting(false);
    }

    return (
        <Grid container sx={{
            my: 5,
            display: 'flex',
            alignItems: `center`,
            justifyContent: `center`,
            width: `100%`,
            alignSelf: `center`,
            justifySelf: `center`
        }}>
            <Grid container sx={{bgcolor: `elevation.layer3.main`, m: 1, p: 2, width: `50%`, borderRadius: 2}}
                  justifyContent="center">
                <Grid item sx={{display: `flex`, alignItems: `center`, justifyContent: `center`}} xs={12}>
                    <Typography sx={{
                        fontSize: {
                            lg: 50,
                            md: 40,
                            sm: 30,
                            xs: 20
                        }, color: `primary.main`
                    }} p={1} variant={`h5`} mt={1}>
                        Profile Information
                    </Typography>
                </Grid>
                <Grid item sx={{m: 1, p: 1, display: `flex`, flexDirection: `column`}} xs={12} md={4}
                      justifyContent={`flex-start`} alignItems={`center`}>
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
                        {/* ? Component dùng để update hình và chọn hình đã upload từ firebase*/}
                        <ImageDrawerUpdater trigger={<Avatar sx={{width: 100, height: 100}}
                                                             src={user_profile.avatar ? user_profile.avatar : default_user_avatar}
                                                             alt={`User image`} onClick={() => setShow(true)}>
                            {user_profile.username ? user_profile.username : "A"}
                        </Avatar>
                        } img_uri_callback={(img_uri) => {
                            console.log("TRYING TO CHANGE STORE AVATAR TO: ",img_uri);
                            dispatch(changeUserAvatar(img_uri))
                        }}/>
                        <Typography variant={`h6`} sx={{m: 3}}>
                            {user_profile.username ? user_profile.username : "Guess"}
                        </Typography>
                        <Button variant={`contained`} color={`primary`}>
                            {"Update Avatar"}
                        </Button>
                    </Box>
                    <Box sx={{
                        bgcolor: `white`,
                        borderRadius: 2,
                        mt: 2,
                        py: 1,
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
                                password: "",
                            }}
                            validationSchema={yup.object({
                                password: yup
                                    .string(t(base_keys.form.password_prompt))
                                    .min(8, t(base_keys.form.password_min_8_requirement))
                                    .required(t(base_keys.form.password_required_prompt)),
                                confirm_password: yup
                                    .string(t(base_keys.form.confirm_password))
                                    .oneOf([yup.ref('password'), null], t(`${base_keys.form.confirm_password_correct_prompt}`))
                                    .required(t(base_keys.form.confirm_password_correct_prompt)),
                            })}
                            // * TODO: Change onSubmit handler to post to authorize api
                            onSubmit={(values, {setSubmitting}) => {
                                // setTimeout(() => {
                                //     setSubmitting(false);
                                //     alert(JSON.stringify(values, null, 2));
                                // }, 500);
                                // onLoginUser(values, setSubmitting);
                                setSubmitting(false);
                                onChangeUserPassword(values, setSubmitting);
                            }}
                        >
                            {({submitForm, isSubmitting, isValid}) => (
                                <Form>
                                    <Box
                                        sx={{p: 2}}
                                        display={`flex`}
                                        flexDirection={`column`}
                                        justifyContent={`space-around`}
                                        alignItems={`center`}
                                    >
                                        <Field
                                            component={TextField}
                                            type="password"
                                            label="Password"
                                            name="password"
                                            variant={`outlined`}
                                        />
                                        <Field
                                            style={{marginTop: `1em`}}
                                            component={TextField}
                                            type="password"
                                            label="Confirm Password"
                                            name="confirm_password"
                                            variant={`outlined`}
                                        />
                                        <Button sx={{mt: 3}} variant={`contained`} color={`primary`} disabled={!isValid}
                                                onClick={submitForm}>
                                            {"CHANGE PASSWORD"}
                                        </Button>
                                        {isSubmitting && <LinearProgress/>}{" "}
                                    </Box>
                                </Form>
                            )}
                        </Formik>

                    </Box>
                </Grid>
                <Grid item sx={{}} xs={12} md={7}>
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
                                ...user_profile
                            }}
                            validationSchema={yup.object({
                                address: yup
                                    .string("Enter Your Address")
                                    .min(
                                        8,
                                        "Valid Address should be a bit longer"
                                    )
                                    .default(user_profile.address ? user_profile.address : "No Addresse Provided")
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
                                        {/*<Box sx={{my: 1, px: 3,}}>*/}
                                        {/*    <Field component={TextField} type="password" label="Password" name="password"*/}
                                        {/*           variant={`outlined`}/>*/}
                                        {/*</Box>*/}
                                        <Box sx={{my: 1, px: 3,}}>
                                            <Field component={TextField} type="text" label="Phone Number:"
                                                   name="phone_number"
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


            <Grid container sx={{bgcolor: `elevation.layer3.main`, m: 1, p: 2, width: `50%`, borderRadius: 2}}
                  justifyContent="center">
                <Grid item sx={{display: `flex`, alignItems: `center`, justifyContent: `center`}} xs={12}>
                    <Typography sx={{
                        fontSize: {
                            lg: 50,
                            md: 40,
                            sm: 30,
                            xs: 20
                        }, color: `primary.main`
                    }} p={1} variant={`h3`} mt={1}>
                        My Balance Account
                    </Typography>
                </Grid>
                <Grid item sx={{m: 1, p: 1, display: `flex`, flexDirection: `column`}} xs={12} md={4}
                      justifyContent={`flex-start`} alignItems={`center`}>
                    {/* TODO: GET LIST OF BANK ACCOUNTS AND RENDER HERE*/}
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
                        <Avatar sx={{width: 100, height: 100}}
                                src={user_profile.avatar ? user_profile.avatar : default_user_avatar}
                                alt={`User image`}>
                            {user_profile.username ? user_profile.username : "A"}
                        </Avatar>
                        <Typography variant={`h5`} sx={{m: 3}}>
                            {user_profile.username ? user_profile.username : "Guess"}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default AccountManagement;
