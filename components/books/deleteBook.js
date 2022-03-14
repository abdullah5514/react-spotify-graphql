import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import Swal from 'sweetalert2';
import { gql, useMutation } from '@apollo/client';

const DELETE_BOOK = gql`
  mutation DestroyBook($bookId: ID!) {
    destroyBook(input: { id: $bookId }) {
      id
    }
  }
`;

const DeleteBook = ({ bookId, bookName, setIsDeleted }) => {
  const [deleteBook, {}] = useMutation(DELETE_BOOK);

  const onDelete = () => {
    Swal.fire({
      title: `Are you sure to delete ${bookName}?`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
      showLoaderOnConfirm: true,
      preConfirm: (data) => {
        return deleteBook({ variables: { bookId } });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Deleted!', 'The book has been deleted.', 'success');
        setIsDeleted(true);
      }
    });
  };

  return (
    <Button variant='outlined' color='error' onClick={onDelete}>
      Delete
    </Button>
  );
};

export default DeleteBook;

DeleteBook.propTypes = {
  bookName: PropTypes.string,
  bookId: PropTypes.string,
  setIsDeleted: PropTypes.func,
};

DeleteBook.defaultProps = {
  bookName: '',
  bookId: '',
  setIsDeleted: () =>
    console.warn('setIsDeleted function is required in delete book'),
};
