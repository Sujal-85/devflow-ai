import mongoose from 'mongoose';

const metricSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['lines_code', 'commits', 'bugs_fixed', 'ai_assists'],
        required: true,
    },
    value: {
        type: Number,
        required: true,
    },
    change: {
        type: Number,
        default: 0,
    },
    trend: {
        type: String,
        enum: ['increase', 'decrease', 'neutral'],
        default: 'neutral',
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

export const Metric = mongoose.model('Metric', metricSchema);
