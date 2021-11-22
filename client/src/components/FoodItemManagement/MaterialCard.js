import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function MaterialCard(props) {
  return (
    <Card sx={{ maxWidth: 150 }}>
      <CardMedia
        component="img"
        height="140"
        image={props.image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={{textAlign:"center"}}>
          {props.name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">DELETE</Button>
      </CardActions>
    </Card>
  );
}
