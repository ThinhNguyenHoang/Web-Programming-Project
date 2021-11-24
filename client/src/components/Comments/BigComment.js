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
    const userAvatar=props.userAvatar;
    const [isEdit,setEdit]=React.useState(false);
    const [isAnswer,setAnswer]=React.useState(false);
    const comment=props.comment;
    const smallCommentList=comment.smallCommentList;
    const imageList=comment.imageList;
    return (
        <Box sx={{display:"flex",flexDirection:"column"}}>
            <Box sx={{display:"flex",flexDirection:"row"}}>
                <Avatar src={comment.userAvatar} alt="avatar"></Avatar>
                <Box sx={{display:"flex", flexDirection:"column"}}>
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
                    <Box sx={{display:"flex",flexDirection:"row"}}>
                        {imageList.map((imageComment)=><CardMedia component="img" height="150" image={imageComment} alt="Paella dish"/>)}
                    </Box>
                    <Box sx={{display:"flex",flexDirection:"row"}}>
                        <Button onClick={()=>setAnswer(true)}>Trả lời</Button>
                        {isAdmin ? 
                            (<>
                               <Button onClick={()=>setEdit(true)}>Sửa bình luận</Button> 
                               <Button onClick={()=>console.log("delete comment")}>Xóa bình luận</Button>
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
            <Box sx={{display:"flex",flexDirection:"column",borderRoght:1}}>
                {smallCommentList.map(()=><SmallComment/>)}
            </Box>
        </Box>
    );
}
export default BigComment;