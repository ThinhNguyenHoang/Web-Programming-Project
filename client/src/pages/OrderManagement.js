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
import { Mselectors } from '../redux/slices/Manage/ManageSlice';
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

const MCList={order_list:[
    {
        name:'Taylor Swift',
        id:'???????',
        delivery_date:'12/6/2021',
        price:145000,
        address:'375 Nguyễn Trãi',
        status:0,
        payment_method:'Momo',
        discount:"10%",
    },
    {
        name:'John Doe',
        id:'???????',
        delivery_date:'12/6/2021',
        price:145000,
        address:'375 Nguyễn Trãi',
        status:0,
        payment_method:'Momo',
        discount:"10%",
    },
    {
        name:'John Doe',
        id:'???????',
        delivery_date:'12/6/2021',
        price:145000,
        address:'375 Nguyễn Trãi',
        status:0,
        payment_method:'Momo',
        discount:"10%",
    },
    {
        name:'John Doe',
        id:'???????',
        delivery_date:'12/6/2021',
        price:145000,
        address:'375 Nguyễn Trãi',
        status:0,
        payment_method:'Momo',
        discount:"10%",
    },
    {
        name:'John Doe',
        id:'???????',
        delivery_date:'12/6/2021',
        price:145000,
        address:'375 Nguyễn Trãi',
        status:0,
        payment_method:'Momo',
        discount:"10%",
    },
    {
        name:'John Doe',
        id:'???????',
        delivery_date:'12/6/2021',
        price:145000,
        address:'375 Nguyễn Trãi',
        status:0,
        payment_method:'Momo',
        discount:"10%",
    },
    {
        name:'John Doe',
        id:'???????',
        delivery_date:'12/6/2021',
        price:145000,
        address:'375 Nguyễn Trãi',
        status:0,
        payment_method:'Momo',
        discount:"10%",
    },
    {
        name:'John Doe',
        id:'???????',
        delivery_date:'12/6/2021',
        price:145000,
        address:'375 Nguyễn Trãi',
        status:0,
        payment_method:'Momo',
        discount:"10%",
    },
    {
        name:'John Doe',
        id:'???????',
        delivery_date:'12/6/2021',
        price:145000,
        address:'375 Nguyễn Trãi',
        status:0,
        payment_method:'Momo',
        discount:"10%",
    },
    {
        name:'John Doe',
        id:'???????',
        delivery_date:'12/6/2021',
        price:145000,
        address:'375 Nguyễn Trãi',
        status:0,
        payment_method:'Momo',
        discount:"10%",
    },
    {
        name:'John Doe',
        id:'???????',
        delivery_date:'12/6/2021',
        price:145000,
        address:'375 Nguyễn Trãi',
        status:0,
        payment_method:'Momo',
        discount:"10%",
    },
    {
        name:'John Doe',
        id:'???????',
        delivery_date:'12/6/2021',
        price:145000,
        address:'375 Nguyễn Trãi',
        status:0,
        payment_method:'Momo',
        discount:"10%",
    },
    {
        name:'John Doe',
        id:'???????',
        delivery_date:'12/6/2021',
        price:145000,
        address:'375 Nguyễn Trãi',
        status:0,
        payment_method:'Momo',
        discount:"10%",
    },
    {
        name:'John Doe',
        id:'???????',
        delivery_date:'12/6/2021',
        price:145000,
        address:'375 Nguyễn Trãi',
        status:0,
        payment_method:'Momo',
        discount:"10%",
    },
    {
        name:'John Doe',
        id:'???????',
        delivery_date:'12/6/2021',
        price:145000,
        address:'375 Nguyễn Trãi',
        status:0,
        payment_method:'Momo',
        discount:"10%",
    },
    {
        name:'John Doe',
        id:'???????',
        delivery_date:'12/6/2021',
        price:145000,
        address:'375 Nguyễn Trãi',
        status:0,
        payment_method:'Momo',
        discount:"10%",
    },
    {
        name:'John Doe',
        id:'???????',
        delivery_date:'12/6/2021',
        price:145000,
        address:'375 Nguyễn Trãi',
        status:0,
        payment_method:'Momo',
        discount:"10%",
    },
    {
        name:'John Doe',
        id:'???????',
        delivery_date:'12/6/2021',
        price:145000,
        address:'375 Nguyễn Trãi',
        status:0,
        payment_method:'Momo',
        discount:"10%",
    },
    {
        name:'John Doe',
        id:'???????',
        delivery_date:'12/6/2021',
        price:145000,
        address:'375 Nguyễn Trãi',
        status:0,
        payment_method:'Momo',
        discount:"10%",
    },
    {
        name:'John Doe',
        id:'???????',
        delivery_date:'12/6/2021',
        price:145000,
        address:'375 Nguyễn Trãi',
        status:0,
        payment_method:'Momo',
        discount:"10%",
    },
    {
        name:'John Doe',
        id:'123',
        delivery_date:'12/6/2021',
        price:145000,
        address:'375 Nguyễn Trãi',
        status:0,
        payment_method:'Momo',
        discount:"10%",
    },
    
]};

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


