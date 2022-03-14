import React, { useEffect } from 'react';
import MUIDataTable from 'mui-datatables';
import { useQuery, gql } from '@apollo/client';
import { Box, Typography, Button } from '@mui/material';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';

import Loader from '../loader';

const columns = [
  {
    name: 'firstName',
    label: 'First Name',
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: 'surName',
    label: 'Sur Name',
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: 'birthYear',
    label: 'Birth Year',
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
  query Authors {
    authors {
      id
      firstName
      surName
      birthYear
    }
  }
`;

const options = {
  selectableRows: false,
};

const AllAuthors = ({ open }) => {
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
      title={'Authors List'}
      data={data.authors}
      columns={columns}
      options={options}
    />
  );
};

export default AllAuthors;

AllAuthors.propTypes = {
  open: PropTypes.bool,
};

AllAuthors.defaultProps = {
  open: false,
};
