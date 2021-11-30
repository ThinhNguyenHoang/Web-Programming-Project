import { Typography,Box,TableContainer,TableBody,TableRow,TableHead,Table } from '@mui/material';
import * as React from 'react';
import { add_material_action, delete_tag_action, food_management_action, selectors ,delete_food_action,add_tag_action,setFoodEdit,setComboEdit,
delete_combo_action} from '../redux/slices/food/FoodSlice';
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
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import ReactFirebaseFileUpload2 from '../utils/UploadFile/FileUpload2';
import { useHistory } from 'react-router';
import { ROUTING_CONSTANTS } from '../routes/RouterConfig';


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
    let history = useHistory();

    React.useEffect(()=>{
        dispatch({type:food_management_action.loading,payload:""});
    },[]);

    const dispatch = useDispatch();
    const food_manageData= useSelector(selectors.getFoodManagement);
    const food_list=food_manageData.food_list;
    const tag_list=food_manageData.tag_list;
    const material_list=food_manageData.material_list;
    const combo_list=food_manageData.combo_list;
    console.log("food data",food_manageData);
    
    const foodMaxPage=food_list.length % 10===0 ? food_list.length/10 : Math.floor(food_list.length/10)+1;
    const [foodCurrPage,setFoodPage]=React.useState(1);
    const [food_render_list,setFoodRenderList]=React.useState([1,2,3,4,5,6,7,8,9,10]);
    React.useEffect(() => {
        setFoodRenderList([...Array(10).keys()].map(i=>i+1+(foodCurrPage-1)*10));
        
    }, [foodCurrPage]);

    const [open, setOpen] = React.useState(false);
    const [material_img,setMaterialImg]=React.useState("");
    const [material_name,setMaterialName]=React.useState("");
    const [tag_name,setTagName]=React.useState("");
    //! /////////combo
    const comboMaxPage=combo_list.length % 10===0 ? combo_list.length/10 : Math.floor(combo_list.length/10)+1;
    const [comboCurrPage,setComboPage]=React.useState(1);
    const [combo_render_list,setComboRenderList]=React.useState([1,2,3,4,5,6,7,8,9,10]);
    React.useEffect(() => {
        setComboRenderList([...Array(10).keys()].map(i=>i+1+(comboCurrPage-1)*10));
        
    }, [comboCurrPage]);
    //! ////////combo

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleCreate=()=>{
        dispatch({type:add_material_action.loading,payload:{MaterialName:material_name,Picture:material_img}});
        setOpen(false);
    }

    const [openTag, setOpenTag] = React.useState(false);
    const handleClickOpenTag = () => {
        setOpenTag(true);
    }
    const handleCloseTag = () => {
        setOpenTag(false);
    }
    const handleCreateTag=()=>{
        dispatch({type:add_tag_action.loading,payload:{TagName:tag_name}});
        setOpenTag(false);
    }

    
    return(
        <Box sx={{display:`flex`,flexDirection:`column`,justifyContent:"center",bgcolor:'elevation.layer0.main', flexGrow: 1, overflow: 'hidden', px: 50, mt:"30px"}}>
            <Box sx={{display:`flex`, flexDirection:"column", paddingBottom:5, width:"1000" }}>
                <Divider>
                    <Typography sx={{ fontSize: { lg: 50, md: 40, sm: 30, xs: 20 }, color: `red`}} p={2} variant={`h2`}>Danh sách món ăn</Typography>
                </Divider>
                <Button  sx={{width:"fit-content", alignSelf:"flex-end", mb:"20px"}} variant="contained" onClick={()=>{
                    dispatch({type:setFoodEdit,payload:""});
                    history.push(ROUTING_CONSTANTS.EDITFOOD);
                }}>Thêm món ăn</Button>
                {food_manageData.get_foodManage_status.isLoangding ?
                (<Box sx={{ display: 'flex',justifyContent:'center', paddingTop:3 }}>
                    <CircularProgress />
                </Box>
                ):(
                <TableContainer component={Paper} width={1000}>
                    <Table aria-label="a dense table">
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
                         
                            {food_render_list.map((idx)=>{
                                if (idx>food_list.length){
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
                                            <IconButton aria-label="edit " onClick={()=>{
                                                dispatch({type:setFoodEdit,payload:food_list[idx-1].FoodID});
                                                history.push(ROUTING_CONSTANTS.EDITFOOD);}}>
                                                <EditIcon/>
                                            </IconButton>
                                            <IconButton aria-label="delete " onClick={()=>dispatch({type:delete_food_action.loading,payload:food_list[idx-1].FoodID})}>
                                                <DeleteIcon/>
                                            </IconButton>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                );
                                
                                })}
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
                </TableContainer>)}
            </Box>
            {/* //! /////////////////////// */}
            <Box sx={{display:`flex`, flexDirection:"column", paddingBottom:5, width:"1000" }}>
                <Divider>
                    <Typography sx={{ fontSize: { lg: 50, md: 40, sm: 30, xs: 20 }, color: `red`}} p={2} variant={`h2`}>Danh sách Combo</Typography>
                </Divider>
                <Button  sx={{width:"fit-content", alignSelf:"flex-end", mb:"20px"}} variant="contained" onClick={()=>{
                    dispatch({type:setComboEdit,payload:""});
                    history.push(ROUTING_CONSTANTS.EDITCOMBO);
                }}>Thêm combo</Button>
                {food_manageData.get_foodManage_status.isLoangding ?
                (<Box sx={{ display: 'flex',justifyContent:'center', paddingTop:3 }}>
                    <CircularProgress />
                </Box>
                ):(
                <TableContainer component={Paper} width={1000}>
                    <Table aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="left">STT</StyledTableCell>
                                <StyledTableCell align="left">Mã combo</StyledTableCell>
                                <StyledTableCell align="left">Tên combo</StyledTableCell>
                                <StyledTableCell align="left">Giá</StyledTableCell>
                                <StyledTableCell ></StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                         
                            {combo_render_list.map((idx)=>{
                                if (idx>combo_list.length){
                                    return(
                                        <StyledTableRow style={{ height: 53  }} key={idx}>
                                            <StyledTableCell colSpan={5} />
                                        </StyledTableRow>
                                    );
                                }
                                return (
                                    <StyledTableRow key={idx}>
                                        <StyledTableCell component="th" scope="row">{idx}</StyledTableCell>
                                        <StyledTableCell align="left">{combo_list[idx-1].ComboID}</StyledTableCell>
                                        <StyledTableCell align="left">{combo_list[idx-1].ComboName}</StyledTableCell>
                                        <StyledTableCell align="left">{combo_list[idx-1].Price}</StyledTableCell>
                                        <StyledTableCell align="left">
                                            <IconButton aria-label="edit " onClick={()=>{
                                                dispatch({type:setComboEdit,payload:combo_list[idx-1].ComboID});
                                                history.push(ROUTING_CONSTANTS.EDITCOMBO);}}>
                                                <EditIcon/>
                                            </IconButton>
                                            <IconButton aria-label="delete " onClick={()=>dispatch({type:delete_combo_action.loading,payload:combo_list[idx-1].ComboID})}>
                                                <DeleteIcon/>
                                            </IconButton>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                );
                                
                                })}
                        </TableBody>
                    </Table>
                    <Box sx={{display:"flex",flexDirection:"row",justifyContent:"flex-end"}}>
                        <Typography sx={{alignSelf:"center",mr:4}}>{(comboCurrPage-1)*10+1}-{comboCurrPage*10}/{combo_list.length}</Typography>
                        <IconButton onClick={()=>{
                            if (comboCurrPage<2){
                                return;
                            }else{
                                setFoodPage(comboCurrPage-1);
                            }
                        }}>    
                            <ArrowBackIosNewIcon/>
                        </IconButton>
                        <IconButton onClick={()=>{
                            if (comboCurrPage>=comboMaxPage){
                                return;
                            }else{
                                setFoodPage(comboCurrPage+1);
                            }
                        }}>
                            <ArrowForwardIosIcon/>
                        </IconButton>
                    </Box>
                </TableContainer>)}
            </Box>
            {/* //! ////////////////////////////////// */}
            <Grid sx={{maxWidth:1500, flexGrow: 1, alignSelf:"center", paddingBottom:15}}>
                <Divider>
                    <Typography variant="h4" sx={{color: 'red'}}>Tag</Typography>
                </Divider>
                {food_manageData.get_foodManage_status.isLoangding?
                (<Box sx={{ display: 'flex',justifyContent:'center', paddingTop:3 }}>
                    <CircularProgress />
                </Box>
                ):(<Grid container spacing={{ xs: 5, md: 5 }} columns={{ xs: 3, sm: 8, md: 12 }} sx={{paddingTop:3}}>
                    {tag_list.map((tag)=> (
                        <Grid item >
                            <Box sx={{display:"flex", alignContent:"center",height:"100%"}}>
                                <Chip color="secondary" label={tag.TagName} variant="filled" onDelete={()=>dispatch({type:delete_tag_action.loading,payload:tag.TagID})}sx={{alignSelf:"center"}} />
                            </Box>
                        </Grid>
                    ))}
                    <Grid item >
                    <IconButton onClick={handleClickOpenTag} aria-label="addtag" size="large" sx={{color:"elevation.layer0.contrast",display:`flex`,height:"fit-content", alignItems: 'stretch'}} >
                        <AddIcon fontSize="large" />
                    </IconButton>
                    <Dialog open={openTag} onClose={handleCloseTag} PaperProps={{style: {backgroundColor: 'primary.main',boxShadow: 'none'}}}>
                    <DialogTitle sx={{textAlign:"center", color:'elevation.layer3.contrast'}}>Thêm Tag</DialogTitle>
                    <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Tên tag"
                        type="name"
                        fullWidth
                        variant="standard"
                        onChange={(e)=>setTagName(e.target.value)}
                    />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleCloseTag} sx={{color:'button.outlined.main'}}>Hủy bỏ</Button>
                    <Button onClick={handleCreateTag}>Tạo</Button>
                    </DialogActions>
                    </Dialog>
                    </Grid>
                </Grid>)}
            </Grid>
            <Grid sx={{height:"auto" ,maxWidth:1500, flexGrow: 1, alignSelf:"center", paddingBottom:15}}>
                <Divider>
                    <Typography variant="h4" sx={{color: 'button.outlined.main'}}>Nguyên liệu</Typography>
                </Divider>
                {food_manageData.get_foodManage_status.isLoangding?
                (<Box sx={{ display: 'flex',justifyContent:'center', paddingTop:3 }}>
                    <CircularProgress />
                </Box>
                ):(
                <Grid container spacing={{ xs: 5, md: 5 }} columns={{ xs: 3, sm: 8, md: 12 }} sx={{paddingTop:3}}>
                    {material_list.map((material)=>(
                        <Grid item sx={{display:"flex", alignContent:"center"}}>
                            <MaterialCard id = {material.MaterialID} key={material.MaterialID} image={material.Picture} name={material.MaterialName}/>
                        </Grid>
                    ))}
                    <Grid item sx={{display:"flex",alignItems:"center"}}>
                    <IconButton onClick={handleClickOpen} aria-label="addmaterial" size="large" sx={{color:"elevation.layer0.contrast",display:`flex`,height:"fit-content", alignItems: 'stretch'}} >
                        <AddIcon fontSize="large" />
                    </IconButton>
                    <Dialog open={open} onClose={handleClose} PaperProps={{style: {backgroundColor: 'primary.main',boxShadow: 'none'}}}>
                    <DialogTitle sx={{textAlign:"center", color:'elevation.layer3.contrast'}}>Thêm nguyên liệu</DialogTitle>
                    <DialogContent>
                    <ReactFirebaseFileUpload2 setImageURL={setMaterialImg}/>
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
                    <Button onClick={handleClose} sx={{color:'button.outlined.main'}}>Hủy bỏ</Button>
                    <Button onClick={handleCreate}>Tạo</Button>
                    </DialogActions>
                    </Dialog>
                    </Grid>
                </Grid>)}
            </Grid>
        </Box>
    );
} 
const deleteTag=(id)=>{
    console.log("delete tag ",id);
}

export default FoodItemManagement;