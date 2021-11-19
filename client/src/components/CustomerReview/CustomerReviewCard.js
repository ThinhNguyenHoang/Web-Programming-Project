import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {ThemedOutlineButton} from "../Buttons/ThemedButton/ThemedButton";
import default_avatar from "../../assets/images/user_default.jpg"

const init_review = {
    id: "1",
    name: "Guess",
    food_name :"Com Suon",
    role: "CUSTOMER",
    description: "                    This impressive paella is a perfect party dish and a fun meal to cook\n" +
        "                    together with your guests. Add 1 cup of frozen peas along with the mussels,\n" +
        "                    if you like.",
    user_avatar: default_avatar,
}

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

export default function CustomerReviewCard({review_passed,mx} ,...props) {
    const review = review_passed ? review_passed : init_review;
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card sx={{ maxWidth: 345,mx:mx? mx:0,bgcolor:`elevation.layer2.main`,color:'elevation.layer2.contrast' }}>
            <CardHeader
                sx={{color:`elevation.layer2.contrast`}}
                avatar={
                    <Avatar src={review.user_avatar ? review.user_avatar : default_avatar} sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {review.name ? review.name : "Guess"}
                    </Avatar>
                }
                title={<Typography>{review.name ? review.name : "Guess"}</Typography>}
                subheader={<Typography color={`primary.main`}>{`Customer`}</Typography>}
            />
            <CardContent>
                <Typography>{review.food_name ? review.food_name : "Main Dish"}</Typography>
            </CardContent>
            {!expanded &&
                <CardContent>
                    {<Typography variant="body2" color="elevation.layer2.contrast" noWrap={true}>
                        {review.description ? review.description : "No description info right now"}
                    </Typography>}
                </CardContent>
            }
            <CardActions disableSpacing>
                <ExpandMore
                    sx={{justifySelf:`flex-end`,color:`elevation.layer2.contrast`}}
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent  sx={{color:'elevation.layer2.contrast'}}>
                    <Typography paragraph >
                        {review.description ? review.description : "No description info right now"}
                    </Typography>
                </CardContent>
            </Collapse>
            {/*<CardActions disableSpacing>*/}
            {/*    <IconButton aria-label="add to favorites">*/}
            {/*        <FavoriteIcon />*/}
            {/*    </IconButton>*/}
            {/*    <ThemedOutlineButton>*/}
            {/*        Order same disk*/}
            {/*    </ThemedOutlineButton>*/}
            {/*</CardActions>*/}
        </Card>
    );
}
