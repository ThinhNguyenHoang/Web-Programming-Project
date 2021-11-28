import * as React from "react";
import { Box } from "@mui/material";
import { Avatar } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { CardMedia } from "@mui/material";
import SmallComment from "./SmallComment";
import {useSelector} from "react-redux";
import {selectors} from "../../redux/slices/auth/AuthSlice";

function BigComment(props){
    const [isEdit,setEdit]=React.useState(false);
    const [isAnswer,setAnswer]=React.useState(false);
    const [reply,setReply]=React.useState("");
    const userID=useSelector(selectors.getAcountId);
    const comment=props.comment;
    const userAvatar=props.userAvatar;
    const smallCommentList=comment.Reply;
    const imageList=comment.ImageList;
    console.log("imalge list",imageList);
    const isAdmin=props.isAdmin;
    const isLogin=props.isLogin;

    const [content,setContent]=React.useState(comment.Content);

    let ansButton;
    if(isLogin){
        ansButton= <Button onClick={()=>setAnswer(true)}>Trả lời</Button>;
    }else{
        ansButton=(<></>);
    }
    const editReply=(reply)=>{
        const newReply=smallCommentList.map(rep=>{
            if(rep.ReplyID===reply.ReplyID){
                console.log("sdfsdfsd");
                return {...rep,Content:reply.Content};
                
            }
            return rep;
        });
        props.updateComment({...comment,Reply:newReply});
    }
    const deleteReply=(id)=>{
        const newReply=comment.Reply.filter(rep=>rep.ReplyID!==id);
        props.updateComment({...comment,Reply:newReply});

    }
    const addReply=()=>{
        const rep={
            CommentID:comment.CommentID,
            UserID: userID,
            Content:reply,
        };
        const newReply=[...comment.Reply,rep];
        props.updateComment({...comment,Reply:newReply});

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
                            <Box sx={{display:"flex", flexDirection:"column"}}>
                                <TextField
                                    width="auto"
                                    fullWidth
                                    name="instruction"
                                    multiline
                                    rows={5}
                                    value={content}
                                    onChange={(e)=>setContent(e.target.value)}
                                    variant="outlined"
                                />
                                <Box sx={{display:"flex",flexDirection:"row"}}>
                                    <Button onClick={()=>{setEdit(false); setContent(comment.Content);}}>Hủy</Button>
                                    <Button onClick={()=>props.updateComment({...comment,Content:content})}>Xác nhận</Button>
                                </Box>
                            </Box>
                        ):
                        (
                            <Typography paragraph> {comment.Content}</Typography>
                        )
                    }
                    <Box sx={{display:"flex",flexDirection:"row"}}>
                        {imageList.map((imageComment)=><CardMedia component="img" height="150" image={imageComment.Image} alt="Paella dish"/>)}
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
                                onChange={(e)=>setReply(e.target.value)}
                                variant="outlined"
                            />
                            <Button onClick={addReply}>Trả lời</Button>
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