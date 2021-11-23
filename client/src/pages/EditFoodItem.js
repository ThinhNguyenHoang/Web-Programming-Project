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
import { selectors,update_food,food_management } from '../redux/slices/food/FoodSlice';
import Typography from '@mui/material/Typography';

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

function EditFoodItem(){
    let history= useHistory();
    const dispatch=useDispatch();
    const food_manage_data= useSelector(selectors.getFoodManagement);
    const tag_list=food_manage_data.tag_list;
    console.log("tag_list",tag_list)
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
    const [image,setImage]=useState("");

    const compareTag=(tagA,tagB)=>{
        if(tagA.TagName===tagB.TagName && tagB.TagID===tagA.TagID){
            return true;
        }
        return false;
    };
    const existObject=(obj,objList,func)=>{
        const filter=objList.filter((ob)=>func(ob,obj));
        return filter.length >0 ? true: false ;
    };
    const getDefaultTag=()=>{
        return tag_list.filter((tag)=>existObject(tag,values.Tags,compareTag));
    }
    return (
        <Grid container xs={12}>
            <Grid item container xs={12} sx={{justifyContent:"center", paddingTop: 5}}>
                <Box sx={{display:`flex`, flexDirection:"row", flexWrap:"wrap", alignContent:"center"}}>
                    <Box>
                        <ReactFirebaseFileUpload2 setImage={setImage}/>
                    </Box>
                    <Box maxWidth="100ch" >
                        <form autoComplete="off">
                            <Card>
                                <CardContent>
                                    <Grid item container spacing={3} columns={10}>
                                        <Grid item xs={10}>
                                            <TextField
                                                fullWidth
                                                label="Tên món ăn"
                                                name="foodname"
                                                required
                                                value={values.FoodName}
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
                                        <Grid item xs={10}>
                                            <Autocomplete
                                                width="100%"
                                                multiple
                                                defaultValue={()=>getDefaultTag()}
                                                onChange={(e,v)=>setValues({...values,Tags:v})}
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
            </Grid>
            <Grid item container xs={12} sx={{justifyContent:"center", paddingTop: 5}}>
                <Typography variant="h3" gutterBottom component="div">
                    Nguyên liệu
                </Typography>
                
            </Grid>
            
            <Grid item xs={12} sx={{justifyContent:"space-evenly", paddingTop: 5,display:"inline-flex",mx:4}}>
                <Typography variant="h4" gutterBottom component="div">
                    Qui trình chế biến
                </Typography>
                <TextField
                    fullWidth
                    label="Hướng dẫn"
                    name="instruction"
                    multiline
                    rows={10}
                    value={values.Instruct}
                    variant="outlined"
                />
            </Grid>
            
        </Grid>
    );
}
export default EditFoodItem;