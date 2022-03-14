import React, { useEffect } from 'react';
import { Box, Grid, Button, FormHelperText } from '@mui/material';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useQuery, gql, useMutation } from '@apollo/client';
import BounceLoader from 'react-spinners/BounceLoader';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import TextFormField from '../textFormField';
import Loader from '../loader';

const QUERY_ALL_AUTHORS = gql`
  query Authors {
    authors {
      id
      firstName
      surName
    }
  }
`;

const ADD_BOOK = gql`
  mutation CreateBook(
    $title: String!
    $genre: String!
    $publishYear: String!
    $authorId: ID!
  ) {
    createBook(
      input: {
        title: $title
        genre: $genre
        publishYear: $publishYear
        authorId: $authorId
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
  const { data: authorsData, loading: authorsLoading } =
    useQuery(QUERY_ALL_AUTHORS);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (!loading && data) {
      reset();
      handleClose();
    }
  }, [loading, data, reset, handleClose]);

  const onSubmit = (data) => {
    addBook({ variables: { ...data } });
  };

  if (authorsLoading) {
    return <Loader />;
  }

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
          type='number'
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
        <Grid item sx={{ margin: 1 }}>
          <FormControl fullWidth>
            <InputLabel id='authorId'>Author</InputLabel>
            <Select
              required
              error={errors?.authorId?.message ? true : false}
              disabled={loading}
              labelId='authorId'
              id='authorId'
              label='Author'
              {...register('authorId', {
                required: {
                  value: true,
                  message: 'Author is required',
                },
              })}
            >
              {authorsData.authors.map((author, idx) => {
                return (
                  <MenuItem key={author.id} value={author.id}>
                    {author.firsName} {author.surName}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          {errors?.authorId?.message && (
            <FormHelperText error>{errors?.authorId?.message}</FormHelperText>
          )}
        </Grid>
        {error && (
          <Grid
            container
            direction={'row'}
            sx={{ paddingLeft: 1, paddingRight: 1 }}
          >
            <FormHelperText error>
              Something went wrong. Please try again later.
            </FormHelperText>
          </Grid>
        )}
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
