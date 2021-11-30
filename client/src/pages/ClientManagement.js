import * as React from 'react';
import {base_keys} from "../locales/constants";
import {useHistory} from 'react-router-dom';
import {useTranslation} from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography'
import {Button, Dialog, LinearProgress, Popover} from '@mui/material';
import { ButtonGroup } from '@mui/material';
import { TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ArchiveIcon from '@mui/icons-material/Archive';
import FilterListIcon from '@mui/icons-material/FilterList';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import FormControlLabel from '@mui/material/FormControlLabel';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { get_client_actions } from '../redux/slices/Manage/ManageSlice';
import { useEffect,useState} from 'react';
import { Mselectors } from '../redux/slices/Manage/ManageSlice';
import { IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNew from '@mui/icons-material/ArrowBackIosNew';
import  pdfMake  from 'pdfmake/build/pdfmake';
import pdfFonts from "pdfmake/build/vfs_fonts";
import {
    edit_user_actions,
    get_user_list_actions,
    selectors,
    update_user_profile_actions
} from "../redux/slices/auth/AuthSlice";
import user_default_image from "../assets/images/user_default.jpg";
import Avatar from "@mui/material/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEdit, faPlus} from "@fortawesome/free-solid-svg-icons";
import {Field, Form, Formik} from "formik";
import * as yup from "yup";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import {faUserEdit} from "@fortawesome/free-solid-svg-icons/faUserEdit";
import {AddAccountForm} from "../components/Payment/PaymentDrawer";

const exportData= (client_list)=>{
    const head=["STT","Họ và tên","Tên tài khoản","Số điện thoại","Email","Địa chỉ ","Ngày sinh"];
    const body=client_list.map((client,index)=>{
        const sex=client.sex===0 ? "Nữ":"Nam";
        return [`${index}`,`${client.full_name}`,`${client.username}`,`${client.phone_number}`,`${client.email}`,`${client.address}`,`${client.dob}`];
    })
    const docDef={
        content:[
            {
                layout:"lightHorizontalLines",
                table:{
                    headerRows:1,
                    wdiths:['auto','auto','auto','auto','auto','auto','auto'],
                    body:[
                        head,
                        ...body
                    ]
                }
            }
        ]
    }
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    pdfMake.createPdf(docDef).download();
}

export const UpdateUserInfoFormDialog =  ({trigger, user_profile}) => {
    let history = useHistory();
    const {t, i18n} = useTranslation();
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const showPopOver = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const closePopOver = () => {
        setAnchorEl(null);
    };

    console.log("USER PROFILE IS: ",user_profile);
    const onUpdateUser = (values, setSubmitting) => {
        console.log("Update profile with values:", values);
        const avatar = user_profile.avatar;
        const data = {...values, avatar}
        dispatch({
            type: edit_user_actions.loading,
            payload: data,
        });
        setSubmitting(false);
    }
    return (
        <Box>
            <Box onClick={showPopOver}>
                {trigger}
            </Box>
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
                        enableReinitialize
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
                        })}
                        // * TODO: Change onSubmit handler to post to authorize api
                        onSubmit={(values, {setSubmitting}) => {
                            console.log("VALUES IS: ",values);
                            // onUpdateUser(values, setSubmitting);
                        }}
                    >
                        {({submitForm, isSubmitting, isValid,values,setFieldValue}) => (
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
                                    <Box sx={{ my: 1, px: 3, }}>
                                        <DesktopDatePicker
                                            label="Date Of Birth"
                                            inputFormat="DD/MM/YYYY"
                                            value={values.dob}
                                            onChange={(value) => {
                                                // console.log("CONVETED DOB IS: ",value,"MOMENT CONVERT: ",value.format("YYYY-MM-DD"));

                                                // const convertedDate = getYearMonthDateFromJsDate(value);
                                                // console.log("CONVETED DOB IS: ",convertedDate);
                                                setFieldValue("dob",value.format("YYYY-MM-DD"),true);
                                            }}
                                            renderInput={(params) => <Field component={TextField} type="text" name="dob"
                                                                            variant={`outlined`} {...params} />}
                                        />
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
            </Popover>
        </Box>

    );
}

const profile = {
    username: 'zxcvzxcvzxcv',
    address: 'Số 85-87 Trần Hưng Đạo, Hoàn Kiếm, TP. Hà Nội',
    dob: '2000-01-01',
    email: 'thinh@gmail.com',
    point: '13',
    phone_number: '099761235',
    full_name: 'Nguyen Hoang Thinh',
    avatar: '',
    role: 'ADMIN'
}

function ClientManagement(){

    let history = useHistory();
    const {t, i18n} = useTranslation();
    const dispatch = useDispatch();

    const client_list = useSelector(selectors.getUserList);

    const maxPage= client_list.length % 10===0 ? client_list.length/10 : Math.floor(client_list.length/10)+1;
    const [currPage, setPage] = useState(1) ;


    const handleChangePage=(event, NewPage)=>{
        setPage(NewPage);
    }

    useEffect(() => {
        dispatch({type:get_user_list_actions.loading,payload:''});
    }, []);
    return (
        <Box sx={{display:"flex", flexDirection:"column",mx:30, mt:"50px"}}>
            <Typography variant="h4" color="initial" my={2}>Quản lý khách hàng</Typography>
            <Box sx={{display:"flex",flexDirection:"row",justifyContent:"space-between",my:2}}>
                <Box sx={{display:"inline-flex",flexDirection:"row",alignItems:"end"}}>
                    <TextField label="Name" id="fullWidth" size="small" sx={{height:30}} />
                    <IconButton alignSelf="center">
                        <SearchIcon/>
                    </IconButton>
                </Box>
                <Button variant="text" startIcon={<ArchiveIcon/>} onClick={()=>exportData(client_list)}>{t(base_keys.manage.export)}</Button>

            </Box>
            <TableContainer component={Paper} sx={{mt:4}}>
                <Table sx={{ minWidth: 650 }} size= "small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>STT</TableCell>
                            <TableCell align="left">Họ và tên</TableCell>
                            <TableCell align="left">Tên tài khoản</TableCell>
                            <TableCell align="left">Số điện thoại</TableCell>
                            <TableCell align="left">Email</TableCell>
                            <TableCell align="left">Địa chỉ</TableCell>
                            <TableCell align="left">Avatar</TableCell>
                            <TableCell align="left">Ngày sinh</TableCell>
                            <TableCell align="left">Vai trò</TableCell>
                            <TableCell align="left">Chỉnh sửa</TableCell>
                            <TableCell align="left">Chi tiết</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {client_list.map((item,index)=>{
                                if (index>client_list.length){
                                    return(
                                        <TableRow style={{ height: 53  }}>
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    );
                                }
                                return (
                                <TableRow>
                                    <TableCell component="th" scope="row">{index}</TableCell>
                                    <TableCell align="left">{item.full_name}</TableCell>
                                    <TableCell align="left">{item.username}</TableCell>
                                    <TableCell align="left">{item.phone_number}</TableCell>
                                    <TableCell align="left">{item.email}</TableCell>
                                    <TableCell align="left">{item.address}</TableCell>
                                    <TableCell align="left">{<Avatar src={item.avatar || user_default_image}>G</Avatar>}</TableCell>
                                    <TableCell align="left">{item.dob}</TableCell>
                                    <TableCell align="left">{item.role}</TableCell>
                                    <TableCell align="left">
                                        <IconButton aria-label="delete ">
                                            <UpdateUserInfoFormDialog trigger={<FontAwesomeIcon style={{ color: `red` }} icon={faUserEdit}/>} user_profile={item}/>
                                        </IconButton>
                                    </TableCell>
                                    <TableCell align="left"><a href="#">Chi tiết</a></TableCell>
                                </TableRow>
                                );

                            })}

                    </TableBody>
                </Table>
                <Box sx={{display:"flex",flexDirection:"row",justifyContent:"flex-end"}}>
                    <Typography sx={{alignSelf:"center",mr:4}}>{(currPage-1)*10+1}-{currPage*10}/{client_list.length}</Typography>
                    <IconButton onClick={()=>{
                        if (currPage<2){
                            return;
                        }else{
                            setPage(currPage-1);
                        }
                    }}>
                        <ArrowBackIosNew/>
                    </IconButton>
                    <IconButton onClick={()=>{
                        if (currPage>=maxPage){
                            return;
                        }else{
                            setPage(currPage+1);
                        }
                    }}>
                        <ArrowForwardIosIcon/>
                    </IconButton>
                </Box>
            </TableContainer>

        </Box>
    );
}
export default ClientManagement;