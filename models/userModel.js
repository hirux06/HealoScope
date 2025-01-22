import mongoose from "mongoose";
import moment from "moment-timezone";


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: ["user", "doctor"],
        default: "user",
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default: "default.jpg",
    },
    specialization: {
        type: String,
    },
    bio: {
        type: String,
    },
    experienceYears: {
        type: Number,
        default: function () {
            return this.role === "doctor" ? 0 : undefined;
        },
    },
    followers: {
        type: [mongoose.Schema.Types.ObjectId], 
        ref: "User", 
        default: function () {
          return this.role === "doctor" ? [] : undefined; 
        },
    },

    following: {
        type: [mongoose.Schema.Types.ObjectId], 
        ref: "User", 
        default: function () {
          return this.role === "doctor" ? [] : undefined; 
        },
    },
      
    postId: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post", 
        }],
        default: function () {
            return this.role === "doctor" ? [] : undefined;
        },
    },
    token: {
        type: String,
        default: "",
    },
    createdAt: {
        type: String,
        default: () => moment().tz("Asia/Kolkata").format("DD-MM-YYYY HH:mm:ss"),
    },
});



UserSchema.pre("findOneAndDelete", async function (next) {
    const userId = this.getQuery()._id;
  
    await mongoose.model("Post").deleteMany({ userId });
  
    await mongoose.model("Comment").deleteMany({ userId });
  
    await mongoose.model("Like").deleteMany({ userId });
  
    
  
    next();
});

const User = mongoose.model("User", UserSchema);

export default User;
