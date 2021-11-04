import React from 'react';
import { Grid,Typography, Button } from '@mui/material';
import SideBar from '../../components/MyAccount/SideBar';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Paper } from '@mui/material';

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

function ArchivedOrders () {
    let history = useHistory();
    const {t, i18n} = useTranslation();
    return (
        <Grid container spacing={5} p={20} paddingTop={5}>
        <Grid item xs={12}>
          <Typography variant="h4" sx={{fontWeight:"Bold"}}>My Account</Typography>
        </Grid>
        <Grid item container xs={12} spacing={2} >
          <Grid item container md={3} xs={12}  >
                <SideBar  />
          </Grid>
          
          {/* These lines of code below are gonna be changed lately to match the database */}
          <Grid item container md={9} xs={12}>
              <Grid>
                <h1> Lịch sử giao dịch</h1>
              </Grid>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="center">Mã đơn hàng</StyledTableCell>
                      <StyledTableCell align="center">Ngày mua</StyledTableCell>
                      <StyledTableCell align="center">Tên sản phẩm</StyledTableCell>
                      <StyledTableCell align="center">Tổng tiền</StyledTableCell>
                      <StyledTableCell align="center">Tình trạng</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <StyledTableRow key={row.name}>
                        <StyledTableCell align="center">
                          {row.name}
                        </StyledTableCell>
                        <StyledTableCell align="center">{row.calories}</StyledTableCell>
                        <StyledTableCell align="center" component="th" scope="row">{row.fat}</StyledTableCell>
                        <StyledTableCell align="center">{row.carbs}</StyledTableCell>
                        <StyledTableCell align="center">{row.protein}</StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
          </Grid>
        </Grid>
      </Grid>
    );
}
 
export default ArchivedOrders;