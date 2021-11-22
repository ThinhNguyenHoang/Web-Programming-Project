import { Typography,Box,TableContainer,TableBody,TableRow,TableHead,Table } from '@mui/material';
import * as React from 'react';
import { add_material, food_management, selectors } from '../redux/slices/food/FoodSlice';
import Grid from '@mui/material/Grid';
import { useDispatch,useSelector } from 'react-redux';
import { chainPropTypes } from '@mui/utils';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import MaterialCard from '../components/FoodItemManagement/MaterialCard';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import CircularProgress from '@mui/material/CircularProgress';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import ReactFirebaseFileUpload2 from '../utils/UploadFile/FileUpload2';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: 'elevation.layer1.main',
      color: 'elevation.layer1.contrast',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
const StyledTableRow = styled(TableRow)(({ theme }) => ({
'&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
},
// hide last border
'&:last-child td, &:last-child th': {
    border: 0,
},
}));



function FoodItemManagement(){

    React.useEffect(()=>{
        dispatch({type:food_management.loading,payload:""});
    },[]);

    const dispatch = useDispatch();
    const food_manageData= useSelector(selectors.getFoodManagement);
    const food_list=food_manageData.food_list;
    const tag_list=food_manageData.tag_list;
    const material_list=food_manageData.material_list;

    

    var food_render_list=[1,2,3,4,5,6,7,8,9,10];
    const foodMaxPage=food_list.length % 10===0 ? food_list.length/10 : Math.floor(food_list.length/10)+1;
    const [foodCurrPage,setFoodPage]=React.useState(1);
    React.useEffect(() => {
        food_render_list=[...Array(10).keys()].map(i=>i+1+(foodCurrPage-1)*10);
    }, [foodCurrPage]);

    const [open, setOpen] = React.useState(false);
    const [material_img,setMaterialImg]=React.useState("");
    const [material_name,setMaterialName]=React.useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleCreate=()=>{
        dispatch({type:add_material.loading,payload:{MaterialName:material_name,Picture:material_img}});
        setOpen(false);
    }
    
    return(
        
        <Box sx={{display:`flex`,flexDirection:`column`,bgcolor:'elevation.layer0.main', flexGrow: 1, overflow: 'hidden', px: 10}}>
            <Grid sx={{ width: 1500, my: 1, mx: 'auto', p: 2, paddingBottom:5 }}>
                <Divider>
                    <Typography variant="h3" sx={{color: `red`}}>Danh sách món ăn</Typography>
                </Divider>
                <TableContainer component={Paper} sx={{mt:4}}>
                    <Table sx={{ minWidth: 650 }} size= "small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="left">STT</StyledTableCell>
                                <StyledTableCell align="left">Mã món ăn</StyledTableCell>
                                <StyledTableCell align="left">Tên món ăn</StyledTableCell>
                                <StyledTableCell align="left">Giá</StyledTableCell>
                                <StyledTableCell ></StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {food_manageData.get_foodManage_status.isloading ? 
                            (<Box sx={{ display: 'flex' }}>
                                <CircularProgress />
                            </Box>
                            ):(food_render_list.map((idx)=>{
                                if (idx>=food_list.length){
                                    return(
                                        <StyledTableRow style={{ height: 53  }} key={idx}>
                                            <StyledTableCell colSpan={5} />
                                        </StyledTableRow>
                                    );
                                }
                                return (
                                    <StyledTableRow key={idx}>
                                        <StyledTableCell component="th" scope="row">{idx}</StyledTableCell>
                                        <StyledTableCell align="left">{food_list[idx-1].FoodID}</StyledTableCell>
                                        <StyledTableCell align="left">{food_list[idx-1].FoodName}</StyledTableCell>
                                        <StyledTableCell align="left">{food_list[idx-1].Price}</StyledTableCell>
                                        <StyledTableCell align="left">
                                            <IconButton aria-label="edit ">
                                                <EditIcon/>
                                            </IconButton>
                                            <IconButton aria-label="delete ">
                                                <DeleteIcon/>
                                            </IconButton>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                );
                                }
                            ))}
                            
                        
                        </TableBody>
                    </Table>
                    <Box sx={{display:"flex",flexDirection:"row",justifyContent:"flex-end"}}>
                        <Typography sx={{alignSelf:"center",mr:4}}>{(foodCurrPage-1)*10+1}-{foodCurrPage*10}/{food_list.length}</Typography>
                        <IconButton onClick={()=>{
                            if (foodCurrPage<2){
                                return;
                            }else{
                                setFoodPage(foodCurrPage-1);
                            }
                        }}>    
                            <ArrowBackIosNewIcon/>
                        </IconButton>
                        <IconButton onClick={()=>{
                            if (foodCurrPage>=foodMaxPage){
                                return;
                            }else{
                                setFoodPage(foodCurrPage+1);
                            }
                        }}>
                            <ArrowForwardIosIcon/>
                        </IconButton>
                    </Box>
                </TableContainer>
            </Grid>
            <Grid sx={{ width: 1000, my: 1, mx: 'auto', p: 2, bgcolor:"elevation.layer0.main", paddingBottom:5}}>
                <Divider>
                    <Typography variant="h4" sx={{color: 'elevation.layer1.contrast'}}>Tag</Typography>
                </Divider>
                <Stack direction="row" spacing={1} paddingTop={3}>
                    {tag_list.map((tag)=>{return <Chip color="secondary" label={tag.TagName} variant="outlined" onDelete={()=>deleteTag(tag.TagID)} key={tag.TagID} />;})}
                </Stack>
                <IconButton aria-label="addtag" size="large">
                    <AddCircleIcon fontSize="inherit" />
                </IconButton>
            </Grid>
            <Grid sx={{ width: 1500, my: 1, mx: 'auto', p: 2 , paddingBottom:10}}>
                <Divider>
                    <Typography variant="h4" sx={{color: `red`}}>Nguyên liệu</Typography>
                </Divider>
                <Grid wrap="nowrap" sx={{display:`flex`, flexDirection:"row", columnGap: 2, paddingTop:5}}>
                    {material_list.map((material)=>{
                        return <MaterialCard key={material.MaterialID} image={material.Picture} name={material.MaterialName} id={material.MaterialID}/>
                    })}
                    <div>
                        <IconButton onClick={handleClickOpen} aria-label="addmaterial" size="large" sx={{height:"fit-content", alignSelf:"center"}} >
                            <AddCircleIcon fontSize="inherit" />
                        </IconButton>
                        <Dialog open={open} onClose={handleClose}>
                        <DialogTitle sx={{textAlign:"center"}}>Nguyên liệu</DialogTitle>
                        <DialogContent>
                        <ReactFirebaseFileUpload2 setMaterialImg={setMaterialImg}/>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Tên nguyên liệu"
                            type="name"
                            fullWidth
                            variant="standard"
                            onChange={(e)=>setMaterialName(e.target.value)}
                        />
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleClose}>Hủy bỏ</Button>
                        <Button onClick={handleCreate}>Tạo</Button>
                        </DialogActions>
                    </Dialog>
                    </div>
                </Grid>
            </Grid>
        </Box>
    );
} 
const deleteTag=(id)=>{
    console.log("delete tag ",id);
}

export default FoodItemManagement;