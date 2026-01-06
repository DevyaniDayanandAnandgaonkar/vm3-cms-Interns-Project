// In this file, you can define all your API routes

export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';

export const apiRoutes = {
  auth: {
    login: `${BASE_URL}/auth/login`,
  },
  categories: {
    getAll: `${BASE_URL}/categories`,
    create: `${BASE_URL}/categories`,
    update: (id) => `${BASE_URL}/categories/${id}`,
    delete: (id) => `${BASE_URL}/categories/${id}`,
  },
  clients: {
    getAll: `${BASE_URL}/clients`,
    create: `${BASE_URL}/clients`,
    update: (id) => `${BASE_URL}/clients/${id}`,
    delete: (id) => `${BASE_URL}/clients/${id}`,
  },
  departments: {
    getAll: `${BASE_URL}/departments`,
    create: `${BASE_URL}/departments`,
    update: (id) => `${BASE_URL}/departments/${id}`,
    delete: (id) => `${BASE_URL}/departments/${id}`,
  },
  designations: {
    getAll: `${BASE_URL}/designations`,
    create: `${BASE_URL}/designations`,
    update: (id) => `${BASE_URL}/designations/${id}`,
    delete: (id) => `${BASE_URL}/designations/${id}`,
  },
  employees: {
    getAll: `${BASE_URL}/employees`,
    create: `${BASE_URL}/employees`,
    update: (id) => `${BASE_URL}/employees/${id}`,
    delete: (id) => `${BASE_URL}/employees/${id}`,
  },
  partners: {
    getAll: `${BASE_URL}/partners`,
    create: `${BASE_URL}/partners`,
    update: (id) => `${BASE_URL}/partners/${id}`,
    delete: (id) => `${BASE_URL}/partners/${id}`,
  },
  projects: {
    getAll: `${BASE_URL}/projects`,
    create: `${BASE_URL}/projects`,
    update: (id) => `${BASE_URL}/projects/${id}`,
    delete: (id) => `${BASE_URL}/projects/${id}`,
  },
  projectHistory: {
    getAll: `${BASE_URL}/project-history`,
  },
  roles: {
    getAll: `${BASE_URL}/roles`,
    create: `${BASE_URL}/roles`,
    update: (id) => `${BASE_URL}/roles/${id}`,
    delete: (id) => `${BASE_URL}/roles/${id}`,
  },
};
