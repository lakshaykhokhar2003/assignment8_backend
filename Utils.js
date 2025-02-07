import mongoose from "mongoose";

export const mongooseConnection = () => mongoose.connect(process.env.MONGO_URI, {})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

export const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};