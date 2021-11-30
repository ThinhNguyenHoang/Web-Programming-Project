import {useTranslation} from "react-i18next";
import {Box, Button} from "@mui/material";
import {Field, Form, Formik} from "formik";
import * as yup from "yup";
import {TextField} from "formik-material-ui";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import React, {useState} from "react";
import ImageDrawerUpdater from "../ImageDrawerUpdater/ImageDrawerUpdater";
import {useDispatch, useSelector} from "react-redux";
import {changePageBanner, changePageLogo, company_selectors} from "../../redux/slices/company/SettingsSlice";
import default_banner from "../../assets/images/default_banner.png";
import default_logo from "../../assets/images/default_company_logo.jpeg";

const PageSettingsForm = ({callback}) => {
    const { t, i18n } = useTranslation();
    const pageSettingsData = useSelector(company_selectors.getCompanyData);
    const dispatch = useDispatch();
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
            <ImageDrawerUpdater trigger={<img src={pageSettingsData.banner || default_banner} alt={`Default banner`}/>} img_uri_callback={(img) => dispatch(changePageBanner(img))}/>
            <ImageDrawerUpdater trigger={<img src={pageSettingsData.logo || default_logo} alt={`Default banner`}/>} img_uri_callback={(img) => dispatch(changePageLogo(img))}/>
            <Formik
                initialValues={{

                }}
                validationSchema={yup.object({
                    name: yup
                        .string("Company Name")
                        .min(
                            8,
                            "Company name should be a bit longer"
                        )
                    ,
                    slogan: yup
                        .string("Company Slogan")
                        .min(
                            2,
                            "Company slogan should be a bit longer"
                        )
                    ,
                    address: yup
                        .string("Company Address")
                        .min(
                            2,
                            "Address should be a bit longer"
                        )
                    ,
                    facebook: yup
                        .string("Facebook link")
                        .min(
                            2,
                            "Facebook link type should be a bit longer"
                        )
                    ,
                    email: yup
                        .string("Contact gmail")
                        .min(
                            2,
                            "Email links  should be a bit longer"
                        )
                    ,
                    twitter: yup
                        .string("Twitter Link")
                        .min(
                            2,
                            "Twitter type should be a bit longer"
                        )
                    ,
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
                    setSubmitting(false);
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
                                <Field component={TextField} type="text" label="Company Name"
                                       name="name"
                                       variant={`outlined`} />
                            </Box>
                            <Box sx={{ my: 1, px: 3, }}>
                                <Field component={TextField} type="text" label="Slogan" name="slogan"
                                       variant={`outlined`} />
                            </Box>
                            <Box sx={{ my: 1, px: 3, }}>
                                <Field component={TextField} type="text" label="Address" name="address"
                                       variant={`outlined`} />
                            </Box>
                            <Box sx={{ my: 1, px: 3, }}>
                                <Field component={TextField} type="text" label="Facebook" name="facebook"
                                       variant={`outlined`} />
                            </Box>
                            <Box sx={{ my: 1, px: 3, }}>
                                <Field component={TextField} type="text" label="EMail" name="email"
                                       variant={`outlined`} />
                            </Box>
                            <Box sx={{ my: 1, px: 3, }}>
                                <Field component={TextField} type="text" label="Twitter Link" name="twitter"
                                       variant={`outlined`} />
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
                                    {"Update Company Settings"}
                                </Button>
                            </Box>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Box>
    );
}


export default PageSettingsForm;