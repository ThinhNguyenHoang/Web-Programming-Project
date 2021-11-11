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

function OrderMangament(){
    let history = useHistory();
    const {t, i18n} = useTranslation();
    const dispatch = useDispatch();
    return (
        <Box sx={{display:"flex", flexDirection:"column"}}>
            <Typography variant="h4" color="initial" my={2}>Quản lý đơn hàng</Typography>
            <ButtonGroup size="large" aria-label="large button group"my={2}>
                <Button variant="outlined">Tất cả đơn hàng</Button>
                <Button variant="outlined">Đã hoàn thành</Button>
                <Button variant="outlined">Đang giao</Button>
                <Button variant="outlined">Đã hủy</Button>
            </ButtonGroup>
            <Box sx={{display:"flex",flexDirection:"row",justifyContent:"space-between",my:2}}>
                <Box sx={{display:"inline-flex",flexDirection:"row",alignItems:"end"}}>
                    <TextField label="fullWidth" id="fullWidth" size="small" sx={{height:30}} />
                    <SearchIcon></SearchIcon>
                </Box>
                <Box sx={{display:"inline-flex",flexDirection:"row"}}>
                    <Button variant="text" startIcon={<FilterListIcon/>}>Filter</Button>
                    <Button variant="text" startIcon={<ArchiveIcon/>}>Export</Button>
                </Box>
            </Box>
            <TableContainer component={Paper} sx={{mt:4}}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Order ID</TableCell>
                            <TableCell align="right">Tên khách hàng</TableCell>
                            <TableCell align="right">Sản phẩm</TableCell>
                            <TableCell align="right">Ngày giao</TableCell>
                            <TableCell align="right">Giá</TableCell>
                            <TableCell align="right">Địa chỉ giao hàng</TableCell>
                            <TableCell align="right">Status</TableCell>
                            <TableCell align="right">Hình thức thanh toán </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                1
                            </TableCell>
                            <TableCell align="right">Nguyễn Văn A</TableCell>
                            <TableCell align="right">Thức ăn</TableCell>
                            <TableCell align="right">12/1/2021</TableCell>
                            <TableCell align="right">360K</TableCell>
                            <TableCell align="right">369,Nguyễn Đình Chiểu</TableCell>
                            <TableCell align="right">Đang giao</TableCell>
                            <TableCell align="right">Momo</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
export default OrderMangament;