import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectEmployeesByOrganization, deleteEmployee } from '../features/employees/employeeSlice';
import { Button } from '@mui/material';

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
      <Button onClick={() => navigate(`/organizations`)}>Back to Organizations</Button>
      <Button onClick={() => navigate(`/organizations/${organizationId}/add-employee`)}>Add Employee</Button>
      <ul>
        {employees.map(emp => (
          <li key={emp.id}>
            {emp.name}
            <Button onClick={() => navigate(`/organizations/${organizationId}/edit-employee/${emp.id}`)}>Edit</Button>
            <Button onClick={() => handleDelete(emp.id)}>Delete</Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;
