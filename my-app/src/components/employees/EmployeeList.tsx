import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectEmployeesByOrganization, deleteEmployee } from '../../features/employees/employeeSlice';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button, Modal, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EmployeeForm from './EmployeeForm';

const EmployeeList: React.FC = () => {
  const { organizationId } = useParams<{ organizationId: string }>();
  const employees = useSelector(selectEmployeesByOrganization(organizationId!));
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
    <div>
      <h1>Employees</h1>
      <Button variant="contained" color="primary" onClick={() => handleOpen()}>
        Add Employee
      </Button>
      <Button variant="contained" color="secondary" onClick={() => navigate('/organizations')}>
        Back to Organizations
      </Button>
      <TableContainer component={Paper}>
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
