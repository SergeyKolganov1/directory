import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Organization } from '../../components/organizations/model/Organization';
import { RootState } from '../../app/store';

export interface OrganizationsState {
  organizations: Organization[];
}

const initialState: OrganizationsState = {
  organizations: [],
};

const organizationSlice = createSlice({
  name: 'organizations',
  initialState,
  reducers: {
    addOrganization: (state, action: PayloadAction<Organization>) => {
      state.organizations.push(action.payload);
    },
    updateOrganization: (state, action: PayloadAction<Organization>) => {
      const index = state.organizations.findIndex(org => org.id === action.payload.id);
      if (index !== -1) {
        state.organizations[index] = action.payload;
      }
    },
    deleteOrganization: (state, action: PayloadAction<string>) => {
      state.organizations = state.organizations.filter(org => org.id !== action.payload);
    },
  },
});

export const { addOrganization, updateOrganization, deleteOrganization } = organizationSlice.actions;
export const selectOrganizations = (state: RootState) => state.organizations.organizations;
export default organizationSlice.reducer;
