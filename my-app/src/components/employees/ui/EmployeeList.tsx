import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectEmployeesByOrganization, deleteEmployee } from '../../../features/employees/employeeSlice';
import { selectOrganizationById } from '../../../features/organizations/organizationSlice';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button, Modal, Box, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EmployeeForm from './EmployeeForm';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const EmployeeList: React.FC = () => {
  const { organizationId } = useParams<{ organizationId: string }>();
  const employees = useSelector(selectEmployeesByOrganization(organizationId!));
  const organization = useSelector(selectOrganizationById(organizationId!));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    dispatch(deleteEmployee(id));
  };

  const handleOpen = (employeeId?: string) => {
    setSelectedEmployeeId(employeeId || null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px', position: 'relative' }}>
      <Button 
        variant="contained" 
        color="error" 
        onClick={() => navigate('/organizations')} 
        style={{ position: 'absolute', top: '20px', left: '20px', display: 'flex', alignItems: 'center' }}
      >
        <ArrowBackIcon style={{ marginRight: '8px' }} />
      </Button>
      <Typography variant="h4" component="h1" gutterBottom>
        Employees of {organization?.name || 'the Organization'}
      </Typography>
      <Button variant="contained" color="primary" onClick={() => handleOpen()} style={{ marginBottom: '20px' }}>
        Add Employee
      </Button>
      <TableContainer component={Paper} style={{ width: '66.67%' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Position</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((emp) => (
              <TableRow key={emp.id}>
                <TableCell>{emp.name}</TableCell>
                <TableCell>{emp.position}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleOpen(emp.id)} aria-label="edit">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(emp.id)} aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ width: 400, p: 4, bgcolor: 'background.paper', margin: 'auto', mt: 5, borderRadius: 2 }}>
          <EmployeeForm employeeId={selectedEmployeeId} organizationId={organizationId!} onClose={handleClose} />
        </Box>
      </Modal>
    </div>
  );
};

export default EmployeeList;
