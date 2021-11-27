import * as React from 'react';
import {Grid,CardMedia, Card,CardContent,CardHeader} from '@mui/material';
import ReactFirebaseFileUpload2 from '../utils/UploadFile/FileUpload2';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Checkbox from '@mui/material/Checkbox';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { selectors,update_combo_action,food_management_action,add_combo_action } from '../redux/slices/food/FoodSlice';
import Typography from '@mui/material/Typography';
import MaterialCardAdd from '../components/FoodItemManagement/MaterialCardAdd';
import MaterialCardDelete from '../components/FoodItemManagement/MaterialCardDelete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import AddIcon from '@mui/icons-material/Add';
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ROUTING_CONSTANTS } from '../routes/RouterConfig';
import { height } from '@mui/system';


const compareFood= (marA,marB)=>{
    if(marA.FoodID === marB.FoodID){
        return true;
    }
    return false;
}
const existObject=(obj,objList,func)=>{
    const filter=objList.filter((ob)=>func(ob,obj));
    return filter.length >0 ? true: false ;
};

function EditComboItem(){
    let history= useHistory();
    const dispatch=useDispatch();
    const food_manage_data= useSelector(selectors.getFoodManagement);
    const food_list=food_manage_data.food_list;
    var combo_detail;
    
    if (food_manage_data.tempComboID !==""){
        combo_detail=food_manage_data.combo_list.filter((combo)=>combo.ComboID===food_manage_data.tempComboID)[0];
    }else{
        combo_detail={
                ComboID:"",
                ComboName:"",
                Picture:"",
                Quantity:0,
                Price:0,
                Food:[] 
            }
        
    }

    const [values, setValues] = useState(combo_detail);
    
    const [addClick,setAddClick]=useState();
    const [deleteClick,setDeleteClick]=useState();
    const unchooseFood=food_list.filter((mar)=>!existObject(mar,values.Food,compareFood));
    const [unchooseList,setUnchooseList]=useState(unchooseFood);
    
    React.useEffect(()=>{
        if(typeof addClick !== "undefined"){
            const addFood=food_list.filter((food)=>food.FoodID===addClick.FoodID)[0];
            const newList=[...values.Food,addFood];
            setValues({...values,Food:newList});
            setUnchooseList(unchooseList.filter((mar)=>!compareFood(mar,addFood)));
        }
        
    },[addClick]);
    
    React.useEffect(()=>{
        if(typeof deleteClick !== "undefined"){
            const deleteFood=food_list.filter((food)=>food.FoodID===deleteFood.FoodID)[0];
            setValues({...values,Food:values.Food.filter((mar)=>!compareFood(mar,deleteFood))});
            setUnchooseList([...unchooseList,deleteFood]);
        }
        
    },[deleteClick]);

    const setImage=(image)=>{
        setValues({...values,Picture:image});
    }

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCreatFood=()=>{
        if (food_manage_data.tempComboID !==""){
            dispatch({type:update_combo_action.loading,payload:values});
            console.log("com values",values);
        } else {
            console.log("init values",values);
            dispatch({type:add_combo_action.loading,payload:values});
        }
        history.push(ROUTING_CONSTANTS.MANAGE_ITEM_LIST);
    }

    return (
        <Box>
            <Grid container xs={12} sx={{bgcolor:"elevation.layer0.main"}}>
                <Grid item container xs={12} sx={{justifyContent:"center", paddingTop: 5, width:"100%"}} width="100%">
                    <Box sx={{display:`flex`, flexDirection:"column"}}>
                        <Typography variant="h4" gutterBottom component="div" sx={{color:"elevation.layer0.contrast"}}>
                            Thông tin cơ bản
                        </Typography>
                        <Box sx={{display:`flex`, flexDirection:"row", flexWrap:"wrap", alignContent:"center"}}>
                            <Box sx={{bgcolor:"elevation.layer1.main"}}>
                                <ReactFirebaseFileUpload2 setImageURL={setImage} picture={values.Picture}/>
                            </Box>
                            <Box maxWidth="100ch" >
                                <form autoComplete="off">
                                    <Card >
                                        <CardContent sx={{bgcolor:"elevation.layer1.main"}}>
                                            <Grid item container spacing={3} columns={10}>
                                                <Grid item xs={10}>
                                                    <TextField
                                                        fullWidth
                                                        label="Tên món ăn"
                                                        name="foodname"
                                                        required
                                                        value={values.ComboName}
                                                        onChange={(e)=>setValues({...values,ComboName:e.target.value})}
                                                        variant="outlined"
                                                    />
                                                </Grid>
                                                <Grid item xs={10}>
                                                    <TextField
                                                        fullWidth
                                                        label="Mô tả"
                                                        name="description"
                                                        multiline
                                                        rows={3}
                                                        value={values.ComboDescrip}
                                                        onChange={(e)=>setValues({...values,ComboDescrip:e.target.value})}
                                                        variant="outlined"
                                                    />
                                                </Grid>
                                                <Grid item xs={10} md={5}>
                                                    <FormControl variant="outlined" fullWidth required>
                                                        <InputLabel>Giá tiền</InputLabel>
                                                        <OutlinedInput
                                                            id="price"
                                                            label="Giá tiền"
                                                            value={values.Price}
                                                            endAdornment={<InputAdornment position="end">VND</InputAdornment>}
                                                            onChange={(e)=>setValues({...values,Price:e.target.value})}
                                                            inputProps={{
                                                            'aria-label': 'price',
                                                            }}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                                
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </form>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
                <Grid item container xs={12} sx={{justifyContent:"center", paddingTop: 5, width:"100%"}}>
                    <Box sx={{display:`flex`, flexDirection:"column"}} width={1180}>
                        <Typography variant="h4" gutterBottom component="div" sx={{color:"elevation.layer0.contrast"}}>
                            Bao gồm
                        </Typography>
                        {food_manage_data.get_foodManage_status.isLoangding?
                        (<Box sx={{ display: 'flex',justifyContent:'center', paddingTop:3 }}>
                            <CircularProgress />
                        </Box>
                        ):(
                        <Grid container spacing={{ xs: 5, md: 5 }} columns={{ xs: 3, sm: 8, md: 12 }} sx={{paddingTop:3}}>
                            {values.Food.map((food)=>(
                                <Grid item>
                                    <MaterialCardDelete key={food.FoodID} material={{FoodID:food.FoodID,MaterialName:food.FoodName,Picture:food.Picture}} setDeleteClick={setDeleteClick}/>
                                </Grid>
                            ))}
                            <Grid item sx={{display:"flex",alignItems:"center"}}>
                            <IconButton onClick={handleClickOpen} aria-label="addmaterial" size="large" sx={{color:"elevation.layer0.contrast",display:`flex`,height:"fit-content", alignItems: 'stretch'}} >
                                <AddIcon fontSize="large" />
                            </IconButton>
                            <Dialog open={open} onClose={handleClose} PaperProps={{style: {backgroundColor: 'primary.main',boxShadow: 'none'}}}>
                            <DialogTitle sx={{textAlign:"center", color:'elevation.layer3.contrast'}}>Chọn thức ăn</DialogTitle>
                            <DialogContent>
                                <Box sx={{display:`flex`, flexDirection:"row", flexWrap: "wrap",overflowY:"auto", columnGap: "40px"}}>
                                    {unchooseList.map((food)=>(
                                        <MaterialCardAdd key={food.FoodID} material={{FoodID:food.FoodID,MaterialName:food.FoodName,Picture:food.Picture}} setAddClick={setAddClick}/>
                                    ))}
                                </Box>
                            </DialogContent>
                            <DialogActions>
                            <Button onClick={handleClose}>OK</Button>
                            </DialogActions>
                            </Dialog>
                            </Grid>
                        </Grid>)}
                    </Box>
                </Grid>
                <Box sx={{display:`flex`, flexDirection:"row", alignSelf:"flex-end"}}>
                    <Button sx={{width:"fit-content", mt:"20px", mr:"10px"}} variant="contained" onClick={()=>history.push(ROUTING_CONSTANTS.MANAGE_ITEM_LIST)}>HỦY BỎ</Button>
                    <Button sx={{width:"fit-content", mt:"20px"}} variant="contained" onClick={()=>handleCreatFood()}>HOÀN TẤT</Button>
                </Box>                        
            </Grid>
        </Box>
    );

}
export default EditComboItem;