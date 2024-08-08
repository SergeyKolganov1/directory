import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import OrganizationsPage from './pages/OrganizationsPage';
import EmployeesPage from './pages/EmployeesPage';
import OrganizationForm from './components/OrganizationForm';
import EmployeeForm from './components/EmployeeForm';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/organizations" element={<OrganizationsPage />} />
          <Route path="/organizations/:organizationId" element={<EmployeesPage />} />
          <Route path="/add-organization" element={<OrganizationForm />} />
          <Route path="/edit-organization/:id" element={<OrganizationForm />} />
          <Route path="/organizations/:organizationId/add-employee" element={<EmployeeForm />} />
          <Route path="/organizations/:organizationId/edit-employee/:employeeId" element={<EmployeeForm />} />
          <Route path="/" element={<OrganizationsPage />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
