const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const apiRouter = require('./routes');
const clientRouter = require('./routes/clientRoutes');

const app = express();
// CORS should be the first middleware
app.use(cors({
	origin: ['http://localhost:3000', 'http://localhost:3001'],
	credentials: true,
}));
app.use(express.json());

// Use API Routes
app.use('/api', apiRouter);
app.use('/client', clientRouter)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
