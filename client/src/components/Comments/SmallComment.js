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

    return(
        <Box sx={{display:"flex",flexDirection:"row"}}>
            <Avatar src={comment.userAvatar} alt="avatar"></Avatar>
            <Box sx={{display:"flex",flexDirection:"column"}}>
                {
                    isEdit ? (
                        <TextField
                            width="auto"
                            fullWidth
                            name="instruction"
                            multiline
                            rows={5}
                            value={comment.content}
                            // onChange={}
                            variant="outlined"
                        />
                    ):
                    (
                        <Typography paragraph> {comment.content}</Typography>
                    )
                }
                {
                    isAdmin ? 
                    (<Box sx={{display:"flex",flexDirection:"row"}}>
                        <Button onClick={()=>setEdit(true)}>Sửa bình luận</Button> 
                        <Button onClick={()=>console.log("delete comment")}>Xóa bình luận</Button>
                    </Box>
                    ):
                    (<></>)
                }
            </Box>
        </Box>
    );
}
export default SmallComment;