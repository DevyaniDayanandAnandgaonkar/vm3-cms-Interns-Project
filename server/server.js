const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const authRoutes = require('./routes/auth-router');

const app = express();
app.use(express.json());

// Use Auth Routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
