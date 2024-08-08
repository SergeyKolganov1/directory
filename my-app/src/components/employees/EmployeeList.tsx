import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectEmployeesByOrganization, deleteEmployee } from '../../features/employees/employeeSlice';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const EmployeeList: React.FC = () => {
  const { organizationId } = useParams<{ organizationId: string }>();
  const employees = useSelector(selectEmployeesByOrganization(organizationId!));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = (id: string) => {
    dispatch(deleteEmployee(id));
  };

  return (
    <div>
      <h1>Employees</h1>
      <Button variant="contained" color="primary" onClick={() => navigate(`/organizations/${organizationId}/add-employee`)}>
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
                  <IconButton onClick={() => navigate(`/organizations/${organizationId}/edit-employee/${emp.id}`)} aria-label="edit">
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
    </div>
  );
};

export default EmployeeList;