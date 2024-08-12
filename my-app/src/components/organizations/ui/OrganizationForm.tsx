import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { Organization } from '../model/Organization';
import { Button, TextField } from '@mui/material';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { addOrganization, updateOrganization } from '../../../features/organizations/organizationSlice';

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  address: yup.string().required('Address is required'),
});

interface OrganizationFormProps {
  onClose: () => void;
  initialOrganization?: Organization | null;
}

const OrganizationForm: React.FC<OrganizationFormProps> = ({ onClose, initialOrganization }) => {
  const [initialValues, setInitialValues] = useState<Organization>({
    id: '',
    name: '',
    address: '',
  });

  const isEditMode = !!initialOrganization;
  const dispatch = useDispatch();

  useEffect(() => {
    if (initialOrganization) {
      setInitialValues(initialOrganization);
    }
  }, [initialOrganization]);

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
      onClose();
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
        margin="normal"
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
        margin="normal"
      />
      <Button color="primary" variant="contained" fullWidth type="submit" sx={{ marginTop: '16px' }}>
        {isEditMode ? 'Update Organization' : 'Add Organization'}
      </Button>
    </form>
  );
};

export default OrganizationForm;
