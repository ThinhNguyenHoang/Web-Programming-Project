import * as React from "react";
import Box from "@mui/material/Box";
import {ImageList, ImageListItem} from "@mui/material";
import {useSelector} from "react-redux";
import {selectors} from "../../redux/slices/auth/AuthSlice";
import { getStorage, ref, listAll,getDownloadURL } from "firebase/storage";
import {storage} from "../../utils/UploadFile/FileUploader";
import {useEffect, useState} from "react";

//
// const Label = styled(Paper)(({ theme }) => ({
//     ...theme.typography.body2,
//     color: theme.palette.text.secondary,
//     border: '1px solid black',
//     borderBottomLeftRadius: 0,
//     borderBottomRightRadius: 0,
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
// }));

const itemData = [
    {
        img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
        title: 'Fern',
    },
    {
        img: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f',
        title: 'Snacks',
    },
    {
        img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
        title: 'Mushrooms',
    },
    {
        img: 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383',
        title: 'Tower',
    },
    {
        img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
        title: 'Sea star',
    },
    {
        img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
        title: 'Honey',
    },
    {
        img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
        title: 'Basketball',
    },
    {
        img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        title: 'Breakfast',
    },
    {
        img: 'https://images.unsplash.com/photo-1627328715728-7bcc1b5db87d',
        title: 'Tree',
    },
    {
        img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
        title: 'Burger',
    },
    {
        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        title: 'Camera',
    },
    {
        img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
        title: 'Coffee',
    },
    {
        img: 'https://images.unsplash.com/photo-1627000086207-76eabf23aa2e',
        title: 'Camping Car',
    },
    {
        img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
        title: 'Hats',
    },
    {
        img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
        title: 'Tomato basil',
    },
    {
        img: 'https://images.unsplash.com/photo-1627328561499-a3584d4ee4f7',
        title: 'Mountain',
    },
    {
        img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
        title: 'Bike',
    },
];

/*
    TODO: WRITE CODE TO APEND IMAGE TO MASONRY AND DISPLAY
 */
const MyImageMasonry = () => {
    const currentUserName = useSelector(selectors.getUserName);
    const listRef = ref(storage,`images/${currentUserName?currentUserName:"default_user"}`)
    const [listImage, setListImage] = useState([]);
    useEffect(() => {
        listAll(listRef)
            .then((res) => {
                res.prefixes.forEach((folderRef) => {
                    // All the prefixes under listRef.
                    // You may call listAll() recursively on them.
                    console.log(folderRef);
                });
                res.items.forEach((itemRef) => {
                    // All the items under listRef.
                    getDownloadURL(itemRef)
                        .then((url) =>{
                            console.log("IMAGE URL LOADED FROM FIREBSE IS: ",url)
                            const image_item = {
                                img: url,
                                title: "Firebase Loaded Image"
                            }
                            setListImage(listImage.concat(image_item));
                        })
                        .catch((err) => {
                            console.log("ERROR LOADIGN IAMGE FROM FIREBASE",err.message())
                        })

                    console.log(itemRef);
                });
            }).catch((error) => {
            // Uh-oh, an error occurred!
            console.log("ERROR GETTING FILE LIST FROM FIREBASE FOR REF:",listRef.name)
        });

        return () => {

        };
    }, []);


    return (
        <Box sx={{ width: 500, minHeight: 829 }}>
            <ImageList variant="masonry" cols={3} gap={8}>
                {listImage.map((item) => (
                    <ImageListItem key={item.img} onClick={() => {
                        console.log(item.title);
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
    );
};

export default MyImageMasonry;
