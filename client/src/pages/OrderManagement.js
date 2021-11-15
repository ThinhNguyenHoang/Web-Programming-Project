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
import { Mselectors } from '../redux/slices/Manage/ManageSlice';
import { IconButton } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNew from '@mui/icons-material/ArrowBackIosNew';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

const MCList={order_list:[
    {
        name:'John Doe',
        product:'???????',
        delivery_date:'12/6/2021',
        price:145000,
        address:'375 Nguyễn Trãi',
        status:0,
        payment_method:'Momo',
    },
    {
        name:'John Doe',
        product:'???????',
        delivery_date:'12/6/2021',
        price:145000,
        address:'375 Nguyễn Trãi',
        status:0,
        payment_method:'Momo',
    },
    {
        name:'John Doe',
        product:'???????',
        delivery_date:'12/6/2021',
        price:145000,
        address:'375 Nguyễn Trãi',
        status:0,
        payment_method:'Momo',
    },
    {
        name:'John Doe',
        product:'???????',
        delivery_date:'12/6/2021',
        price:145000,
        address:'375 Nguyễn Trãi',
        status:0,
        payment_method:'Momo',
    },
    {
        name:'John Doe',
        product:'???????',
        delivery_date:'12/6/2021',
        price:145000,
        address:'375 Nguyễn Trãi',
        status:0,
        payment_method:'Momo',
    },
    {
        name:'John Doe',
        product:'???????',
        delivery_date:'12/6/2021',
        price:145000,
        address:'375 Nguyễn Trãi',
        status:0,
        payment_method:'Momo',
    },
    {
        name:'John Doe',
        product:'???????',
        delivery_date:'12/6/2021',
        price:145000,
        address:'375 Nguyễn Trãi',
        status:0,
        payment_method:'Momo',
    },
    {
        name:'John Doe',
        product:'???????',
        delivery_date:'12/6/2021',
        price:145000,
        address:'375 Nguyễn Trãi',
        status:0,
        payment_method:'Momo',
    },
    {
        name:'John Doe',
        product:'???????',
        delivery_date:'12/6/2021',
        price:145000,
        address:'375 Nguyễn Trãi',
        status:0,
        payment_method:'Momo',
    },
    {
        name:'John Doe',
        product:'???????',
        delivery_date:'12/6/2021',
        price:145000,
        address:'375 Nguyễn Trãi',
        status:0,
        payment_method:'Momo',
    },
    {
        name:'John Doe',
        product:'???????',
        delivery_date:'12/6/2021',
        price:145000,
        address:'375 Nguyễn Trãi',
        status:0,
        payment_method:'Momo',
    },
    {
        name:'John Doe',
        product:'???????',
        delivery_date:'12/6/2021',
        price:145000,
        address:'375 Nguyễn Trãi',
        status:0,
        payment_method:'Momo',
    },
    {
        name:'John Doe',
        product:'???????',
        delivery_date:'12/6/2021',
        price:145000,
        address:'375 Nguyễn Trãi',
        status:0,
        payment_method:'Momo',
    },
    {
        name:'John Doe',
        product:'???????',
        delivery_date:'12/6/2021',
        price:145000,
        address:'375 Nguyễn Trãi',
        status:0,
        payment_method:'Momo',
    },
    {
        name:'John Doe',
        product:'???????',
        delivery_date:'12/6/2021',
        price:145000,
        address:'375 Nguyễn Trãi',
        status:0,
        payment_method:'Momo',
    },
    {
        name:'John Doe',
        product:'???????',
        delivery_date:'12/6/2021',
        price:145000,
        address:'375 Nguyễn Trãi',
        status:0,
        payment_method:'Momo',
    },
    {
        name:'John Doe',
        product:'???????',
        delivery_date:'12/6/2021',
        price:145000,
        address:'375 Nguyễn Trãi',
        status:0,
        payment_method:'Momo',
    },
    {
        name:'John Doe',
        product:'???????',
        delivery_date:'12/6/2021',
        price:145000,
        address:'375 Nguyễn Trãi',
        status:0,
        payment_method:'Momo',
    },
    {
        name:'John Doe',
        product:'???????',
        delivery_date:'12/6/2021',
        price:145000,
        address:'375 Nguyễn Trãi',
        status:0,
        payment_method:'Momo',
    },
    {
        name:'John Doe',
        product:'???????',
        delivery_date:'12/6/2021',
        price:145000,
        address:'375 Nguyễn Trãi',
        status:0,
        payment_method:'Momo',
    },
    {
        name:'John Doe',
        product:'???????',
        delivery_date:'12/6/2021',
        price:145000,
        address:'375 Nguyễn Trãi',
        status:0,
        payment_method:'Momo',
    },
    
]};


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

function OrderMangament(){
    let history = useHistory();
    const {t, i18n} = useTranslation();
    const dispatch = useDispatch();
    //const order = useSelector(Mselectors.getOrder);
    const order = MCList;
    const maxPage=order.order_list.length % 10 ===0 ? order.order_list.length/10: Math.floor(order.order_list.length/10)+1;
    const [currPage,setPage]= React.useState(1);
    const RenderList=[...Array(10).keys()].map(i=>i+1+(currPage-1)*10);
    const handleChangePage=(event, NewPage)=>{
        setPage(NewPage);
    }
    return (
        <>
        <Box>
            {/* Header here */}
        </Box>
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
                    <IconButton alignSelf="center">
                        <SearchIcon/>
                    </IconButton>
                </Box>
    
                <Button variant="text" startIcon={<ArchiveIcon/> } onClick={()=>exportData(order.order_list)}>Export</Button>
                
            </Box>
            <TableContainer component={Paper} sx={{mt:4}}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Order ID</TableCell>
                            <TableCell align="left">Tên khách hàng</TableCell>
                            <TableCell align="left">Sản phẩm</TableCell>
                            <TableCell align="left">Ngày giao</TableCell>
                            <TableCell align="left">Giá</TableCell>
                            <TableCell align="left">Địa chỉ giao hàng</TableCell>
                            <TableCell align="left">Status</TableCell>
                            <TableCell align="left">Hình thức thanh toán </TableCell>
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
                                        <TableCell component="th" scope="row">
                                            {idx}
                                        </TableCell>
                                        <TableCell align="left">{order.order_list[idx-1].name}</TableCell>
                                        <TableCell align="left">{order.order_list[idx-1].product}</TableCell>
                                        <TableCell align="left">{order.order_list[idx-1].delivery_date}</TableCell>
                                        <TableCell align="left">{order.order_list[idx-1].price}</TableCell>
                                        <TableCell align="left">{order.order_list[idx-1].address}</TableCell>
                                        <TableCell align="left">{order.order_list[idx-1].status===0 
                                                                    ? "Đã hoàn thành"
                                                                    : (order.order_list[idx-1].status===1 
                                                                    ? "Đang giao"
                                                                    : "Đã hủy")}</TableCell>
                                        <TableCell align="left">{order.order_list[idx-1].payment_method}</TableCell>
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
        </>
    );
}
export default OrderMangament;