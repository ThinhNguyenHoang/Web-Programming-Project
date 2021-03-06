import * as React from "react";
import {styled} from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import default_food_image from "../../assets/images/defaul_food_image.jpg";
import {ThemedOutlineButton} from "../Buttons/ThemedButton/ThemedButton";

import {useDispatch, useSelector} from "react-redux";
import {
    add_to_wish_list_actions,
    remove_from_wish_list_actions,
    selectors,
    set_food_detail_id,
    update_cart_actions
} from "../../redux/slices/food/FoodSlice";
import {ROUTING_CONSTANTS} from './../../routes/RouterConfig';
import {useHistory} from "react-router";

const ExpandMore = styled((props) => {
    const {expand, ...other} = props;
    return <IconButton {...other} />;
})(({theme, expand}) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest
    })
}));
// sx={{color:`${ isClicked ? 'primary.main' : 'grey.500'}`}}
const HeartIconButton = ({callback, is_in_wish_list = false}) => {
    // TODO: Remember to change the initial state to isClicked
    return <IconButton aria-label="add to favorites" onClick={() => {
        // // setClicked(!clicked);
        callback(is_in_wish_list);
        console.log("IN WISH LIST: ", is_in_wish_list)
    }
    }>
        {is_in_wish_list ? <FavoriteIcon color={`primary`}/> : <FavoriteIcon color={`grey:500`}/>
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
export default function FoodItemCard({food_item, mx, allow_expansion = true}, ...props) {
    const [expanded, setExpanded] = React.useState(false);
    const wish_list_ids = useSelector(selectors.getWishListFood).map(item => item.id);
    const is_in_wish_list = wish_list_ids.includes(food_item.id);
    const cart = useSelector(selectors.getCart);
    const dispatch = useDispatch();
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const history = useHistory();
    const handleAddTocart = () => {
        const newCart = {
            ComboList: cart.combo_list,
            FoodList: [...cart.food_list, {FoodID: food_item.id, Quantity: 1}]
        }
        dispatch({type: update_cart_actions.loading, payload: newCart})
    }
    const handleDetail = () => {
        // dispatch({type: set_food_detail_id, payload: food_item.id});
        history.push(ROUTING_CONSTANTS.FOODDETAIL+"/"+food_item.id);
    }


    return (
        <Card sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: 345,
            mx: mx ? mx : 0,
            bgcolor: `elevation.layer2.main`,
            boxShadow: 2
        }}>
            <CardMedia
                component="img"
                height="194"
                image={food_item.picture_uri ? food_item.picture_uri : default_food_image}
                alt={food_item.name ? food_item.name : "No food image info"}
            />
            <CardHeader
                sx={{color: 'elevation.layer2.contrast'}}
                action={
                    <HeartIconButton is_in_wish_list={is_in_wish_list} callback={(clicked) => {
                        const food_item_wishlist = {
                            FoodID: food_item.id,
                        }
                        console.log("OUTSIDE SEE CLICKED ON ITEM: ", food_item.id, clicked);
                        if (!is_in_wish_list) {
                            console.log("ADD TO WISHLIST UI");
                            dispatch({type: add_to_wish_list_actions.loading, payload: food_item_wishlist})
                        } else {
                            console.log("Remove from wishlist ui");
                            dispatch({type: remove_from_wish_list_actions.loading, payload: food_item.id_wish_list})
                        }
                    }
                    }/>
                }
                title={food_item.name ? food_item.name : "No food name info"}
                subheader={<Typography variant={`h5`} color={`primary.main`}>
                    {food_item.price ? `${food_item.price.substring(0, food_item.price.length - 3)} K` : `Not available`}
                </Typography>}
            />

            <CardContent>
                <Typography variant="body2" color="elevation.layer2.contrast" noWrap={true}>
                    {food_item.description ? food_item.description : "No food description"}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <ThemedOutlineButton onClick={handleAddTocart}>
                    ORDER NOW
                </ThemedOutlineButton>
                <ThemedOutlineButton onClick={handleDetail}>
                    DETAILS
                </ThemedOutlineButton>

                <Typography variant={`h5`} color={`primary.main`} sx={{display: {xs: `none`, sm: `none`}}}>
                    {food_item.price ? `${food_item.price} K` : `500K`}
                </Typography>
                {
                    allow_expansion && <ExpandMore
                        sx={{color: `elevation.layer2.contrast`}}
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon/>
                    </ExpandMore>

                }
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent sx={{color: 'elevation.layer2.contrast'}}>
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
                        chorizo in the pan. Add piment??n, bay leaves, garlic, tomatoes,
                        onion, salt and pepper, and cook, stirring often until thickened and
                        fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2
                        cups chicken broth; bring to a boil.
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}
