import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import OrganizationsPage from '../pages/OrganizationsPage';
import EmployeesPage from '../pages/EmployeesPage';


const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<OrganizationsPage />} />
          <Route path="/organizations" element={<OrganizationsPage />} />
          <Route path="/organizations/:organizationId" element={<EmployeesPage />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
