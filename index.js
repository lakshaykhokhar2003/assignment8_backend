import express from 'express';
import cors from 'cors';
import {mongooseConnection} from "./connection.js";

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

mongooseConnection();

app.get('/', (req, res) => {
    res.send('Event Management Backend');
});

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));