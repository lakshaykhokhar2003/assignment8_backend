import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {User} from "../models/User.js";
import {asyncHandler} from "../Utils.js";

const router = express.Router();

router.post('/register', asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userExist = await User.findOne({ email });
        if (userExist) return res.status(400).send('User already exists');

        const user = new User({ name, email, password });
        await user.save();
        res.status(201).send('User registered');
    } catch (err) {
        res.status(400).send(err.message);
    }
}));

router.post('/login', asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).send('Invalid credentials');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send('Invalid credentials');

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
        res.json({ token });
    } catch (err) {
        res.status(400).send(err.message);
    }
}));

export default router;