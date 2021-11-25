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
import { selectors,update_food,food_management,add_food } from '../redux/slices/food/FoodSlice';
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

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const taglist = [
    { title: 'Món chay'},
    { title: 'Món mặn'},
    { title: 'Món nước'},
    { title: 'Món Hàn Quốc'},
    { title: 'Ngày Rằm'},
    { title: "Món Nhật"},
    { title: 'Đồ ăn nội địa'},
];
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

function NewsEdit(){
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
        if (food_manage_data.tempFoodID !==""){
            
            dispatch({type:update_food.loading,payload:values});
        } else {
            console.log("init values",values);
            dispatch({type:add_food.loading,payload:values});
        }
        history.push(ROUTING_CONSTANTS.MANAGE_ITEM_LIST);
    }

    return (
        <Box>
            <Grid container xs={12} sx={{bgcolor:"elevation.layer0.main"}}>
                <Grid item container xs={12} sx={{justifyContent:"center", paddingTop: 5, width:"100%"}} width="100%">
                    <Box sx={{display:`flex`, flexDirection:"column"}}>
                        <Typography variant="h4" gutterBottom component="div" sx={{color:"elevation.layer0.contrast"}}>
                            Thông tin bài viết
                        </Typography>
                        <Box sx={{display:`flex`, flexDirection:"row", flexWrap:"wrap", alignContent:"center"}}>
                            <Box sx={{bgcolor:"elevation.layer3.main"}}>
                                <ReactFirebaseFileUpload2 setImageURL={setImage} picture={values.Picture}/>
                            </Box>
                            <Box maxWidth="100ch" >
                                <form autoComplete="off">
                                    <Card >
                                        <CardContent>
                                            <Grid item container spacing={3} columns={10}>
                                                <Grid item xs={10}>
                                                    <TextField
                                                        fullWidth
                                                        label="Tiêu đề"
                                                        name="title"
                                                        required
                                                        value='Haaland cùng đồng đội xuống chơi ở Europa League'
                                                        // onChange={(e)=>setValues({...values,FoodName:e.target.value})}
                                                        variant="outlined"
                                                    />
                                                </Grid>
                                                <Grid item xs={10}>
                                                    <TextField
                                                        fullWidth
                                                        label="Mô tả"
                                                        name="description"
                                                        multiline
                                                        rows={8}
                                                        value='Dortmund hành quân đến Bồ Đào Nha với quyết tâm cao độ. "Die Borussen" phải giành tối thiểu một trận hòa để nuôi hy vọng đi tiếp. Tuy nhiên, thầy trò HLV Marco Rose lại gây thất vọng khi thua đậm 1-3 trước chủ nhà Sporting.'
                                                        // onChange={(e)=>setValues({...values,Description:e.target.value})}
                                                        variant="outlined"
                                                    />
                                                </Grid>
                                                <Grid item xs={10}>
                                                    <TextField
                                                        fullWidth
                                                        label="Tác giả"
                                                        name="writer"
                                                        value='Nhật Nguyễn'
                                                        // onChange={(e)=>setValues({...values,Description:e.target.value})}
                                                        variant="outlined"
                                                        required
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
                <Grid item container xs={12} sx={{justifyContent:"center", py: 5, width:"100%"}}>
                    <Box sx={{display:`flex`, flexDirection:"column"}} width={1180}>
                        <Typography variant="h4" gutterBottom component="div" sx={{flexGrow:1, color:"elevation.layer0.contrast", mb:5}}>
                            Nội dung bài viết
                        </Typography>
                        <TextField
                            sx={{bgcolor:"white"}}
                            width="auto"
                            fullWidth
                            label="Nội dung"
                            name="content"
                            multiline
                            rows={20}
                            // defaultValue={values.Instruct}
                            // onChange={(e)=>setValues({...values,Instruct:e.target.value})}
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
export default NewsEdit;