import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import OrganizationsTable from './OrganizationsTable';

const OrganizationList: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Organizations</h1>
      <Button variant="contained" color="primary" onClick={() => navigate('/add-organization')}>
        Add Organization
      </Button>
      <OrganizationsTable />
    </div>
  );
};

export default OrganizationList;