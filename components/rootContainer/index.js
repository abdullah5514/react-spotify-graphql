import React from 'react';
import PropTypes from 'prop-types';
import { Box, Container } from '@mui/material';

import NavBar from '../navbar';

const RootContainer = ({ children }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <NavBar />
      <Container maxWidth={'xl'} sx={{ marginTop: 10 }}>
        {children}
      </Container>
    </Box>
  );
};

export default RootContainer;

RootContainer.propTypes = {
  children: PropTypes.elementType.isRequired,
};
