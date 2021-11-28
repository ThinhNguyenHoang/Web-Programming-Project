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
        <Box sx={{display:"flex",flexDirection:"row"}}>
            <Box >
                <Avatar src={comment.UserAvatar} alt="avatar"></Avatar>
            </Box>
            
            <Box sx={{display:"flex",flexDirection:"column", rowGap:"10px"}} width="900px">
                <Box sx={{display:"flex",flexDirection:"column", borderRadius:5, bgcolor:"elevation.layer1.main", height:"fit-content"}}>
                    <Box sx={{mx:"10px"}}>
                        <Typography small sx={{fontWeight:"bold", color:"elevation.layer1.contrast"}}>{comment.UserName}</Typography>
                        {
                            isEdit ? (
                                <Box sx={{display:"flex",flexDirection:"column"}}>
                                    <TextField
                                        width="auto"
                                        fullWidth
                                        name="instruction"
                                        multiline
                                        rows={2}
                                        defaultValue={content}
                                        onChange={(e)=>setContent(e.target.value)}
                                        variant="outlined"
                                    />
                                    <Box sx={{display:"flex",flexDirection:"row"}}>
                                        <Button style={{textTransform: 'none'}} onClick={()=>{setEdit(false); setContent(comment.Content);}}>Hủy</Button>
                                        <Button style={{textTransform: 'none'}} onClick={()=>{props.editReply({...comment,Content:content}); setEdit(false);}}>Xác nhận</Button>
                                    </Box>
                                </Box>
                            ):
                            (
                                <Typography paragraph sx={{color:"elevation.layer1.contrast"}}> {comment.Content}</Typography>
                            )
                        }
                    </Box>
                </Box>
                {
                    isAdmin ? 
                    (<Box sx={{display:"flex",flexDirection:"row"}}>
                        <Button sx={{height:"10px"}} style={{textTransform: 'none'}} onClick={()=>setEdit(true)}>Sửa</Button> 
                        <Button sx={{height:"10px"}} style={{textTransform: 'none'}} onClick={()=>props.deleteReply(comment)}>Xóa</Button>
                    </Box>
                    ):
                    (<></>)
                }
            </Box>
        </Box>
    );
}
export default SmallComment;