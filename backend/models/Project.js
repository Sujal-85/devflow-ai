import mongoose from 'mongoose';

const projectSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    techStack: [{ type: String }],
    status: {
        type: String,
        enum: ['planning', 'in-progress', 'completed', 'on-hold'],
        default: 'planning'
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }]
}, {
    timestamps: true
});

const Project = mongoose.model('Project', projectSchema);
export default Project;
