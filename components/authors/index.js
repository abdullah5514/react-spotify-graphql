import React from 'react';
import MUIDataTable from 'mui-datatables';
import { useQuery, gql } from '@apollo/client';
import { Box, Typography } from '@mui/material';

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
  filterType: 'checkbox',
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
