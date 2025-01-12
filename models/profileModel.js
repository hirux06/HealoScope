import mongoose from "mongoose";


const ProfileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    bio: {
        type: String,
        default: '',
    },
    currentDesignation: {
        type: String,
        default: '',
    }
}, { timestamps: true });

const Profile = mongoose.model("Profile", ProfileSchema);

export default Profile;