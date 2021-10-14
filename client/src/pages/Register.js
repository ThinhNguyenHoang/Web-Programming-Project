import * as React from 'react';
import {Formik, Form, Field} from 'formik';
import {Box, Button, Card, Container, LinearProgress, Paper, Typography} from '@mui/material';
import {makeStyles} from "@mui/material";
import {TextField} from 'formik-material-ui';
import * as yup from 'yup'
import {base_keys} from "../locales/constants";
import {useHistory} from 'react-router-dom';
import {useTranslation} from "react-i18next";
import {ROUTING_CONSTANTS} from "../routes/RouterConfig";
import logo from "../assets/images/logo_64.png"

const styles = {
    button: {
        m: 1,
    },
    outer_box: {
        border: 1,
        borderColor: `#d90909`
    },
    form_container: {
        border: 1,
        minWidth: 1 / 6,
        minHeight: 1 / 3,
        borderRadius: 1
    },
    form_field: {
        my: 2,
        alignItems: 'center',
    },
}

function Register() {
    let history = useHistory();
    const {t, i18n} = useTranslation();
    const navigateHome = () => history.push(ROUTING_CONSTANTS.HOMEPAGE);
    return (
        <Box sx={{...styles.outer_box}} display={`flex`} justifyContent={`center`} alignItems={`center`}
             minHeight={`100vh`}>
            <Box sx={{...styles.form_container, boxShadow: 3}} display={`flex`} flexDirection={`column`}
                 justifyContent={`space-between`} alignItems={`center`}>
                <Box sx={{
                    display: `flex`,
                    flexDirection: `row`,
                    alignItems: `center`,
                    m: 1,
                    p: 1,
                }}>
                    <img alt={`SystemLogo`} src={logo}/>
                    <Typography p={1} variant={`h5`} mt={1}>
                        {t(base_keys.form.register)}
                    </Typography>
                </Box>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                        confirm_password:'',
                    }}
                    validationSchema={yup.object({
                        email: yup
                            .string(t(base_keys.form.email))
                            .email(t(base_keys.form.email_valid_prompt))
                            .required(t(base_keys.form.email_required_prompt)),
                        password: yup
                            .string(t(base_keys.form.password_prompt))
                            .min(8, t(base_keys.form.password_min_8_requirement))
                            .required(t(base_keys.form.password_required_prompt)),
                        confirm_password: yup
                            .string(t(base_keys.form.confirm_password))
                            .oneOf([yup.ref('password'), null], t(`${base_keys.form.confirm_password_correct_prompt}`))
                    })}
                    // * TODO: Change onSubmit handler to post to authorize api
                    onSubmit={(values, {setSubmitting}) => {
                        setTimeout(() => {
                            setSubmitting(false);
                            alert(JSON.stringify(values, null, 2));
                        }, 500);
                    }}
                >
                    {({submitForm, isSubmitting}) => (
                        <Form>
                            <Box sx={{
                                '& .field-box':{
                                    my:2,
                                    px:3,
                                }
                            }} display={`flex`} flexDirection={`column`} justifyContent={`center`}
                                 alignItems={`center`}>
                                <Box className={`field-box`}>
                                    <Field
                                        component={TextField}
                                        name="email"
                                        type="email"
                                        label="Email"
                                        variant={`outlined`}
                                    />

                                </Box>
                                <Box className={`field-box`} >
                                    <Field
                                        component={TextField}
                                        type="password"
                                        label={`${t(base_keys.form.password)}`}
                                        name="password"
                                        variant={`outlined`}
                                    />
                                </Box>
                                <Box className={`field-box`}>
                                    <Field
                                        component={TextField}
                                        type="password"
                                        label={`${t(base_keys.form.confirm_password)}`}
                                        name="confirm_password"
                                        variant={`outlined`}
                                    />
                                </Box>
                                {isSubmitting && <LinearProgress/>}
                            </Box>
                            {/* Button box*/}
                            <Box sx={{
                                display: `flex`,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                m: 2,
                                mx: 4,
                                mb: 3,
                                px: 1
                            }}>
                                <Box sx={
                                    {
                                        m: 1
                                    }
                                }>
                                    <Button
                                        variant={`contained`}
                                        color={`secondary`}
                                        disabled={isSubmitting}
                                        onClick={navigateHome}
                                    >
                                        {t(base_keys.form.back_home)}
                                    </Button>
                                </Box>
                                <Box sx={
                                    {
                                        m: 1
                                    }
                                }>
                                    <Button
                                        variant={`contained`}
                                        color={`primary`}
                                        disabled={isSubmitting}
                                        onClick={submitForm}
                                    >
                                        {t(base_keys.form.register)}
                                    </Button>
                                </Box>

                            </Box>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Box>

    );
}

export default Register;