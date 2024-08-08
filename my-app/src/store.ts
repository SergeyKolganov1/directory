import { configureStore } from '@reduxjs/toolkit';
import organizationReducer from './features/organizations/organizationSlice';
import employeeReducer from './features/employees/employeeSlice';

export const store = configureStore({
  reducer: {
    organizations: organizationReducer,
    employees: employeeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;