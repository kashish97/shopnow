import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 800,
    marginBottom:"10px"
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  button: {
    margin: theme.spacing(1),
    textAlign: 'center',
  },
}));

export default function Card({item}) {
  const classes = useStyles();

  const present = true;

  const [occurence, setOccurence] = useState(
    1
  );

  const [quantity, setQuantity] = useState(
    item.quantityValue
  );

  const handlePlusClick = () => {
    setQuantity((quantity/occurence)*(occurence+1));
    setOccurence(occurence+1)
  }

  const handleMinusClick = () => {
    setQuantity((quantity/occurence)*(occurence-1));
    setOccurence(occurence-1);
}
  

  return (
    <div className={classes.root}>
      {occurence>0 ? <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} container>
            <Grid item xs={6} sm={6} md={8} xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="h6" style={{padding:10}}>
                {item.index +". "+item.name}
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">
              <IconButton aria-label="delete" onClick={handlePlusClick}>
                <AddIcon />
            </IconButton>
              
               <TextField id="newVal" 
               variant="outlined" 
               inputProps={{min: 0, style: { textAlign: 'center' }}}
               style={{width:60}} 
               defaultValue={parseFloat(item.occurence)? parseFloat(item.occurence):1}
               value={occurence}
              onChange={event => setOccurence(event.target.value)}
                />
            <IconButton aria-label="delete" onClick={handleMinusClick}>
               <RemoveIcon/>
            </IconButton>
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" style={{padding:13}}>
              {parseFloat(quantity) + " "+item.quantityUnit}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper> : null}
      
    </div>
  );
}
