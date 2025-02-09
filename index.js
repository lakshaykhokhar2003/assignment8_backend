import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import eventRoutes from './routes/event.js';
import http from 'http';
import {Server} from 'socket.io';
import {mongooseConnection} from "./Utils.js";
import mongoose from "mongoose";
import {Event} from "./models/Event.js";

const app = express();
const PORT = process.env.PORT;

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    },
});

app.use(cors(
    {
        origin: "*",
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    }
));
app.use(express.json());
io.on("connection", (socket) => {
    console.log("Client connected");

    socket.on("getEvents", async (callback) => {
        const events = await Event.find();
        callback(events);
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});
mongooseConnection().then(() => {
    console.log("Connected to MongoDB, watching changes...");

    const eventCollection = mongoose.connection.collection("events");
    const changeStream = eventCollection.watch();

    changeStream.on("change", (change) => {
        console.log("Database Change Detected:", change);

        if (change.operationType === "insert") {
            io.emit("newEvent", change.fullDocument);
        } else if (change.operationType === "update") {
            io.emit("updateEvent", change.updateDescription);
        } else if (change.operationType === "delete") {
            io.emit("deleteEvent", change.documentKey._id);
        }
    });
});
app.use('/auth',authRoutes)
app.use('/events', eventRoutes);

server.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));