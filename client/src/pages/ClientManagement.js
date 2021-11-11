import * as React from 'react';
import {base_keys} from "../locales/constants";
import {useHistory} from 'react-router-dom';
import {useTranslation} from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography'
import { Button } from '@mui/material';
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
const Mclient={
    client_list:[
        {
            name:'John Doe',
            phone:"00333458374",
            sex:0,
            email:"dsfsd@gdf.dfg",
            address:"dffg,dsfdsf3sdf",
            lastModified:"12/12/21",
        },
        {
            name:'John Doe',
            phone:"00333458374",
            sex:0,
            email:"dsfsd@gdf.dfg",
            address:"dffg,dsfdsf3sdf",
            lastModified:"12/12/21",
        },
        {
            name:'John Doe',
            phone:"00333458374",
            sex:0,
            email:"dsfsd@gdf.dfg",
            address:"dffg,dsfdsf3sdf",
            lastModified:"12/12/21",
        },
        {
            name:'John Doe',
            phone:"00333458374",
            sex:0,
            email:"dsfsd@gdf.dfg",
            address:"dffg,dsfdsf3sdf",
            lastModified:"12/12/21",
        },
        {
            name:'John Doe',
            phone:"00333458374",
            sex:0,
            email:"dsfsd@gdf.dfg",
            address:"dffg,dsfdsf3sdf",
            lastModified:"12/12/21",
        },
        {
            name:'John Doe',
            phone:"00333458374",
            sex:0,
            email:"dsfsd@gdf.dfg",
            address:"dffg,dsfdsf3sdf",
            lastModified:"12/12/21",
        },
        {
            name:'John Doe',
            phone:"00333458374",
            sex:0,
            email:"dsfsd@gdf.dfg",
            address:"dffg,dsfdsf3sdf",
            lastModified:"12/12/21",
        },
        {
            name:'John Doe',
            phone:"00333458374",
            sex:0,
            email:"dsfsd@gdf.dfg",
            address:"dffg,dsfdsf3sdf",
            lastModified:"12/12/21",
        },
        {
            name:'John Doe',
            phone:"00333458374",
            sex:0,
            email:"dsfsd@gdf.dfg",
            address:"dffg,dsfdsf3sdf",
            lastModified:"12/12/21",
        },
        {
            name:'John Doe',
            phone:"00333458374",
            sex:0,
            email:"dsfsd@gdf.dfg",
            address:"dffg,dsfdsf3sdf",
            lastModified:"12/12/21",
        },
        {
            name:'John Doe',
            phone:"00333458374",
            sex:0,
            email:"dsfsd@gdf.dfg",
            address:"dffg,dsfdsf3sdf",
            lastModified:"12/12/21",
        },
        {
            name:'John Doe',
            phone:"00333458374",
            sex:0,
            email:"dsfsd@gdf.dfg",
            address:"dffg,dsfdsf3sdf",
            lastModified:"12/12/21",
        },
        {
            name:'John Doe',
            phone:"00333458374",
            sex:0,
            email:"dsfsd@gdf.dfg",
            address:"dffg,dsfdsf3sdf",
            lastModified:"12/12/21",
        },
        {
            name:'John Doe',
            phone:"00333458374",
            sex:0,
            email:"dsfsd@gdf.dfg",
            address:"dffg,dsfdsf3sdf",
            lastModified:"12/12/21",
        },
        {
            name:'John Doe',
            phone:"00333458374",
            sex:0,
            email:"dsfsd@gdf.dfg",
            address:"dffg,dsfdsf3sdf",
            lastModified:"12/12/21",
        },
        {
            name:'John Doe',
            phone:"00333458374",
            sex:0,
            email:"dsfsd@gdf.dfg",
            address:"dffg,dsfdsf3sdf",
            lastModified:"12/12/21",
        },
        {
            name:'John Doe',
            phone:"00333458374",
            sex:0,
            email:"dsfsd@gdf.dfg",
            address:"dffg,dsfdsf3sdf",
            lastModified:"12/12/21",
        },
        
    ]
}
function ClientManagement(){

    let history = useHistory();
    const {t, i18n} = useTranslation();
    const dispatch = useDispatch();

    //const client=useSelector(Mselectors.getClient);
    const client=Mclient;

    const KeyList=[...Array(client.client_list.length).keys()].map(i=>i+1);
    console.log("keylsit",KeyList);
    const maxPage=client.client_list.length % 10===0 ? client.client_list.length/10 : Math.floor(client.client_list.length/10)+1;
    const [currPage, setPage] = useState(1) ;
    const RenderList=[...Array(10).keys()].map(i=>i+1+(currPage-1)*10);

    const handleChangePage=(event, NewPage)=>{
        setPage(NewPage);
    }

    useEffect(() => {
        dispatch({type:get_client_actions.loading,payload:''});
    }, []);
    return (
        <Box sx={{display:"flex", flexDirection:"column",mx:4}}>
            <Typography variant="h4" color="initial" my={2}>Quản lý đơn hàng</Typography>
            <Box sx={{display:"flex",flexDirection:"row",justifyContent:"space-between",my:2}}>
                <Box sx={{display:"inline-flex",flexDirection:"row",alignItems:"end"}}>
                    <TextField label="Name" id="fullWidth" size="small" sx={{height:30}} />
                    <IconButton alignSelf="center">
                        <SearchIcon/>
                    </IconButton>
                </Box>
                <Button variant="text" startIcon={<ArchiveIcon/>}>{t(base_keys.manage.export)}</Button>
                
            </Box>
            <TableContainer component={Paper} sx={{mt:4}}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>STT</TableCell>
                            <TableCell align="left">Họ và tên</TableCell>
                            <TableCell align="left">Giới tính</TableCell>
                            <TableCell align="left">Số điện thoại</TableCell>
                            <TableCell align="left">Email</TableCell>
                            <TableCell align="left">Địa chỉ</TableCell>
                            <TableCell align="left">Last Modify</TableCell>
                            <TableCell align="left">Chỉnh sửa</TableCell>
                            <TableCell align="left">Chi tiết</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {RenderList.map((idx)=>{
                                if (idx>client.client_list.length){
                                    return(
                                        <TableRow style={{ height: 53 * 1 }}>
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    );
                                }
                                return (
                                <TableRow>
                                    <TableCell component="th" scope="row">{idx}</TableCell>
                                    <TableCell align="left">{client.client_list[idx-1].name}</TableCell>
                                    <TableCell align="left">{client.client_list[idx-1].sex}</TableCell>
                                    <TableCell align="left">{client.client_list[idx-1].phone}</TableCell>
                                    <TableCell align="left">{client.client_list[idx-1].email}</TableCell>
                                    <TableCell align="left">{client.client_list[idx-1].address}</TableCell>
                                    <TableCell align="left">{client.client_list[idx-1].lastModified}</TableCell>
                                    <TableCell align="left">
                                        <IconButton aria-label="delete ">
                                            <DeleteForeverRoundedIcon/>
                                        </IconButton>
                                    </TableCell>
                                    <TableCell align="left"><a href="#">Chi tiết</a></TableCell>
                                </TableRow>
                                );
                            
                            })}
                    
                    </TableBody>
                </Table>
                <Box sx={{display:"flex",flexDirection:"row",justifyContent:"flex-end"}}>
                    <Typography sx={{alignSelf:"center",mr:4}}>{(currPage-1)*10+1}-{currPage*10}/{client.client_list.length}</Typography>
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