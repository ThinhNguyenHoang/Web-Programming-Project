import { Typography,Box,TableContainer,TableBody,TableRow,TableCell,TableHead,Table } from '@mui/material';
import * as React from 'react';
import { food_management, selectors } from '../redux/slices/food/FoodSlice';

import { useDispatch,useSelector } from 'react-redux';
import { chainPropTypes } from '@mui/utils';
import { Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import MaterialCard from '../components/FoodItemManagement/MaterialCard';
function FoodItemManagement(){

    React.useEffect(()=>{
        dispatch({type:food_management.loading,payload:""});
    },[]);

    const dispatch = useDispatch();
    const food_manageData= useSelector(selectors.getFoodManagement);
    const food_list=food_manageData.food_list;
    console.log("pages foo_list",food_list);
    const tag_list=food_manageData.tag_list;
    const material_list=food_manageData.material_list;

    

    var food_render_list=[1,2,3,4,5,6,7,8,9,10];
    const foodMaxPage=food_list.length % 10===0 ? food_list.length/10 : Math.floor(food_list.length/10)+1;
    const [foodCurrPage,setFoodPage]=React.useState(1);
    React.useEffect(() => {
        food_render_list=[...Array(10).keys()].map(i=>i+1+(foodCurrPage-1)*10);
    }, [foodCurrPage]);
    
    return(
        <Box sx={{display:`flex`,flexDirection:`column`,bgcolor:'elevation.layer0.main'}}>
            <Divider>
                <Typography sx={{color: `elevation.layer0.contrast`}}>Danh sách món ăn</Typography>
            </Divider>
            <TableContainer component={Paper} sx={{mt:4}}>
                <Table sx={{ minWidth: 650 }} size= "small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">STT</TableCell>
                            <TableCell align="left">Mã món ăn</TableCell>
                            <TableCell align="left">Tên món ăn</TableCell>
                            <TableCell align="left">Giá</TableCell>
                            <TableCell ></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {food_render_list.map((idx)=>{
                            if (idx>=food_list.length){
                                return(
                                    <TableRow style={{ height: 53  }} key={idx}>
                                        <TableCell colSpan={5} />
                                    </TableRow>
                                );
                            }
                            return (
                                <TableRow key={idx}>
                                    <TableCell component="th" scope="row">{idx}</TableCell>
                                    <TableCell align="left">{food_list[idx-1].FoodID}</TableCell>
                                    <TableCell align="left">{food_list[idx-1].FoodName}</TableCell>
                                    <TableCell align="left">{food_list[idx-1].Price}</TableCell>
                                    <TableCell align="left">
                                        <IconButton aria-label="edit ">
                                            <EditIcon/>
                                        </IconButton>
                                        <IconButton aria-label="delete ">
                                            <DeleteIcon/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            );
                            }
                        )}
                    
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
            <Divider>
                <Typography sx={{color: `elevation.layer0.contrast`}}>Tag</Typography>
            </Divider>
            <Stack direction="row" spacing={1}>
                {tag_list.map((tag)=>{return <Chip label={tag.TagName} variant="outlined" onDelete={()=>deleteTag(tag.TagID)} />;})}
            </Stack>
            <Divider>
                <Typography sx={{color: `elevation.layer0.contrast`}}>Nguyên liệu</Typography>
            </Divider>
                {material_list.map((material)=>{
                    return <MaterialCard key={material.MaterialID} image={material.Picture} name={material.MaterialName}/>
                })}
        </Box>
    );
} 
const deleteTag=(id)=>{
    console.log("delete tag ",id);
}

export default FoodItemManagement;