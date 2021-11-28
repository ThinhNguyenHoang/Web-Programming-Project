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
    const isAdmin=props.isAdmin;
    const isLogin=props.isLogin;

    const [content,setContent]=React.useState(comment.Content);

    let ansButton;
    if(isLogin){
        ansButton= <Button style={{textTransform: 'none'}} onClick={()=>setAnswer(true)}>Trả lời</Button>;
    }else{
        ansButton=(<></>);
    }
    const editReply=(reply)=>{
        const newReply=smallCommentList.map(rep=>{
            if(rep.ReplyID===reply.ReplyID){
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
        setAnswer(false);
        const rep={
            CommentID:comment.CommentID,
            UserID: userID,
            Content:reply,
        };
        const newReply=[...comment.Reply,rep];
        props.updateComment({...comment,Reply:newReply});

    }

    return (
        <Box sx={{display:"flex",flexDirection:"column", flexWrap:"wrap"}}>
            <Box sx={{display:"flex",flexDirection:"row", flexWrap:"wrap"}}>
                <Box sx={{display:"flex",flexDirection:"row"}}>
                    <Avatar src={comment.UserAvatar} alt="avatar"></Avatar>
                </Box>
                <Box sx={{display:"flex", flexDirection:"column", flexWrap:"wrap"}} width="950px">
                    <Box sx={{display:"flex",flexDirection:"column", borderRadius:5, bgcolor:"elevation.layer1.main"}}>
                        <Box sx={{mx:"10px", my:"2px"}}>
                            <Typography small sx={{fontWeight:"bold", color:"elevation.layer1.contrast"}}>{comment.UserName}</Typography>
                            {
                                isEdit ? (
                                    <Box sx={{display:"flex", flexDirection:"column", flexWrap:"wrap"}}>
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
                                            <Button onClick={()=>{setEdit(false); setContent(comment.Content);}}>Hủy</Button>
                                            <Button onClick={()=>props.updateComment({...comment,Content:content})}>Xác nhận</Button>
                                        </Box>
                                    </Box>
                                ):
                                (
                                    <Typography paragraph sx={{color:"elevation.layer1.contrast"}}> {comment.Content}</Typography>
                                )
                            }
                            
                        </Box>
                    </Box>
                    <Box sx={{display:"flex",flexDirection:"row"}}>
                        {imageList.map((imageComment)=><CardMedia component="img" height="150" image={imageComment} alt="Paella dish"/>)}
                    </Box>
                    
                    <Box sx={{display:"flex",flexDirection:"row"}}>
                        {ansButton}
                        
                        {isAdmin ? 
                            (<>
                               <Button style={{textTransform: 'none'}} onClick={()=>setEdit(true)}>Sửa</Button> 
                               <Button style={{textTransform: 'none'}} onClick={()=>props.deleteComment(comment.CommentID)}>Xóa</Button>
                            </>
                            ):
                            (
                                <></> 
                            )
                        }
                    </Box>

                </Box>
                
            </Box>
            {/* {isAnswer ? 
                (
                    <Box sx={{display:"flex",flexDirection:"row"}}>
                        <Avatar src={userAvatar} alt="avatar"></Avatar>
                        <Box sx={{display:"flex",flexDirection:"column"}}>
                            <TextField
                                // width="auto"
                                fullWidth
                                label="Trả lời bình luận này"
                                name="instruction"
                                multiline
                                rows={2}
                                onChange={(e)=>setReply(e.target.value)}
                                variant="outlined"
                            />
                            <Button onClick={addReply}>Trả lời</Button>
                        </Box>
                
                    </Box>
                ):(<></>)
            } */}
            <Box sx={{display:"flex",flexDirection:"column",borderLeft:1,ml:8, rowGap:"20px", my:"10px"}}>
                <Box sx={{ml:"10px", width:"fit-content",display:"flex",flexDirection:"column", rowGap:"20px"}}>
                {smallCommentList.map((reply)=><SmallComment 
                                                    comment={reply} 
                                                    key={reply.ReplyID} 
                                                    isAdmin={isAdmin} 
                                                    deleteReply={deleteReply}
                                                    editReply={editReply}
                                                    />)}

                {isAnswer ?
                    (
                        <Box sx={{display:"flex",flexDirection:"row"}}>
                            <Avatar src={userAvatar} alt="avatar"></Avatar>
                            <Box sx={{display:"flex",flexDirection:"column", mx:"10px", width:"850px"}}>
                                <TextField
                                    // width="auto"
                                    fullWidth
                                    label="Trả lời bình luận này"
                                    name="instruction"
                                    multiline
                                    rows={2}
                                    onChange={(e)=>setReply(e.target.value)}
                                    variant="outlined"
                                    sx={{bgcolor:"white"}}
                                />
                                <Box sx={{display:`flex`, flexDirection:"row"}}>
                                    <Button sx={{width:"fit-content"}} style={{textTransform: 'none'}} onClick={addReply}>Trả lời</Button>
                                    <Button sx={{width:"fit-content"}} style={{textTransform: 'none'}} >Hủy</Button>
                                </Box>
                            </Box>
                        </Box>
                    ):(<></>)
                }
                </Box>
            </Box>
        </Box>
    );
}
export default BigComment;