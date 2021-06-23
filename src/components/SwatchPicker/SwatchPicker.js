import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/styles';
import { SwatchesPicker } from 'react-color';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  color_box: {
    position: 'absolute',
    width: '180px',
    backgroundColor: 'white',
    border: '1px solid gray',
  },
  title: {
    fontFamily: 'roboto',
    fontSize: '0.7em'
  },
  main_title: {
    fontFamily: 'roboto',
    fontSize: '1.2em',
    
  }
}));

const SwatchPicker = props => {
  const { handleChange } = props;
  const classes = useStyles();
  const [colorList, setColorList] = useState([
    { name: 'KOLORY PODSTAWOWE', colors: ['#44D62C', '#000000'] },
    { name: 'KOLORY UZUPEŁNIAJĄCE 1', colors: ['#0085CA', '#7FC2E4', '#EF3340', '#E7999F', '#963CBD', '#CA9DCE', '#A1EA95', '#FF0098', '#FF7FCB', '#808080', '#008578', '#7FC2BB'] },
    { name: 'KOLORY UZUPEŁNIAJĄCE 2', colors: ['#FFD700', '#E1EB7F', '#D0DF00', '#E1EF7F'] },
  ])

  return (
    <React.Fragment>
      <Grid container spacing={2} className={classes.color_box}>
        <Grid item xs={12} className={classes.main_title}>Wybierz kolor</Grid>
        {
          colorList.map((item, index_1) => (
            <>
              <Grid item xs={12} className={classes.title}>
                {item.name}
              </Grid>
              {
                item.colors.map((color_item, index_2) => (
                  <Grid item xs={3} style={{ height: '40px', backgroundColor: color_item, border: '5px solid white' }} onClick={() => handleChange(colorList[index_1].colors[index_2])} />
                ))
              }
            </>
          ))
        }
      </Grid>
    </React.Fragment>
  );
};

export default SwatchPicker;
