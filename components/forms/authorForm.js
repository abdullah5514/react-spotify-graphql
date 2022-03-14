import React, { useEffect } from 'react';
import { Box, Grid, Button, FormHelperText } from '@mui/material';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { gql, useMutation } from '@apollo/client';
import BounceLoader from 'react-spinners/BounceLoader';

import TextFormField from '../textFormField';

const ADD_AUTHOR = gql`
  mutation CreateAuthor(
    $firstName: String!
    $surName: String!
    $birthYear: String!
  ) {
    createAuthor(
      input: { firstName: $firstName, surName: $surName, birthYear: $birthYear }
    ) {
      author {
        id
        firstName
        surName
        birthYear
      }
      errors
    }
  }
`;

const AuthorForm = ({ handleClose }) => {
  const [addAuthor, { data, loading, error }] = useMutation(ADD_AUTHOR);

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
    addAuthor({ variables: { ...data } });
  };

  return (
    <Box>
      <form>
        <TextFormField
          name='firstName'
          label='First Name'
          type='text'
          helperText={errors?.firstName?.message}
          disabled={loading}
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
          disabled={loading}
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
          type='number'
          helperText={errors?.birthYear?.message}
          disabled={loading}
          register={{
            ...register('birthYear', {
              required: {
                value: true,
                message: 'Birth Year is required',
              },
            }),
          }}
        />
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
        <Grid
          container
          direction={'row-reverse'}
          sx={{ paddingLeft: 1, paddingRight: 1 }}
        >
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

export default AuthorForm;

AuthorForm.propTypes = {
  handleClose: PropTypes.func,
};

AuthorForm.defaultProps = {
  handleClose: () =>
    console.warn('handle close function is required in AuthorForm'),
};
