import axios from 'axios';
import { Organization } from '../model/Organization';

const API_URL = 'https://api.directory.com/organizations';/////// выносить в env 

export const fetchOrganizations = async (): Promise<Organization[]> => {
  try {
    const response = await axios.get<Organization[]>(API_URL);
    return response.data;
  } catch (error) {
    throw new Error('Failed');
  }
};

export const addOrganizationApi = async (organization: Organization): Promise<void> => {
  try {
    await axios.post(API_URL, organization, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    throw new Error('Failed');
  }
};

export const updateOrganizationApi = async (updatedOrganization: Organization): Promise<void> => {
  try {
    await axios.put(`${API_URL}/${updatedOrganization.id}`, updatedOrganization, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    throw new Error('Failed');
  }
};

export const deleteOrganizationApi = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    throw new Error('Failed');
  }
};
