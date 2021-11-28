import * as React from "react";
import { Box } from "@mui/material";
import { Avatar } from "@mui/material";
import { TextField } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import { useState } from "react";

// news = {
//     NewsID:"",
//     NewsTitle:"",
//     Picture:"",
//     Highlight:"",
//     NewsContent:"",
//     Author:"",
//     Comment:[]
// }
// comment ={
//     CommentID:"",
//     UserID:"",
//     UserName:"",
//     UserAvatar:"",
//     Content:"",
//     ImageList:[], //Array url of image
//     Reply:[]
// }
// Reply = {
//     ReplyID:"",
//     CommentID:"",
//     UserID:"",
//     UserName:"",
//     UserAvatar:"",
//     Content:""
// }

function SmallComment(props){
    const isAdmin=props.isAdmin;

    const [isEdit,setEdit]=useState(false);
    const comment=props.comment;
    const [content,setContent]=useState(comment.Content);

    return(
        <Box sx={{display:"flex",flexDirection:"column"}}>
            <Box sx={{display:"flex",flexDirection:"row"}}>
                <Avatar src={comment.UserAvatar} alt="avatar"></Avatar>
                <Typography small>{comment.UserName}</Typography>
            </Box>
            
            <Box sx={{display:"flex",flexDirection:"column"}}>
                {
                    isEdit ? (
                        <Box sx={{display:"flex",flexDirection:"column"}}>
                            <TextField
                                width="auto"
                                fullWidth
                                name="instruction"
                                multiline
                                rows={5}
                                defaultValue={content}
                                onChange={(e)=>setContent(e.target.value)}
                                variant="outlined"
                            />
                            <Box sx={{display:"flex",flexDirection:"row"}}>
                                <Button onClick={()=>{setEdit(false); setContent(comment.Content);}}>Hủy</Button>
                                <Button onClick={()=>props.editReply({...comment,Content:content})}>Xác nhận</Button>
                            </Box>
                        </Box>
                    ):
                    (
                        <Typography paragraph> {comment.Content}</Typography>
                    )
                }
                {
                    isAdmin ? 
                    (<Box sx={{display:"flex",flexDirection:"row"}}>
                        <Button onClick={()=>setEdit(true)}>Sửa bình luận</Button> 
                        <Button onClick={()=>props.deleteReply(comment.RelyID)}>Xóa bình luận</Button>
                    </Box>
                    ):
                    (<></>)
                }
            </Box>
        </Box>
    );
}
export default SmallComment;