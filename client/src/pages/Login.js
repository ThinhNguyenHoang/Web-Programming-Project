import * as React from "react";
import { Formik, Form, Field } from "formik";
import {
    Box,
    Button,
    Card,
    Container,
    LinearProgress,
    Paper,
    Typography,
} from "@mui/material";
import { makeStyles } from "@mui/material";
import { TextField } from "formik-material-ui";
import * as yup from "yup";
import { base_keys } from "../locales/constants";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ROUTING_CONSTANTS } from "../routes/RouterConfig";
import logo from "../assets/images/logo_64.png";
import {
    login_actions,
    register_actions,
    selectors,
} from "../redux/slices/auth/AuthSlice";
import { useDispatch, useSelector } from "react-redux";

const styles = {
    button: {
        m: 1,
    },
    outer_box: {
        border: 1,
        borderColor: `#d90909`,
    },
    form_container: {
        border: 1,
        minWidth: 1 / 6,
        minHeight: 1 / 3,
        borderRadius: 1,
    },
    form_field: {
        my: 2,
        alignItems: "center",
    },
};

function Login() {
    let history = useHistory();
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const loginSuccess = useSelector(selectors.getLoginSuccess);
    const loginLoading = useSelector(selectors.getLoginLoading);

    const navigateHome = () => history.push(ROUTING_CONSTANTS.HOMEPAGE);
    const onLoginUser = (values, setSubmitting) => {
        const username = values.username;
        const password = values.password;
        console.log("Login user with values:", values);
        dispatch({
            type: login_actions.loading,
            payload: { username, password },
        });
        setSubmitting(false);
    };

    return (
        <Box
            sx={{ ...styles.outer_box }}
            display={`flex`}
            justifyContent={`center`}
            alignItems={`center`}
            minHeight={`100vh`}
        >
            <Box
                sx={{ ...styles.form_container, boxShadow: 3 }}
                display={`flex`}
                flexDirection={`column`}
                justifyContent={`space-between`}
                alignItems={`center`}
            >
                <Box
                    sx={{
                        display: `flex`,
                        flexDirection: `row`,
                        alignItems: `center`,
                        m: 1,
                        p: 1,
                    }}
                >
                    <img alt={`SystemLogo`} src={logo} />{" "}
                    <Typography p={1} variant={`h5`} mt={1}>
                        {" "}
                        {t(base_keys.form.login)}{" "}
                    </Typography>{" "}
                </Box>{" "}
                <Formik
                    initialValues={{
                        username: "",
                        password: "",
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
                            ),
                        password: yup
                            .string(t(base_keys.form.password_prompt))
                            .min(
                                8,
                                t(base_keys.form.password_min_8_requirement)
                            )
                            .required(
                                t(base_keys.form.password_required_prompt)
                            ),
                    })}
                    // * TODO: Change onSubmit handler to post to authorize api
                    onSubmit={(values, { setSubmitting }) => {
                        // setTimeout(() => {
                        //     setSubmitting(false);
                        //     alert(JSON.stringify(values, null, 2));
                        // }, 500);
                        onLoginUser(values, setSubmitting);
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
                                <Box
                                    sx={{
                                        my: 1,
                                        px: 3,
                                    }}
                                >
                                    <Field
                                        component={TextField}
                                        name="username"
                                        type="text"
                                        label="Username"
                                        variant={`outlined`}
                                    />{" "}
                                </Box>{" "}
                                <br />
                                <Box
                                    sx={{
                                        my: 1,
                                        px: 3,
                                    }}
                                >
                                    <Field
                                        component={TextField}
                                        type="password"
                                        label="Password"
                                        name="password"
                                        variant={`outlined`}
                                    />{" "}
                                </Box>{" "}
                                {isSubmitting && <LinearProgress />}{" "}
                            </Box>{" "}
                            <Box
                                sx={{
                                    display: `flex`,
                                    flexDirection: "row",
                                    justifyContent: "center",
                                    m: 2,
                                    mx: 4,
                                    mb: 3,
                                    px: 1,
                                }}
                            >
                                <Box
                                    sx={{
                                        m: 1,
                                    }}
                                >
                                    <Button
                                        variant={`contained`}
                                        color={`secondary`}
                                        disabled={loginLoading}
                                        onClick={navigateHome}
                                    >
                                        {t(base_keys.form.back_home)}{" "}
                                    </Button>{" "}
                                </Box>{" "}
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
                                        {t(base_keys.form.login)}{" "}
                                    </Button>{" "}
                                </Box>{" "}
                            </Box>{" "}
                        </Form>
                    )}{" "}
                </Formik>{" "}
            </Box>{" "}
        </Box>
    );
}

export default Login;
