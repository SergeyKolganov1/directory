import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { deleteOrganization, selectOrganizations } from '../features/organizations/organizationSlice';

const OrganizationList: React.FC = () => {
  const organizations = useSelector(selectOrganizations);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = (id: string) => {
    dispatch(deleteOrganization(id));
  };

  return (
    <div>
      <h1>Organizations</h1>
      <Button onClick={() => navigate('/add-organization')}>Add Organization</Button>
      <ul>
        {organizations.map(org => (
          <li key={org.id}>
            {org.name}
            <Button onClick={() => navigate(`/organizations/${org.id}`)}>View Employees</Button>
            <Button onClick={() => navigate(`/edit-organization/${org.id}`)}>Edit</Button>
            <Button onClick={() => handleDelete(org.id)}>Delete</Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrganizationList;
