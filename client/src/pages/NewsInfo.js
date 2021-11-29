import * as React from 'react';
import {Grid,CardMedia} from '@mui/material';
import Box from '@mui/material/Box';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import Typography from '@mui/material/Typography';
import Comments from '../components/Comments/Comments';
import { selectors, delete_news_comment_action, update_news_comment_action, add_news_comment_action, get_news_detail_action } from '../redux/slices/news/NewsSlice';
import default_news_image from '../../src/assets/images/default_news_image.jpg'

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


function NewsInfo(){
    let history= useHistory();
    const dispatch=useDispatch();
    const {id}=useParams();
    React.useEffect(()=>{
        dispatch({type:get_news_detail_action.loading,payload:id});
    },[]);
    const news_detail=useSelector(selectors.getNewsDetail);
    const comments=news_detail.Comment;
    console.log("new detail",news_detail);
    const deleteComment=(id)=>{
        dispatch({type:delete_news_comment_action.loading,payload:id});
        dispatch({type:get_news_detail_action.loading,payload:news_detail.NewsID});
    }
    const updateComment=(comment)=>{
        dispatch({type:update_news_comment_action.loading,payload:{...comment,NewsID:id}});
        dispatch({type:get_news_detail_action.loading,payload:news_detail.NewsID});
    }
    const addComment=(comment)=>{
        dispatch({type:add_news_comment_action.loading,payload:{...comment,NewsID:id}});
        dispatch({type:get_news_detail_action.loading,payload:news_detail.NewsID});
    }
    
    return (
        <Box sx={{display:`flex`, flexDirection:"column" }}>
            <Grid container xs={12} sx={{bgcolor:"elevation.layer0.main", justifyContent:"center"}}>
                <Grid item container xs={12} sx={{justifyContent:"center", py: 5, width:"100%"}}>
                    <Box sx={{display:`flex`, flexDirection:"column", bgcolor:"elevation.layer1.main", justifyContent:"center", boxShadow:2}} width={1100}>
                        <Typography variant="h3" gutterBottom component="div" sx={{flexGrow:1, color:"elevation.layer0.contrast", ml:"10px", mt:"10px", fontWeight:"bold"}} align="center">
                            {/* This is title */}
                            {news_detail.Title}
                        </Typography>
                        <Typography variant="h6" gutterBottom component="div" sx={{flexGrow:1, color:"elevation.layer0.contrast", mx:"20px", mt:"10px", fontWeight:"bold"}} align="center">
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
                {/* <Grid item container xs={12} sx={{justifyContent:"center", py: 5, width:"100%"}} direction="column">
                    <Box sx={{display:`flex`, flexDirection:"column", pr:"100px", bgcolor:"elevation.layer0.main", borderRadius:0}} width={1000}>
                        <Typography variant="h4" gutterBottom component="div" sx={{flexGrow:1, color:"red", ml:"10px", mt:"10px"}}>
                            Bình luận
                        </Typography>
                    </Box>
                    <Comments comments={comments} deleteComment={deleteComment} updateComment={updateComment} addComment={addComment}/>
                </Grid> */}
                <Box sx={{display:`flex`, flexDirection:"column", pr:"100px", borderRadius:0}} width={1000}>
                    <Typography variant="h4" gutterBottom component="div" sx={{flexGrow:1, color:"red", ml:"10px", mt:"10px"}}>
                        Bình luận
                    </Typography>
                    <Comments comments={comments} deleteComment={deleteComment} updateComment={updateComment} addComment={addComment}/>
                </Box>
            </Grid>
        </Box>
    );
}
export default NewsInfo;
