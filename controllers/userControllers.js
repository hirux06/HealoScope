import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const userController = {
    registerUser: async (req, res) => {
        const {name, username, email, password, role, specialization, bio, experienceYears} = req.body;
        try {
            // Finding whether the user already exists or not
            const user = await User.findOne({email});

            if(user){
                return res.status(400).json({message: "User already exists"});
            }

            // Hashing the password for more safety
            const hashedPassword = await bcrypt.hash(password, 12);

            // Creating the new user
            const newUser = await User.create({
                name,
                username,
                email,
                password: hashedPassword,
                role,
                specialization: role === "doctor" ? specialization : undefined,
                bio: role === "doctor" ? bio : undefined,
                experienceYears: role === "doctor" ? experienceYears : undefined
            });
            await newUser.save();
            const token = jwt.sign(
                { id: newUser._id}, 
                process.env.JWT_SECRET,                
                { expiresIn: "7d" }                    
            );
            
            // Attach the token to the user
            newUser.token = token;
            await newUser.save();

            res.status(201).json({ message: 'User registered successfully', user: newUser, token });
        } catch (error) {
            res.status(500).json({ message: 'Something went wrong', error: error.message });
        }
    },

    login: async (req, res) => {
        const {username, email, password} = req.body;

        try {
            // Finding whether the user already exists or not
            const user = await User.findOne({email});


            if(!user){
                return res.status(400).json({message : "User does not exists. Kindly login"});
            }

            // Comparing the hashed password already in the user object and the password the user given after encryption
            const isPasswordCorrect = await bcrypt.compare(password, user.password);

            if(!isPasswordCorrect){
                return res.status(400).json({ message: "Invalid Credentials" });
            }

            // Generate a token
            const token = jwt.sign(
                { id: user._id },
                process.env.JWT_SECRET,
                { expiresIn: "7d" }
            );

             // Attach the token to the user and saving it in db
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
                    profilePicture: user.profilePicture
                },
                token 
            });
        }catch(error){
            res.status(500).json({message: "Something went wrong", error: error.message})
        }
    },

    getUserProfile: async (req, res) => {
        const {id} = req.params;

        try {
            const users = await User.findById(id);
            res.status(200).json({ message: "User fetched successfully", users });
        } catch (error) {
            res.status(500).json({ message: "Error fetching users", error: error.message });
        }
    },
};

export default userController;