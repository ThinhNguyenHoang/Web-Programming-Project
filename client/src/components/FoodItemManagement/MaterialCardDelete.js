import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { delete_material } from '../../redux/slices/food/FoodSlice';
import { useDispatch } from 'react-redux';
import DeleteIcon from '@mui/icons-material/AddCircle';

export default function MaterialCardDelete(props) {
  
  return (
    <Card sx={{ width: 130, maxWidth:200 , minWidth: 200}}>
      <CardMedia
        component="img"
        height="140px"
        image={props.material.Picture}
      />
      <CardContent sx={{bgcolor:'elevation.layer1.main', color: 'elevation.layer1.contrast'}}>
        <Typography gutterBottom variant="h5" component="div" sx={{textAlign:"center"}}>
          {props.material.MaterialName}
        </Typography>
      </CardContent>
      <CardActions sx={{bgcolor:'elevation.layer1.main', justifyContent:"center"}}>
        <IconButton aria-label="delete" size="small" sx={{color:'button.outlined.main'}} 
          onClick={()=>props.setDeleteClick(props.material)}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </CardActions>
    </Card>
  );
}
