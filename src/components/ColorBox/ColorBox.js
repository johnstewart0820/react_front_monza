import React, {useState, useEffect} from 'react';

import { makeStyles } from '@material-ui/styles';
import { SwatchesPicker } from 'react-color';

const useStyles = makeStyles(theme => ({
  color_box: {
    width: '100%',
    height: '38px',
    marginTop: '12px'
  },
  swatches_picker: {
    position: 'absolute'
  }
}));

const ColorBox = props => {
  const { name, value, handleChange } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <div className={classes.color_box} style={{backgroundColor: value}} onClick={() => setOpen(!open)}/>
      {open && <SwatchesPicker className={classes.swatches_picker} value={value} onChange={ (e) => {handleChange(name, e.hex)} } />}
    </React.Fragment>
  );
};

export default ColorBox;
