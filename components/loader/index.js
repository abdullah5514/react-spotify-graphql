import React from 'react';
import { Box } from '@mui/material';
import BounceLoader from 'react-spinners/BounceLoader';

const Loader = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: { xs: 'column', md: 'row' },
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <BounceLoader color={'#2E86C1'} loading={true} size={70} />
  </Box>
);

export default Loader;
