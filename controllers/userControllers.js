import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import sendEmail from "../utils/emailSender.js";

const userController = {
  registerUser: async (req, res) => {
    const {
      name,
      username,
      email,
      password,
      role,
      specialization,
      bio,
      experienceYears,
    } = req.body;
    try {
      const user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }

      const profilePictureUrl = req.file ? req.file.path : null;

      const hashedPassword = await bcrypt.hash(password, 12);

      const newUser = await User.create({
        name,
        username,
        email,
        password: hashedPassword,
        role,
        specialization: role === "doctor" ? specialization : undefined,
        bio: role === "doctor" ? bio : undefined,
        experienceYears: role === "doctor" ? experienceYears : undefined,
        profilePicture: profilePictureUrl,
      });

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      newUser.token = token;

      await newUser.save();

      await sendEmail(email, "Welcome to HealoScope!", name, role);

      res
        .status(201)
        .json({
          message: "User registered successfully",
          user: newUser,
          token,
        });
    } catch (error) {
      console.error("Error in registerUser:", error.message);
      res
        .status(500)
        .json({ message: "Something went wrong", error: error.message });
    }
  },

  login: async (req, res) => {
    const { username, email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ message: "User does not exists. Kindly login" });
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password);

      if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      user.token = token;
      await user.save();

      res.status(200).json({
        message: "Login successful",
        user: {
          id: user._id,
          name: user.name,
          username: user.username,
          email: user.email,
          role: user.role,
          specialization: user.specialization,
          bio: user.bio,
          experienceYears: user.experienceYears,
          profilePicture: user.profilePicture,
        },
        token,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Something went wrong", error: error.message });
    }
  },

  getUserProfile: async (req, res) => {
    const { id } = req.params;

    try {
      const users = await User.findById(id);
      res.status(200).json({ message: "User fetched successfully", users });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching users", error: error.message });
    }
  },

  editUserProfile: async (req, res) => {
    try {
      const { name, bio } = req.body;
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { name, bio },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: "Error updating profile", error });
    }
  },

  deleteUser: async (req, res) => {
    const userId = req.params.id;

    try {
      await Post.deleteMany({ userId });

      await Comment.deleteMany({ userId });

      await Like.deleteMany({ userId });

      await Follow.deleteMany({ followerId: userId });
      await Follow.deleteMany({ followingId: userId });

      await User.findByIdAndDelete(userId);

      res
        .status(200)
        .json({ message: "User and associated data deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Failed to delete user and associated data" });
    }
  },
};

export default userController;
