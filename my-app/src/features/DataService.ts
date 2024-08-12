import { EmployeesState } from './employees/employeeSlice';
import { OrganizationsState } from './organizations/organizationSlice';
// import { RootState } from './types';

export interface RootState {
  organizations: OrganizationsState;
  employees: EmployeesState;
}

// Загрузка данных из localStorage
export const loadState = (): RootState | undefined => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState) as RootState;
  } catch (err) {
    return undefined;
  }
};

// Сохранение данных в localStorage
export const saveState = (state: RootState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    console.error(err);
  }
};
