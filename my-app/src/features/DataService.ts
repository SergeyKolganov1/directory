import { RootState } from '../store';
import { Employee } from './employees/Employee';
import { Organization } from './organizations/Organization';


// Тип для корневого состояния
interface FirstState {
  organizations: OrganizationsState;
  employees: EmployeesState;
}

// Тип для состояния организаций
interface OrganizationsState {
  organizations: Organization[];
}

// Тип для состояния сотрудников
interface EmployeesState {
  employees: Employee[];
}

// Загрузка данных из localStorage
export const loadState = (): FirstState | undefined => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
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