import axios from 'axios';
import { Employee } from '../model/Employee';

const API_URL = 'https://api.directory.com/organizations/{organizationId}';/////// выносить в env 

export const fetchEmployeesByOrganization = async (organizationId: string): Promise<Employee[]> => {
  try {
    const response = await axios.get<Employee[]>(API_URL, {
      params: { organizationId }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed');
  }
};

export const addEmployeeApi = async (employee: Employee): Promise<void> => {
  try {
    await axios.post(API_URL, employee, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    throw new Error('Failed');
  }
};

export const updateEmployeeApi = async (updatedEmployee: Employee): Promise<void> => {
  try {
    await axios.put(`${API_URL}/${updatedEmployee.id}`, updatedEmployee, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    throw new Error('Failed');
  }
};

export const deleteEmployeeApi = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    throw new Error('Failed');
  }
};
