import React from 'react';
import { Box, Grid, Button } from '@mui/material';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import TextFormField from '../textFormField';

const AuthorForm = ({ handleClose }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log('Book Form Data: ', data);

  return (
    <Box>
      <form>
        <TextFormField
          name='firstName'
          label='First Name'
          type='text'
          helperText={errors?.firstName?.message}
          register={{
            ...register('firstName', {
              required: {
                value: true,
                message: 'First Name is required',
              },
              minLength: {
                value: 2,
                message: 'First Name is invalid',
              },
            }),
          }}
        />
        <TextFormField
          name='surName'
          label='Sur Name'
          type='text'
          helperText={errors?.surName?.message}
          register={{
            ...register('surName', {
              required: {
                value: true,
                message: 'Sur Name is required',
              },
              minLength: {
                value: 2,
                message: 'Sur Name is invalid',
              },
            }),
          }}
        />
        <TextFormField
          name='birthYear'
          label='Birth Year'
          type='date'
          shrink={true}
          helperText={errors?.birthYear?.message}
          register={{
            ...register('birthYear', {
              required: {
                value: true,
                message: 'Birth Year is required',
              },
            }),
          }}
        />
        <Grid
          container
          direction={'row-reverse'}
          sx={{ paddingLeft: 1, paddingRight: 1 }}
        >
          <>
            <Button
              variant='contained'
              color='primary'
              onClick={handleSubmit(onSubmit)}
              sx={{ marginLeft: 2 }}
            >
              Save
            </Button>
            <Button variant='outlined' color='error' onClick={handleClose}>
              Close
            </Button>
          </>
        </Grid>
      </form>
    </Box>
  );
};

export default AuthorForm;

AuthorForm.propTypes = {
  handleClose: PropTypes.func,
};

AuthorForm.defaultProps = {
  handleClose: () =>
    console.warn('handle close function is required in AuthorForm'),
};
