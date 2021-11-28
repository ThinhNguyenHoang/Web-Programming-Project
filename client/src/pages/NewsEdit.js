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
import { useHistory, useParams } from 'react-router';
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
import { add_news_action, selectors } from '../redux/slices/News/NewsSlice';
import { update_news_action,get_news_detail_action,set_new_news} from './../redux/slices/News/NewsSlice';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;



function NewsEdit(){
    let history= useHistory();
    const dispatch=useDispatch();
    const {id}=useParams();
    React.useEffect(()=>{
        if(id!=="add"){
            console.log("get news",id);
            dispatch({type:get_news_detail_action.loading,payload:id});
        }else{
            dispatch({type:set_new_news});
        }
    },[]);
    
    const news_detail=useSelector(selectors.getNewsDetail);
    const [title,setTitle]=useState(news_detail.NewsID);
    const [highlight,setHighlight]=useState(news_detail.Title);
    const [picture,setPicture]=useState(news_detail.Picture);
    const [content,setContent]=useState(news_detail.Content);
    const [author,setAuthor]=useState(news_detail.Author);
    React.useEffect(()=>{   
        setTitle(news_detail.Title);
        setHighlight(news_detail.Highlight);
        setPicture(news_detail.Picture);
        setContent(news_detail.Content);
        setAuthor(news_detail.Author);
    },[news_detail]);   
    
    const handleCreatNews= ()=>{
        const news={
            NewsID:news_detail.NewsID,
            Title:title,
            Highlight:highlight,
            Picture:picture,
            Content:content,
            Author:author
        }
        if(id!=="add"){
            dispatch({type:update_news_action.loading,payload:news});
        }else{
            dispatch({type:add_news_action.loading,payload:news});
        }
        history.push(ROUTING_CONSTANTS.NEWS)
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
                                <ReactFirebaseFileUpload2 setImageURL={setPicture} picture={picture}/>
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
                                                        defaultValue={title}
                                                        onChange={(e)=>setTitle(e.target.value)}
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
                                                        defaultValue={highlight}
                                                        onChange={(e)=>setHighlight(e.target.value)}
                                                        variant="outlined"
                                                    />
                                                </Grid>
                                                <Grid item xs={10}>
                                                    <TextField
                                                        fullWidth
                                                        label="Tác giả"
                                                        name="writer"
                                                        defaultValue={author}
                                                        onChange={(e)=>setAuthor(e.target.value)}
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
                            defaultValue={content}
                            onChange={(e)=>setContent(e.target.value)}
                            variant="outlined"
                            required
                        />
                        <Box sx={{display:`flex`, flexDirection:"row", alignSelf:"flex-end"}}>
                            <Button sx={{width:"fit-content", mt:"20px", mr:"10px"}} variant="contained" onClick={()=>history.push(ROUTING_CONSTANTS.NEWS)}>HỦY BỎ</Button>
                            <Button sx={{width:"fit-content", mt:"20px"}} variant="contained" onClick={()=>handleCreatNews()}>HOÀN TẤT</Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );

}
export default NewsEdit;