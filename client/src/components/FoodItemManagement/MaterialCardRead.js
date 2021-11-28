import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function MaterialCardRead(props) {
  
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
    </Card>
  );
}
