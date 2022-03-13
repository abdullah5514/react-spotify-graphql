import React from 'react';
import { Backdrop, Box, Modal, Fade } from '@mui/material';
import PropTypes from 'prop-types';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  border: '2px solid #1976d2',
  boxShadow: 24,
  borderRadius: 3,
  p: 4,
};

const TransitionModal = ({ open, handleClose, children }) => {
  const onModalClose = (event, reason) => {
    if (reason === 'backdropClick') {
      return;
    }
    handleClose();
  };

  return (
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      open={open}
      onClose={onModalClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <>{children}</>
        </Box>
      </Fade>
    </Modal>
  );
};

export default TransitionModal;

TransitionModal.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};

TransitionModal.defaultProps = {
  open: false,
  handleClose: () =>
    console.warn('handle close function is required in TransitionModal'),
};
