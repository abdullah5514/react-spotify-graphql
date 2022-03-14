import React, { useState } from 'react';
import { Button } from '@mui/material';

import {
  RootContainer,
  TransitionModal,
  BookForm,
  ClientOnly,
  AllBooks,
} from '../components';

const Home = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <RootContainer>
      <>
        <Button variant='outlined' color='primary' onClick={handleOpen}>
          Create Book
        </Button>
        <ClientOnly>
          <AllBooks open={open} />
        </ClientOnly>
        <TransitionModal open={open} handleClose={handleClose}>
          <BookForm handleClose={handleClose} />
        </TransitionModal>
      </>
    </RootContainer>
  );
};

export default Home;
