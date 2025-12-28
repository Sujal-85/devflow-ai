import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    githubToken: {
        type: String,
        default: null
    },
    preferences: {
        theme: { type: String, default: 'dark' },
        notifications: {
            codeReview: { type: Boolean, default: true },
            sprintUpdates: { type: Boolean, default: true },
            teamActivity: { type: Boolean, default: false }
        }
    }
}, {
    timestamps: true,
});

// Method to check entered password against hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Pre-save hook to hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

export const User = mongoose.model('User', userSchema);
