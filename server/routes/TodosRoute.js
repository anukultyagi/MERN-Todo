
import { Todo } from '../models/TodoModel.js'
import { Router } from 'express';

const router = Router(); // Initialize the Router

// Route to get all todos
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find({});
        return res.status(200).json({
            count: todos.length,
            data: todos
        });
    } catch (error) {
        console.log("Get all todos route error: " + error.message);
        res.status(500).send({ message: error.message });
    }
});

// Route to get one todo by id
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const todoById = await Todo.findById(id);
        if (!todoById) {
            return res.status(400).send({ message: "Todo not found by given id" });
        }
        return res.status(200).json(todoById);
    } catch (error) {
        console.log("Get todo by id route error: " + error.message);
        res.status(500).send({ message: error.message });
    }
});

// Route to update todo by id
router.put('/:id', async (req, res) => {
    try {
        if (!req.body.title) {
            return res.status(400).send({ message: 'Send all required fields: title' });
        }

        const { id } = req.params;
        const result = await Todo.findByIdAndUpdate(id, req.body, { new: true });
        if (!result) {
            return res.status(400).send({ message: 'Todo not found' });
        }
        return res.status(200).send({ message: 'Todo updated successfully' });
    } catch (error) {
        console.log("Update todo by id route error: " + error.message);
        res.status(500).send({ message: error.message });
    }
});

// Route to delete todo by id
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Todo.findByIdAndDelete(id);
        if (!result) {
            return res.status(400).send({ message: "No todo by given id found!" });
        }
        return res.status(200).send({ message: "Todo deleted successfully" });
    } catch (error) {
        console.log("Delete todo by id route error: " + error.message);
        res.status(500).send({ message: error.message });
    }
});

// POST request to add a new todo
router.post('/', async (req, res) => {
    try {
        if (!req.body.title) {
            return res.status(400).send({ message: 'Send all required fields: title' });
        }
        const newTodo = {
            title: req.body.title,
            completed: false,
        };

        const todo = await Todo.create(newTodo);
        return res.status(201).send(todo);
    } catch (error) {
        console.log("Add new todo route error: " + error.message);
        res.status(500).send({ message: error.message });
    }
});

export default router;
