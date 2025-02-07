import express from 'express';
import {Event} from '../models/Event.js';
import {jwtAuth} from '../middleware/auth.js';
import {asyncHandler} from "../Utils.js";
import {User} from "../models/User.js";

const router = express.Router();

router.route('/')
    .get(asyncHandler(async (req, res) => {
        try {
            const events = await Event.find().populate('createdBy', 'username');
            res.json(events);
        } catch (err) {
            res.status(400).send(err.message);
        }
    }))
    .post(jwtAuth, asyncHandler(async (req, res) => {
        const {name, description, date} = req.body;
        try {
            const event = new Event({name, description, date, createdBy: req.user.id});
            await event.save();

            const user = await User.findById(req.user.id);
            user.events.push(event._id);
            await user.save();
            res.status(201).json(event);
        } catch (err) {
            res.status(400).send(err.message);
        }
    }));

router.route('/:id')
    .put(jwtAuth, asyncHandler(async (req, res) => {
        try {
            const event = await Event.findById(req.params.id);
            if (!event) return res.status(404).send('Event not found');

            if (event.createdBy.toString() !== req.user.id) return res.status(403).send('You are not authorized to update this event');

            const {name, description, date} = req.body;
            event.name = name || event.name;
            event.description = description || event.description;
            event.date = date || event.date;
            await event.save();
            res.json(event);
        } catch (err) {
            res.status(400).send(err.message);
        }
    }))
    .delete(jwtAuth, asyncHandler(async (req, res) => {
        try {
            const event = await Event.findById(req.params.id);
            if (!event) return res.status(404).send('Event not found');

            if (event.createdBy.toString() !== req.user.id) return res.status(403).send('You are not authorized to delete this event');

            await event.remove();
            res.send('Event deleted');
        } catch (err) {
            res.status(400).send(err.message);
        }
    }));

router.get('/my-events',jwtAuth, asyncHandler(async (req, res) => {
        try {
            const user = await User.findById(req.user.id).populate('events');
            if (!user) return res.status(404).send('User not found');

            res.json(user.events);
        } catch (err) {
            res.status(400).send(err.message);
        }
    }))

router.put('/attend/:eventId', jwtAuth, asyncHandler(async (req, res) => {
    try {
        const event = await Event.findById(req.params.eventId);
        if (!event) return res.status(404).send('Event not found');

        if (event.attendees.includes(req.user.id)) return res.status(400).send('You are already attending this event');

        event.attendees.push(req.user.id);
        await event.save();
        res.json(event);
    } catch (err) {
        res.status(400).send(err.message);
    }
}));

export default router;