import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Employee } from './Employee';
import { RootState } from '../../store';

interface EmployeesState {
  employees: Employee[];
}

const initialState: EmployeesState = {
  employees: [],
};

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    addEmployee: (state, action: PayloadAction<Employee>) => {
      state.employees.push(action.payload);
    },
    updateEmployee: (state, action: PayloadAction<Employee>) => {
      const index = state.employees.findIndex(emp => emp.id === action.payload.id);
      if (index !== -1) {
        state.employees[index] = action.payload;
      }
    },
    deleteEmployee: (state, action: PayloadAction<string>) => {
      state.employees = state.employees.filter(emp => emp.id !== action.payload);
    },
  },
});

export const { addEmployee, updateEmployee, deleteEmployee } = employeeSlice.actions;
export const selectEmployees = (state: RootState) => state.employees.employees;
export const selectEmployeesByOrganization = (organizationId: string) => (state: RootState) =>
  state.employees.employees.filter(emp => emp.organizationId === organizationId);
export default employeeSlice.reducer;
