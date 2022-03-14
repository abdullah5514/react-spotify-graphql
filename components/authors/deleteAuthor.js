import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import Swal from 'sweetalert2';
import { gql, useMutation } from '@apollo/client';

const DELETE_AUTHOR = gql`
  mutation DestroyAuthor($authorId: ID!) {
    destroyAuthor(input: { id: $authorId }) {
      id
    }
  }
`;

const DeleteAuthor = ({ authorId, authorName, setIsDeleted }) => {
  const [deleteAuthor, {}] = useMutation(DELETE_AUTHOR);

  const onDelete = () => {
    Swal.fire({
      title: `Are you sure to delete ${authorName}?`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
      showLoaderOnConfirm: true,
      preConfirm: (data) => {
        return deleteAuthor({ variables: { authorId } });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Deleted!', 'The author has been deleted.', 'success');
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

export default DeleteAuthor;

DeleteAuthor.propTypes = {
  authorName: PropTypes.string,
  authorId: PropTypes.string,
  setIsDeleted: PropTypes.func,
};

DeleteAuthor.defaultProps = {
  authorName: '',
  authorId: '',
  setIsDeleted: () =>
    console.warn('setIsDeleted function is required in delete author'),
};
