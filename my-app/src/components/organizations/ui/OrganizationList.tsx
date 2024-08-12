import React, { useState } from 'react';
import { Button, Modal, Box, Typography } from '@mui/material';
import OrganizationsTable from './OrganizationsTable';
import OrganizationForm from './OrganizationForm';
import { Organization } from '../model/Organization';

const OrganizationList: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [currentOrganization, setCurrentOrganization] = useState<Organization | null>(null);

  const handleOpen = () => {
    setCurrentOrganization(null);
    setOpen(true);
  };

  const handleEdit = (organization: Organization) => {
    setCurrentOrganization(organization);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentOrganization(null);
  };

  return (
    <Box sx={{ textAlign: 'center', padding: '20px' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Organizations
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleOpen} 
        sx={{ marginBottom: '20px' }}
      >
        Add organization
      </Button>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ width: '66%' }}>
          <OrganizationsTable onEdit={handleEdit} />
        </Box>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="add-organization-modal-title"
        aria-describedby="add-organization-modal-description"
      >
        <Box sx={{ ...modalStyle }}>
          <Typography id="add-organization-modal-title" variant="h6" component="h2">
            {currentOrganization ? 'Edit Organization' : 'Add Organization'}
          </Typography>
          <OrganizationForm onClose={handleClose} initialOrganization={currentOrganization} />
        </Box>
      </Modal>
    </Box>
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
