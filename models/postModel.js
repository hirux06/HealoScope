import mongoose from "mongoose";
import moment from "moment-timezone";


const PostSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    tags: [{
        type: String,
    }],
    media: {
        type: String,
        default: "",
    },
    mediaType: {
        type: String,
        enum: ["image", "video", "pdf"],
        default: "image",
    },
    createdAt: {
        type: String, 
        default: () => moment().tz("Asia/Kolkata").format("DD-MM-YYYY HH:mm:ss"),
    },
    updatedAt: {
        type: String, 
        default: () => moment().tz("Asia/Kolkata").format("DD-MM-YYYY HH:mm:ss"),
    },
});

const Post = mongoose.model("Post", PostSchema);

export default Post;
