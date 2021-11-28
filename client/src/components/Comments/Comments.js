import * as React from 'react';
import {Grid} from "@mui/material";
import {Box} from "@mui/material";
import {CardMedia} from "@mui/material";
import Avatar from '@mui/material/Avatar';
import {Typography} from "@mui/material";
import {Button} from "@mui/material";
import { useSelector } from 'react-redux';
import { TextField } from '@mui/material';
import BigComment from './BigComment';
import { selectors } from './../../redux/slices/news/NewsSlice';
import { selectors as auth } from './../../redux/slices/auth/AuthSlice';
import { storage } from '../../utils/UploadFile/FileUploader';
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import { ButtonBase } from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';



// !  
function Comments(props){
    const isLogin= useSelector(auth.getLoginSuccess);
    const isAdmin=useSelector(auth.getUserRole)==="ADMIN";
    const userProfile=useSelector(auth.getUserProfile);
    const userID=userProfile.account_id;

    
    const commentList=props.comments;
    const [imageList,setImageList]= React.useState([]);
    const [content,setContent]=React.useState("");

    const userName = userProfile.username;
    console.log(commentList);
    var userAvatar;
    if (isLogin){
        userAvatar=userProfile.avatar;
    }

    const handleAddComment=()=>{
        const newComment={
            UserID:userID,
            Content:content,
            ImageList:imageList, //Array url of image
            Reply:[],
        }
        props.addComment(newComment);
    }
    const handleDeleteImage=(image)=>{
        setImageList(imageList.filter(img=>img!==image));
    }
    const handleAddImage=(e)=>{
        const image=e.target.files[0];
        const storageRef = ref(storage, `images/${userName ? userName : "default_user"}/${image.name}`)
        const uploadTask = uploadBytesResumable(storageRef, image)
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    default:
                        break;
                }
            },
            (error) => {
                console.log("UNABLE TO UPLOAD FILE", error.message);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadUrl) => {
                        setImageList([...imageList,downloadUrl]);
                    })
            }
        )
    }

    return (
        <Box sx={{display:"flex",flexDirection:"column"}}>
            {!isLogin ?
            (<Typography sx={{color:"elevation.layer0.contrast", fontStyle:"italic"}}>Vui lòng đăng nhập để bình luận </Typography>)
            :(<Box sx={{display:"flex",flexDirection:"row"}}>
                <Avatar src={userAvatar} alt="avatar"></Avatar>
                <Box sx={{display:"flex",flexDirection:"column", ml:"10px"}} width="1000px">
                    <TextField
                        
                        width="auto"
                        fullWidth
                        label="Bình luận"
                        name="instruction"
                        multiline
                        rows={3}
                        onChange={(e)=>setContent(e.target.value)}
                        variant="outlined"
                        sx={{mb:"10px", bgcolor:"white"}}
                    />
                    <Box sx={{display:"flex",flexDirection:"row", columnGap:"10px"}}>
                        {imageList.map((imageComment)=>{
                            return (<ButtonBase onClick={()=>handleDeleteImage(imageComment)}>
                                        <CardMedia component="img" height="150" image={imageComment} alt="Paella dish"/>
                                    </ButtonBase>);
                        }
                            
                            )}
                    </Box>
                    <Box sx={{display:"flex",flexDirection:"row",  columnGap:"10px"}}>
                        <Button onClick={handleAddComment} variant="contained">Gửi</Button>
                        <input
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="raised-button-file"
                            multiple
                            type="file"
                            onChange={handleAddImage}
                            />
                            <label htmlFor="raised-button-file">
                                <Button variant="outlined" component="span" sx={{color:"elevation.layer0.contrast"}} >
                                    Thêm ảnh
                                </Button>
                            </label> 
                    </Box>
                    
                </Box>
            </Box>)}
            <Box sx={{display:"flex",flexDirection:"column", mt:"10px"}}>
                {commentList.map((bigcomment)=><BigComment 
                    key={bigcomment.id} 
                    comment={bigcomment} 
                    isAdmin={isAdmin} 
                    isLogin={isLogin} 
                    deleteComment={props.deleteComment} 
                    updateComment={props.updateComment} 
                    />)}
            </Box>
        </Box>
    );
}
export default Comments;