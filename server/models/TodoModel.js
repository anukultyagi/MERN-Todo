import mongoose from 'mongoose';

const TodoSchema = mongoose.Schema({
    title: { type: String, required: true },
    completed: { type: Boolean, required: true }
}, { timestamps: true });

export const Todo = mongoose.model('Todo', TodoSchema);
