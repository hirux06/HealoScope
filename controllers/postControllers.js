import Post from "../models/postModel.js";
import User from "../models/userModel.js";


const postController = {
    createPost: async (req, res) => {
        const { id: _id, title, tags , body } = req.body;
        try {
            const user = User.findOne({ id });

            if (!user) {
                return res.status(400).json({ message: "User not found!!" });
            }

            if (user.role !== "doctor") {
                return res.status(403).json({ message: "Only doctors can create posts" });
            }

            const newPost = new Post({
                id, 
                title,
                body,
                tags
            });
            await newPost.save();
                res.status(201).json({ message: "Post created successfully", post: newPost, user });
        } catch (error) {
            res.status(500).json({ message: "Error creating post", error: error.message });
        }
    }
};


export default postController;