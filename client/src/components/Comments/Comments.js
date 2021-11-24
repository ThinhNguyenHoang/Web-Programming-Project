import * as React from 'react';
import Grid from "@mui/material";
import Box from "@mui/material";
import CardMedia from "@mui/material";
import Avatar from "@mui/material";
import Typography from "@mui/material";
import Button from "@mui/material";
import { useSelector } from 'react-redux';
import { TextField } from '@mui/material';
import BigComment from './BigComment';
// !  
function Comments(){
    const isAdmin=true;
    const isLogin=true;
    const comments=useSelector();
    const commentList=useSelector();
    const [imageList,setImageList]= React.useState([]);
    var userAvatar;
    if (isLogin){
        userAvatar="";
    }
    return (
        <Box sx={{display:"flex",flexDirection:"column"}}>
            {isLogin ?
            (<Typography>Vui lòng đăng nhập để bình luận </Typography>)
            :(<Box sx={{display:"flex",flexDirection:"row"}}>
                <Avatar src={userAvatar} alt="avatar"></Avatar>
                <Box sx={{display:"flex",flexDirection:"column"}}>
                    <TextField
                        width="auto"
                        fullWidth
                        label="Bình luận về món ăn này"
                        name="instruction"
                        multiline
                        rows={5}
                        // onChange={}
                        variant="outlined"
                    />
                    <Box sx={{display:"flex",flexDirection:"row"}}>
                        {imageList.map((imageComment)=><CardMedia component="img" height="150" image={imageComment} alt="Paella dish"/>)}
                    </Box>
                    <Box sx={{display:"flex",flexDirection:"row"}}>
                        <Button>Bình luận</Button>
                        <Button>Thêm ảnh</Button>
                    </Box>
                    
                </Box>
            </Box>)}
            <Box sx={{display:"flex",flexDirection:"column"}}>
                {commentList.map((bigcomment)=><BigComment key={bigcomment.id} comment={bigcomment}/>)}
            </Box>
            
        </Box>
    );

}
export default Comments;