function OrderMangament(props){
    let history = useHistory();
    const {t, i18n} = useTranslation();
    const dispatch = useDispatch();
    const cart=useSelector(selectors.getCart);
    useEffect(() => {
        dispatch({type:get_cart_actions.loading,payload:''});
    }, []);
    //const order = useSelector(Mselectors.getOrder);
    const order = MCList;
    const maxPage=order.order_list.length % 10 ===0 ? order.order_list.length/10: Math.floor(order.order_list.length/10)+1;
    const [currPage,setPage]= React.useState(1);
    const RenderList=[...Array(10).keys()].map(i=>i+1+(currPage-1)*10);
    const handleChangePage=(event, NewPage)=>{
        setPage(NewPage);
    }
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Box sx={{bgcolor:"elevation.layer0.main"}}>
            <Box sx={{display:"flex", flexDirection:"column", mx:"200px"}}>
                <Typography alignContent="center" variant="h4" color="elevation.layer0.contrast" my={2}>Quản lý đơn hàng</Typography>
                <Box sx={{display:"flex",flexDirection:"row",justifyContent:"space-between",my:2}}>
                    <Box sx={{display:"inline-flex",flexDirection:"row",alignItems:"end"}}>
                        <TextField label="fullWidth" id="fullWidth" size="small" sx={{bgcolor:"white"}} />
                        <IconButton alignSelf="center" sx={{color:"elevation.layer0.contrast"}}>
                            <SearchIcon/>
                        </IconButton>
                    </Box>
                    <Button variant="text" startIcon={<ArchiveIcon/> } onClick={()=>exportData(order.order_list)}>Export</Button>
                </Box>
                <TableContainer component={Paper} sx={{mt:4, mb:4}}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" sx={{fontWeight:"bold"}}>STT</TableCell>
                                <TableCell align="center" sx={{fontWeight:"bold"}}>Mã đơn hàng</TableCell>
                                <TableCell align="center" sx={{fontWeight:"bold"}}>Tên khách hàng</TableCell>
                                <TableCell align="center" sx={{fontWeight:"bold"}}>Ngày giao</TableCell>
                                <TableCell align="center" sx={{fontWeight:"bold"}}>Đã giảm giá</TableCell>
                                <TableCell align="center" sx={{fontWeight:"bold"}}>Giá</TableCell>
                                <TableCell align="center" sx={{fontWeight:"bold"}}>Ghi chú</TableCell>
                                <TableCell align="left"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {RenderList.map((idx)=>{
                                if (idx> order.order_list.length){
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
                                            <TableCell align="center">{order.order_list[idx-1].id}</TableCell>
                                            <TableCell align="center">{order.order_list[idx-1].name}</TableCell>
                                            <TableCell align="center">{order.order_list[idx-1].delivery_date}</TableCell>
                                            <TableCell align="center">{order.order_list[idx-1].discount}</TableCell>
                                            <TableCell align="center">{order.order_list[idx-1].price}</TableCell>
                                            <TableCell align="center">{order.order_list[idx-1].address}</TableCell>
                                            <TableCell align="center">
                                                <Button style={{textTransform:"none"}} onClick={handleClickOpen}>
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
                                                            <Typography variant="h6" component="div">
                                                            Mã đơn hàng: 
                                                            </Typography>
                                                            <Typography sx={{flex: 1, fontWeight:"bold" }} variant="h6" component="div">
                                                            {order.order_list[idx-1].id}
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
                                                                {cart.food_list.map((food)=>{
                                                                    return <FoodCardView food={food}/>;
                                                                })}
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
                                                                            Tên khách hàng: 
                                                                        </Typography>
                                                                        <Typography variant="h6" sx={{display:"inline", color:"elevation.layer0.contrast", fontWeight:"bold", mx:"5px"}}>
                                                                            {order.order_list[idx-1].name}
                                                                        </Typography>
                                                                    </Box>
                                                                    <Box>
                                                                        <Typography variant="h6" sx={{display:"inline", color:"elevation.layer0.contrast"}}>
                                                                            Ngày giao hàng: 
                                                                        </Typography>
                                                                        <Typography variant="h6" sx={{display:"inline", color:"elevation.layer0.contrast", fontWeight:"bold", mx:"5px"}}>
                                                                            {order.order_list[idx-1].delivery_date}
                                                                        </Typography>
                                                                    </Box>
                                                                    <Box>
                                                                        <Typography variant="h6" sx={{display:"inline", color:"elevation.layer0.contrast"}}>
                                                                            Giảm giá:
                                                                        </Typography>
                                                                        <Typography variant="h6" sx={{display:"inline", color:"elevation.layer0.contrast", fontWeight:"bold", mx:"5px"}}>
                                                                            {order.order_list[idx-1].discount}
                                                                        </Typography>
                                                                    </Box>
                                                                    <Box>
                                                                        <Typography variant="h6" sx={{display:"inline",color:"elevation.layer0.contrast"}}>
                                                                            Tổng tiền (sau khi giảm giá):
                                                                        </Typography>
                                                                        <Typography variant="h6" sx={{display:"inline",color:"red", fontWeight:"bold", mx:"5px"}}>
                                                                            {order.order_list[idx-1].price}
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
                                                                            {order.order_list[idx-1].address}
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
                        <Typography sx={{alignSelf:"center",mr:4}}>{(currPage-1)*10+1}-{currPage*10}/{order.order_list.length}</Typography>
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
export default OrderMangament;