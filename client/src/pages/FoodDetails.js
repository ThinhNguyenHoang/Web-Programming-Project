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
import { ROUTING_CONSTANTS } from '../routes/RouterConfig';
import { height } from '@mui/system';
import { Chip } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import MaterialCardRead from '../components/FoodItemManagement/MaterialCardRead';
import Carousel from 'react-material-ui-carousel';
import MaterialListCarousel from '../components/FoodItemManagement/MaterialListCarousel';
import defaul_food_image from "../assets/images/defaul_food_image.jpg";

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

function FoodDetails(){
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
                <Grid item container xs={12} sx={{justifyContent:"center", paddingTop: 5, width:"100%"}}>
                    <Box sx={{display:`flex`, flexDirection:"row", flexWrap:"wrap", alignContent:"center", pr:"100px"}} width={1000}>
                        <Box sx={{bgcolor:"elevation.layer0.main"}}>
                            <CardMedia
                                component="img"
                                height="300px"
                                width="300px"
                                image={values.Picture ? values.Picture : defaul_food_image}
                                alt="Paella dish"
                            />
                        </Box>
                        <Box maxWidth="70ch" sx={{display: `flex`, flexDirection:"column", flexWrap:"wrap"}} ml="20px">
                            <Box sx={{display:`flex`, flexDirection:"column", mb:"20px", flexWrap:"wrap"}} >
                                <Typography variant="h3" gutterBottom component="div" sx={{color:"elevation.layer0.contrast", fontWeight:"bold"}}>
                                    {values.FoodName}
                                </Typography>
                                <Typography variant="body1" gutterBottom paragraph sx={{color:"elevation.layer0.contrast",height:"auto"}}>
                                    {values.Description}
                                </Typography>
                                <Box my="20px">
                                    <Box sx={{display:"inline"}} >
                                        <Typography variant="h5" gutterBottom component="div" sx={{display:"inline",color:"red", fontWeight:"bold"}}>
                                            {values.Price}
                                        </Typography>
                                        <Typography variant="h5" gutterBottom component="div" sx={{display:"inline",color:"red", fontWeight:"bold"}}>
                                             VND
                                        </Typography>
                                    </Box>
                                    <Typography variant="h6" gutterBottom component="div" sx={{display:"inline",color:"elevation.layer0.contrast", ml:"50px"}}>
                                        Khuyến mãi
                                    </Typography>
                                </Box>
                                <Box sx={{display: `flex`, flexDirection: "row", columnGap:"10px",flexWrap:"wrap", rowGap:"10px"}}>
                                    {tag_list.map((tag)=> (
                                        <Grid item >
                                            <Box sx={{display:"flex", alignContent:"center",height:"100%"}}>
                                                <Chip color="secondary" label={tag.TagName} variant="filled" sx={{alignSelf:"center"}} />
                                            </Box>
                                        </Grid>
                                    ))}
                                </Box>
                            </Box>
                            <Button variant="contained" sx={{width:"fit-content", height:"fit-content", mt:"20px"}} startIcon={<AddShoppingCartIcon />}>
                                Thêm vào giỏ hàng
                            </Button>
                        </Box>
                    </Box>
                </Grid>
                <Grid item container xs={12} sx={{justifyContent:"center", paddingTop: 5, width:"100%"}}>
                    <Box sx={{display:`flex`, flexDirection:"column", bgcolor:"elevation.layer0.main", borderRadius: 5 }} width={1100}>
                        <Typography variant="h4" gutterBottom component="div" sx={{color:"red", ml:"10px", mt:"10px"}}>
                            Nguyên liệu
                        </Typography>
                        {/* {food_manage_data.get_foodManage_status.isLoangding?
                        (<Box sx={{ display: 'flex',justifyContent:'center', paddingTop:3 }}>
                            <CircularProgress />
                        </Box>
                        ):(
                        <Grid container spacing={{ xs: 5, md: 5 }} columns={{ xs: 3, sm: 8, md: 12 }} sx={{paddingTop:3}}>
                            {values.Material.map((material)=>(
                                <Grid item>
                                    <MaterialCardRead key={material.MaterialID} material={material} setDeleteClick={setDeleteClick}/>
                                </Grid>
                            ))}
                        </Grid>)} */}
                        <MaterialListCarousel/>
                    </Box>
                </Grid>
                <Grid item container xs={12} sx={{justifyContent:"center", py: 5, width:"100%"}}>
                    <Box sx={{display:`flex`, flexDirection:"column", bgcolor:"elevation.layer1.main", borderRadius: 5, boxShadow:2}} width={1100}>
                        <Typography variant="h4" gutterBottom component="div" sx={{flexGrow:1, color:"red", ml:"10px", mt:"10px"}}>
                            Qui trình chế biến
                        </Typography>
                        <Typography sx={{color:"elevation.layer0.contrast", ml:"10px", mb:"10px"}} variant="body1">
                            {  
                                values.Instruct.split("\n").map((i, key) => {
                                    return <p key={key}>{i}</p>;
                                })
                  
                            }
                        </Typography>
                    </Box>
                </Grid>
                <Grid item container xs={12} sx={{justifyContent:"center", py: 5, width:"100%"}}>
                    <Box sx={{display:`flex`, flexDirection:"column", pr:"100px", bgcolor:"elevation.layer0.main", borderRadius:0}} width={1000}>
                        <Typography variant="h4" gutterBottom component="div" sx={{flexGrow:1, color:"red", ml:"10px", mt:"10px"}}>
                            Bình luận
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}
export default FoodDetails;