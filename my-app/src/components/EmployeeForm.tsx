import React from 'react';
import { useFormik } from 'formik';
import { Employee } from '../features/employees/Employee';
import { Button, TextField } from '@mui/material';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { addEmployee, updateEmployee } from '../features/employees/employeeSlice';
import { useNavigate, useParams } from 'react-router-dom';

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  position: yup.string().required('Position is required'),
});

const EmployeeForm: React.FC<{ initialValues?: Employee }> = ({ initialValues }) => {
  const isEditMode = !!initialValues;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { organizationId, employeeId } = useParams<{ organizationId: string, employeeId: string }>();

  const formik = useFormik({
    initialValues: initialValues || { id: '', organizationId: organizationId!, name: '', position: '' },
    validationSchema,
    onSubmit: (values) => {
      if (isEditMode) {
        dispatch(updateEmployee(values));
      } else {
        dispatch(addEmployee({ ...values, id: Date.now().toString() }));
      }
      navigate(`/organizations/${organizationId}`);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        id="name"
        name="name"
        label="Name"
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
      />
      <TextField
        fullWidth
        id="position"
        name="position"
        label="Position"
        value={formik.values.position}
        onChange={formik.handleChange}
        error={formik.touched.position && Boolean(formik.errors.position)}
        helperText={formik.touched.position && formik.errors.position}
      />
      <Button color="primary" variant="contained" fullWidth type="submit">
        {isEditMode ? 'Update Employee' : 'Add Employee'}
      </Button>
    </form>
  );
};

export default EmployeeForm;
