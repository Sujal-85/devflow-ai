import mongoose from 'mongoose';

const notificationSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: {
        type: String,
        enum: ['info', 'success', 'warning', 'error'],
        default: 'info'
    },
    read: { type: Boolean, default: false },
}, {
    timestamps: true
});

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;
