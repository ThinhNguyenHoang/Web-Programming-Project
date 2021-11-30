import * as React from 'react';
import {base_keys} from "../locales/constants";
import {useHistory} from 'react-router-dom';
import {useTranslation} from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography'
import { ButtonGroup, Container } from '@mui/material';
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
import { Mselectors,get_order_actions } from '../redux/slices/Manage/ManageSlice';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNew from '@mui/icons-material/ArrowBackIosNew';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import FoodCardView from '../components/OrderView/FoodCardView';
import {update_cart_actions,selectors,get_cart_actions} from "../redux/slices/food/FoodSlice";
import { useEffect } from 'react';
import { Grid } from '@mui/material';
import ComboCardView from '../components/OrderView/ComboCardView';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const exportData = (order_list)=>{
    const head=["Order ID","Tên khách hàng","Sản phẩm","Ngày giao","Giá","Địa chỉ ","Status","Hình thức thanh toán"];
    var idx=0;
    
    const body=order_list.map((order)=>{
        idx+=1;
        const status=order.status===0 
        ? "Đã hoàn thanh"
        :(order.status===1
        ? "Đang giao"
        :"Đã huy")
        return [`${idx}`,`${order.name}`,`${order.product}`,`${order.delivery_date}`,`${order.price}`,`${order.address}`,`${status}`,`${order.payment_method}`];
    })
    const docDef={
        content:[
            {
                layout:"lightHorizontalLines",
                table:{
                    headerRows:1,
                    wdiths:['auto','auto','auto','auto','auto','auto','auto','auto'],
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

function UserOrders(){
    let history = useHistory();
    const {t, i18n} = useTranslation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({type:get_order_actions.loading});
    }, []);
    const order_list = useSelector(Mselectors.getOrder);
    console.log("order" ,order_list);
    const [tempId,setIdx]=React.useState(0);
    const maxPage=order_list.length % 10 ===0 ? order_list.length/10: Math.floor(order_list.length/10)+1;
    const [currPage,setPage]= React.useState(1);
    const RenderList=[...Array(10).keys()].map(i=>i+1+(currPage-1)*10);
    const handleChangePage=(event, NewPage)=>{
        setPage(NewPage);
    }
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = (idx) => {
        setOpen(true);
        setIdx(idx);
        
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Box sx={{bgcolor:"elevation.layer0.main"}}>
            <Box sx={{display:"flex", flexDirection:"column", mx:"200px"}}>
                <Typography variant="h3" color="red" sx={{fontWeight:"bold", textAlign:"center"}} my={2}>Lịch sử đơn hàng</Typography>
                <TableContainer component={Paper} sx={{mt:4, mb:4}}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" sx={{fontWeight:"bold"}}>STT</TableCell>
                                <TableCell align="center" sx={{fontWeight:"bold"}}>Mã đơn hàng</TableCell>
                                <TableCell align="center" sx={{fontWeight:"bold"}}>Ngày đặt</TableCell>
                                <TableCell align="center" sx={{fontWeight:"bold"}}>Đã giảm giá (%)</TableCell>
                                <TableCell align="center" sx={{fontWeight:"bold"}}>Giá</TableCell>
                                <TableCell align="left" sx={{fontWeight:"bold"}}>Ghi chú</TableCell>
                                <TableCell align="left"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {RenderList.map((idx)=>{
                                if (idx> order_list.length){
                                    return (
                                    <TableRow style={{ height: 53 }}>
                                        <TableCell colSpan={8} />
                                    </TableRow>);
                                } else {
                                    return (
                                        <TableRow style={{ height: 53 }}>
                                            <TableCell align="center" component="th" scope="row">
                                                {idx}
                                            </TableCell>
                                            <TableCell align="center">{order_list[idx-1].id}</TableCell>
                                            <TableCell align="center">{order_list[idx-1].time}</TableCell>
                                            <TableCell align="center">{order_list[idx-1].sale_percent}</TableCell>
                                            <TableCell align="center">{order_list[idx-1].amount}</TableCell>
                                            <TableCell align="left">{order_list[idx-1].description}</TableCell>
                                            <TableCell align="left">
                                                <Button style={{textTransform:"none"}} onClick={()=>handleClickOpen(idx-1)}>
                                                    Chi tiết
                                                </Button>
                                                <Dialog
                                                    fullScreen
                                                    open={open}
                                                    onClose={handleClose}
                                                    TransitionComponent={Transition}
                                                >
                                                    <AppBar sx={{ position: 'relative' }}>
                                                        <Toolbar>
                                                            <Typography sx={{flex: 1, fontWeight:"bold" }} variant="h5" component="div">
                                                                CHI TIẾT ĐƠN HÀNG
                                                            </Typography>
                                                            <IconButton
                                                            edge="start"
                                                            color="inherit"
                                                            onClick={handleClose}
                                                            aria-label="close"
                                                            >
                                                                <CloseIcon />
                                                            </IconButton>
                                                            
                                                        </Toolbar>
                                                    </AppBar>
                                                    <Grid container xs={12} sx={{bgcolor:"elevation.layer0.main", height:"1000px"}}>
                                                        <Grid item container xs={12} md={6} width="fit-content"> 
                                                            <Grid item my="auto" mx="auto">
                                                                <Typography variant="h5" sx={{color:"red", textAlign: 'center', fontWeight:"bold"}}>
                                                                        Danh sách món ăn
                                                                </Typography>
                                                                {order_list[tempId].food_list.map((food)=>{
                                                                    return <FoodCardView food={food}/>;
                                                                })}
                                                                {
                                                                    order_list[tempId].combo_list.map((combo)=>{
                                                                        return <ComboCardView food={{FoodName:combo.ComboName,Quantity:combo.Quantity,Picture:combo.Picture,Price:combo.Price}}/>;
                                                                    })
                                                                }
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item container xs={12} md={6} alignContent="center">
                                                            <Grid item sx={{mx:"auto",bgcolor:"elevation.layer1.main", width:"fit-content", border:1, borderColor:"elevation.layer0.contrast", borderRadius:16}}>
                                                                <Box sx={{display:`flex`, flexDirection:"column", mx:"20px", py:"20px"}}>
                                                                    <Typography variant="h5" sx={{color:"red", textAlign: 'center', fontWeight:"bold"}}>
                                                                        Thông tin đặt hàng
                                                                    </Typography>
                                                                    <Box>
                                                                        <Typography variant="h6" sx={{display:"inline", color:"elevation.layer0.contrast"}}>
                                                                            Mã đơn hàng:
                                                                        </Typography>
                                                                        <Typography variant="h6" sx={{display:"inline", color:"elevation.layer0.contrast", fontWeight:"bold", mx:"5px"}}>
                                                                            {order_list[tempId].id}
                                                                        </Typography>
                                                                    </Box>
                                                                    <Box>
                                                                        <Typography variant="h6" sx={{display:"inline", color:"elevation.layer0.contrast"}}>
                                                                            Ngày đặt: 
                                                                        </Typography>
                                                                        <Typography variant="h6" sx={{display:"inline", color:"elevation.layer0.contrast", fontWeight:"bold", mx:"5px"}}>
                                                                            {order_list[tempId].time}
                                                                        </Typography>
                                                                    </Box>
                                                                    <Box>
                                                                        <Typography variant="h6" sx={{display:"inline", color:"elevation.layer0.contrast"}}>
                                                                            Giảm giá:
                                                                        </Typography>
                                                                        <Typography variant="h6" sx={{display:"inline", color:"elevation.layer0.contrast", fontWeight:"bold", mx:"5px"}}>
                                                                            {order_list[tempId].sale_percent}
                                                                        </Typography>
                                                                    </Box>
                                                                    <Box>
                                                                        <Typography variant="h6" sx={{display:"inline",color:"elevation.layer0.contrast"}}>
                                                                            Tổng tiền (sau khi giảm giá):
                                                                        </Typography>
                                                                        <Typography variant="h6" sx={{display:"inline",color:"red", fontWeight:"bold", mx:"5px"}}>
                                                                            {order_list[tempId].amount}
                                                                        </Typography>
                                                                        <Typography variant="h6" sx={{display:"inline",color:"red"}}>
                                                                            VND
                                                                        </Typography>
                                                                    </Box>
                                                                    <Box>
                                                                        <Typography variant="h6" sx={{display:"inline",color:"elevation.layer0.contrast"}}>
                                                                            Ghi chú:
                                                                        </Typography>
                                                                        <Typography variant="h6" sx={{display:"inline",color:"elevation.layer0.contrast", fontWeight:"bold", mx:"5px"}}>
                                                                            {order_list[tempId].description}
                                                                        </Typography>
                                                                    </Box>
                                                                </Box>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Dialog>
                                            </TableCell>
                                        </TableRow>
                                    );
                                }
                            })}
                            
                        </TableBody>
                    </Table>
                    <Box sx={{display:"flex",flexDirection:"row",justifyContent:"flex-end"}}>
                        <Typography sx={{alignSelf:"center",mr:4}}>{(currPage-1)*10+1}-{currPage*10}/{order_list.length}</Typography>
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
        </Box>
    );
}
export default UserOrders;