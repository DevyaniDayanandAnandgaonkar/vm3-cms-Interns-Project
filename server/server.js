const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const authRoutes = require('./routes/auth-router');
const clientsRoutes = require('./routes/clients-router');
const employeesRoutes = require('./routes/employees-router');
const partnersRoutes = require('./routes/partners-router');
const departmentsRoutes = require('./routes/departments-router');
const rolesRoutes = require('./routes/roles-router');
const projectsRoutes = require('./routes/projects-router');
const categoriesRoutes = require('./routes/categories-router');
const designationsRoutes = require('./routes/designations-router');

const app = express();
// CORS should be the first middleware
app.use(cors({
	origin: 'http://localhost:3000',
	credentials: true,
}));
app.use(express.json());

// Use Auth Routes
app.use('/api/auth', authRoutes);

// Use Clients Routes
app.use('/api/clients', clientsRoutes);

// Use Employees Routes
app.use('/api/employees', employeesRoutes);

// Use Partners Routes
app.use('/api/partners', partnersRoutes);

// Use Departments Routes
app.use('/api/departments', departmentsRoutes);

// Use Roles Routes
app.use('/api/roles', rolesRoutes);

// Use Projects Routes
app.use('/api/projects', projectsRoutes);

// Use Categories Routes
app.use('/api/categories', categoriesRoutes);

// Use Designations Routes
app.use('/api/designations', designationsRoutes);

// Alias: allow requests under /api/auth/employees (some clients call this path)
app.use('/api/employees', employeesRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
