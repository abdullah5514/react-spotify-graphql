import React, { useEffect, useState } from 'react';
import MUIDataTable from 'mui-datatables';
import { useQuery, gql } from '@apollo/client';
import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

import Loader from '../loader';
import DeleteAuthor from './deleteAuthor';

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
  const columns = [
    {
      name: 'id',
      label: 'Id',
      options: {
        display: false,
      },
    },
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
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          const authorName = tableMeta.rowData[1];
          const authorId = tableMeta.rowData[0];
          return (
            <DeleteAuthor
              authorId={authorId}
              authorName={authorName}
              setIsDeleted={setIsDeleted}
            />
          );
        },
      },
    },
  ];

  const { data, loading, error, refetch } = useQuery(QUERY);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    if (!open) {
      refetch();
    }
    if (isDeleted) {
      setIsDeleted(false);
      refetch();
    }
  }, [open, refetch, isDeleted]);

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
