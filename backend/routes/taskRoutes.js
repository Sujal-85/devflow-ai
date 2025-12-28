import express from 'express';
import { Task } from '../models/Task.js';

const router = express.Router();

// Get all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new task
router.post('/', async (req, res) => {
    const task = new Task({
        title: req.body.title,
        priority: req.body.priority,
        assignee: req.body.assignee,
        status: req.body.status,
        aiGenerated: req.body.aiGenerated,
    });

    try {
        const newTask = await Task.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a task
router.put('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (task) {
            task.title = req.body.title || task.title;
            task.priority = req.body.priority || task.priority;
            task.assignee = req.body.assignee || task.assignee;
            task.status = req.body.status || task.status;
            task.aiGenerated = req.body.aiGenerated !== undefined ? req.body.aiGenerated : task.aiGenerated;

            const updatedTask = await task.save();
            res.json(updatedTask);
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
