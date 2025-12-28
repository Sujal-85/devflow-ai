import mongoose from 'mongoose';

const teamMemberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    commits: {
        type: Number,
        default: 0,
    },
    reviews: {
        type: Number,
        default: 0,
    },
    linesChanged: {
        type: Number,
        default: 0,
    },
});

export const TeamMember = mongoose.model('TeamMember', teamMemberSchema);
