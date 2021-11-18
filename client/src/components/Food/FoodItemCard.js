import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {generateStatus} from "../../utils/reduxGenerate";
import default_food_image from "../../assets/images/defaul_food_image.jpg";
import {Button} from "@mui/material";
import {useState} from "react";
import {ThemedOutlineButton} from "../Buttons/ThemedButton/ThemedButton";

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest
    })
}));
// sx={{color:`${ isClicked ? 'primary.main' : 'grey.500'}`}}
const HeartIconButton = ({isClicked}) =>{
    // TODO: Remember to change the initial state to isClicked
    const [clicked, setClicked] = useState(false);
    return <IconButton aria-label="add to favorites" onClick={() => {
            console.log("CLICKED IS: ",clicked)
            setClicked(!clicked);
        }
    }>
        {clicked ? <FavoriteIcon  color={`primary`}/> : <FavoriteIcon color={`grey:500`}/>
        }
    </IconButton>
}
// ? Food Item Schema
// const food_item = {
//     id: "",
//     name: "",
//     picture_uri: "",
//     price: "",
//     description: "",
//     status: generateStatus(),
//     sale_value: "",
//     instruct: "",
//     tags: [],
//     material: []
// }
export default function FoodItemCard({food_item,mx},...props) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card sx={{ maxWidth: 345, mb:6,mx:mx? mx:0}} >
            <CardMedia
                component="img"
                height="194"
                image={food_item.picture_uri ? food_item.picture_uri : default_food_image}
                alt={food_item.name ? food_item.name : "No food image info"}
            />
            <CardHeader
                action={
                    <HeartIconButton/>
                }
                title={food_item.name ? food_item.name : "No food name info"}
                subheader="Available"
            />

            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {food_item.description ? food_item.description : "No food description"}
                </Typography>
            </CardContent>
            <CardActions >
                <ThemedOutlineButton>
                    ORDER NOW
                </ThemedOutlineButton>
                <ThemedOutlineButton >
                    DETAILS
                </ThemedOutlineButton>
                {/*<Button variant={`outlined`}>*/}
                {/*    ORDER NOW*/}
                {/*</Button>*/}
                {/*<Button variant={`outlined`}>*/}
                {/*    DETAILS*/}
                {/*</Button>*/}
                <Typography variant={`h5`}>
                    {food_item.price ? `${food_item.price} K` : `Not available`}
                </Typography>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>Method:</Typography>
                    <Typography paragraph>
                        Heat 1/2 cup of the broth in a pot until simmering, add saffron and
                        set aside for 10 minutes.
                    </Typography>
                    <Typography paragraph>
                        Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
                        over medium-high heat. Add chicken, shrimp and chorizo, and cook,
                        stirring occasionally until lightly browned, 6 to 8 minutes.
                        Transfer shrimp to a large plate and set aside, leaving chicken and
                        chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes,
                        onion, salt and pepper, and cook, stirring often until thickened and
                        fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2
                        cups chicken broth; bring to a boil.
                    </Typography>
                    <Typography paragraph>
                        Add rice and stir very gently to distribute. Top with artichokes and
                        peppers, and cook without stirring, until most of the liquid is
                        absorbed, 15 to 18 minutes. Reduce heat to medium-low, add reserved
                        shrimp and mussels, tucking them down into the rice, and cook again
                        without stirring, until mussels have opened and rice is just tender,
                        5 to 7 minutes more. (Discard any mussels that don’t open.)
                    </Typography>
                    <Typography>
                        Set aside off of the heat to let rest for 10 minutes, and then
                        serve.
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}
