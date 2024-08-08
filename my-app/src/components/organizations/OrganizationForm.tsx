import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { Organization } from '../../features/organizations/Organization';
import { Button, TextField } from '@mui/material';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addOrganization, updateOrganization, selectOrganizations } from '../../features/organizations/organizationSlice';
import { useNavigate, useParams } from 'react-router-dom';

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  address: yup.string().required('Address is required'),
});

const OrganizationForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const organizations = useSelector(selectOrganizations);
  const [initialValues, setInitialValues] = useState<Organization>({ id: '', name: '', address: '' });
  const isEditMode = !!id;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isEditMode) {
      const organizationToEdit = organizations.find(org => org.id === id);
      if (organizationToEdit) {
        setInitialValues(organizationToEdit);
      }
    }
  }, [id, organizations, isEditMode]);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      if (isEditMode) {
        dispatch(updateOrganization(values));
      } else {
        dispatch(addOrganization({ ...values, id: Date.now().toString() }));
      }
      navigate('/organizations');
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
        id="address"
        name="address"
        label="Address"
        value={formik.values.address}
        onChange={formik.handleChange}
        error={formik.touched.address && Boolean(formik.errors.address)}
        helperText={formik.touched.address && formik.errors.address}
      />
      <Button color="primary" variant="contained" fullWidth type="submit">
        {isEditMode ? 'Update Organization' : 'Add Organization'}
      </Button>
    </form>
  );
};

export default OrganizationForm;