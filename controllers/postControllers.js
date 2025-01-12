import Post from "../models/postModel.js";


const postController = {
    getAllPost: async (req, res) => {
        try{
            const posts = Post.find({});

            return res.status(200).json({message: "All Posts retrieved successfully", posts});
        }catch(error){
            return res.status(500).json({ message: "Something went wrong", error: error.message });
        }
    }
};


export default postController;