import React, { useState } from 'react';
import { Button } from '@mui/material';

import {
  RootContainer,
  TransitionModal,
  AuthorForm,
  ClientOnly,
  AllAuthors,
} from '../components';

const Authors = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <RootContainer>
      <>
        <Button variant='outlined' color='primary' onClick={handleOpen}>
          Create Author
        </Button>
        <ClientOnly>
          <AllAuthors />
        </ClientOnly>
        <TransitionModal open={open} handleClose={handleClose}>
          <AuthorForm handleClose={handleClose} />
        </TransitionModal>
      </>
    </RootContainer>
  );
};

export default Authors;
