import React from 'react';
import { Box, Grid, Button } from '@mui/material';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { gql, useMutation } from '@apollo/client';
import BounceLoader from 'react-spinners/BounceLoader';

import TextFormField from '../textFormField';

const ADD_TODO = gql`
  mutation AddTodo($text: String!) {
    addTodo(text: $text) {
      id
      text
    }
  }
`;

const ADD_BOOK = gql`
  mutation {
    createBook(
      input: {
        title: "Spider man"
        genre: "Action"
        publishYear: "2018"
        authorId: 2
      }
    ) {
      book {
        id
        title
        genre
        publishYear
      }
      errors
    }
  }
`;

const BookForm = ({ handleClose }) => {
  const [addBook, { data, loading, error }] = useMutation(ADD_BOOK);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log('Data: ', data);
    console.log('Data, with Spread Operator: ', { ...data });
    console.log('Data, with Spread Operator & variables: ', {
      variables: { ...data },
    });

    addBook({ variables: { ...data } });
  };

  return (
    <Box>
      <form>
        <TextFormField
          name='title'
          label='Title'
          type='text'
          helperText={errors?.title?.message}
          disabled={loading}
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
          disabled={loading}
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
          disabled={loading}
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
          disabled={loading}
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
              disabled={loading}
              variant='contained'
              color='primary'
              onClick={handleSubmit(onSubmit)}
              sx={{ marginLeft: 2 }}
            >
              Save{' '}
              {loading && (
                <BounceLoader color={'#2E86C1'} loading={true} size={20} />
              )}
            </Button>
            <Button
              disabled={loading}
              variant='outlined'
              color='error'
              onClick={handleClose}
            >
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
