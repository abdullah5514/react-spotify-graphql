import React from 'react';
import PropTypes from 'prop-types';
import { Grid, TextField } from '@mui/material';

const TextFormField = ({ name, label, type, shrink, helperText, register }) => {
  return (
    <Grid item sx={{ margin: 1 }}>
      <TextField
        required
        id={name}
        name={name}
        label={label}
        type={type}
        fullWidth
        margin='dense'
        InputLabelProps={shrink ? { shrink: true } : {}}
        helperText={helperText}
        FormHelperTextProps={{ hidden: !helperText }}
        error={helperText ? true : false}
        {...register}
      />
    </Grid>
  );
};

export default TextFormField;

TextFormField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  helperText: PropTypes.string,
  shrink: PropTypes.bool,
  register: PropTypes.object,
};

TextFormField.defaultProps = {
  name: '',
  label: '',
  type: '',
  helperText: null,
  shrink: false,
  register: {},
};
