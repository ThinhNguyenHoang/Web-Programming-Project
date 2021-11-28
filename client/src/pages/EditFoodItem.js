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
import { selectors,update_food_action,food_management_action,add_food_action } from '../redux/slices/food/FoodSlice';
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
import ImageDrawerUpdater from '../components/ImageDrawerUpdater/ImageDrawerUpdater';
// import food_default_image from '../assets/images/default_food_image.jpg';
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


const compareTag=(tagA,tagB)=>{
    if(tagA.TagName===tagB.TagName && tagB.TagID===tagA.TagID){
        return true;
    }
    return false;
};
const compareMaterial= (marA,marB)=>{
    if(marA.MaterialID === marB.MaterialID && marA.MaterialName === marB.MaterialName){
        return true;
    }
    return false;
}
const existObject=(obj,objList,func)=>{
    const filter=objList.filter((ob)=>func(ob,obj));
    return filter.length >0 ? true: false ;
};

function EditFoodItem(){
    let history= useHistory();
    const dispatch=useDispatch();
    const food_manage_data= useSelector(selectors.getFoodManagement);
    const tag_list=food_manage_data.tag_list;
    const material_list=food_manage_data.material_list;
    var food_detail;
    
    if (food_manage_data.tempFoodID !==""){
        food_detail=food_manage_data.food_list.filter((food)=>food.FoodID===food_manage_data.tempFoodID)[0];
    }else{
        food_detail={
            FoodID:"",
            FoodName:"",
            Picture:"",
            Price:"",
            Description:"",
            //TODO sale
            Instruct:"",
            Material:[],
            Tags:[],
        }
    }

    const [values, setValues] = useState(food_detail);
    const [addClick,setAddClick]=useState();
    const [deleteClick,setDeleteClick]=useState();
    const unchooseMaterial=material_list.filter((mar)=>!existObject(mar,values.Material,compareMaterial));
    const [unchooseList,setUnchooseList]=useState(unchooseMaterial);
    const defaultTag=tag_list.filter((tag)=>existObject(tag,values.Tags,compareTag));
    const [tagList,setTaglist]=useState(defaultTag);
    
    React.useEffect(()=>{
        if(typeof addClick !== "undefined"){
            const newList=[...values.Material,addClick];
            setValues({...values,Material:newList});
            setUnchooseList(unchooseList.filter((mar)=>!compareMaterial(mar,addClick,compareMaterial)));
        }
        
    },[addClick]);
    
    React.useEffect(()=>{
        if(typeof deleteClick !== "undefined"){
            const newList=[...values.Material,addClick];
            setValues({...values,Material:values.Material.filter((mar)=>!compareMaterial(mar,deleteClick,compareMaterial))});
            setUnchooseList([...unchooseList,deleteClick]);
        }
        
    },[deleteClick]);

    const setImage=(image)=>{
        console.log("set imgae",image);
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
        setValues({...values,Tags:[...tagList]});
        if (food_manage_data.tempFoodID !==""){
            dispatch({type:update_food_action.loading,payload:{...values,Tags:[...tagList]}});
        } else {
            console.log("init values",values);
            dispatch({type:add_food_action.loading,payload:{...values,Tags:[...tagList]}});
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
                                {/* <ImageDrawerUpdater  ></ImageDrawerUpdater> */}
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
                                                        value={values.FoodName}
                                                        onChange={(e)=>setValues({...values,FoodName:e.target.value})}
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
                                                        value={values.Description}
                                                        onChange={(e)=>setValues({...values,Description:e.target.value})}
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
                                                <Grid item xs={10} md={5}>
                                                    <FormControl variant="outlined" fullWidth>
                                                        <InputLabel>Giảm giá</InputLabel>
                                                        <OutlinedInput
                                                            id="saleoff"
                                                            label="Giảm giá"
                                                            endAdornment={<InputAdornment position="end">%</InputAdornment>}
                                                            inputProps={{
                                                            'aria-label': 'saleoff',
                                                            }}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={10} md={5}>
                                                    
                                                    <Autocomplete
                                                        fullWidth
                                                        multiple
                                                        value={tagList}
                                                        onChange={(e,v)=>{setTaglist(v)}}
                                                        id="checkboxes-tags-demo"
                                                        options={tag_list}
                                                        disableCloseOnSelect
                                                        getOptionSelected={(o,v)=>compareTag(o,v)}
                                                        getOptionLabel={(option) => option.TagName}
                                                        renderOption={(props, option, { selected }) => (
                                                            <li {...props}>
                                                            <Checkbox
                                                                icon={icon}
                                                                checkedIcon={checkedIcon}
                                                                style={{ marginRight: 8 }}
                                                                checked={selected}
                                                            />
                                                            {option.TagName}
                                                            </li>
                                                        )}
                                                        style={{ width: 500 }}
                                                        renderInput={(params) => (
                                                            <TextField {...params} label="Tag" placeholder="Thêm" />
                                                        )}
                                                    />
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
                            Nguyên liệu
                        </Typography>
                        {food_manage_data.get_foodManage_status.isLoangding?
                        (<Box sx={{ display: 'flex',justifyContent:'center', paddingTop:3 }}>
                            <CircularProgress />
                        </Box>
                        ):(
                        <Grid container spacing={{ xs: 5, md: 5 }} columns={{ xs: 3, sm: 8, md: 12 }} sx={{paddingTop:3}}>
                            {values.Material.map((material)=>(
                                <Grid item>
                                    <MaterialCardDelete key={material.MaterialID} material={material} setDeleteClick={setDeleteClick}/>
                                </Grid>
                            ))}
                            <Grid item sx={{display:"flex",alignItems:"center"}}>
                            <IconButton onClick={handleClickOpen} aria-label="addmaterial" size="large" sx={{color:"elevation.layer0.contrast",display:`flex`,height:"fit-content", alignItems: 'stretch'}} >
                                <AddIcon fontSize="large" />
                            </IconButton>
                            <Dialog open={open} onClose={handleClose} PaperProps={{style: {backgroundColor: 'primary.main',boxShadow: 'none'}}}>
                            <DialogTitle sx={{textAlign:"center", color:'elevation.layer3.contrast'}}>Chọn nguyên liệu</DialogTitle>
                            <DialogContent>
                                <Box sx={{display:`flex`, flexDirection:"row", flexWrap: "wrap",overflowY:"auto", columnGap: "40px"}}>
                                    {unchooseList.map((material)=>(
                                        <MaterialCardAdd key={material.MaterialID} material={material} setAddClick={setAddClick}/>
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
                {/* <Grid item xs={12} sx={{justifyContent:"space-evenly", paddingTop: 5,mx:4}}>
                    <Box sx={{display:"flex", flexDirection:"row",flexWrap:"wrap"}}>
                        <Typography variant="h4" gutterBottom component="div" sx={{flexGrow:1}}>
                            Qui trình chế biến
                        </Typography>
                        <TextField
                            width="auto"
                            fullWidth
                            label="Hướng dẫn"
                            name="instruction"
                            multiline
                            rows={10}
                            value={values.Instruct}
                            onChange={(e)=>setValues({...values,Instruct:e.target.value})}
                            variant="outlined"
                        />
                    </Box>
                </Grid> */}
                <Grid item container xs={12} sx={{justifyContent:"center", py: 5, width:"100%"}}>
                    <Box sx={{display:`flex`, flexDirection:"column"}} width={1180}>
                        <Typography variant="h4" gutterBottom component="div" sx={{flexGrow:1, color:"elevation.layer0.contrast", mb:5}}>
                            Qui trình chế biến
                        </Typography>
                        <TextField
                            width="auto"
                            fullWidth
                            label="Hướng dẫn"
                            name="instruction"
                            multiline
                            rows={10}
                            defaultValue={values.Instruct}
                            onChange={(e)=>setValues({...values,Instruct:e.target.value})}
                            variant="outlined"
                            required
                        />
                        <Box sx={{display:`flex`, flexDirection:"row", alignSelf:"flex-end"}}>
                            <Button sx={{width:"fit-content", mt:"20px", mr:"10px"}} variant="contained" onClick={()=>history.push(ROUTING_CONSTANTS.MANAGE_ITEM_LIST)}>HỦY BỎ</Button>
                            <Button sx={{width:"fit-content", mt:"20px"}} variant="contained" onClick={()=>handleCreatFood()}>HOÀN TẤT</Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );

}
export default EditFoodItem;