import React, {useEffect, useState} from 'react';
import {Avatar, Box, Button, Drawer, Grid, ImageList, ImageListItem, LinearProgress, Popover} from "@mui/material";
import {useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {change_pass_actions, selectors, update_user_profile_actions} from "../../redux/slices/auth/AuthSlice";
import Typography from "@mui/material/Typography";
import default_user_avatar from "../../assets/images/user_default.jpg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBackspace, faPlus} from "@fortawesome/free-solid-svg-icons";
import {ImageUploader, storage} from "../../utils/UploadFile/FileUploader";
import {getDownloadURL, listAll, ref} from "firebase/storage";
import Toaster from "../../utils/Toaster/Toaster";


const ImageDrawerUpdater = ({trigger,additionalStyle={},img_uri_callback}) => {
    const dispatch = useDispatch();
    const user_profile = useSelector(selectors.getUserProfile)
    // const on
    const [show, setShow] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openCount,setOpenCount] = React.useState(0);
    const currentUserName = useSelector(selectors.getUserName);
    const listRef = ref(storage,`images/${currentUserName?currentUserName:"default_user"}`)
    const [listImage, setListImage] = useState([]);
    const list_image = [];
    useEffect(() => {
        listAll(listRef)
            .then((res) => {
                res.prefixes.forEach((folderRef) => {
                    // All the prefixes under listRef.
                    // You may call listAll() recursively on them.
                    console.log(folderRef);
                });
                const count = res.items.length;
                let start = 0;
                res.items.forEach((itemRef) => {
                    // All the items under listRef.
                    getDownloadURL(itemRef)
                        .then((url) =>{
                            console.log("IMAGE URL LOADED FROM FIREBSE IS: ",url)
                            const image_item = {
                                img: url,
                                title: "Firebase Loaded Image"
                            }
                            // setListImage(listImage.concat(image_item));
                            list_image.push(image_item);
                            start = start + 1;
                            console.log("COUNT IS: ",start);
                            if(start === count) {
                                setListImage(list_image);
                            }
                        })
                        .catch((err) => {
                            console.log("ERROR LOADIGN IAMGE FROM FIREBASE",err.message())
                        })
                });
            })
            .catch((error) => {
                // Uh-oh, an error occurred!
                console.log("ERROR GETTING FILE LIST FROM FIREBASE FOR REF:",listRef.name)

            });

        return () => {

        };
    }, [openCount]);

    const showPopOver = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const closePopOver = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <Box sx={{m: 1, p: 1, display: `flex`, flexDirection: `column`}} xs={12} md={4}
             justifyContent={`flex-start`} alignItems={`center`}>
            <Box sx={{
                bgcolor: `white`,
                borderRadius: 2,
                py: 3,
                borderColor: `elevation.layer3.contrast`,
                border: 2,
                color: `black`,
                display: `flex`,
                flexDirection: `column`,
                alignItems: `center`,
                justifyContent: `center`
            }}>
                <Box sx={{...additionalStyle}} onClick={() => {
                    setOpenCount(openCount + 1);
                    setShow(true)
                }}>
                    {/*<img src={image_uri ? image_uri :default_user_avatar} alt={`image`}/>*/}
                    {trigger}
                </Box>
                <Drawer sx={{display: `flex`, flexDirection: `column`, alignItems: `center`}} open={show}
                        anchor={`bottom`} onClose={() => setShow(false)}>
                    <Box sx={{
                        display: `flex`,
                        flexDirection: `row`,
                        alignItems: `center`,
                        justifyContent: `space-between`
                    }}>
                        <Typography variant={`h6`} sx={{m: 3}}>
                            {"Your Image Gallery"}
                        </Typography>
                        <Box>
                            <Button sx={{mx: 2}} variant={`contained`} color={`primary`} onClick={showPopOver}>
                                <Box sx={{mr: 1}}>
                                    <FontAwesomeIcon style={{color: '#fff'}} icon={faPlus}/>
                                </Box>
                                Add New image
                            </Button>
                            <Popover
                                id={id}
                                open={open}
                                anchorEl={anchorEl}
                                onClose={closePopOver}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                            >
                                <ImageUploader callback={(image_item) => {
                                    console.log("FILE UPLOAD CALLBACK: ",image_item);
                                    setListImage(listImage.concat(image_item));
                                }} additionalStyle={{justifySelf: `flex-end`, m: 5}}/>
                            </Popover>
                            <Button sx={{mx: 2}} variant={`contained`} color={`primary`} onClick={() => setShow(false)}>
                                <Box sx={{mr: 1}}>
                                    <FontAwesomeIcon style={{color: '#fff'}} icon={faBackspace}/>
                                </Box>
                                Close The Gallery
                            </Button>
                        </Box>
                    </Box>
                    <Box sx={{
                        display: `flex`,
                        flexDirection: `row`,
                        alignItems: `center`,
                        justifyContent: `space-between`
                    }}>
                        <Box sx={{ width: 500, minHeight: 829 }}>
                            <ImageList variant="masonry" cols={3} gap={8}>
                                {listImage.map((item) => (
                                    <ImageListItem key={item.img} onClick={() => {
                                        Toaster.toastSuccessful("Updated your avatar");
                                        if(img_uri_callback){
                                            img_uri_callback(item.img);
                                        }
                                        console.log(item.img);
                                    }}>
                                        <img
                                            src={`${item.img}?w=248&fit=crop&auto=format`}
                                            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                            alt={item.title}
                                            loading="lazy"
                                        />
                                    </ImageListItem>
                                ))}
                            </ImageList>
                        </Box>
                    </Box>
                    {/*<MyImageMasonry/>*/}
                </Drawer>
            </Box>
        </Box>
    );
};

export default ImageDrawerUpdater;
