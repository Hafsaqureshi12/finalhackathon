const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const verifyToken = require('../middleware/authMiddleware'); // Import the middleware

// Create a new task
router.post('/create', verifyToken, async (req, res) => {
    const { title, description } = req.body;
    try {
        const newTask = new Task({
            title,
            description,
            userId: req.user.id, // Associate task with the logged-in user
        });

        await newTask.save();
        res.status(201).json(newTask); // Return the created task
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all tasks for the logged-in user
router.get('/', verifyToken, async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user.id }); // Find tasks associated with the logged-in user
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a task
router.put('/update/:id', verifyToken, async (req, res) => {
    const { title, description, completed } = req.body;
    try {
        const task = await Task.findById(req.params.id);
        if (!task || task.user.toString() !== req.user.id) {
            return res.status(404).json({ error: 'Task not found or not authorized' });
        }

        task.title = title || task.title;
        task.description = description || task.description;
        task.completed = completed !== undefined ? completed : task.completed;

        await task.save();
        res.json(task); // Return the updated task
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a task
router.delete('/delete/:id', verifyToken, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task || task.user.toString() !== req.user.id) {
            return res.status(404).json({ error: 'Task not found or not authorized' });
        }

        await task.remove();
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
