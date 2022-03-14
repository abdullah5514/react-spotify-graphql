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

const ADD_AUTHOR = gql`
  mutation {
    createAuthor(
      input: { firstName: "Spider man", surName: "Action", birthYear: "2018" }
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
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log('Data: ', data);
    console.log('Data, with Spread Operator: ', { ...data });
    console.log('Data, with Spread Operator & variables: ', {
      variables: { ...data },
    });

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
          type='date'
          shrink={true}
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
