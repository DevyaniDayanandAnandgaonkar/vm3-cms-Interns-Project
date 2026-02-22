const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const apiRouter = require("./routes");
const clientRouter = require("./routes/clientRoutes");

const app = express();
// CORS should be the first middleware
<<<<<<< HEAD
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

// Use API Routes
app.use("/api", apiRouter);
app.use("/client", clientRouter);
=======
app.use(cors({
	origin: ['http://localhost:3000', 'http://localhost:3001'],
	credentials: true,
}));
app.use(express.json());

// Use API Routes
app.use('/api', apiRouter);
app.use('/client', clientRouter)

>>>>>>> d5a758643b2c9e058da1e5e5490752354af6b8a0

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
