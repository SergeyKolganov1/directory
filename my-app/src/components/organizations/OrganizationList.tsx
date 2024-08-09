import React, { useState } from 'react';
import { Button, Modal, Box, Typography } from '@mui/material';
import OrganizationsTable from './OrganizationsTable';
import OrganizationForm from './OrganizationForm';

const OrganizationList: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <h1>Organizations</h1>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add organization
      </Button>
      <OrganizationsTable />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="add-organization-modal-title"
        aria-describedby="add-organization-modal-description"
      >
        <Box sx={{ ...modalStyle }}>
          <Typography id="add-organization-modal-title" variant="h6" component="h2">
            Add Organization
          </Typography>
          <OrganizationForm onClose={handleClose} />
        </Box>
      </Modal>
    </div>
  );
};

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default OrganizationList;
