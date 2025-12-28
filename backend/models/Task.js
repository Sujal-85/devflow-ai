import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium',
    },
    assignee: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['todo', 'in-progress', 'done'],
        default: 'todo',
    },
    aiGenerated: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

export const Task = mongoose.model('Task', taskSchema);
