import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectOrganizations, deleteOrganization } from '../../../features/organizations/organizationSlice';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { Organization } from '../model/Organization';

interface OrganizationsTableProps {
  onEdit: (organization: Organization) => void;
}

const OrganizationsTable: React.FC<OrganizationsTableProps> = ({ onEdit }) => {
  const organizations = useSelector(selectOrganizations);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (id: string) => {
    dispatch(deleteOrganization(id));
  };

  const handleNavigateToEmployees = (id: string) => {
    navigate(`/organizations/${id}`);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Address</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {organizations.map((org) => (
            <TableRow key={org.id}>
              <TableCell>
                <Typography
                  variant="body1"
                  component="a"
                  style={{ cursor: 'pointer', color: '#1976d2', textDecoration: 'underline' }}
                  onClick={() => handleNavigateToEmployees(org.id)}
                >
                  {org.name}
                </Typography>
              </TableCell>
              <TableCell>{org.address}</TableCell>
              <TableCell align="right">
                <IconButton onClick={() => onEdit(org)} aria-label="edit">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(org.id)} aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrganizationsTable;
