import { configureStore } from '@reduxjs/toolkit';
import organizationReducer from './features/organizations/organizationSlice';
import employeeReducer from './features/employees/employeeSlice';
import { loadState, saveState } from './features/SaveData';


export const store = configureStore({
  reducer: {
    organizations: organizationReducer,
    employees: employeeReducer,
  },
  preloadedState: loadState(),
});

store.subscribe(() => {
  saveState(store.getState());
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
