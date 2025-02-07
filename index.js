import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import eventRoutes from './routes/event.js';
import {mongooseConnection} from "./Utils.js";

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

mongooseConnection();

app.use('/api/auth',authRoutes)
app.use('/api/events', eventRoutes);

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));