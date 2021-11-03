import React from 'react';
import { Grid,Typography, Button } from '@mui/material';
import BookCard from '../../components/CartComponent1/BookCard';
import { Box, fontSize } from '@mui/system';
import AddressBox from '../../components/CartComponent1/AddressBox';
import Information from '../../components/CartComponent1/Information';
import EditInfor from '../../components/CartComponent1/EditInfor';
import "./thongtin.css";
import { Paper } from '@mui/material';
import {useSelector} from 'react-redux';
import { CardActions } from "@mui/material";
import { Card} from "@mui/material";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.info.light,
      color: theme.palette.common.black,
      fontWeight: "bold",
      fontSize: 15
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
}));
  
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
}));
  
function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}
  
const rows = [
    createData(102938, "30/10/2021", "Lược sử thời gian - S.Hawking", 240000, "Đã giao hàng"),
    createData(736452, "01/11/2021", "Doraemon - F. F.Fujio", 370000, "Đang giao hàng"),
    createData(182752, "02/11/2021", "Rừng Na Uy - N.Haruki", 240000, "Đang chuẩn bị"),
    createData(283745, "10/11/2021", "Harry Potter - JK.Rolling", 670000, "Đã hủy"),
];

function MyAccount(){
    let history = useHistory();
    const {t, i18n} = useTranslation();
    const dispatch = useDispatch();

}

export default MyAccount;