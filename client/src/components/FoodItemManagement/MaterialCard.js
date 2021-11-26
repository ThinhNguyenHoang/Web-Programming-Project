import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { delete_material } from '../../redux/slices/Food/FoodSlice';
import { useDispatch } from 'react-redux';
import defaulut_material from "../../assets/images/defalut_material.jpg";

export default function MaterialCard(props) {
  const dispatch = useDispatch();
  return (
    <Card sx={{ width: 130, maxWidth:200 , minWidth: 200}}>
      <CardMedia
        component="img"
        height="140px"
        image={props.image ? props.image : defaulut_material}
      />
      <CardContent sx={{bgcolor:'elevation.layer1.main', color: 'elevation.layer1.contrast'}}>
        <Typography gutterBottom variant="h5" component="div" sx={{textAlign:"center"}}>
          {props.name}
        </Typography>
      </CardContent>
      <CardActions sx={{bgcolor:'elevation.layer1.main', justifyContent:"center"}}>
        <IconButton aria-label="delete" size="small" sx={{color:'button.outlined.main'}} onClick={()=>dispatch({type:delete_material.loading,payload:props.id})}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </CardActions>
    </Card>
  );
}
