import React, { useEffect, useState } from 'react';
import MUIDataTable from 'mui-datatables';
import { useQuery, gql } from '@apollo/client';
import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

import Loader from '../loader';
import DeleteBook from './deleteBook';

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
  const columns = [
    {
      name: 'id',
      label: 'Id',
      options: {
        display: false,
      },
    },
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
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          const bookName = tableMeta.rowData[1];
          const bookId = tableMeta.rowData[0];
          return (
            <DeleteBook
              bookName={bookName}
              bookId={bookId}
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
