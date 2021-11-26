import * as React from "react";
import { Box } from "@mui/material";
import { Avatar } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { CardMedia } from "@mui/material";
import SmallComment from "./SmallComment";

function BigComment(props){
    const isAdmin=props.isAdmin;
    const isLogin=props.isLogin;
    const userAvatar=props.userAvatar;
    const [isEdit,setEdit]=React.useState(false);
    const [isAnswer,setAnswer]=React.useState(false);
    const comment=props.comment;
    const smallCommentList=comment.Reply;
    const imageList=comment.ImageList;

    let ansButton;
    if(isLogin){
        ansButton= <Button onClick={()=>setAnswer(true)}>Trả lời</Button>;
    }else{
        ansButton=(<></>);
    }
    const editReply=(reply)=>{

    }
    const deleteReply=(id)=>{

    }
    const addReply=(reply)=>{

    }

    return (
        <Box sx={{display:"flex",flexDirection:"column"}}>
            <Box sx={{display:"flex",flexDirection:"column"}}>
                <Box sx={{display:"flex",flexDirection:"row"}}>
                    <Avatar src={comment.UserAvatar} alt="avatar"></Avatar>
                    <Typography small>{comment.UserName}</Typography>
                </Box>
                <Box sx={{display:"flex", flexDirection:"column"}}>
                    {
                        isEdit ? (
                            <Box >
                            <TextField
                                width="auto"
                                fullWidth
                                name="instruction"
                                multiline
                                rows={5}
                                defaultValue={comment.Content}
                                // onChange={}
                                variant="outlined"
                            />
                            </>
                        ):
                        (
                            <Typography paragraph> {comment.Content}</Typography>
                        )
                    }
                    <Box sx={{display:"flex",flexDirection:"row"}}>
                        {imageList.map((imageComment)=><CardMedia component="img" height="150" image={imageComment} alt="Paella dish"/>)}
                    </Box>
                    <Box sx={{display:"flex",flexDirection:"row"}}>
                        {ansButton}
                        
                        {isAdmin ? 
                            (<>
                               <Button onClick={()=>setEdit(true)}>Sửa bình luận</Button> 
                               <Button onClick={()=>props.deleteComment(comment.CommentID)}>Xóa bình luận</Button>
                            </>
                            ):
                            (
                                <></> 
                            )
                        }
                    </Box>

                </Box>
                
            </Box>
            {isAnswer ? 
                (
                    <Box sx={{display:"flex",flexDirection:"row"}}>
                        <Avatar src={userAvatar} alt="avatar"></Avatar>
                        <Box sx={{display:"flex",flexDirection:"column"}}>
                            <TextField
                                width="auto"
                                fullWidth
                                label="Trả lời bình luận này"
                                name="instruction"
                                multiline
                                rows={5}
                                // onChange={}
                                variant="outlined"
                            />
                            <Button>Trả lời</Button>
                        </Box>
                
                    </Box>
                ):(<></>)
            }
            <Box sx={{display:"flex",flexDirection:"column",borderLeft:1,ml:8}}>
                {smallCommentList.map((reply)=><SmallComment 
                                                    comment={reply} 
                                                    key={reply.ReplyID} 
                                                    isAdmin={isAdmin} 
                                                    deleteReply={deleteReply}
                                                    editReply={editReply}
                                                    />)}
            </Box>
        </Box>
    );
}
export default BigComment;