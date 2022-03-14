import React, { useEffect } from 'react';
import MUIDataTable from 'mui-datatables';
import { useQuery, gql } from '@apollo/client';
import { Box, Typography, Button } from '@mui/material';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';

import Loader from '../loader';

const columns = [
  {
    name: 'title',
    label: 'Title',
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: 'publishYear',
    label: 'Publish Year',
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: 'genre',
    label: 'Genre',
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: 'Action',
    options: {
      customBodyRender: (value, tableMeta, updateValue) => {
        console.log('tableMeta: ', tableMeta);
        return (
          <Button
            variant='outlined'
            color='error'
            onClick={() => {
              Swal.fire({
                title: 'Are you sure to delete this book?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
                reverseButtons: true,
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                  );
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                  Swal.fire(
                    'Cancelled',
                    'Your imaginary file is safe :)',
                    'error'
                  );
                }
              });
            }}
          >
            Delete
          </Button>
        );
      },
    },
  },
];

const QUERY = gql`
  query Books {
    books {
      id
      title
      publishYear
      genre
    }
  }
`;

const options = {
  selectableRows: false,
};

const AllBooks = ({ open }) => {
  const { data, loading, error, refetch } = useQuery(QUERY);

  useEffect(() => {
    if (!open) {
      refetch();
    }
  }, [open, refetch]);

  if (loading) {
    return <Loader />;
  }
  if (error) {
    console.error(error);
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography> Something went wrong. Please try again later.</Typography>
      </Box>
    );
  }

  return (
    <MUIDataTable
      title={'Books List'}
      data={data.books}
      columns={columns}
      options={options}
    />
  );
};

export default AllBooks;

AllBooks.propTypes = {
  open: PropTypes.bool,
};

AllBooks.defaultProps = {
  open: false,
};
