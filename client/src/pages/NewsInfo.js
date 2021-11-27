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
import Comments from '../components/Comments/Comments';
import { selectors, delete_news_comment_action } from './../redux/slices/News/NewsSlice';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


function NewsInfo(){
    let history= useHistory();
    const dispatch=useDispatch();
    const news_detail=useSelector(selectors.getNewsDetail);
    const comments=news_detail.Comment;
    console.log("new detail",news_detail);
    const deleteComment=(id)=>{
        dispatch({type:delete_news_comment_action})
    }
    const updateComment=(comment)=>{

    }
    const addComment=(comment)=>{
        
    }
    
    return (
        <Box sx={{display:`flex`, flexDirection:"column", justifyContent:"center" }}>
            <Grid container xs={12} sx={{bgcolor:"elevation.layer0.main", justifyContent:"center"}}>
                <Grid item container xs={12} sx={{justifyContent:"center", py: 5, width:"100%"}}>
                    <Box sx={{display:`flex`, flexDirection:"column", bgcolor:"elevation.layer1.main", justifyContent:"center", boxShadow:2}} width={1100}>
                        <Typography variant="h3" gutterBottom component="div" sx={{flexGrow:1, color:"elevation.layer0.contrast", ml:"10px", mt:"10px", fontWeight:"bold"}} align="center">
                            {/* This is title */}
                            {news_detail.Title}
                        </Typography>
                        <CardMedia>
                            {/* This is picture */}
                        </CardMedia>
                        <Typography variant="body1" gutterBottom component="div" sx={{flexGrow:1, color:"elevation.layer0.contrast", mx:"20px", mt:"10px", fontWeight:"bold"}} align="justify">
                            {/* This is description */}
                            {news_detail.Highlight}
                        </Typography>
                        <Typography variant="body1" paragraph gutterBottom component="div" sx={{flexGrow:1, color:"elevation.layer0.contrast", mx:"20px", mt:"10px"}} align="justify">
                            {/* This is content */}
                            {/* {  
                                news.content.split("\n").map((i, key) => {
                                    return <p key={key}>{i}</p>;
                                })
                            } */}
                            {news_detail.Content.split("\n").map((i, key) => {
                                    return <p key={key}>{i}</p>;
                                })}
                        </Typography>
                        <Typography variant="body1" gutterBottom component="div" sx={{flexGrow:1, color:"elevation.layer0.contrast", mx:"20px", mt:"10px", fontStyle:"italic"}} align="right">
                            {/* This is writer */}
                            {news_detail.Author}
                        </Typography>
                    </Box>
                </Grid>
                {/* <Grid item xs={12} sx={{py: 5, width:"100%"}} direction="column"> */}
                    <Box sx={{display:`flex`, flexDirection:"column", pr:"100px", borderRadius:0}} width={1000}>
                        <Typography variant="h4" gutterBottom component="div" sx={{flexGrow:1, color:"red", ml:"10px", mt:"10px"}}>
                            Bình luận
                        </Typography>
                        <Comments comments={comments} deleteComment={deleteComment} updateComment={updateComment} addComment={addComment}/>
                    </Box>
                    {/* <Box sx={{bgcolor:"white"}}>
                        <Comments comments={comments} deleteComment={deleteComment} updateComment={updateComment} addComment={addComment}/>
                    </Box> */}
                {/* </Grid> */}
            </Grid>
        </Box>
    );
}
export default NewsInfo;