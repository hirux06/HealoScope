import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import moment from "moment-timezone";
import mongoose from "mongoose";


const postController = {
    createPost: async (req, res) => {
        const { id, title, tags , body } = req.body;
        try {
            const user = await User.findOne({ _id: id });


            if (!user) {
                return res.status(400).json({ message: "User not found!!" });
            }

            if (user.role !== "doctor") {
                return res.status(403).json({ message: "Only doctors can create posts", user: user.role });
            }

            const newPost = new Post({
                userId: id, 
                title,
                body,
                tags
            });
            await newPost.save();
                res.status(201).json({ message: "Post created successfully", post: newPost});
        } catch (error) {
            res.status(500).json({ message: "Error creating post", error: error.message });
        }
    },

    getAllPost: async (req, res) => {
        try {
            const posts = await Post.find().populate('userId', 'name username profilePicture');
            res.status(200).json({ message: "Posts fetched successfully", posts });
        } catch (error) {
            res.status(500).json({ message: "Error fetching posts", error: error.message });
        }
    },

    getPostById: async (req, res) => {
        const {id} = req.params;

        try {
            const posts = await Post.findById(id).populate('userId', 'name username profilePicture');
            res.status(200).json({ message: "Posts fetched successfully", posts });
        } catch (error) {
            res.status(500).json({ message: "Error fetching posts", error: error.message });
        }
    },

    editPost: async (req, res) => {
        const {id} = req.params;
        const { title, body, tags, media } = req.body;

        try{
            const post = await Post.findById(id);


            if(!post) {
                res.status(400).json({message: "Post not found"});
            }

            post.title = title || post.title;
            post.body = body || post.body;
            post.tags = tags || post.tags;
            post.media = media || post.media;
            post.updatedAt = moment().tz("Asia/Kolkata").format("DD-MM-YYYY HH:mm:ss");

            const updatedPost = await post.save();

            console.log(updatedPost);
            res.status(200).json({ message: "Post updated successfully", updatedPost });
            } catch (error) {
                res.status(500).json({ message: "Error updating post", error: error.message });
            }
    },

    deletePost: async (req, res) => {
        const {id} = req.params;

        try{
            const post = await Post.findById(id);


            if(!post) {
                res.status(400).json({message: "Post not found"});
            }

            await Post.findByIdAndDelete(id);
            res.status(200).json({ message: "Post deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: "Error updating post", error: error.message });
        }
    },

    likeOrUnlikePost: async (req, res) => {
        const { id } = req.params;  
        const {userId} = req.body;  
        try {
            const post = await Post.findById(id);
            
            if (!post) {
            return res.status(404).json({ message: "Post not found" });
            }

            const isLiked = post.likes.some(like => like.toString() === userId.toString());

            if (isLiked) {
              
              post.likes = post.likes.filter(like => like.toString() !== userId.toString());
            } else {
              
              post.likes.push(new mongoose.Types.ObjectId(userId));  
            }
            await post.save();

            return res.status(200).json({ message: "Post updated successfully", post });
        } catch (error) {
            console.error("Error liking/unliking post:", error.message);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
};


export default postController;