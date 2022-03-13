import React from 'react';
import { Box, Grid, Button } from '@mui/material';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import TextFormField from '../textFormField';

const BookForm = ({ handleClose }) => {
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
          name='title'
          label='Title'
          type='text'
          helperText={errors?.title?.message}
          register={{
            ...register('title', {
              required: {
                value: true,
                message: 'Title is required',
              },
              minLength: {
                value: 2,
                message: 'Title is invalid',
              },
            }),
          }}
        />
        <TextFormField
          name='publishYear'
          label='Publish Year'
          type='date'
          shrink={true}
          helperText={errors?.publishYear?.message}
          register={{
            ...register('publishYear', {
              required: {
                value: true,
                message: 'Publish Year is required',
              },
            }),
          }}
        />
        <TextFormField
          name='genre'
          label='Genre'
          type='text'
          helperText={errors?.genre?.message}
          register={{
            ...register('genre', {
              required: {
                value: true,
                message: 'Genre is required',
              },
            }),
          }}
        />
        <TextFormField
          name='author'
          label='Author'
          type='text'
          helperText={errors?.author?.message}
          register={{
            ...register('author', {
              required: {
                value: true,
                message: 'Author is required',
              },
            }),
          }}
        />
        <Grid container direction={'row-reverse'} sx={{ margin: 1 }}>
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

export default BookForm;

BookForm.propTypes = {
  handleClose: PropTypes.func,
};

BookForm.defaultProps = {
  handleClose: () =>
    console.warn('handle close function is required in BookForm'),
};
