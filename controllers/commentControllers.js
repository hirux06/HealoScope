import Comment from "../models/commentModel.js";


const commentController = {
    addComment: async (req, res) => {
        const { userId, postId, body } = req.body;

        if (!userId || !postId || !body) {
            return res.status(400).json({ message: "All fields are required." });
        }

        try {
            const newComment = new Comment({ userId, postId, body });
            const savedComment = await newComment.save();
            res.status(201).json({ message: "Comment added successfully.", comment: savedComment });
        } catch (error) {
            res.status(500).json({ message: "Error adding comment.", error: error.message });
        }
    },

    getCommentsByPost : async (req, res) => {
        const { postId } = req.params;
      
        try {
          const comments = await Comment.find({ postId }).populate("userId", "name").sort({ createdAt: -1 }); 
          res.status(200).json({ comments });
        } catch (error) {
          res.status(500).json({ message: "Error fetching comments.", error: error.message });
        }
    },

    deleteComment : async (req, res) => {
        const { id } = req.params;
      
        try {
          const deletedComment = await Comment.findByIdAndDelete(id);
      
          if (!deletedComment) {
            return res.status(404).json({ message: "Comment not found." });
          }
      
          res.status(200).json({ message: "Comment deleted successfully." });
        } catch (error) {
          res.status(500).json({ message: "Error deleting comment.", error: error.message });
        }
    }
}

export default commentController;