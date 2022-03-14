import React from 'react';
import MUIDataTable from 'mui-datatables';
import { useQuery, gql } from '@apollo/client';
import { Box, Typography, Button } from '@mui/material';
import Swal from 'sweetalert2';

import Loader from '../loader';

const columns = [
  {
    name: 'name',
    label: 'Name',
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: 'code',
    label: 'Code',
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: 'emoji',
    label: 'Flag',
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
  query Countries {
    countries {
      code
      name
      emoji
    }
  }
`;

const options = {
  selectableRows: false,
};

const AllAuthors = () => {
  const { data, loading, error } = useQuery(QUERY);

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
      data={data.countries}
      columns={columns}
      options={options}
    />
  );
};

export default AllAuthors;
